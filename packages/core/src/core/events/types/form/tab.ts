import { EventTypes, Control } from "../../../../typing";
import { getFormContext } from "../../../../utils";
import { FormEventTypeBase } from "./form-event-type-base";

export class TabStateEventType extends FormEventTypeBase {
    constructor() {
        super({
           name: EventTypes.TabStateChange,
           controlNameRequired: true
        });
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