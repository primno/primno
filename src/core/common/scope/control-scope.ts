import { Control, ControlType } from "../../../typing";
import { getAppId, getControlType, getEntityName, getFormContext } from "../../../utils";
import { ScopeBase } from "./scope-base";

export class ControlScope extends ScopeBase {
    private constructor(control: Control) {
        const entityName = getEntityName(control);
        super(entityName);
    }

    public static async new(control: Control): Promise<ControlScope> {
        const controlScope = new ControlScope(control);

        // Initialize
        
        controlScope.app = {
            id: await getAppId()
        };

        if (getControlType(control) == ControlType.form) {
            const formCtx = getFormContext(control as Xrm.Events.EventContext);
            const currentForm = formCtx?.ui.formSelector.getCurrentItem();

            controlScope.form = {
                id: currentForm?.getId() as string,
                name: currentForm?.getLabel() as string
            };
        }

        return controlScope;
    }
}