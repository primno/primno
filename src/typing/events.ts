import { Component } from "./component";

export interface ExternalArgs {
    primaryArgument: PrimaryArgument;
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
 export interface EventType {
    name: string;
    controlNameRequired: boolean;
    // TODO: Rename to compatible control ?
    supportedControls: ControlType[];
    isUciRequired: boolean;
    
    createEventArg(extArgs: ExternalArgs): EventArg;

    subscribe(primaryControl: PrimaryArgument, controlName?: string): void;
    unsubscribe(primaryControl: PrimaryArgument, controlName?: string): void;

    init(callBack: EventCallBack): void;
}

// TODO: Move ?

// TODO: To Review
export interface MnEventArg extends EventArg {
    primaryControl: PrimaryArgument;
}

export interface CommandBarEventArg extends EventArg {
    selectedControl: PrimaryArgument;
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
    ButtonPress = "ButtonPress",
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
export interface MnEvent {
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
export interface ComponentEvent extends MnEvent {
    eventHandler: EventHandler;
    component: Component;
}

export type PrimaryArgument = Xrm.Events.EventContext | Xrm.Controls.GridControl;

export enum ControlType { form = "form", grid = "grid" }
