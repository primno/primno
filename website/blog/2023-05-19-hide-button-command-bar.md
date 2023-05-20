---
title: How to hide a command bar button
description: How to hide a command bar button depending on visible tab or field value in Dynamics 365.
slug: hide-button-command-bar
authors: [Xavier Monin]
tags: [event, command-bar, tutorial]
hide_table_of_contents: false
---

You can easily hide a button from of the command-bar depending on an external condition. For example, you can hide a button and display it only when a tab is visible or when a field has a specific value.

You will need a component of type `record` and subscribe to the event `onEnableRule`. This event is used by the command-bar to determine if the button is enabled or not.

<!--truncate-->

## Prerequisites

You need to have an existing Primno workspace. See [Getting started](../docs/getting-started) to create your first workspace if you don't have one.

## Create a component

The first step is to create a component of type `record` with the command below.

```bash
mn generate component hide-button
```

## Register the enable rule

We need to subscribe to the events `onEnableRule` to indicate to the command-bar if the button is enabled or not.

The event of enable rule is not automatically registered by Primno in Dynamics, so we need to register it manually. See [Command bar registration](../docs/guides/events#command-bar) for more information.

To register the enable rule in Dynamics, we need create a new enable rule on your button with Ribbon Workbench and set these parameters:

| Parameter | Value |
| --- | --- |
| SelectedControl | - |
| PrimaryControl | - |
| String parameter | `hideButton` |

`hideButton` will be the name of our enable rule.

We also need others events, like `onTabChange` or `onFieldChange`, depending on your needs. You don't need to register these events, they are automatically registered by Primno.

## Component code

We will use the decorator `@MnOnEnableRule` to subscribe to the event "onEnableRule" of the button.

```ts
import { MnComponent, MnOnTabChange, MnOnEnableRule, CommandBarEventArg } from '@primno/core';

@MnComponent({
  scope: {
    page: "record"
  }
})
class HideButtonComponent {
  // Hide the button by default
  private showButton = false;

  @MnOnEnableRule("hideButton")
  onEnableRule(eventArg: CommandBarEventArg) {
    return this.showButton;
  }
}
```

Now, we need to subscribe to a specific event (field, tab, ..) to hide or display the button.
We need to call `refreshRibbon()` in the event handler to refresh the command-bar. That forces the command-bar to re-evaluate the enable rules.

You will find below some examples.

### Show button on tab change

If you want to show the button only when a tab is visible, subscribe to the event `onTabChange` and change the value of `showButton` when the tab is visible.

Add the following code to your component.
```ts
@MnOnTabChange("tabName")
onTabChange(eventArg: FormEventArg) {
  const tab = eventArg.formCtx.ui.tabs.get(tabName);
  this.showButton = tab.getDisplayState() === "expanded";
  formCtx.ui.refreshRibbon();
}
```

### Hide button on field change

To hide the button when a field has a specific value, subscribe to the event `onFieldChange` and change the value of `showButton` depending on the value of the field.

Add the following code to your component.
```ts
@MnOnFieldChange("fieldname")
onFieldChange(eventArg: FormEventArg) {
  const fieldNameAttr = eventArg.formCtx.data.entity.attributes.get("fieldname");
  this.showButton = fieldNameAttr.getValue() !== "value";
  formCtx.ui.refreshRibbon();
}
```