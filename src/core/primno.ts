import { notifyCriticalError, MaybePromise } from "../utils";
import { Configuration, DefaultConfiguration, loadConfiguration } from "./configuration";
import { CanBePromise, ExternalArgs, MnEvent, PrimaryArgument } from "../typing";
import { ContextInitializer } from "./context";
import { EventEnv, initEventTypes } from "./events";

export class Primno {
    private _config: Configuration = new DefaultConfiguration();
    private _eventEnv: EventEnv = new EventEnv();
    private _contextInitializer?: ContextInitializer;

    private get contextInitializer() {
        return this._contextInitializer as ContextInitializer;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    /**
     * Create an new instance of Primno
     */
    public static async new(): Promise<Primno> {
        const primno = new Primno();
        await primno.init();
        return primno;
    }

    /**
     * Initialize Primno
     */
    private async init() {
        this._config = await loadConfiguration();
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
        try {
            const extArgs: ExternalArgs = { primaryArgument: primaryEventArg, args: args };

            return new MaybePromise(() => this.contextInitializer.getContext(extArgs))
            .then((context) => context.triggerEvent(event, extArgs))
            .done();
        }
        catch (except: any) {
            console.error(except);
            notifyCriticalError(`An error was occured on ${event.type} event`, `${except.message}. Stack trace: ${except.stack}`);
        }
    }
}