// Entry point for D365

import { Primno } from "./core/primno";
import { Configuration } from "./core/configuration";
import { CanBePromise, EventTypes, PrimaryArgument } from "./typing";
import { isNullOrUndefined, notifyCriticalError } from "./utils";

let primno: Primno | undefined;
let config: Configuration;

function getPrimno(): Primno | undefined {
    if (isNullOrUndefined(primno)) {
        try {
            primno = new Primno(config);
        }
        catch (except: any) {
            notifyCriticalError("Primno can't be started", except.message);
        }
    }

    return primno;
}

//TODO: Initialize instead ?
/**
 * Define the Primno configuration. Must be set before any event call.
 * @param cfg Primno configuration
 */
export function setConfig(cfg: Configuration) {
    config = cfg;
}

/**
 * Generic event handler.
 * @param eventTypeName 
 * @param controlName 
 * @param primaryControl 
 * @param args 
 * @returns 
 */
export function onEvent(eventTypeName: string, controlName: string | undefined, primaryControl: PrimaryArgument, ...args: unknown[]): CanBePromise<unknown> {
    return getPrimno()?.triggerEvent({type: eventTypeName, targetName: controlName}, primaryControl, ...args);
}

/**
 * onLoad event handler. Must be called by Dynamics 365 on form loading.
 * @param eventCtx 
 * @returns 
 */
export function onFormLoad(control: Xrm.Events.EventContext, ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.FormLoad, undefined, control, ...args);
}

/**
 * "OnButtonPress" event handler. Must be called by Dynamics 365 when a button on the command bar is pressed. 
 * @param buttonName 
 * @param control 
 * @param args 
 * @returns 
 */
// TODO: Renommer en onCommandInvoke ou similaire
export function onButtonPress(
    commandId: string,
    control: PrimaryArgument,
    ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.ButtonPress, commandId, control, ...args);
}

/**
 * "OnPopulateQuery" event handler. 
 * @param buttonName 
 * @param control 
 * @param args 
 * @returns 
 */
 export function onPopulateQuery(
    commandId: string,
    control: PrimaryArgument,
    ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.PopulateQuery, commandId, control, ...args);
}

/**
 * "OnEnableRuleCheck" event handler. Must be called by Dynamics 365 when a js button enable rule is triggered. 
 * @param enableRuleName 
 * @param control 
 * @param args 
 * @returns 
 */
export function onEnableRuleCheck(
    enableRuleName: string,
    control: PrimaryArgument,
    ...args: unknown[]
    ) : CanBePromise<boolean> {
        // TODO: Can now works in legacy form after primno init if refreshCommandBar is called
    // Works only in Uci because this method must be async and this is not supported in legacy form.
    // Source of this action can't be determinated by commandProperties, because he is null on legacy form.
    return onEvent(EventTypes.EnableRule, enableRuleName, control, ...args) as CanBePromise<boolean>;
}