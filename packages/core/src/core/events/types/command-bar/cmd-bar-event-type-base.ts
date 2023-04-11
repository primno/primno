import { EventType, PageType, ExternalArgs, CommandBarEventArg } from "../../../../typing";
import { verbose } from "../../../../utils";

export interface CmdBarEventTypeBaseOptions {
    name: string;
    pageType: PageType[];
}

/**
 * CommandBar Event Type.
 * This events can't be subscribe at runtime.
 */
export abstract class CmdBarEventTypeBase<TEventArg extends CommandBarEventArg = CommandBarEventArg> implements EventType {
    constructor(options: CmdBarEventTypeBaseOptions) {
        this.name = options.name;
        this.supportedPageType = options.pageType;
        this.controlNameRequired = true;
        this.subscribable = false;
    }

    public createEventArg(extArgs: ExternalArgs): TEventArg {
        return {
            type: this.name,
            selectedControl: extArgs.selectedControl,
            extraArgs: extArgs.args
        } as TEventArg;
    }

    public subscribe(): void {
        verbose("Command bar events can't be subscribe at runtime");
    }

    public unsubscribe(): void {
        verbose("Command bar events can't be unsubscribe at runtime");
    }

    public init(): void {
        verbose("Command bar events doesn't need to be init because they can't be subscribe at runtime");
    }

    controlNameRequired: boolean;
    supportedPageType: PageType[];
    name: string;
    subscribable: boolean;
}