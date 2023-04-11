import { EventTypes } from "../../typing";
import { ValueOrConfigPropertyMapper } from "../../typing/component";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";
import { MetadataKeys } from "./key";

/**
 * Event configuration.
 * @category Event
 * @internal
 */
export interface EventConfig {
    target?: ValueOrConfigPropertyMapper<string>;
    type: EventTypes;
}

/**
 * Make a property decorator for an event.
 * @param eventConfig 
 * @returns 
 */
function makeEventDecorator(eventConfig: EventConfig) {
    return function (target: any, key: any, descriptor: PropertyDescriptor) {
        const helper = new MetadataDecoratorHelper(target, key);
        const events = [
            ...helper.getMetadata(MetadataKeys.events) ?? [],
            eventConfig
        ];
        helper.setMetadata(MetadataKeys.events, events);
    }
}

/**
 * Decorator that marks a method as an event handler for command invoke event.
 * 
 * This event is fired when a command is executed by pressing a button or selecting an option from the command bar.
 * 
 * @remarks
 * Available on pages: Record and list.
 * 
 * Registration: Manual registration only.
 * You can use `Ribbon Workbench` to register this event or the Command Bar Editor of Power Apps.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/define-ribbon-commands)
 * 
 * @category Event
 * 
 * @example Call a phone number when `call` command is invoked on a contact record.
 * ```ts
 * @MnComponent({
 *    scope: {
 *      pageType: "record",
 *      table: "contact"
 *    }
 * })
 * export class PhoneCallComponent {
 *   @MnOnCommandInvoke("call")
 *  onCall() {
 *   Xrm.Navigation.openUrl({ url: "tel:123456789" });
 * }
 * ```
 * @param commandName Name of the command or
 * callback function that returns the name of the command from the component configuration.
 */
export function MnOnCommandInvoke(commandName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.CommandInvoke,
        target: commandName
    });
}

/**
 * Decorator that marks a method as an event handler for data load event.
 * 
 * This event is fired :
 * - On initial load of the form.
 * - When `refresh()` method is called.
 * - When the user clicks the `Refresh` button on the form.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/events/form-data-onload)
 * 
 * @category Event
 * @example Data Load
 * ```ts
 * @MnComponent({
 *   scope: {
 *      pageType: "record",
 *      table: "account"
 *    }
 * })
 * export class MyComponent {
 *    @MnOnDataLoad()
 *    onDataLoad() {
 *       Xrm.Navigation.openAlertDialog({ text: "Data loaded" });
 *    }
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
 * 
 * This event is fired when the state of the associated command is checked by Power Apps.
 * 
 * @remarks
 * Available on pages: Record and list.
 * 
 * Registration: Manual registration only. 
 * You can use `Ribbon Workbench` to register this event or the Command Bar Editor of Power Apps.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/define-ribbon-enable-rules)
 *
 * @param name Name of the enable rules or callback function that returns the name of the enable rule from the component configuration.
 * @category Event
 * @example Enable phone call button when the contact has a phone number.
 * ```ts
 * @MnComponent({
 *  scope: {
 *   pageType: "record",
 *   table: "contact"
 * })
 * export class EnablePhoneCallButtonComponent {
 *    @MnOnEnableRule("phoneCallEnableRule")
 *    canCall(eventArg: CommandBarEventArg) {
 *       const formCtx = eventArg.selectedControl as Xrm.FormContext;
 *       return formCtx.getAttribute("telephone1").getValue() != null;
 *    }
 * 
 *    // Refresh the command bar when the phone number is changed.
 *    @MnOnColumnChange("telephone1")
 *    onPhoneChange(eventArg: FormEventArg) {
 *       eventArg.formCtx.ui.refreshRibbon();
 *    }
 * }
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
 * 
 * This event is fired when the value of a column is changed.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/attribute-onchange)
 * 
 * @param columnName Name of the column or callback function that returns the name of the column from the component configuration.
 * @category Event
 * @example Notify the change of a first name of a contact
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "contact"
 *    }
 * })
 * export class FirstNameChangeomponent {
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
 * 
 * This event is fired when the form is loaded.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Manual registration only.
 * Register this event in the `Form Properties` of the form editor.
 * 
 * This event must be registered to initialize Primno on a record page.
 * 
 * For more information, see [Microsoft Client API Reference](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/events/form-onload)
 * 
 * @category Event
 * @example Form Load
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
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
 * 
 * This event is fired when a grid control is refreshed including when the user sort the values of a column.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/subgrid-onload)
 * 
 * @category Event
 * @example Notify that the grid named "mysubgrid" is loaded
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class NotifyGridLoadedComponent {
 *   @MnOnGridLoad("mysubgrid")
 *   onGridLoad(eventArg: FormEventArg) {
 *      eventArg.formCtx.ui.setFormNotification("Grid loaded", "INFO", "gridLoaded");
 *   }
 * }
 * ```
 * @param controlName Name of the grid control or callback function that returns the name of the grid control from the component configuration.
 */
export function MnOnGridLoad(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({ type: EventTypes.GridLoad, target: controlName });
}

/**
 * Decorator that marks a method as an event handler for grid save event.
 * 
 * This event is fired when a grid control is saved.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Manual registration only.
 * Register `onGridSave` with the name of the grid control as first additional parameter.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/grid-onsave)
 * 
 * @category Event
 * @example Show columns changed in a contact sub-grid of an account record
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class ShowChangedColumnComponent {
 *    @MnOnGridSave("subgrid_contacts")
 *    onGridLoad(eventArg: FormEventArg) {
 *       const attributesChanged = eventArg.formCtx.data.entity.attributes.get()
 *          .filter(attr => attr.getIsDirty())
 *          .map(attr => attr.getName());
 * 
 *       eventArg.formCtx.ui.setFormNotification(`Grid saved. Columns changed: ${attributesChanged.join(", ")}`, "INFO", "gridSaved");
 *    }
 * }
 * ```
 * @param controlName Name of the grid control or callback function that returns the name of the grid control from the component configuration.
 */
export function MnOnGridSave(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({ type: EventTypes.GridSave, target: controlName });
}

/**
 * Decorator that marks a method as an event handler for grid record select event.
 * 
 * This event is fired when one grid row is selected in a editable grid. It is not fired when the users select multiple rows.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Manual registration only.
 * Register `onGridRecordSelect` with the name of the grid control as first additional parameter.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/grid-onrecordselect)
 * 
 * @category Event
 * @example Show the phone number of the selected contact in a sub-grid of an account form
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class MyComponent {
 *    @MnOnGridRecordSelect("subgrid_contacts")
 *    onGridRecordSelect(eventArg: FormEventArg) {
 *       const telephoneAttr = eventArg.formCtx.data.entity.attributes.get("telephone1");
 *       const telephone = telephoneAttr.getValue();
 *       Xrm.Navigation.openAlertDialog({ text: `Selected telephone number: ${telephone}` });
 *    }
 * }
 * ```
 * @param controlName Name of the grid control or callback function that returns the name of the grid control from the component configuration.
 */
export function MnOnGridRecordSelect(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({ type: EventTypes.GridRecordSelect, target: controlName });
}

/**
 * Decorator that marks a method as an event handler for grid change event.
 * 
 * This event is fired when a cell in an editable grid control is changed.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Manual registration only.
 * Register `onGridChange` with the name of the grid control as first additional parameter.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/grid-onchange)
 * 
 * @category Event
 * @example Show the changed cell in a contact sub-grid of an account form
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class ShowChangedCellComponent {
 *    @MnOnGridChange("subgrid_contacts")
 *    onGridChange(eventArg: FormEventArg) {
 *       const cellChanged = eventArg.formCtx.data.entity.attributes.get()
 *          .find(attr => attr.getIsDirty());
 * 
 *       eventArg.formCtx.ui.setFormNotification(`Cell value changed. Column changed: ${cellChanged?.getName()}`, "INFO", "gridChanged");
 *    }
* }
 * ```
 * @param controlName Name of the grid control or callback function that returns the name of the grid control from the component configuration.
 */
export function MnOnGridChange(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({ type: EventTypes.GridChange, target: controlName });
}

/**
 * Decorator that marks a method as an event handler for an output change event.
 * 
 * This event is fired when the output value of a control is changed. Call `getOutputs()` on the control to get the output value.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Manual registration only.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/onoutputchange)
 * 
 * @category Event
 * @example Show the output value of a control
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class ShowOutputValueComponent {
 *    @MnOnOutputChange("myControl")
 *    onOutputChange(eventArg: FormEventArg) {
 *       const control = eventArg.formCtx.getControl("myControl");
 *       const outputValue = control.getOutputs();
 *       Xrm.Navigation.openAlertDialog({ text: `Output value changed: ${JSON.stringify(outputValue)}` });
 *    }
 * }
 * ```
  * @param controlName Name of the control or callback function that returns the name of the control from the component configuration.
 */
export function MnOnOutputChange(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({ type: EventTypes.OutputChange, target: controlName });
}

/**
 * @deprecated Use getContentWindow() on a iframe control instead.
 * @ignore
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
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/onlookuptagclick)
 * 
 * @category Event
 * @example Prevent save if the tag name of the primary contact starts with A
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class PreventSaveOfContactStartingWithAComponent {
 *   @MnOnLookupTagClick("primarycontactid")
 *   onLookupTagClick(eventArg: FormEventArg) {
 *      const args = eventArg.eventCtx.getEventArgs();
 *      // Prevent save if the tag name starts with A
 *      if (args.getTagValue()?.name?.startWith("A") {
 *         args.preventDefault();
 *      }
 *   }
 * }
 * ```
 * @param controlName Name of the lookup control or
 * callback function that returns the name of the lookup control from the component configuration.
 */
export function MnOnLookupTagClick(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.LookupTagClick,
        target: controlName
    });
}

/**
 * Decorator that marks a method as an event handler for populate query event.
 * 
 * This event is fired when a command bar menu need to be populated with its commands.
 * 
 * @remarks
 * Available on pages: Record and List.
 * 
 * Registration: Manual registration only.
 * You can use `Ribbon Workbench` to register this event or the Command Bar Editor of Power Apps.
 * 
 * @param name Name of the command bar menu or
 * callback function that returns the name of the command bar menu from the component configuration.
 * @category Event
 */
export function MnOnPopulateQuery(name: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.PopulateQuery,
        target: name
    });
}

/**
 * Decorator that marks a method as an event handler for pre-process status change event.
 * 
 * This event is fired when before the Business Process Flow status is changed.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/onpreprocessstatuschange)
 * @example Confirm business process flow termination
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "opportunity"
 *    }
 * })
 * export class ConfirmBPFTerminationComponent {
 *    @MnOnPreProcessStatusChange()
 *    async onPreProcessStatusChange(eventArg: FormEventArg) {
 *       const args = eventArg.eventCtx.getEventArgs();
 *       const result = await Xrm.Navigation.openConfirmDialog({
 *          text: "Are you sure you want to terminate the business process flow?"
 *       });
 *       if (!result.confirmed) {
 *          args.preventDefault();
 *       }
 *    }
 * }
 * ```
 * @category Event
 */
export function MnOnPreProcessStatusChange() {
    return makeEventDecorator({
        type: EventTypes.PreProcessStatusChange
    });
}

/**
 * Decorator that marks a method as an event handler for pre-search event.
 * 
 * This event is fired when a lookup column search is executed.
 * It allows to modify the search query by adding filters.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/presearch)
 * 
 * @example Filter a multi-lookup of type `customer` (specific D365 lookup type)
 * to only allow accounts and disable the search of contacts.
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record"
 *    }
 * })
 * export class AccountOnlyInCustomerLookupComponent {
 *    @MnInput()
 *    input: {
 *       customerLookup: string;
 *    }
 * 
 *    @MnConfig(i => i)
 *    config: {
 *      customerLookup: string
 *    }
 * 
 *    @MnOnPreSearch(c => c.config.customerLookup)
 *    disallowContactSearch(eventArg: FormEventArg) {
 *       const customerCtrl = eventArg.formCtx.getControl<Xrm.Controls.LookupControl>('customer');
 *       customerCtrl.addCustomFilter('<filter type="and"><condition attribute="contactid" operator="null"/></filter>', 'contact');
 *    }
 * }
 * ```
 * @param controlName Name of the lookup control or
 * callback function that returns the name of the lookup control from the component configuration.
 * @category Event
 */
export function MnOnPreSearch(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.PreSearch,
        target: controlName
    });
}

/**
 * Decorator that marks a method as an event handler for pre-stage change event.
 * 
 * This event is fired before the stage of a business process flow changed.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/onprestagechange)
 * 
 * @example Confirm business process flow stage change
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "opportunity"
 *    }
 * })
 * export class ConfirmBPFStageChangeComponent {
 *    @MnOnPreStageChange()
 *    async onPreStageChange(eventArg: FormEventArg) {
 *       const args = eventArg.eventCtx.getEventArgs();
 *       const result = await Xrm.Navigation.openConfirmDialog({
 *          text: "Are you sure you want to change the business process flow stage?"
 *       });
 *       if (!result.confirmed) {
 *          args.preventDefault();
 *       }
 *    }
 * }
 * ```
 * @category Event
 */
export function MnOnPreStageChange() {
    return makeEventDecorator({
        type: EventTypes.PreStageChange
    });
}

/**
 * Decorator that marks a method as an event handler for process status change event.
 * 
 * This event is fired when the business process flow status changed:
 * - when it is started
 * - when it is terminated
 * - when it is reactivated
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/onprocessstatuschange)
 * 
 * @example Notify on form that the business process flow status changed
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "opportunity"
 *    }
 * })
 * export class NotifyOnBPFStatusChangeComponent {
 *    @MnOnProcessStatusChange()
 *    onProcessStatusChange(eventArg: FormEventArg) {
 *       eventArg.formCtx.ui.setFormNotification("Business process flow status changed", "INFO", "BPFStatusChange");
 *    }
 * }
 * ```
 * @category Event
 */
export function MnOnProcessStatusChange() {
    return makeEventDecorator({
        type: EventTypes.ProcessStatusChange
    });
}

/**
 * Decorator that marks a method as an event handler for save event.
 * 
 * This event is fired when:
 * - The user clicks the save button.
 * - save() method is called.
 * - Auto save is triggered.
 * - refresh(true) method is called.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/form-onsave)
 * 
 * @example Prevent auto save
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class PreventAutoSaveComponent {
 *    @MnOnSave()
 *    onSave(eventArg: FormEventArg) {
 *       const args = eventArg.eventCtx.getEventArgs();
 *       if (args.getSaveMode() === XrmEnum.SaveMode.AutoSave) {
 *          args.preventDefault();
 *       }
 *    }
 * }
 * ```
 * @category Event
 */
export function MnOnSave() {
    return makeEventDecorator({
        type: EventTypes.Save
    });
}

/**
 * Decorator that marks a method as an event handler for post save event.
 * 
 * This event is fired after the save event.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/postsave)
 * 
 * @example Notify that the record was saved
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "account"
 *    }
 * })
 * export class NotifySavedComponent {
 *    @MnOnPostSave()
 *    onPostSave(eventArg: FormEventArg) {
 *       eventArg.formCtx.ui.setFormNotification("Record saved", "INFO", "RecordSaved");
 *    }
 * }
 * ```
 * @category Event
 */
export function MnOnPostSave() {
    return makeEventDecorator({
        type: EventTypes.PostSave
    });
}

/**
 * Decorator that marks a method as an event handler for stage changed.
 * 
 * This event is fired when the stage of a business process flow changed.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/onstagechange)
 * 
 * @example Notify on form that the business process flow stage changed
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "opportunity"
 *    }
 * })
 * export class NotifyOnBPFStageChangeComponent {
 *    @MnOnStageChange()
 *    onStageChange(eventArg: FormEventArg) {
 *       eventArg.formCtx.ui.setFormNotification("Business process flow stage changed", "INFO", "BPFStageChange");
 *    }
 * }
 * ```
 * @category Event
 */
export function MnOnStageChange() {
    return makeEventDecorator({
        type: EventTypes.StageChange
    });
}

/**
 * Decorator that marks a method as an event handler for stage selected.
 * 
 * This event is fired when the stage of a business process flow is selected.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/onstageselected)
 * @example Notify on form that the business process flow stage is selected
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "opportunity"
 *    }
 * })
 * export class NotifyOnBPFStageSelectedComponent {
 *    @MnOnStageSelected()
 *    onStageSelected(eventArg: FormEventArg) {
 *       eventArg.formCtx.ui.setFormNotification("Business process flow stage selected", "INFO", "BPFStageSelected");
 *   }
 * }
 * ```
 * @category Event
 */
export function MnOnStageSelected() {
    return makeEventDecorator({
        type: EventTypes.StageSelected
    });
}

/**
 * Decorator that marks a method as an event handler for tab state change event.
 * 
 * This event is fired when the tab state changed.
 * 
 * @remarks
 * Available on pages: Record only.
 * 
 * Registration: Automatic registration at runtime.
 * 
 * For more information, see [Microsoft Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/events/tabstatechange)
 * 
 * @param tabName The name of the tab or
 * a callback function that returns the name of the tab from the component configuration.
 * 
 * @example Notify on form that the tab state changed
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       table: "contact"
 *    }
 * })
 * export class NotifyOnTabStateChangeComponent {
 *    @MnOnTabStateChange("tab_name")
 *    onTabStateChange(eventArg: FormEventArg) {
 *       eventArg.formCtx.ui.setFormNotification("Tab state changed", "INFO", "TabStateChange");
 *    }
 * }
 * ```
 * @category Event
 */
export function MnOnTabStateChange(tabName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.TabStateChange,
        target: tabName
    });
}
