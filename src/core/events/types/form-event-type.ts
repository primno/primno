import { EventCallBack, EventType, ControlType, EventTypes, ExternalArgs, FormEventArg, PrimaryArgument, SaveEventArg, StageSelectedEventArg } from "../../../typing";
import { getFormContext, isNullOrUndefined } from "../../../utils";

export abstract class FormEventType<TEventArg extends FormEventArg = FormEventArg> implements EventType {
    private _callBack: EventCallBack | undefined;

    constructor(name: string, controlNameRequired: boolean, isUciRequired: boolean) {
        this.name = name;
        this.supportedControls = [ControlType.form];
        this.controlNameRequired = controlNameRequired;
        this.isUciRequired = isUciRequired;
    }

    public name: string;

    protected get callBack(): EventCallBack {
        return this._callBack as EventCallBack;
    }

    public createEventArg(args: ExternalArgs): TEventArg {
        return {
            eventCtx: args.primaryArgument,
            formCtx: getFormContext(args.primaryArgument as Xrm.Events.EventContext) as Xrm.FormContext,
            type: this.name
        } as TEventArg;
    }

    public abstract subscribe(primaryControl: PrimaryArgument, controlName?: string): void;
    public abstract unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void;

    public init(callBack: EventCallBack): void {
        this._callBack = callBack;
    }

    controlNameRequired: boolean;
    isUciRequired: boolean;
    supportedControls: ControlType[];
}

export class FormLoadEventType extends FormEventType {
    constructor() {
        super(EventTypes.FormLoad, false, false);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {}
}

export class DataLoadEventType extends FormEventType {
    constructor() {
        super(EventTypes.DataLoad, false, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.addOnLoad(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.removeOnLoad(this.callBack.bind(this, controlName));
    }
}

export class SaveEventType extends FormEventType<SaveEventArg> {
    constructor() {
        super(EventTypes.Save, false, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.entity.addOnSave(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.entity.removeOnSave(this.callBack.bind(this, controlName));
    }
}

export class FieldChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.FieldChange, true, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getAttribute(controlName as string).addOnChange(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getAttribute(controlName as string).removeOnChange(this.callBack.bind(this, controlName));
    }
}

export class LookupTagClickEventType extends FormEventType {
    constructor() {
        super(EventTypes.LookupTagClick, true, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        // HACK: addOnLookupTagClick est absent de type/xrm. Passage en any pour le moment.
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const control = formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string) as any;
        control.addOnLookupTagClick(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const control = formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string) as any;
        control.removeOnLookupTagClick(this.callBack.bind(this, controlName));
    }
}

export class GridLoadEventType extends FormEventType {
    constructor() {
        super(EventTypes.GridLoad, true, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.GridControl>(controlName as string).addOnLoad(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.GridControl>(controlName as string).removeOnLoad(this.callBack.bind(this, controlName));
    }
}

export class PreSearchEventType extends FormEventType {
    constructor() {
        super(EventTypes.PreSearch, true, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string).addPreSearch(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.getControl<Xrm.Controls.LookupControl>(controlName as string).removePreSearch(this.callBack.bind(this, controlName));
    }
}

export class TabStateEventType extends FormEventType {
    constructor() {
        super(EventTypes.TabStateChange, true, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.ui.tabs.get(controlName as string).addTabStateChange(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.ui.tabs.get(controlName as string).removeTabStateChange(this.callBack.bind(this, controlName));
    }
}

export class StageChangeEventType extends FormEventType<StageSelectedEventArg> {
    constructor() {
        super(EventTypes.StageChange, false, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnStageChange(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnStageChange(this.callBack.bind(this, controlName));
    }
}

export class ProcessStatusChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.ProcessStatusChange, false, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnProcessStatusChange(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnProcessStatusChange(this.callBack.bind(this, controlName));
    }
}

export class PreProcessStatusChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.PreProcessStatusChange, false, true);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnPreProcessStatusChange(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnProcessStatusChange(this.callBack.bind(this, controlName));
    }
}

export class PreStageChangeEventType extends FormEventType {
    constructor() {
        super(EventTypes.PreStageChange, false, true);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnPreStageChange(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnPreStageChange(this.callBack.bind(this, controlName));
    }
}

export class StageSelectedEventType extends FormEventType {
    constructor() {
        super(EventTypes.StageSelected, false, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.addOnStageSelected(this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.process.removeOnStageSelected(this.callBack.bind(this, controlName));
    }
}

export class IframeLoadedEventType extends FormEventType {
    constructor() {
        super(EventTypes.IframeLoaded, true, false);
    }

    public subscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const iframeControl = formCtx.getControl<Xrm.Controls.IframeControl>(controlName as string);
        
        if (isNullOrUndefined(iframeControl.getObject)) {
            throw new Error(`Control ${controlName} is not iframe`);
        }

        const iframeHtmlElem = iframeControl.getObject();
        iframeHtmlElem.addEventListener("load", () => this.callBack.bind(this, controlName));
    }

    public unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void {
        const formCtx = getFormContext(primaryControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const iframeControl = formCtx.getControl<Xrm.Controls.IframeControl>(controlName as string);
        
        if (isNullOrUndefined(iframeControl.getObject)) {
            throw new Error(`Control ${controlName} is not iframe`);
        }

        const iframeHtmlElem = iframeControl.getObject();
        iframeHtmlElem.removeEventListener("load", () => this.callBack.bind(this, controlName));
    }
}