import { EventType, ControlType, ExternalArgs, Event, Control, ComponentConstructor, PageType } from "../../typing";
import { debug, getControlType } from "../../utils";
import { EventEnv } from "../events/event-env";
import { EsmLoader } from "../esm/esm-loader";
import { RootContainer } from "../di/container";
import { OnInitMiddleWare } from "../di/middleware/on-init-middleware";
import { SubComponentMiddleware } from "../di/middleware/subcomponent-middleware";
import { ComponentActivator } from "../component/component-activator";
import { ComponentBrowser } from "../component/component-browser";
import { D365EventSubscriber } from "../events/d365-event-subscriber";
import { ComponentLifeCycle } from "../component/component-lifecycle";
import { getBootstrapComponents } from "../../utils/module";
import { getComponentConfig } from "../metadata/helper";
import { getScopeFromControl } from "../../utils/scope";

/**
 * Define all actions that could be done in the context of the execution (provided by D365).
 * The context is defined by the current page contexte (form or grid).
 */
export class Context {
    //TODO: Change !
    public controlType: ControlType;
    private d365EventSubscriber: D365EventSubscriber;
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
        this.d365EventSubscriber = new D365EventSubscriber(eventEnv.eventTypeRegister, initialExtArgs.primaryControl as Control);
        this.componentLifeCycle = new ComponentLifeCycle(eventEnv.eventRegister);
    }

    // TODO: Move and improve
    private hasEventIntegrityError(cb: ComponentBrowser): boolean {
        const hasError = cb.events.some(e => {
            const eventType = this.eventEnv.eventTypeRegister.getEventType(e.type);
            const componentMetadata = getComponentConfig(cb.componentType as ComponentConstructor);
            return !eventType?.supportedPageType.includes(componentMetadata?.scope.pageType as PageType);
        });

        return hasError || cb.subComponents.some(c => this.hasEventIntegrityError(c));
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
            const boostrapCBs = bootstrapComponents.map(c => new ComponentBrowser(c));

            // Check events integrity
            if (boostrapCBs.some(c => this.hasEventIntegrityError(c))) {
                throw new Error(`One or more components have unauthorized events (Wrong page type)`);
            }

            const contextScope = await getScopeFromControl(extArgs.primaryControl as Control);

            // Init DI
            const rootContainer = new RootContainer(module);
            rootContainer.applyMiddlewares(
                new OnInitMiddleWare(this.componentLifeCycle),
                new SubComponentMiddleware(this.componentLifeCycle, contextScope)
            );

            // Subscribe to D365 events
            boostrapCBs.forEach(cb => cb.allEvents.forEach(e => this.d365EventSubscriber.subscribe(e)));

            // Create and enable the boostrap components
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
            throw new Error(`Initialization error - ${except.message}. Exception: ${except.name}. Stack trace: ${except.stack}`);
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
        const eventType = this.eventEnv.eventTypeRegister.getEventType(event.type) as EventType;
        this.checkEventType(eventType, event);

        debug(`Event ${event.type} triggered with target name ${event.targetName}`);

        const eventArg = eventType.createEventArg(extArgs);
        return this.eventEnv.eventDispatcher.dispatchComponentEvent(event, eventArg);
    }

    // /**
    //  * Loads components for a given context. 
    //  * @param eventCtx
    //  */
    // private async loadComponents(extArgs: ExternalArgs) {
    //     try {
    //         // Indicate search specifications (entityName, formId, formName, gridName, gridId, that kind of thing) 
    //         // Call a ComponentHelper which will take care of obtaining the concerned module and domain(s) in order to obtain the components
    //         const controlScope = await ControlScope.new(extArgs.selectedControl);
    //         const moduleBrowser = await this.esmLoader.get();
    //         //const domains = moduleBrowser.domainRegister.getDomains(controlScope);
    //         //this.components = domains.flatMap(d => d.components);
    //     }
    //     catch (except: any) {
    //         throw new Error(`An error was occured during components loading: ${except.message}`);
    //     }
    // }
}