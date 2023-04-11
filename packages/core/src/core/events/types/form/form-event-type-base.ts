import { Control, EventHandler, EventType, ExternalArgs, FormEventArg, PageType } from "../../../../typing";
import { getFormContext, verbose } from "../../../../utils";

export interface FormEventTypeBaseOptions {
    name: string;
    controlNameRequired: boolean;
}

/**
 * Form Event Type. Provide a base class for all form event type.
 */
export abstract class FormEventTypeBase<TEventArg extends FormEventArg = FormEventArg> implements EventType {
    private _eventHandler: EventHandler | undefined;

    constructor(options: FormEventTypeBaseOptions) {
        this.name = options.name;
        this.supportedPageType = ["record"];
        this.controlNameRequired = options.controlNameRequired;
        this.subscribable = true;
    }

    public name: string;

    protected get eventHandler(): EventHandler {
        return this._eventHandler as EventHandler;
    }

    public createEventArg(args: ExternalArgs): TEventArg {
        return {
            eventCtx: args.selectedControl,
            formCtx: getFormContext(args.primaryControl as Xrm.Events.EventContext) as Xrm.FormContext,
            type: this.name,
            extraArgs: args.args
        } as TEventArg;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public subscribe(selectedControl: Control, controlName?: string): void {
        verbose(`The event ${this.name} can't be unsubscribe at runtime`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public unsubscribe(selectedControl: Control, controlName?: string): void {
        verbose(`The event ${this.name} can't be unsubscribe at runtime`);
    }

    public init(callBack: EventHandler): void {
        this._eventHandler = callBack;
    }

    controlNameRequired: boolean;
    supportedPageType: PageType[];
    subscribable: boolean;
}
