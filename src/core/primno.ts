import { notifyCriticalError, MaybePromise, isNullOrUndefined } from "../utils";
import { Configuration } from "./configuration";
import { CanBePromise, ExternalArgs, MnEvent, PrimaryArgument } from "../typing";
import { ContextInitializer } from "./context";
import { EventEnv, initEventTypes } from "./events";

export class Primno {
    private _config: Configuration;
    private _eventEnv: EventEnv = new EventEnv();
    private _contextInitializer?: ContextInitializer;

    private get contextInitializer() {
        return this._contextInitializer as ContextInitializer;
    }

    public constructor(config: Configuration) {
        if (isNullOrUndefined(config)) {
            throw new Error("Primno configuration must be set");
        }
        
        this._config = config;

        initEventTypes(this._eventEnv.eventTypeRegister, this);
        this._contextInitializer = new ContextInitializer(this._config, this._eventEnv);
    }

    /**
     * Trigger an event.
     * @param event Event.
     * @param primaryEventArg Associated execution context.
     * @param args Additional optional arguments that will be passed to the event handler. 
     */
    public triggerEvent(event: MnEvent, primaryEventArg: PrimaryArgument, ...args: unknown[]): CanBePromise<unknown> {
        const extArgs: ExternalArgs = { primaryArgument: primaryEventArg, args: args };

        return MaybePromise.new(() => this.contextInitializer.getContext(extArgs))
            .then((context) => context.triggerEvent(event, extArgs))
            .catch((except) => {
                console.error(except);
                notifyCriticalError(`An error was occured on ${event.type} event`, `${except.message}. Stack trace: ${except.stack}`);
            })
            .done();
    }
}