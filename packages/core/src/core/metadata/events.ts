import { EventTypes } from "../../typing";
import { ValueOrConfigPropertyMapper } from "../../typing/component";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

/**
 * Event configuration.
 */
export interface EventConfig {
    target?: ValueOrConfigPropertyMapper<string>;
    type: EventTypes;
}

function makeEventDecorator(eventConfig: EventConfig) {
    return function (target: any, key: any, descriptor: PropertyDescriptor) {
        const primnoTarget = new MetadataDecoratorHelper(target, key);
        primnoTarget.setMetadata("event", eventConfig);
    }
}

/**
 * Decorator that marks a method as an event handler for command invoke event.
 * This event must be registered manually in Power Apps / D365.
 * Available for the record and list page.
 * You can use RibbanWorkbench to register this event or the CommandBarEditor of PowerApps.
 * 
 * @category Event
 * 
 * @example
 * ```ts
 * @MnComponent({
 *    scope: {
 *      pageType: PageType.record,
 *      entityName: "contact"
 * })
 * export class PhoneCallComponent {
 *   @MnOnCommandInvoke("call")
 *  onCall() {
 *   Xrm.Navigation.openUrl({ url: "tel:123456789" });
 * }
 * ```
 * 
 * :::note
 * This event must be registered manually in Power Apps / D365.
 * :::
 * @param commandName Name of the command or callback function that returns the name of the command from the component configuration.
 */
export function MnOnCommandInvoke(commandName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.CommandInvoke,
        target: commandName
    });
}

/**
 * Decorator that marks a method as an event handler for data load event.
 * This event is fired when the data is loaded.
 * Only available for the record page.
 * 
 * @category Event
 * @example Data Load
 * ```ts
 * @MnComponent({
 *   scope: {
 *    pageType: PageType.record,
 *   entityName: "account"
 * })
 * export class MyComponent {
 *  @MnOnDataLoad()
 * onDataLoad() {
 *  Xrm.Navigation.openAlertDialog({ text: "Data loaded" });
 * }
 * ```
 */
export function MnOnDataLoad() {
    return makeEventDecorator({
        type: EventTypes.DataLoad
    });
}

/**
 * Decorator that marks a method as an event handler for enable rule event.
 * This event is fired when the state of the associated command is checked by Power Apps.
 * Available for the record and list page.
 *
 * @param name Name of the enable rules or callback function that returns the name of the enable rule from the component configuration.
 * @category Event
 * @example Enable Rule
 * ```ts
 * @MnComponent({
 *  scope: {
 *   pageType: PageType.record,
 *  entityName: "contact"
 * })
 * export class PhoneCallComponent {
 *    @MnOnEnableRule("callEnableRules")
 *    canCall(eventArg: CommandBarEventArg) {
 *       return eventArg.selectedControl.getAttribute("telephone1").getValue() != null;
 *    }
 * }
 * :::note
 * This event must be registered manually in Power Apps / D365.
 * :::
 * ```
 */
export function MnOnEnableRule(name: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.EnableRule,
        target: name
    });
}

/**
 * Decorator that marks a method as an event handler for column change event.
 * This event is fired when the value of a column is changed.
 * Only available for the record page.
 * 
 * @param columnName Name of the column or callback function that returns the name of the column from the component configuration.
 * @category Event
 * @example Column Change
 * ```ts
 * @MnComponent({
 *  scope: {
 *     pageType: PageType.record,
 *     entityName: "contact"
 * })
 * export class MyComponent {
 *    @MnOnColumnChange("firstname")
 *    onFirstNameChange() {
 *       Xrm.Navigation.openAlertDialog({ text: "First name changed" });
 *    }
 * }
 * ```
 */
export function MnOnColumnChange(columnName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.ColumnChange,
        target: columnName
    });
}

/**
 * Decorator that marks a method as an event handler for form load event.
 * This event is fired when the form is loaded.
 * Only available for the record page.
 * 
 * @category Event
 * @example Form Load
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: PageType.record,
 *       entityName: "account"
 *   }
 * })
 * export class MyComponent {
 *    @MnOnFormLoad()
 *    onFormLoad() {
 *       Xrm.Navigation.openAlertDialog({ text: "Form loaded" });
 *    }
 * }
 * ```
 */
export function MnOnFormLoad() {
    return makeEventDecorator({ type: EventTypes.FormLoad });
}

/**
 * Decorator that marks a method as an event handler for grid load event.
 * This event is fired when a grid control is loaded.
 * Only available for the record page.
 * 
 * @category Event
 * @example Grid Load
 * ```ts
 * @MnComponent({
 *   scope: {
 *    pageType: PageType.record,
 *    entityName: "account"
 * })
 * export class MyComponent {
 *   @MnOnGridLoad()
 *   onGridLoad() {
 *      Xrm.Navigation.openAlertDialog({ text: "Grid loaded" });
 *   }
 * }
 * ```
 * @param controlName Name of the grid control or callback function that returns the name of the grid control from the component configuration.
 */
export function MnOnGridLoad(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({ type: EventTypes.GridLoad, target: controlName });
}

/**
 * @deprecated
 * */
export function MnOnIframeLoaded(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.IframeLoaded,
        target: controlName
    });
}

/**
 * Decorator that marks a method as an event handler for lookup tag click event.
 * This event is fired when a lookup tag is clicked.
 * Only available for the record page.
 * 
 * @category Event
 * @example Grid Load
 * ```ts
 * @MnComponent({
 *   scope: {
 *    pageType: PageType.record,
 *    entityName: "account"
 * })
 * export class MyComponent {
 *   @MnOnLookupTagClick()
 *   onLookupTagClick() {
 *     Xrm.Navigation.openAlertDialog({ text: "Lookup tag clicked" });
 *   }
 * }
 * ```
 * @param controlName Name of the lookup control or callback function that returns the name of the lookup control from the component configuration.
 */
export function MnOnLookupTagClick(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.LookupTagClick,
        target: controlName
    });
}

export function MnOnPopulateQuery(name: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.PopulateQuery,
        target: name
    });
}

export function MnOnPreProcessStatusChange() {
    return makeEventDecorator({
        type: EventTypes.PreProcessStatusChange
    });
}

export function MnOnPreSearch(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.PreSearch,
        target: controlName
    });
}

export function MnOnPreStageChange() {
    return makeEventDecorator({
        type: EventTypes.PreStageChange
    });
}

export function MnOnProcessStatusChange() {
    return makeEventDecorator({
        type: EventTypes.ProcessStatusChange
    });
}

export function MnOnSave() {
    return makeEventDecorator({
        type: EventTypes.Save
    });
}

export function MnOnStageChange() {
    return makeEventDecorator({
        type: EventTypes.StageChange
    });
}

export function MnOnStageSelected() {
    return makeEventDecorator({
        type: EventTypes.StageSelected
    });
}

export function MnOnTabState(tabName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.TabStateChange,
        target: tabName
    });
}
