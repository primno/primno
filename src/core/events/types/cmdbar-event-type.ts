import { CommandBarEventArg, EventArg, EventType, EventTypes, ExternalArgs, PopulateQueryEventArg, PageType } from "../../../typing";
import { verbose } from "../../../utils";

/**
 * CommandBar Event Type.
 * This events can't be subscribe in runtime.
 */
export abstract class CmdBarEventType implements EventType {
    constructor(name: string, pageType: PageType[], controlNameRequired: boolean) {
        this.name = name;
        this.supportedPageType = pageType;
        this.controlNameRequired = controlNameRequired;
        this.subscribable = false;
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

    public init(): void {
        verbose("Command bar events can't be init at runtime");
    }

    controlNameRequired: boolean;
    supportedPageType: PageType[];
    name: string;
    subscribable: boolean;
}

export class CommandInvokeEventType extends CmdBarEventType {
    constructor(){
        super(EventTypes.CommandInvoke, ["entityrecord", "entitylist"], true);
    }
}

export class EnableRuleEventType extends CmdBarEventType {
    constructor(){
        super(EventTypes.EnableRule, ["entityrecord", "entitylist"], true);
    }
}

export class PopulateQueryEventType extends CmdBarEventType {
    constructor() {
        super(EventTypes.PopulateQuery, ["entityrecord", "entitylist"], true);
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