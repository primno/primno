import { notifyCriticalError, MaybePromise, isNullOrUndefined } from "../utils";
import { Configuration } from "./configuration";
import { CanBePromise, ExternalArgs, Event, Esm, Control } from "../typing";
import { ContextInitializer } from "./context";
import { EventEnv, initEventTypes } from "./events";

export interface InitializeOptions {
    config: Configuration;
    esm: Esm;
}

export class Primno {
    private _eventEnv: EventEnv = new EventEnv();
    private _contextInitializer?: ContextInitializer;

    private get contextInitializer() {
        return this._contextInitializer as ContextInitializer;
    }

    public constructor(options: InitializeOptions) {
        if (options.config == null) {
            throw new Error("Primno configuration must be set");
        }

        initEventTypes(this._eventEnv.eventTypeRegister, this);
        this._contextInitializer = new ContextInitializer(options, this._eventEnv);
        
    }

    /**
     * Trigger an event.
     * @param event Event.
     * @param selectedControl Associated execution context.
     * @param primaryControl Optionnal primary control. Must be set to undefined if there are other args.
     * @param args Additional optional arguments that will be passed to the event handler.
     */
    public triggerEvent(event: Event, selectedControl: Control, primaryControl: Control | undefined, ...args: unknown[]): CanBePromise<unknown> {
        const extArgs: ExternalArgs = {
            selectedControl,
            // To be compatible with form event. Only the first arg (selectedControl) is sent
            // TODO: Make sure that has not side effect.
            primaryControl : primaryControl ?? selectedControl,
            args
        };

        return MaybePromise
            .new(() => this.contextInitializer.getContext(extArgs))
            .then((context) => context.triggerEvent(event, extArgs))
            .catch((except) => {
                notifyCriticalError(
                    `An error was occured on ${event.type} event:\r\n${except.message}`,
                    `Exception: ${except.name} => ${except.message}\r\n Stack trace: ${except.stack}`
                );
            })
            .done();
    }
}