import { ComponentEvent, EventType, ControlType, ExternalArgs, MnEvent, Component, MnContext, ComponentConstructor, ComponentObject } from "../../typing";
import { debug, getControlType, isNullOrUndefined, isUci } from "../../utils";
import { ControlScope } from "../common/scope";
import { EventEnv } from "../events/event-env";
import { EsmLoader } from "../esm/esm-loader";
import { getModuleConfig } from "../metadata/helper";
import { RootContainer } from "../di/container/component-container";
import { OnInitMiddleWare } from "../di/middleware/on-init-middleware";
import { SubComponentMiddleware } from "../di/middleware/subcomponent-middleware";
import { EventMiddleware } from "../di/middleware/event-middleware";
import { EventStorage } from "../events/event-storage";

/**
 * Define all actions that could be done in the context of the execution (provided by dataverse).
 * The context is defined by the control type.
 */
export class Context implements MnContext {
    private components: Component[] = [];
    //TODO: Change !
    public controlType: ControlType;

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
        this.controlType = getControlType(initialExtArgs.primaryArgument) as ControlType;
    }

    /**
     * Initialize the context
     * @param extArgs 
     */
    private async init(extArgs: ExternalArgs) {
        try {
            await this.bootstrapModule();
            //await this.loadComponents(extArgs);
            //this.components.forEach(component => component.onInit(this, extArgs));
        }
        catch (except: any) {
            throw new Error(`Initialization error - ${except.message}. Exception: ${except.name}. Stack trace: ${except.stack}`);
        }
    }

    private async bootstrapModule() {
        const esmBrowser = await this.esmLoader.get();
        const module = esmBrowser.module;
        const moduleConfig = getModuleConfig(module);
        const boostrapComponent = moduleConfig?.bootstrap as ComponentConstructor<ComponentObject>;
        
        const container = new RootContainer(module);
        const eventStorage = new EventStorage();
        container.applyMiddlewares(
            new OnInitMiddleWare(),
            new SubComponentMiddleware(),
            new EventMiddleware(eventStorage)
        );

        // TODO: Replace with ComponentActivator or ComponentRunner (something like that)
        container.componentContainer.get(boostrapComponent);
    }

    /**
     * Loads components for a given context. 
     * @param eventCtx
     */
    private async loadComponents(extArgs: ExternalArgs) {
        try {
            // Indicate search specifications (entityName, formId, formName, gridName, gridId, that kind of thing) 
            // Call a ComponentHelper which will take care of obtaining the concerned module and domain(s) in order to obtain the components
            const controlScope = await ControlScope.new(extArgs.primaryArgument);
            const moduleBrowser = await this.esmLoader.get();
            //const domains = moduleBrowser.domainRegister.getDomains(controlScope);
            //this.components = domains.flatMap(d => d.components);
        }
        catch (except: any) {
            throw new Error(`An error was occured during components loading: ${except.message}`);
        }
    }

    /**
     * Check the consistency of an event type 
     * @param eventType 
     * @param event 
     */
    private checkEventType(eventType: EventType, event: MnEvent) {
        if (isNullOrUndefined(eventType)) {
            throw new Error(`No event listener or event type ${event.type}`);
        }

        if (eventType.controlNameRequired && isNullOrUndefined(event.targetName)) {
            throw new Error(`Event type ${event.type} required a control name`);
        }

        if (eventType.isUciRequired && isUci() == false) {
            throw new Error(`Event type ${event.type} works only in Uci`);
        }
    }

    /**
     * Subscribe to an event.
     * @param event 
     * @param extArgs 
     */
    public subscribe(event: ComponentEvent, extArgs: ExternalArgs): void {
        const eventType = this.eventEnv.eventTypeRegister.getEventType(event.type);

        if (isNullOrUndefined(eventType)) {
            throw new Error(`Event type ${event.type} unknow`);
        }

        if (eventType.supportedControls.some(f => f == this.controlType)) {
            // TODO: Evite d'avoir des doublons d'abonnements. Etudier une meilleur gestion.
            if (this.eventEnv.eventRegister.exist(event) == false) {
                debug(`Subscribe ${event.type} event with target name ${event.targetName} on component ${event.component.name}`);
                this.eventEnv.eventRegister.addEvent(event);
                eventType.subscribe(extArgs.primaryArgument, event.targetName);
            }
        }
    }

    /**
     * Unsubscribe an event
     * @param event 
     * @param extArgs 
     */
    public unsubscribe(event: ComponentEvent, extArgs: ExternalArgs): void {
        const eventType = this.eventEnv.eventTypeRegister.getEventType(event.type);

        if (isNullOrUndefined(eventType)) {
            throw new Error(`Event type ${event.type} unknow`);
        }

        if (eventType?.supportedControls.some(f => f == this.controlType)) {
            eventType.unsubscribe(extArgs.primaryArgument, event.targetName);
            //this.eventEnv.eventRegister.removeEvent(event);
        }
    }

    /**
     * Trigger an event
     * @param event 
     * @param extArgs 
     * @returns 
     */
    public triggerEvent(event: MnEvent, extArgs: ExternalArgs): unknown {
        const eventType = this.eventEnv.eventTypeRegister.getEventType(event.type) as EventType;
        this.checkEventType(eventType, event);

        debug(`Event ${event.type} triggered with target name ${event.targetName}`);

        const eventArg = eventType.createEventArg(extArgs);
        return this.eventEnv.eventDispatcher.dispatchComponentEvent(event, eventArg);
    }
}