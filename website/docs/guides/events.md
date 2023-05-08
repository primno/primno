---
title: Easily subscribe to Power Apps events with decorators
sidebar_position: 4
description: Subscribe to Power Apps events in your component by using decorators (MnOnFormLoad, MnOnColumnChange, etc.)
sidebar_label: Events
---

# Subscribe to Power Apps events

Power Apps provides a lot of events that can be subscribed to. For example, when a form is loaded or when a column value is changed.

With Primno, a Power Apps event can be subscribed using decorators in a component. It must be associated with a method that will be the event handler called when the event occurs.

Each events decorator is prefixed with `MnOn` and the event name is in pascal case. For example, the `Form load` event is associated with the `@MnOnFormLoad()` decorator.

```ts title="Subscribe to the form load event."
@MnOnFormLoad()
public onFormLoad(eventArg: FormEventArgs) {
    // Do something
}
```

:::important
Each event decorator has a dedicated documentation page that provides explanations and usage examples.
See the [full events list](#events-list).

Eg: [MnOnColumnChange](../api-reference/functions/MnOnColumnChange.md).
:::

## Page type

The page type define the main source of the event:

| Page type | Description
| --- | --- |
| Record | Fired on a form (principal form, quick create form). |
| List | Fired on a home-grid, sub-grid or associated grid. |

A event can be available on one or both page types. For example, the `form load` event is only available on a record page when the `enable rule` (command-bar) event is available on both record and list pages. See the [full events list](#events-list).

A component defines its page type using the [Scope](./components.md#scope) property of its `MnComponent` decorator.

:::caution
A component targeting the "List" page type cannot subscribe to a "Record" event and vice versa.
:::

The page type defined the execution context of the event handler, a record event performs operations on a form ([form context](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/clientapi-form-context)) when a list event performs operations on a grid ([grid context](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/clientapi-grid-context)).

## Target

Some events require a target to be subscribed.
A target can be a column, control or command name. For example, `MnOnColumnChange` requires a column name, whereas `MnOnFormLoad` doesn't.

The target is specified in the decorator as a string argument or function that returns a string from the component configuration. See [Component configuration](./components.md#configuration).

:::tip
Use the [`ConfigOf`](../api-reference/types/ConfigOf.md) type to get the type of the configuration of a component.
:::

Example:

```ts
@MnComponent({
    scope: {
        pageType: "record",
        table: 'account'
    }
})
export class MyComponent {
    @MnConfig({
        column: 'name'
    })
    config: {
        column: string;
    };

    /**
     * Subscribe to the column change event of the hard-coded column 'accountnumber'.
     */
    @MnOnColumnChange('accountnumber')
    public onAccountNumberChange(eventArg: FormEventArgs) {
        // Do something
    }

    /**
     * Subscribe to the column change event of the column specified in the configuration, here 'name'.
     */
    @MnOnColumnChange((cfg: ConfigOf<NotificationComponent>) => cfg.notificationColumn)
    public onColumnChange(eventArg: FormEventArgs) {
        // Do something
    }
}
```

## Manual registration

Some events must be manually registered. The list is available in the [events list](#events-list) (`Manual registration` column).
All the other events are automatically registered at runtime when Primno is initialized.

:::caution
To be initialized, Primno must be manually registered to at least one event.

On a form, you must register to the `form load` event.
:::

To register manually an event, you must call the `External function` of the event (see [events list](#events-list)) with the following format:

```
mn_<project name>.<external function>
```

Where:
- `<project name>` is the name of the project.
- `<external function>` is the name of the external function of the event.

The `mn_<project name>` prefix can be customized in the `primno.json` file (see [Workspace](./configuration/workspace.md)).

Example for a form load event:

```ts
mn_myproject.onFormLoad
```

:::tip
The command `mn build`, `mn deploy` and `mn start` show the prefix to use and an example for the `form load` event.
:::

### Form

To register a form event, use the Form Designer of Power Apps. See: [Use form designer](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/form-designer-overview).

:::caution
To register events on a form, the function must be called with the `Pass execution context as first parameter` option checked.
:::

You can add optionals argument, they will be passed to the event handler in the `extraArgs` property.
Some events require the target name in optionals arguments.
Eg: [`@MnOnGridRecordSelect`](../api-reference/functions/MnOnGridRecordSelect.md), [`@MnOnGridChange`](../api-reference/functions/MnOnGridChange.md) and [`@MnOnGridSave`](../api-reference/functions/MnOnGridSave.md).
See the associated decorator documentation for more information.

#### Example

Registration of the `form load` event for the `myproject` project using Power Apps editor:

![Register a form event](/img/guides/events/form-registration.png)

Two optionals arguments are passed to the event handler: `first arg` and `second arg`.

### Command bar

The registration of events of the command-bar can be done with:
- Command Designer of Power Apps. See: [Use command designer](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/use-command-designer).
- Ribbon Workbench. See [Ribbon Workbench documentation](https://ribbonworkbench.uservoice.com/)

To register events of the command-bar (Eg: [`@MnOnCommandInvoke`](../api-reference/functions/MnOnCommandInvoke.md), [`@MnOnEnableRule`](../api-reference/functions/MnOnEnableRule.md)) the function must be called with the following arguments:

| Parameter | Value |
| --- | --- |
| SelectedControl | - |
| PrimaryControl | - |
| String parameter | `<target name>` |

:::caution
Order is important.
:::

You can add optionals argument after `String parameter`, they will be passed to the event handler in the `extraArgs` property.

#### Example

With Command Designer of Power Apps:

![Register a command bar event with Command Designer of Power Apps](/img/guides/events/command-bar-registration-command-designer.png "Register a command bar event with Command Designer of Power Apps")

With Ribbon Workbench:

![Register a command bar event with Ribbon Workbench](/img/guides/events/command-bar-registration-ribbon-workbench.png "Register a command bar event with Ribbon Workbench")


## Event handler

The event handler is the method that will be called when the event occurs.

It's argument depends on the event that occurred. For example, the `column change` event will contain the context of the form on which it is executed, whereas the `command invoke` event will contain the context of the associated grid control or form.

## Events list

This table lists all the events that can be subscribed to with Primno.

:::tip
- **Decorator**: The decorator to use to subscribe to the event.
- **Trigger**: The event that will trigger the handler.
- **Page type**: The page type of the event (see [Types](#page-type)).
- **Manual registration**: Whether the event must be manually registered or not. See [Manual registration](#manual-registration).
- **External function**: The event handler function to call from Power Apps during registration. It must be prefixed with a prefix. See [Manual registration](#manual-registration).
:::

:::tip
Open the decorator link to see the full documentation of the event with usage examples.
:::

Decorator | Trigger | Page type | Manual registration | External function |
| --- | --- | --- | --- | --- |
[`@MnOnFormLoad`](../api-reference/functions/MnOnFormLoad.md) | Form is loaded. | Record | Yes | `onFormLoad` |
[`@MnOnDataLoad`](../api-reference/functions/MnOnDataLoad.md) | Form data is loaded | Record | No | - |
[`@MnOnColumnChange`](../api-reference/functions/MnOnColumnChange.md) | Column value is changed. | Record | No | - |
[`@MnOnSave`](../api-reference/functions/MnOnSave.md) | Form is saving. | Record | No | - |
[`@MnOnPostSave`](../api-reference/functions/MnOnPostSave.md) | Form is saved. | Record | No | - |
[`@MnOnCommandInvoke`](../api-reference/functions/MnOnCommandInvoke.md) | Command is invoked by a button on command-bar. | Record & List | Yes | `onCommandInvoke` |
[`@MnOnEnableRule`](../api-reference/functions/MnOnEnableRule.md) | Enable rule is evaluated on the command-bar. | Record & List | Yes | `onEnableRule` |
[`@MnOnGridLoad`](../api-reference/functions/MnOnGridLoad.md) | Grid is loaded. | Record | false | - |
[`@MnOnGridSave`](../api-reference/functions/MnOnGridSave.md) | Grid is saved. | Record | Yes | `onGridSave` |
[`@MnOnGridRecordSelect`](../api-reference/functions/MnOnGridRecordSelect.md) | A single row is selected. | Record | Yes | `onGridRecordSelect` |
[`@MnOnGridChange`](../api-reference/functions/MnOnGridChange.md) | A cell value changed. | Record | Yes | `onGridChange` |
[`@MnOnLookupTagClick`](../api-reference/functions/MnOnLookupTagClick.md) | Lookup tag is clicked. | Record | No | - |
[`@MnOnPopulateQuery`](../api-reference/functions/MnOnPopulateQuery.md) | A flyout button must be populated on the command-bar. | Record & List | Yes | `onPopulateQuery` |
[`@MnOnPreProcessStatusChange`](../api-reference/functions/MnOnPreProcessStatusChange.md) | BPF status is about to change. | Record | No | - |
[`@MnOnPreSearch`](../api-reference/functions/MnOnPreSearch.md) | Search on a lookup is about to be executed. | Record | No | - |
[`@MnOnPreStageChange`](../api-reference/functions/MnOnPreStageChange.md) | Stage of BPF is about to change. | Record | No | - |
[`@MnOnProcessStatusChange`](../api-reference/functions/MnOnProcessStatusChange.md) | BPF status is changed. | Record | No | - |
[`@MnOnStageChange`](../api-reference/functions/MnOnStageChange.md) | Stage of BPF is changed. | Record | No | - |
[`@MnOnStageSelected`](../api-reference/functions/MnOnStageSelected.md) | Stage of BPF is selected. | Record | No | - |
[`@MnOnTabStateChange`](../api-reference/functions/MnOnTabStateChange.md) | Tab state is changed. | Record | No | - |
[`@MnOnOutputChange`](../api-reference/functions/MnOnOutputChange.md) | Output of a control changed. | Record | No | - |
