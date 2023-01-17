import { ControlType, Control, PageType } from "../typing";
import { hasMethod } from "./common";

/** Indicates whether the form is a Uci form */
export function isUci(): boolean {
    const globalContext = Xrm.Utility.getGlobalContext();
    return globalContext.getCurrentAppUrl() !== globalContext.getClientUrl();
}

/**
 * Indicates whether the context is of type grid or form.
 * @context context 
 */
export function getControlType(context: any): ControlType | undefined {
    if (context?.getGrid != null) {
        // Grid control. The event comes from the command bar on a entitylist page.
        return ControlType.grid;
    }

    if (context?.getFormContext != null) {
        // Form execution context. The event comes from form (field change, onload, etc).
        return ControlType.form;
    }

    if (context?.getAttribute != null) {
        // Form context. The event comes from the command bar.
        return ControlType.form;
    }
}

/**
 * Gets the id of the application.
 * @returns 
 */
export async function getAppId(): Promise<string> {
    const globalContext = Xrm.Utility.getGlobalContext();

    const appProperties = await globalContext.getCurrentAppProperties();
    if (appProperties.appId == null) {
        throw new Error("AppId not found");
    }

    return appProperties.appId;
}

/**
 * Gets the entity name of the current page.
 * @returns Entity name
 */
export function getPageEntityName() {
    const pageContext = Xrm.Utility.getPageContext();
    return pageContext.input.entityName;
}

/**
 * Gets the page type (entityrecord or entitylist).
 */
export function getPageType(): PageType {
    switch (Xrm.Utility.getPageContext().input.pageType) {
        case "entitylist": return PageType.list;
        case "entityrecord": return PageType.record
        default: throw new Error("Unknown page type");
    }
}

/**
 * Gets the name of the entity from the given control.
 * @param control 
 */
export function getEntityName(control: Control): string { 
    switch (getControlType(control)) {
        case "form": {
            const formCtx = getFormContext(control as Xrm.Events.EventContext);
            if (formCtx == null) {
                throw new Error("Unable to find form context");
            }

            return formCtx.data.entity.getEntityName();
        }
        case "grid": {
            return (control as Xrm.Controls.GridControl).getEntityName();
        }
        default: throw new Error("Unable to get entity name from context. The context must be form or grid");
    }
}

/**
* Gets the context of the form from the given event.
* Returns null if the form context is not found.
* @param eventCtx
*/
export function getFormContext(eventCtx: Xrm.Events.EventContext | Xrm.FormContext): Xrm.FormContext | null {
    if (eventCtx == null) {
        return null;
    }

    if (hasMethod(eventCtx, "getFormContext")) {
        return (eventCtx as Xrm.Events.EventContext).getFormContext();
    }
    else {
        if (hasMethod(eventCtx, "getAttribute") &&
            hasMethod(eventCtx, "getControl")) {
            return eventCtx as Xrm.FormContext;
        }
    }

    return null;
}

/**
 * Gets the Guid of the form.
 * @param formContext Form context
 * @returns Guid of form
 */
export function getFormId(formContext: Xrm.FormContext): string | undefined {
    return formContext?.ui.formSelector.getCurrentItem()?.getId();
}
