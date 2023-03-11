import { EventHandler, EventType, EventTypes, ExternalArgs, FormEventArg, Control, SaveEventArg, StageSelectedEventArg, PageType } from "../../../typing";
import { getFormContext } from "../../../utils";

export abstract class FormEventType<TEventArg extends FormEventArg = FormEventArg> implements EventType {
    private _eventHandler: EventHandler | undefined;

    constructor(name: string, controlNameRequired: boolean) {
        this.name = name;
        this.supportedPageType = ["record"];
        this.controlNameRequired = controlNameRequired;
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
            type: this.name
        } as TEventArg;
    }

    public abstract subscribe(selectedControl: Control, controlName?: string): void;
    public abstract unsubscribe(selectedControl: Control, controlName?: string): void;

    public init(callBack: EventHandler): void {
        this._eventHandler = callBack;
    }

    controlNameRequired: boolean;
    supportedPageType: PageType[];
    subscribable: boolean;
}

export class FormLoadEventType extends FormEventType {
    constructor() {
        super(EventTypes.FormLoad, false);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public subscribe(): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unsubscribe(): void {}
}

export class DataLoadEventType extends FormEventType {
    constructor() {
        super(EventTypes.DataLoad, false);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.addOnLoad(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.removeOnLoad(this.eventHandler.bind(this, controlName));
    }
}

export class SaveEventType extends FormEventType<SaveEventArg> {
    constructor() {
        super(EventTypes.Save, false);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.entity.addOnSave(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.entity.removeOnSave(this.eventHandler.bind(this, controlName));
    }
}

export class ColumnChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.ColumnChange, true);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getAttribute(controlName as string).addOnChange(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getAttribute(controlName as string).removeOnChange(this.eventHandler.bind(this, controlName));
    }
}

export class LookupTagClickEventType extends FormEventType {
    constructor() {
        super(EventTypes.LookupTagClick, true);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const control = formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string);
        control.addOnLookupTagClick(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const control = formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string);
        control.removeOnLookupTagClick(this.eventHandler.bind(this, controlName));
    }
}

export class GridLoadEventType extends FormEventType {
    constructor() {
        super(EventTypes.GridLoad, true);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.GridControl>(controlName as string).addOnLoad(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.GridControl>(controlName as string).removeOnLoad(this.eventHandler.bind(this, controlName));
    }
}

export class PreSearchEventType extends FormEventType {
    constructor() {
        super(EventTypes.PreSearch, true);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string).addPreSearch(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string).removePreSearch(this.eventHandler.bind(this, controlName));
    }
}

export class TabStateEventType extends FormEventType {
    constructor() {
        super(EventTypes.TabStateChange, true);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.ui.tabs.get(controlName as string).addTabStateChange(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.ui.tabs.get(controlName as string).removeTabStateChange(this.eventHandler.bind(this, controlName));
    }
}

export class StageChangeEventType extends FormEventType<StageSelectedEventArg> {
    constructor() {
        super(EventTypes.StageChange, false);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnStageChange(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnStageChange(this.eventHandler.bind(this, controlName));
    }
}

export class ProcessStatusChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.ProcessStatusChange, false);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnProcessStatusChange(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnProcessStatusChange(this.eventHandler.bind(this, controlName));
    }
}

export class PreProcessStatusChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.PreProcessStatusChange, false);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnPreProcessStatusChange(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnProcessStatusChange(this.eventHandler.bind(this, controlName));
    }
}

export class PreStageChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.PreStageChange, false);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnPreStageChange(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnPreStageChange(this.eventHandler.bind(this, controlName));
    }
}

export class StageSelectedEventType extends FormEventType {
    constructor() {
        super(EventTypes.StageSelected, false);
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnStageSelected(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnStageSelected(this.eventHandler.bind(this, controlName));
    }
}
