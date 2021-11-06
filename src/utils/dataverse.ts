import { ControlType, PrimaryArgument } from "../typing";
import { isNullOrUndefined } from "./common";

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
    if (isNullOrUndefined(context?.getGrid) === false){
        return ControlType.grid;
    }

    if (isNullOrUndefined(context?.getAttribute) === false || isNullOrUndefined(context?.getFormContext) == false) {
        return ControlType.form;
    }
}

/**
 * Gets the id of the application.
 * @returns 
 */
export function getAppId(): string {
    const appUrl = Xrm.Utility.getGlobalContext().getCurrentAppUrl();
    return appUrl.split("?")[1].split("=")[1];
}

/**
 * Gets the name of the entity from the given context.
 * @param context 
 */
export function getEntityName(context: PrimaryArgument): string {
    // Only available in uci ? 9.1 ?
    const pageContext = Xrm.Utility.getPageContext();
    return pageContext.input.entityName;

    // TODO: Remove if it works.
    // switch (getControlType(context)) {
    //     case "form": {
    //         const formCtx = getFormContext(context as Xrm.Events.EventContext);
    //         if (formCtx == null) {
    //             throw new Error("Unable to find form context");
    //         }

    //         return formCtx.data.entity.getEntityName();
    //     }
    //     case "grid": {
    //         return (<Xrm.Controls.GridControl>context).getEntityName();
    //     }
    //     default: throw new Error("Unable to get entity name from context. The context must be form or grid");
    // }
}

/**
* Gets the context of the form from the given event.
* Returns null if the form context is not found.
* @param eventCtx
*/
export function getFormContext(eventCtx: Xrm.Events.EventContext): Xrm.FormContext | null {
    if (isNullOrUndefined(eventCtx)){
        return null;
    }

    if (isNullOrUndefined(eventCtx.getFormContext) == false) {
        return eventCtx.getFormContext();
    }
    else {
        if (isNullOrUndefined((eventCtx as any).getAttribute) == false &&
            isNullOrUndefined((eventCtx as any).getControl) == false) {
            return (<unknown>eventCtx) as Xrm.FormContext;
        }
    }

    return null;
}

export function getFormId(formContext: Xrm.FormContext): string | undefined {
    return formContext?.ui.formSelector.getCurrentItem()?.getId();
}
