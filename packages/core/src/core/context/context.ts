import { EventType, ControlType, ExternalArgs, Event, Control, ComponentConstructor, PageType } from "../../typing";
import { debug, getControlType, throwError } from "../../utils";
import { EventEnv } from "../events/event-env";
import { EsmLoader } from "../esm/esm-loader";
import { RootContainer } from "../di/container";
import { OnInitMiddleWare } from "../di/middleware/on-init-middleware";
import { SubComponentMiddleware } from "../di/middleware/subcomponent-middleware";
import { ComponentActivator } from "../component/component-activator";
import { ComponentBrowser } from "../component/component-browser";
import { PowerAppsEventSubscriber } from "../events/power-apps-event-subscriber";
import { ComponentLifeCycle } from "../component/component-lifecycle";
import { getBootstrapComponents } from "../../utils/module";
import { getScopeFromControl } from "../../utils/scope";
import { ComponentIntegrityChecker } from "./component-integrity-checker";

/**
 * Define all actions that could be done in the context of the execution (provided by D365).
 * The context is defined by the current page contexte (form or grid).
 * @internal
 */
export class Context {
    //TODO: Change !
    public controlType: ControlType;
    private d365EventSubscriber: PowerAppsEventSubscriber;
    private componentLifeCycle: ComponentLifeCycle;

    public static async new(
        extArgs: ExternalArgs,
        eventEnv: EventEnv,
        moduleLoader: EsmLoader): Promise<Context> {

        const context = new Context(eventEnv, moduleLoader, extArgs);
        await context.init(extArgs);
        return context;
    }

    private constructor(
        private eventEnv: EventEnv,
        private esmLoader: EsmLoader,
        initialExtArgs: ExternalArgs) {
        this.controlType = getControlType(initialExtArgs.selectedControl) as ControlType;
        this.d365EventSubscriber = new PowerAppsEventSubscriber(eventEnv.eventTypeRegister, initialExtArgs.primaryControl as Control);
        this.componentLifeCycle = new ComponentLifeCycle(eventEnv.eventRegister);
    }

    private checkIntegrity(bootstrapComponents: ComponentConstructor[]) {
        const integrityChecker = new ComponentIntegrityChecker(this.eventEnv.eventTypeRegister);

        const errorsByBc = bootstrapComponents
            .map(c => ({
                bootstrap: c.name,
                errors: integrityChecker.check(c).errors
            }))
            .filter(bc => bc.errors.length > 0);
        
        if (errorsByBc.length !== 0) {
            const errorMessage = errorsByBc
            .map(bc => {
                const errors = bc.errors.map(e => ` - ${e.component.name}: ${e.message}`).join("\r\n");
                return `Bootstrap component: ${bc.bootstrap}\r\n${errors}`;
            })
            .join("\r\n");
        
            throwError(errorMessage);
        }
    }

    /**
     * Initialize the context
     * @param extArgs 
     */
    private async init(extArgs: ExternalArgs) {
        try {
            debug(`Init ${this.controlType} context`);

            const esmBrowser = await this.esmLoader.get();
            const module = esmBrowser.module;

            const bootstrapComponents = getBootstrapComponents(module);
            this.checkIntegrity(bootstrapComponents);

            const contextScope = await getScopeFromControl(extArgs.primaryControl as Control);

            // Init DI
            const rootContainer = new RootContainer(module);
            rootContainer.applyMiddleware(
                new OnInitMiddleWare(this.componentLifeCycle),
                new SubComponentMiddleware(this.componentLifeCycle, contextScope)
            );

            // Subscribe to D365 events
            const bootstrapCBs = bootstrapComponents.map(c => new ComponentBrowser(c));
            bootstrapCBs.forEach(cb => cb.allEvents.forEach(e => this.d365EventSubscriber.subscribe(e)));

            // Create and enable the bootstrap components
            bootstrapComponents.forEach(c => {
                const componentActivator = new ComponentActivator(
                    c,
                    this.componentLifeCycle,
                    rootContainer.container,
                    contextScope
                );
                componentActivator.enable();
            });
        }
        catch (except: any) {
            throw new Error(`Initialization error:\r\n${except.message}.\r\n\r\nStack trace:\r\n${except.stack}`);
        }
    }

    /**
     * Check the consistency of an event type 
     * @param eventType 
     * @param event 
     */
    // TODO: Call to EventType.checkValidity instead
    private checkEventType(eventType: EventType, event: Event) {
        if (eventType == null) {
            throw new Error(`No event listener or event type ${event.type}`);
        }

        if (eventType.controlNameRequired && event.targetName == null) {
            throw new Error(`Event type ${event.type} required a control name`);
        }
    }

    /**
     * Trigger an event
     * @param event 
     * @param extArgs 
     * @returns 
     */
    public triggerEvent(event: Event, extArgs: ExternalArgs): unknown {
        const eventType = this.eventEnv.eventTypeRegister.getEventType(event.type);

        if (eventType == null) {
            throwError(`No event listener or event type ${event.type}`)
        }

        this.checkEventType(eventType, event);

        debug(`Event ${event.type} triggered with target name ${event.targetName}`);

        const eventArg = eventType.createEventArg(extArgs);
        return this.eventEnv.eventDispatcher.dispatchComponentEvent(event, eventArg);
    }
}