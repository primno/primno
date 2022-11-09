import { ControlType, Control } from "../typing";
import { hasMethod } from "./common";

/** Indicates whether the form is a Uci form */
export function isUci(): boolean {
    const globalContext = Xrm.Utility.getGlobalContext();
    return globalContext.getCurrentAppUrl() !== globalContext.getClientUrl();

    // TODO: Remove if it works and is reliable. 
    // Check with ?forceUCI=1&pagetype=entityrecord&etn=contact&id=43ca6642-8cfe-eb11-b828-005056be3253
    
    // const xrm = Xrm as any;

    // if (isNullOrUndefined(xrm?.Internal?.isUci) == false)
    //     return xrm.Internal.isUci();
    // else
    //     return false;
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
export function getPageType() {
    const pageContext = Xrm.Utility.getPageContext();
    pageContext.input.pageType;
}

/**
 * Gets the name of the entity from the given control.
 * @param control 
 */
export function getEntityName(control: Control): string { 
    switch (getControlType(context)) {
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

export function getFormId(formContext: Xrm.FormContext): string | undefined {
    return formContext?.ui.formSelector.getCurrentItem()?.getId();
}
