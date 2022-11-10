import { Component, ComponentConfig, MnContext } from "../typing";
import { ExternalArgs } from "../typing/events";
import { FluentEventRegister } from "./fluent-event-register";

/**
 * @deprecated
 */
export abstract class ComponentBase<TConfig extends ComponentConfig = ComponentConfig> implements Component<TConfig> {
    private readonly _config: Readonly<TConfig>;

    public get config(): TConfig{
        return this._config;
    }

    /**
     * Construct the component from provided config
     * @param config Feature configuration.
     */
    constructor(config: TConfig) {
        this._config = config;
    }

    public onInit(context: MnContext, extArgs: ExternalArgs): void {
        const eventRegister = new FluentEventRegister(this);
        this.registerEvents(eventRegister);
        const events = eventRegister.getEvents();

        events.forEach(e => context.subscribe(e, extArgs));
    }

    protected abstract registerEvents(eventRegister: FluentEventRegister): void;

    public get name(): string {
        return this.constructor.name;
    }
}