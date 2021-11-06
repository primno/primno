import { PrimaryArgument, ControlType } from "../../../typing";
import { getAppId, getControlType, getEntityName, getFormContext } from "../../../utils";
import { ScopeBase } from "./scope-base";

export class ControlScope extends ScopeBase {
    constructor(control: PrimaryArgument) {
        const entityName = getEntityName(control);
        super(entityName);

        this.app = {
            id: getAppId()
        };

        if (getControlType(control) == ControlType.form) {
            const formCtx = getFormContext(control as Xrm.Events.EventContext);
            const currentForm = formCtx?.ui.formSelector.getCurrentItem();

            this.form = {
                id: currentForm?.getId() as string,
                name: currentForm?.getLabel() as string
            };
        }
    }
}