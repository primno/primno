// Entry point for D365

import "reflect-metadata";
import { InitializeOptions, Primno } from "./core/primno";
import { CanBePromise, EventTypes, Control } from "./typing";
import { notifyCriticalError } from "./utils";

let primno: Primno | undefined;
let initOptions: InitializeOptions;

function getPrimno(): Primno | undefined {
    if (primno == null) {
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
    return getPrimno()
        ?.triggerEvent(
            {
                type: eventTypeName,
                targetName: controlName
            },
            selectedControl,
            primaryControl ?? selectedControl,
            ...args
        );
}

/**
 * onLoad event handler. Must be called by Dynamics 365 on form loading.
 * @param eventCtx 
 * @returns 
 */
// TODO: Handler must be added by EventType
export function onFormLoad(control: Xrm.Events.EventContext, ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.FormLoad, undefined, control, control, ...args);
}

/**
 * "onCommandInvoke" event handler. Must be called by Dynamics 365 when a button on the command bar is pressed. 
 * @param commandId Command name
 * @param selectedControl Selected control
 * @param primaryControl Primary control
 * @param args Optionnal args
 * @returns 
 */
export function onCommandInvoke(
    commandId: string,
    selectedControl: Control,
    primaryControl: Control,
    ...args: unknown[]): CanBePromise<unknown> {
    return onEvent(EventTypes.ButtonPress, commandId, selectedControl, primaryControl, ...args);
}

/**
 * "onPopulateQuery" event handler. 
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
 * "onEnableRuleCheck" event handler. Must be called by Dynamics 365 when a js button enable rule is triggered. 
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
): CanBePromise<boolean> {
    return onEvent(EventTypes.EnableRule, enableRuleName, selectedControl, primaryControl, ...args) as CanBePromise<boolean>;
}