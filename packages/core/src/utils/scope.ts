import { Control, Scope, ControlType, FormScopeConfig, AppScopeConfig } from "../typing";
import { isSameId, isNullOrEmpty } from "./common";
import { getTableName, getPageType, getAppId, getControlType, getFormContext } from "./dataverse";

/**
 * Gets the scope of a control.
 * @param control Control
 * TODO: Move to utils ?
 */
export async function getScopeFromControl(control: Control): Promise<Scope> {
    const tableName = getTableName(control);

        const scope: Scope = {
            pageType: getPageType(),
            table: tableName,
            app: {
                id: await getAppId()
            }
        };

        if (getControlType(control) === ControlType.form) {
            if (scope.pageType !== "record") {
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
        (first == null || second == null) ||
        (first.id != null && second.id != null && isSameId(first.id, second.id)) ||
        (first.name === second.name)
    );
}

function isEqualsOrNull(first: string | undefined, second: string | undefined) {
    return isNullOrEmpty(first) || isNullOrEmpty(second) || first === second;
}

function isSameApp(first?: AppScopeConfig, second?: AppScopeConfig) {
    return isEqualsOrNull(first?.id, second?.id);
}

function toArray<T>(elementOrArray: T | T[]) {
    return ([] as T[]).concat(elementOrArray);
}

function isSameTableName(first?: string | string[], second?: string | string[]) {
    if (second == null) {
        // Second null = all entities
        return true;
    }

    const firstEntities = toArray(first);
    const secondEntities = toArray(second);

    return firstEntities.some(f => secondEntities.includes(f as string));
}

/**
 * Indicates if a scope is included in another one.
 * @param first Reference
 * @param second Scope maybe included
 * @returns true if included otherwise false
 */
 export function isInScope(first: Scope, second: Scope): boolean {
    const assertions: boolean[] = [
        isSameApp(first.app, second.app)
    ];

    switch (first.pageType) {
        case "record":
            // Record and list in second scope allowed
            assertions.push(isSameForm(first.form, (second as any).form));
            
            if (second.pageType === "record") {
                assertions.push(isSameTableName(first.table, second.table));
            }
            
            break;
        case "list":
            // Only list in second scope allowed
            assertions.push(first.pageType === second.pageType);

            assertions.push(isSameTableName(first.table, second.table));

            break;
    }

    return assertions.every(a => a);
}