import { Component } from "./component";
import { PageType } from "./scope";

/**
 * Power Apps arguments.
 * @category Event
 * @internal
 */
export interface ExternalArgs {
    selectedControl: Control;
    primaryControl: Control | undefined;
    args: unknown[];
}

/**
 * Event argument base interface.
 * @category Event
 */
export interface EventArg {
    /**
     * Event type. Eg: "FormLoad", "ColumnChange", etc.
     */
    type: string;

    /**
     * Extra arguments.
     */
    extraArgs: unknown[];
}

/**
 * Internal event handler called when a specific event is triggered.
 * @internal
 */
export type EventHandler = (targetName?: string, ...args: unknown[]) => unknown;

/**
 * Describes a type of event. 
 * Provides the generation of the event parameter (eventarg) and actions to be performed when subscribing to this event.
 * @category Event
 * @internal
 */
 export interface EventType {
    name: string;
    controlNameRequired: boolean;
    supportedPageType: PageType[];
    subscribable: boolean;
    
    /**
     * Create the event argument for this event type with the given Power Apps arguments.
     * @param extArgs Power Apps arguments
     */
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

/**
 * Event argument for a command bar event.
 * @category Event
 */
export interface CommandBarEventArg extends EventArg {
    selectedControl: Control;
}

/**
 * Event argument for the populate query event of a command bar.
 * @category Event
 */
export interface PopulateQueryEventArg extends CommandBarEventArg {
    commandProperties: any;
}

/**
 * Event argument for a form event.
 * @param TEventCtx Type of the event context.
 * @category Event
 */
export interface FormEventArg<TEventCtx extends Xrm.Events.EventContext = Xrm.Events.EventContext> extends EventArg {
    /**
     * Event context transmitted by Power Apps.
     */
    eventCtx: TEventCtx;

    /**
     * Form context of the form.
     * Obtained from the event context.
     */
    formCtx: Xrm.FormContext,
}

/**
 * Event argument for a save event.
 * @category Event
 */
export type SaveEventArg = FormEventArg<Xrm.Events.SaveEventContext>;

/**
 * Event argument for a process stage selected event.
 * @category Event
 */
export type StageSelectedEventArg = FormEventArg<Xrm.Events.StageSelectedEventContext>;

/**
 * Event argument for a process change event.
 * @category Event
 */
export type StageChangeEventArg = FormEventArg<Xrm.Events.StageChangeEventContext>;

/**
 * TODO: Explode and put in the event types.
 * @internal
 */
export enum EventTypes {
    FormLoad = "FormLoad",
    DataLoad = "DataLoad",
    Save = "Save",
    PostSave = "PostSave",
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
    GridSave = "GridSave",
    GridChange = "GridChange",
    OutputChange = "OutputChange",
    GridRecordSelect = "GridRecordSelect",
    PopulateQuery = "PopulateQuery"
}

/**
 * Minimalist definition of an event.
 * @internal
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
 * Registred in {@link EventRegister}
 * @internal
 */
export interface ComponentEvent extends Event {
    propertyName: string;
    component: Component;
}

/**
 * Power Apps control. Can be a form context, an event context or a grid control.
 * @category Event
 */
export type Control = Xrm.Events.EventContext | Xrm.FormContext | Xrm.Controls.GridControl;

/**
 * Type of Power Apps control.
 * @internal
 */
export enum ControlType { form = "form", grid = "grid" }
