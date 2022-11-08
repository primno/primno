import { CommandBarEventArg, EventArg, EventCallBack, EventType, ControlType, EventTypes, ExternalArgs, Control, PopulateQueryEventArg } from "../../../typing";
import { verbose } from "../../../utils";

/**
 * CommandBar Event Type.
 * This events can't be subscribe in runtime.
 */
export abstract class CmdBarEventType implements EventType {
    constructor(name: string, availableContext: ControlType[], controlNameRequired: boolean) {
        this.name = name;
        this.supportedControls = availableContext;
        this.controlNameRequired = controlNameRequired;
    }

    public createEventArg(extArgs: ExternalArgs): EventArg {
        return {
            type: this.name,
            selectedControl: extArgs.selectedControl,
            extraArgs: extArgs.args
        } as CommandBarEventArg;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public subscribe(): void {
        verbose("Command bar events can't be subscribe at runtime");
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unsubscribe(): void {
        verbose("Command bar events can't be unscribe at runtime");
    }

    public init(callBack: EventCallBack): void {
        this._callBack = callBack;
    }

    private _callBack: EventCallBack | undefined;

    controlNameRequired: boolean;
    supportedControls: ControlType[];
    name: string;
}

export class ButtonPressEventType extends CmdBarEventType {
    constructor(){
        super(EventTypes.ButtonPress, [ControlType.form, ControlType.grid], true);
    }
}

export class EnableRuleEventType extends CmdBarEventType {
    constructor(){
        super(EventTypes.EnableRule, [ControlType.form, ControlType.grid], true);
    }
}

export class PopulateQueryEventType extends CmdBarEventType {
    constructor() {
        super(EventTypes.PopulateQuery, [ControlType.form, ControlType.grid], true);
    }

    public createEventArg(extArgs: ExternalArgs): EventArg {
        const eventArg = super.createEventArg(extArgs) as PopulateQueryEventArg;

        if (extArgs.args.length == 0){
            throw new Error("Event type PopulateQuery require Command Property parameter");
        }

        eventArg.commandProperties = extArgs.args[0];

        return eventArg;
    }
}