import { StageSelectedEventArg, EventTypes, Control } from "../../../../typing";
import { getFormContext } from "../../../../utils";
import { FormEventTypeBase } from "./form-event-type-base";

export class StageChangeEventType extends FormEventTypeBase<StageSelectedEventArg> {
    constructor() {
        super({
            name: EventTypes.StageChange,
            controlNameRequired: false
        });
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

export class ProcessStatusChangeEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.ProcessStatusChange,
            controlNameRequired: false
        });
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

export class PreProcessStatusChangeEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.PreProcessStatusChange,
            controlNameRequired: false
        });
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

export class PreStageChangeEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.PreStageChange,
            controlNameRequired: false
        });
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

export class StageSelectedEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.StageSelected,
            controlNameRequired: false
        });
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
