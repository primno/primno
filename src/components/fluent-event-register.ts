import {
    CommandBarEventArg,
    Component,
    ComponentEvent,
    EventHandler,
    EventTypes,
    FormEventArg,
    PopulateQueryEventArg,
    SaveEventArg,
    StageChangeEventArg
} from "../typing";

import { isNullOrEmpty } from "../utils";

//TODO: Rename ?
// TODO: Must be a merge of event type actions ? Mixins ?
/** Provides the tools allowing a Feature to record its events */
export class FluentEventRegister {
    private events: ComponentEvent[] = [];
    private component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    private addEvent(eventType: string, eventHandler: EventHandler, controlName?: string) {
        // TODO: Constraints should be applied from the definitions of event type.
        this.events.push({ component: this.component, eventHandler: eventHandler, type: eventType, targetName: controlName });
    }

    /**
     * 
     * @param eventHandler Registers the "enablerule" event handler.
     * @param ruleName 
     */
    public withOnEnableRule(eventHandler: EventHandler<CommandBarEventArg>, ruleName: string): FluentEventRegister {
        this.addEvent(EventTypes.EnableRule, eventHandler as EventHandler, ruleName);
        return this;
    }

    /**
     * Registers the "onload" event handler.
     * @param eventHandler
     */
    public withOnFormLoad(eventHandler: EventHandler<FormEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.FormLoad, eventHandler as EventHandler);
        return this;
    }

    /**
     * Registers the "ondataload" event handler.
     * @param eventHandler
     */
    public withOnDataLoad(eventHandler: EventHandler<FormEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.DataLoad, eventHandler as EventHandler);
        return this;
    }

    /**
     * Registers the "onfieldchange" event handler.
     * @param eventHandler
     */
    public withOnFieldChange(eventHandler: EventHandler<FormEventArg>, controlName: string): FluentEventRegister {
        if (isNullOrEmpty(controlName)) {
            throw new Error("Control name is required");
        }

        this.addEvent(EventTypes.FieldChange, eventHandler as EventHandler, controlName);

        return this;
    }

    /**
     * Registers the "onlookuptagclick" event handler.
     * @param eventHandler
     */
    public withOnLookupTagClick(eventHandler: EventHandler<FormEventArg>, controlName: string): FluentEventRegister {
        if (isNullOrEmpty(controlName)) {
            throw new Error("Control name is required");
        }

        this.addEvent(EventTypes.LookupTagClick, eventHandler as EventHandler, controlName);

        return this;
    }

    /**
     * Registers the "presearch" event handler.
     * @param eventHandler
     */
    public withOnPreSearch(eventHandler: EventHandler<FormEventArg>, controlName: string): FluentEventRegister {
        if (isNullOrEmpty(controlName)) {
            throw new Error("Control name is required");
        }

        this.addEvent(EventTypes.FieldChange, eventHandler as EventHandler, controlName);

        return this;
    }

    /**
     * Registers the "onsave" event handler.
     * @param eventHandler
     */
    public withOnSave(eventHandler: EventHandler<SaveEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.Save, eventHandler as EventHandler);

        return this;
    }

    /**
     * Registers the "onbuttonpressed" event handler.
     * @param eventHandler
     * @param buttonName
     */
    public withOnButtonPressed(eventHandler: EventHandler<CommandBarEventArg>, buttonName: string): FluentEventRegister {
        if (isNullOrEmpty(buttonName)) {
            throw new Error("Button name is required");
        }

        this.addEvent(EventTypes.ButtonPress, eventHandler as EventHandler, buttonName);
        return this;
    }

    /**
     *Registers the "onstagechange" event handler (BPF).
     * @param eventHandler
     */
    public withOnStageChange(eventHandler: EventHandler<StageChangeEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.StageChange, eventHandler as EventHandler);
        return this;
    }

    /**
     * Registers the "onprocessstatuschange" event handler (BPF).
     * @param eventHandler
     */
    public withOnProcessStatusChange(eventHandler: EventHandler<FormEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.ProcessStatusChange, eventHandler as EventHandler);
        return this;
    }

    /**
     * Registers the "onpreprocessstatuschange" event handler (BPF).
     * @param eventHandler
     */
    public withOnPreProcessStatusChange(eventHandler: EventHandler<FormEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.PreProcessStatusChange, eventHandler as EventHandler);
        return this;
    }

    /**
     * Registers the "onprestagechange" event handler (BPF).
     * @param eventHandler
     */
    public withOnPreStageChange(eventHandler: EventHandler<FormEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.PreStageChange, eventHandler as EventHandler);
        return this;
    }

    /**
     * Registers the "onstageselected" event handler (BPF).
     * @param eventHandler
     */
    public withOnStageSelected(eventHandler: EventHandler<FormEventArg>): FluentEventRegister {
        this.addEvent(EventTypes.StageSelected, eventHandler as EventHandler);
        return this;
    }

    /**
     * Registers the "ontabstatechange" event handler.
     * @param eventHandler
     */
    public withOnTabStateChange(eventHandler: EventHandler<FormEventArg>, controlName: string): FluentEventRegister {
        if (isNullOrEmpty(controlName)) {
            throw new Error("Control name is required");
        }

        this.addEvent(EventTypes.TabStateChange, eventHandler as EventHandler, controlName);
        return this;
    }

    /**
     * Registers the "oniframeloaded" event handler.
     * @param eventHandler
     */
    public withOnIframeLoaded(eventHandler: EventHandler<FormEventArg>, controlName: string): FluentEventRegister {
        if (isNullOrEmpty(controlName)) {
            throw new Error("Control name is required");
        }

        this.addEvent(EventTypes.IframeLoaded, eventHandler as EventHandler, controlName);
        return this;
    }

    /**
     * Registers the "ongridload" event handler.
     * @param eventHandler
     */
    public withOnGridLoad(eventHandler: EventHandler<FormEventArg>, controlName: string): FluentEventRegister {
        if (isNullOrEmpty(controlName)) {
            throw new Error("Control name is required");
        }

        this.addEvent(EventTypes.GridLoad, eventHandler as EventHandler, controlName);
        return this;
    }

    /**
     * * Registers the "onpopulatequery" event handler.
     * @param eventHandler
     */
    public withOnPopulateQuery(eventHandler: EventHandler<PopulateQueryEventArg>, controlName: string): FluentEventRegister {
        if (isNullOrEmpty(controlName)) {
            throw new Error("Control name is required");
        }

        this.addEvent(EventTypes.PopulateQuery, eventHandler as EventHandler, controlName);
        return this;
    }

    /** Get the list of registered events  */
    public getEvents(): ComponentEvent[] {
        return this.events;
    }
}