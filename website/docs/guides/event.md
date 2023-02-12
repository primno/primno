---
description: Subscribe to Power Apps events in a component.
---

# Events

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

Eg: [MnOnColumnChange](../api-reference/functions/MnOnColumnChange.md).
:::

## Types

They are 2 types of events that are only available in components that target the same type of page (see [Scope](./components#scope)).

| Type | Description
| --- | --- |
| Record | Fired on a form (principal form, quick create form). |
| List | Fired on a home-grid, sub-grid or associated grid. |

## Target

Some events require a target to be subscribed.
A target can be a column, control or command name. For example, `MnOnColumnChange` requires a column name, whereas `MnOnFormLoad` doesn't.

The target is specified in the decorator as a string argument or function that returns a string from the component configuration. See [Component configuration](./components#configuration).

Example:

```ts
@MnComponent({
    scope: {
        pageType: PageType.Record,
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
mn_<entry point>.<external function>
```

Where:
- `<entry point>` is the name of the entry point.
- `<external function>` is the name of the external function of the event.

Example for a form load event in the `main` entry point:

```ts
mn_main.onFormLoad
```

:::tip
The command `mn build`, `mn deploy` and `mn start` show the prefix to use and an example for the `form load` event.
:::

### Record events

:::caution
To register events on a form, the function must be called with the `Pass execution context as first parameter` option checked.
:::

You can add optionals argument, they will be passed to the event handler.

### List events

To register events on a grid, the function must be called with the following arguments:

:::caution
Order is important.
:::

| Parameter | Value |
| --- | --- |
| String parameter | `<target name>` |
| SelectedControl | - |
| PrimaryControl | - |

You can add optionals argument after `PrimaryControl`, they will be passed to the event handler.

## Event handler

The event handler is the method that will be called when the event occurs.

It's argument depends on the event that occurred. For example, the `column change` event will contain the context of the form on which it is executed, whereas the `command invoke` event will contain the context of the associated grid control or form.

## Events list

This table lists all the events that can be subscribed to with Primno.

:::tip
- **Decorator**: The decorator to use to subscribe to the event.
- **Trigger**: The event that will trigger the handler.
- **Type**: The type of the event (see [Types](#types)).
- **Manual registration**: Whether the event must be manually registered or not.
- **External function**: The event handler function to call from Power Apps during registration. It must be prefixed with a prefix. See [Manual registration](#manual-registration).
:::

:::note
Open the decorator link to see the full documentation of the event.
:::

Decorator | Trigger | Type | Manual registration | External function |
| --- | --- | --- | --- | --- |
[`@MnOnFormLoad`](../api-reference/functions/MnOnFormLoad.md) | Form is loaded. | Record | Yes | `onFormLoad` |
[`@MnOnDataLoad`](../api-reference/functions/MnOnDataLoad.md) | Form data is loaded | Record | No | `onDataLoad` |
[`@MnOnColumnChange`](../api-reference/functions/MnOnColumnChange.md) | Column value is changed. | Record | No | `onColumnChange` |
[`@MnOnSave`](../api-reference/functions/MnOnSave.md) | Form is saved. | Record | No | `onSave` |
[`@MnOnCommandInvoke`](../api-reference/functions/MnOnCommandInvoke.md) | Command is invoked by a button on command-bar. | Record & List | Yes | `onCommandInvoke` |
[`@MnOnEnableRule`](../api-reference/functions/MnOnEnableRule.md) | Enable rule is evaluated on the command-bar. | Record & List | Yes | `onEnableRule` |
[`@MnOnGridLoad`](../api-reference/functions/MnOnGridLoad.md) | Grid is loaded. | Record | Yes | `onGridLoad` |
[`@MnOnLookupTagClick`](../api-reference/functions/MnOnLookupTagClick.md) | Lookup tag is clicked. | Record | No | `onLookupTagClick` |
[`@MnOnPopulateQuery`](../api-reference/functions/MnOnPopulateQuery.md) | A flyout button must be populated on the command-bar. | Record & List | Yes | `onPopulateQuery` |
[`@MnOnPreProcessStatusChange`](../api-reference/functions/MnOnPreProcessStatusChange.md) | BPF status is about to change. | Record | No | `onPreProcessStatusChange` |
[`@MnOnPreSearch`](../api-reference/functions/MnOnPreSearch.md) | Search on a lookup is about to be executed. | Record | No | `onPreSearch` |
[`@MnOnPreStageChange`](../api-reference/functions/MnOnPreStageChange.md) | Stage of BPF is about to change. | Record | No | `onPreStageChange` |
[`@MnOnProcessStatusChange`](../api-reference/functions/MnOnProcessStatusChange.md) | BPF status is changed. | Record | No | `onProcessStatusChange` |
[`@MnOnStageChange`](../api-reference/functions/MnOnStageChange.md) | Stage of BPF is changed. | Record | No | `onStageChange` |
[`@MnOnStageSelected`](../api-reference/functions/MnOnStageSelected.md) | Stage of BPF is selected. | Record | No | `onStageSelected` |
[`@MnOnTabStateChange`](../api-reference/functions/MnOnTabStateChange.md) | Tab state is changed. | Record | No | `onTabStateChange` |
