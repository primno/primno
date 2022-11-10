import { ComponentObject } from "./component";

export interface ExternalArgs {
    selectedControl: Control;
    primaryControl: Control | undefined;
    args: unknown[];
}

export interface EventArg {
    type: string;
}

export type EventHandler<TEventArg extends EventArg = EventArg> = (event: TEventArg) => unknown;

/**
 * Callback called when a specific event is trigger.
 */
export type EventCallBack = (targetName?: string, ...args: unknown[]) => unknown;

/**
 * Describes a type of event. 
 * Provides the generation of the event parameter (eventarg) and actions to be performed when subscribing to this event.
 */
// TODO: Replace with abstract class with callback in constructor and remove init method ?
 export interface EventType {
    name: string;
    controlNameRequired: boolean;
    // TODO: Rename to compatible control ?
    supportedControls: ControlType[];
    
    createEventArg(extArgs: ExternalArgs): EventArg;

    subscribe(selectedControl: Control, controlName?: string): void;
    unsubscribe(selectedControl: Control, controlName?: string): void;

    init(callBack: EventCallBack): void;
}

// TODO: Move ?

// TODO: To Review
export interface MnEventArg extends EventArg {
    selectedControl: Control;
}

export interface CommandBarEventArg extends EventArg {
    selectedControl: Control;
    extraArgs: unknown[];
}

export interface PopulateQueryEventArg extends CommandBarEventArg {
    commandProperties: any;
}

export interface FormEventArg<TEventCtx extends Xrm.Events.EventContext = Xrm.Events.EventContext> extends EventArg {
    eventCtx: TEventCtx;
    formCtx: Xrm.FormContext,
}

export type SaveEventArg = FormEventArg<Xrm.Events.SaveEventContext>;
export type StageSelectedEventArg = FormEventArg<Xrm.Events.StageSelectedEventContext>;
export type StageChangeEventArg = FormEventArg<Xrm.Events.StageChangeEventContext>;

// TODO: Explode and put in the event types.
export enum EventTypes {
    FormLoad = "FormLoad",
    DataLoad = "DataLoad",
    Save = "Save",
    FieldChange = "FieldChange",
    LookupTagClick = "LookupTagClick",
    TabStateChange = "TabStateChange",
    PreSearch = "PreSearch",
    CommandInvoke = "CommandInvoke",
    StageChange = "StageChange",
    PreStageChange = "PreStageChange",
    ProcessStatusChange = "ProcessStatusChange",
    PreProcessStatusChange = "PreProcessStatusChange",
    StageSelected = "StageSelected",
    IframeLoaded = "IframeLoaded",
    EnableRule = "EnableRule",
    GridLoad = "GridLoad",
    PopulateQuery = "PopulateQuery"
}

/**
 * Minimalist definition of an event.
 */
export interface Event {
    /**
     * Event type
     */
    type: string;
    /**
     * Event targer. Optional.
     */
    targetName?: string;
}

/**
 * Event to register
 */
export interface ComponentEvent extends Event {
    propertyName: string;
    component: ComponentObject;
}

export type Control = Xrm.Events.EventContext | Xrm.FormContext | Xrm.Controls.GridControl;

export enum ControlType { form = "form", grid = "grid" }
