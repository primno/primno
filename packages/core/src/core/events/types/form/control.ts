import { EventTypes, Control } from "../../../../typing";
import { getFormContext } from "../../../../utils";
import { FormEventTypeBase } from "./form-event-type-base";

export class LookupTagClickEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.LookupTagClick,
            controlNameRequired: true
        });
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

export class OutputChangeEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.OutputChange,
            controlNameRequired: true
        });
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const control = formCtx.getControl<Xrm.Controls.StandardControl>(controlName as string);
        control.addOnOutputChange(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        const control = formCtx.getControl<Xrm.Controls.StandardControl>(controlName as string);
        control.removeOnOutputChange(this.eventHandler.bind(this, controlName));
    }
}

export class PreSearchEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.PreSearch,
            controlNameRequired: true
        });
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

export class GridLoadEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.GridLoad,
            controlNameRequired: true
        });
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

export class GridSaveEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.GridSave,
            controlNameRequired: true
        });
    }
}

export class GridRecordSelectEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.GridRecordSelect,
            controlNameRequired: true
        });
    }
}

export class GridChangeEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.GridChange,
            controlNameRequired: true
        });
    }
}