import { Control, Scope, ControlType, FormScopeConfig } from "../typing";
import { isSameId, isNullOrEmpty } from "./common";
import { getEntityName, getPageType, getAppId, getControlType, getFormContext } from "./dataverse";

/**
 * Gets the scope of a control.
 * @param control Control
 * TODO: Move to utils ?
 */
export async function getScopeFromControl(control: Control): Promise<Scope> {
    const entityName = getEntityName(control);

        const scope: Scope = {
            pageType: getPageType(),
            entityName,
            app: {
                id: await getAppId()
            }
        };

        if (getControlType(control) === ControlType.form) {
            if (scope.pageType !== "entityrecord") {
                throw new Error("A form control cannot exist on a list page.");
            }

            const formCtx = getFormContext(control as Xrm.Events.EventContext);
            const currentForm = formCtx?.ui.formSelector.getCurrentItem();

            scope.form = {
                id: currentForm?.getId() as string,
                name: currentForm?.getLabel() as string
            };
        }

        return scope;
}

function isSameForm(first?: FormScopeConfig, second?: FormScopeConfig): boolean {
    return (
        first == null ||
        (second != null &&
        (first.id != null && second.id != null && isSameId(first.id, second.id) || first.name == second.name))
    );
}

function isEqualsOrNull(first: string | undefined, second: string | undefined) {
    return isNullOrEmpty(first) || second == second;
}

/**
 * Indicates if a scope is included in another one.
 * @param first Reference
 * @param second Scope maybe included
 * @returns true if included otherwise false
 */
export function isInScope(first: Scope, second: Scope): boolean {
    // TODO: Complete, dont work
    //this.entityNames.every(e => this.isEqualsOrNull(e, scope.entityName)) &&
    return (
        (
            first.pageType === "entityrecord" && second.pageType === "entityrecord" && isSameForm(first.form, second.form) ||
            first.pageType === "entitylist"
        ) &&
        isEqualsOrNull(first.app?.id, second.app?.id) &&
        isEqualsOrNull(first.pageType, second.pageType)
    );
}