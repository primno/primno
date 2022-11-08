// Entry point for D365

import "reflect-metadata";
import { InitializeOptions, Primno } from "./core/primno";
import { CanBePromise, EventTypes, Control } from "./typing";
import { isNullOrUndefined, notifyCriticalError } from "./utils";

let primno: Primno | undefined;
let initOptions: InitializeOptions;

function getPrimno(): Primno | undefined {
    if (isNullOrUndefined(primno)) {
        try {
            primno = new Primno(initOptions);
        }
        catch (except: any) {
            notifyCriticalError("Primno can't be started", except.message);
        }
    }

    return primno;
}

/**
 * Initialize Primno. Must be set before any event call.
 * @param options Initialize options
 */
export function initialize(options: InitializeOptions) {
    initOptions = options;
}

/**
 * Generic event handler.
 * @param eventTypeName 
 * @param controlName 
 * @param selectedControl 
 * @param args 
 * @returns 
 */
export function onEvent(
    eventTypeName: string,
    controlName: string | undefined,
    selectedControl: Control,
    primaryControl: Control | undefined,
    ...args: unknown[]
    ): CanBePromise<unknown> {
    return getPrimno()?.triggerEvent({type: eventTypeName, targetName: controlName}, selectedControl, primaryControl, ...args);
}

/**
 * onLoad event handler. Must be called by Dynamics 365 on form loading.
 * @param eventCtx 
 * @returns 
 */
export function onFormLoad(control: Xrm.Events.EventContext, ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.FormLoad, undefined, control, undefined, ...args);
}

/**
 * "OnButtonPress" event handler. Must be called by Dynamics 365 when a button on the command bar is pressed. 
 * @param buttonName 
 * @param selectedControl 
 * @param args 
 * @returns 
 */
// TODO: Rename to onCommandInvoke ?
export function onButtonPress(
    commandId: string,
    selectedControl: Control,
    primaryControl: Control,
    ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.ButtonPress, commandId, selectedControl, primaryControl,...args);
}

/**
 * "OnPopulateQuery" event handler. 
 * @param buttonName 
 * @param selectedControl 
 * @param args 
 * @returns 
 */
 export function onPopulateQuery(
    commandId: string,
    selectedControl: Control,
    primaryControl: Control,
    ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.PopulateQuery, commandId, selectedControl, primaryControl, ...args);
}

/**
 * "OnEnableRuleCheck" event handler. Must be called by Dynamics 365 when a js button enable rule is triggered. 
 * @param enableRuleName 
 * @param selectedControl 
 * @param args 
 * @returns 
 */
export function onEnableRuleCheck(
    enableRuleName: string,
    selectedControl: Control,
    primaryControl: Control,
    ...args: unknown[]
    ) : CanBePromise<boolean> {
    return onEvent(EventTypes.EnableRule, enableRuleName, selectedControl, primaryControl, ...args) as CanBePromise<boolean>;
}