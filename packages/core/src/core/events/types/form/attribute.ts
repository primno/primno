import { EventTypes, Control } from "../../../../typing";
import { getFormContext } from "../../../../utils";
import { FormEventTypeBase } from "./form-event-type-base";

export class ColumnChangeEventType extends FormEventTypeBase {
    constructor() {
        super({
            name: EventTypes.ColumnChange,
            controlNameRequired: true
        });
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