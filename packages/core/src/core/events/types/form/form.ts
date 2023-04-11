import { EventTypes, Control, SaveEventArg } from "../../../../typing";
import { getFormContext } from "../../../../utils";
import { FormEventTypeBase } from "./form-event-type-base";

export class FormLoadEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.FormLoad,
            controlNameRequired: false
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public subscribe(): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unsubscribe(): void {}
}

export class DataLoadEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.DataLoad,
            controlNameRequired: false
        });
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

export class SaveEventType extends FormEventTypeBase<SaveEventArg> {
    constructor() {
        super({
            name: EventTypes.Save,
            controlNameRequired: false
        });
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

export class PostSaveEventType extends FormEventTypeBase<SaveEventArg> {
    constructor() {
        super({
            name: EventTypes.PostSave,
            controlNameRequired: false
        });
    }

    public subscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.entity.addOnPostSave(this.eventHandler.bind(this, controlName));
    }

    public unsubscribe(selectedControl: Control, controlName?: string): void {
        const formCtx = getFormContext(selectedControl as Xrm.Events.EventContext) as Xrm.FormContext;
        formCtx.data.entity.removeOnPostSave(this.eventHandler.bind(this, controlName));
    }
}