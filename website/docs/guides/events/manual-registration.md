---
title: Register an event of Power Apps manually
sidebar_position: 2
description: Register a form or command bar event of Power Apps manually with Form Designer, Ribbon Workbench or Command Designer.
sidebar_label: Manual registration
---

# Manual registration

Some events must be manually registered. The list is available in the [events list](events-list.md) (`Manual registration` column).
All the other events are automatically registered at runtime when Primno is initialized.

:::caution
To be initialized, Primno must be manually registered to at least one event.

On a form, you must register to the `form load` event.
:::

To register manually an event, you must call the `External function` of the event (see [events list](events-list.md)) with the following format:

```
mn_<project name>.<external function>
```

Where:
- `<project name>` is the name of the project.
- `<external function>` is the name of the external function of the event.

The `mn_<project name>` prefix can be customized in the `primno.json` file (see [Workspace](../configuration/workspace.md)).

Example for a form load event:

```ts
mn_myproject.onFormLoad
```

:::tip
The command `mn build`, `mn deploy` and `mn start` show the prefix to use and an example for the `form load` event.
:::

## Form

To register a form event, use the Form Designer of Power Apps. See: [Use form designer](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/form-designer-overview).

:::caution
To register events on a form, the function must be called with the `Pass execution context as first parameter` option checked.
:::

You can add optionals argument, they will be passed to the event handler in the `extraArgs` property.
Some events require the target name in optionals arguments.
Eg: [`@MnOnGridRecordSelect`](../../api-reference/functions/MnOnGridRecordSelect.md), [`@MnOnGridChange`](../../api-reference/functions/MnOnGridChange.md) and [`@MnOnGridSave`](../../api-reference/functions/MnOnGridSave.md).
See the associated decorator documentation for more information.

### Example

Registration of the `form load` event for the `myproject` project using Power Apps editor:

![Register a form event](/img/guides/events/form-registration.png)

Two optionals arguments are passed to the event handler: `first arg` and `second arg`.

## Command bar

The registration of events of the command-bar can be done with:
- Command Designer of Power Apps. See: [Use command designer](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/use-command-designer).
- Ribbon Workbench. See [Ribbon Workbench documentation](https://ribbonworkbench.uservoice.com/)

To register events of the command-bar (Eg: [`@MnOnCommandInvoke`](../../api-reference/functions/MnOnCommandInvoke.md), [`@MnOnEnableRule`](../../api-reference/functions/MnOnEnableRule.md)) the function must be called with the following arguments:

| Parameter | Value |
| --- | --- |
| SelectedControl | - |
| PrimaryControl | - |
| String parameter | `<target name>` |

:::caution
Order is important.
:::

You can add optionals argument after `String parameter`, they will be passed to the event handler in the `extraArgs` property.

### Example

With Command Designer of Power Apps:

![Register a command bar event with Command Designer of Power Apps](/img/guides/events/command-bar-registration-command-designer.png "Register a command bar event with Command Designer of Power Apps")

With Ribbon Workbench:

![Register a command bar event with Ribbon Workbench](/img/guides/events/command-bar-registration-ribbon-workbench.png "Register a command bar event with Ribbon Workbench")