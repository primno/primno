import { Control, ControlType, Scope } from "../../typing";
import { getAppId, getControlType, getEntityName, getFormContext, getPageType } from "../../utils";
import { ScopeBase } from "./scope-base";

export class ControlScope extends ScopeBase {
    private constructor(scope: Scope) {
        super(scope);
    }

    public static async new(control: Control): Promise<ControlScope> {
        // Initialize
        
        const entityName = getEntityName(control);

        const scope: Scope = {
            pageType: getPageType(),
            entityName
        };

        scope.app = {
            id: await getAppId()
        };

        if (getControlType(control) == ControlType.form) {
            const formCtx = getFormContext(control as Xrm.Events.EventContext);
            const currentForm = formCtx?.ui.formSelector.getCurrentItem();

            scope.form = {
                id: currentForm?.getId() as string,
                name: currentForm?.getLabel() as string
            };
        }

        return new ControlScope(scope);
    }
}