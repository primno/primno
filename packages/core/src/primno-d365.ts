/**
 * Entry point for Power Apps / D365.
 * Contains the framework.
 */

import "reflect-metadata";
import { InitializeOptions, Primno } from "./core/primno";
import { CanBePromise, EventTypes, Control } from "./typing";
import { isUci, notifyCriticalError } from "./utils";

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
    if (!isUci()) {
        notifyCriticalError("Primno can only be used in UCI");
        return;
    }

    return getPrimno()
        ?.triggerEvent(
            {
                type: eventTypeName,
                targetName: controlName
            },
            selectedControl,
            primaryControl,
            ...args
        );
}

/**
 * Generic form event handler.
 * @param control Primary control
 * @param eventTypeName Event type name
 * @param targetName Target name. If undefined, the event is not related to a target/control.
 * @param args Optional args
 */
export function onFormEvent(
    control: Xrm.Events.EventContext,
    eventTypeName: string,
    targetName: string | undefined,
    ...args: unknown[]
): CanBePromise<unknown> {
    return onEvent(eventTypeName, targetName, control, control, ...args);
}

/**
 * Generic command event handler.
 * @param selectedControl Selected control
 * @param primaryControl Primary control
 * @param eventTypeName Event type name
 * @param targetName Target name
 * @param args Optional args
 */
export function onCommandEvent(
    selectedControl: Control,
    primaryControl: Control,
    eventTypeName: string,
    targetName: string,
    ...args: unknown[]
): CanBePromise<unknown> {
    return onEvent(eventTypeName, targetName, selectedControl, primaryControl, ...args);
}

/* Form events */

/**
 * "onFormLoad" event handler. Must be called by Dynamics 365 on form loading.
 * @param control Primary control
 * @param args Optional args
 */
// TODO: External function must be added by EventType
export function onFormLoad(control: Xrm.Events.EventContext, ...args: unknown[]): CanBePromise<unknown> {
    return onFormEvent(control, EventTypes.FormLoad, undefined, ...args);
}

/**
 * "onGridSave" event handler.
 * @param control Primary control
 * @param targetName Target name
 * @param args Optional args
 */
export function onGridSave(control: Xrm.Events.EventContext, targetName: string, ...args: unknown[]): CanBePromise<unknown> {
    return onFormEvent(control, EventTypes.GridSave, targetName, ...args);
}

/**
 * "onGridRecordSelect" event handler.
 * @param control Primary control
 * @param targetName Target name
 * @param args Optional args
 */
export function onGridRecordSelect(control: Xrm.Events.EventContext, targetName: string, ...args: unknown[]): CanBePromise<unknown> {
    return onFormEvent(control, EventTypes.GridRecordSelect, targetName, ...args);
}

/**
 * "onGridChange" event handler.
 * @param control Primary control
 * @param targetName Target name
 * @param args Optional args
 */
export function onGridChange(control: Xrm.Events.EventContext, targetName: string, ...args: unknown[]): CanBePromise<unknown> {
    return onFormEvent(control, EventTypes.GridChange, targetName, ...args);
}

/* Command events */

/**
 * "onCommandInvoke" event handler. Must be called by Dynamics 365 when a button on the command bar is pressed. 
 * @param commandId Command name
 * @param selectedControl Selected control
 * @param primaryControl Primary control
 * @param args Optional args
 */
export function onCommandInvoke(
    selectedControl: Control,
    primaryControl: Control,
    commandId: string,
    ...args: unknown[]): CanBePromise<unknown> {
    return onCommandEvent(selectedControl, primaryControl, EventTypes.CommandInvoke, commandId, ...args);
}

/**
 * "onPopulateQuery" event handler. 
 * @param commandId Command name
 * @param selectedControl Selected control
 * @param primaryControl Primary control
 * @param args Optional args
 */
export function onPopulateQuery(
    selectedControl: Control,
    primaryControl: Control,
    commandId: string,
    ...args: unknown[]): CanBePromise<unknown> {
    return onCommandEvent(selectedControl, primaryControl, EventTypes.PopulateQuery, commandId, ...args);
}

/**
 * "onEnableRule" event handler. Must be called by Dynamics 365 when a js button enable rule is triggered. 
 * @param enableRuleName Enable rule name
 * @param selectedControl Selected control
 * @param primaryControl Primary control
 * @param args Optional args
 * @returns true if the rule is enabled, false otherwise
 */
export function onEnableRule(
    selectedControl: Control,
    primaryControl: Control,
    enableRuleName: string,
    ...args: unknown[]
): CanBePromise<boolean> {
    return onCommandEvent(selectedControl, primaryControl, EventTypes.EnableRule, enableRuleName, ...args) as CanBePromise<boolean>;
}