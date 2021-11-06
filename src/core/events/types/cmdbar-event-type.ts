import { CommandBarEventArg, EventArg, EventCallBack, EventType, ControlType, EventTypes, ExternalArgs, PrimaryArgument, PopulateQueryEventArg } from "../../../typing";

export abstract class CmdBarEventType implements EventType {
    constructor(name: string, availableContext: ControlType[], controlNameRequired: boolean, isUciRequired: boolean) {
        this.name = name;
        this.supportedControls = availableContext;
        this.controlNameRequired = controlNameRequired;
        this.isUciRequired = isUciRequired;
    }

    public createEventArg(extArgs: ExternalArgs): EventArg {
        return {
            type: this.name,
            selectedControl: extArgs.primaryArgument,
            extraArgs: extArgs.args
        } as CommandBarEventArg;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {}

    // TODO: Appel de primno directement ? Nécessité d'avoir un callback ? Peut être appliqué dès la construction du type.
    // Pas d'api pour le moment donc peut être ..
    public init(callBack: EventCallBack): void {
        this._callBack = callBack;
    }

    private _callBack: EventCallBack | undefined;

    controlNameRequired: boolean;
    isUciRequired: boolean;
    supportedControls: ControlType[];
    name: string;
}

export class ButtonPressEventType extends CmdBarEventType {
    constructor(){
        super(EventTypes.ButtonPress, [ControlType.form, ControlType.grid], true, false);
    }
}

export class EnableRuleEventType extends CmdBarEventType {
    constructor(){
        super(EventTypes.EnableRule, [ControlType.form, ControlType.grid], true, true);
    }
}

export class PopulateQueryEventType extends CmdBarEventType {
    constructor() {
        super(EventTypes.PopulateQuery, [ControlType.form, ControlType.grid], true, false);
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