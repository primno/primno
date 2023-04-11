import { EventTypes, ExternalArgs, PopulateQueryEventArg } from "../../../../typing";
import { CmdBarEventTypeBase } from "./cmd-bar-event-type-base";

export class CommandInvokeEventType extends CmdBarEventTypeBase {
    constructor(){
        super({
            name: EventTypes.CommandInvoke,
            pageType: ["record", "list"]
        });
    }
}

export class EnableRuleEventType extends CmdBarEventTypeBase {
    constructor(){
        super({
            name: EventTypes.EnableRule,
            pageType: ["record", "list"]
        });
    }
}

export class PopulateQueryEventType extends CmdBarEventTypeBase<PopulateQueryEventArg> {
    constructor() {
        super({
            name: EventTypes.PopulateQuery,
            pageType: ["record", "list"]
        });
    }

    public createEventArg(extArgs: ExternalArgs): PopulateQueryEventArg {
        const eventArg = super.createEventArg(extArgs);

        if (extArgs.args.length == 0) {
            throw new Error("Event type PopulateQuery require Command Property parameter");
        }

        eventArg.commandProperties = extArgs.args[0];

        return eventArg;
    }
}