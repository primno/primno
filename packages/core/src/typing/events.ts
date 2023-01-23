import { Component } from "./component";
import { PageType } from "./scope";

export interface ExternalArgs {
    selectedControl: Control;
    primaryControl: Control | undefined;
    args: unknown[];
}

export interface EventArg {
    type: string;
}

//export type EventHandler<TEventArg extends EventArg = EventArg> = (event: TEventArg) => unknown;

/**
 * Internal event handler called when a specific event is triggered.
 */
export type EventHandler = (targetName?: string, ...args: unknown[]) => unknown;

/**
 * Describes a type of event. 
 * Provides the generation of the event parameter (eventarg) and actions to be performed when subscribing to this event.
 */
 export interface EventType {
    name: string;
    controlNameRequired: boolean;
    supportedPageType: PageType[];
    subscribable: boolean;
    
    createEventArg(extArgs: ExternalArgs): EventArg;

    /**
     * Subscribe at runtime to D365 event.
     * This method will be called only if subscribable is set to true.
     * @param selectedControl Control
     * @param controlName Target name
     */
    subscribe(selectedControl: Control, controlName?: string): void;
    /**
     * Unsubscribe at runtime to D365 event.
     * This method will be called only if subscribable is set to true.
     * @param selectedControl Control
     * @param controlName Target name
     */
    unsubscribe(selectedControl: Control, controlName?: string): void;

    /**
     * Defines the event handler that should be called when the event occurs.
     * This method will be called only if subscribable is set to true.
     * @param eventHandler Callback to Primno
     */
    init(eventHandler: EventHandler): void;

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
    ColumnChange = "ColumnChange",
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
 * Event targeting an event handler of a component.
 * Registred in EventRegister.
 */
export interface ComponentEvent extends Event {
    propertyName: string;
    component: Component;
}

export type Control = Xrm.Events.EventContext | Xrm.FormContext | Xrm.Controls.GridControl;

export enum ControlType { form = "form", grid = "grid" }
