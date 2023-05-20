---
title: How to show/hide a command bar button based on a form state in Dynamics 365
description: How to show/hide a command bar button depending on visible tab or field value in Dynamics 365.
slug: hide-button-command-bar
authors: [Xavier Monin]
tags: [event, command-bar, tutorial]
hide_table_of_contents: false
---

Learn how to hide a button in the command-bar based on a form state such as field value or tab visibility. By customizing the button's visibility, you can provide a more dynamic and tailored user experience in your application.

Let's get started!

<!--truncate-->

## Prerequisites

Before you begin, make sure you have an existing Primno workspace. If you don't have one, follow the [Getting started](../docs/getting-started) guide to create your first workspace.

## Create a component

The first step is to create a component of type `record`. Run the following command to generate the component:

```bash
mn generate component hide-button
```

## Registering the Enable Rule

To indicate whether the button is enabled or not, we need to subscribe to the `onEnableRule` event of the command-bar. However, Primno does not automatically register the command-bar events in Dynamics, so we have to do it manually. To learn how to register a command bar event for Primno, refer to the [Command Bar Registration](../docs/guides/events#command-bar) documentation.

To register the enable rule in Dynamics, follow these steps:
1. Use Ribbon Workbench to create a new enable rule on your button.
2. Add your web resource (format: `<editorPrefix>_/js/<projectName>.js`) in the enable rule.
3. Add the function call (format: `mn_<projectName>.onEnableRule`)
4. Set the following parameters:

| Parameter | Value |
| --- | --- |
| SelectedControl | - |
| PrimaryControl | - |
| String parameter | `hideButton` |

Here, `hideButton` will be the name of our enable rule.

## Component code

In the component code, we will use the `@MnOnEnableRule` decorator to subscribe to the event "onEnableRule" of the button.

```ts
import { MnComponent, MnOnTabChange, MnOnEnableRule, CommandBarEventArg } from '@primno/core';

@MnComponent({
  scope: {
    page: "record"
  }
})
class HideButtonComponent {
  private showButton = false; // Hide the button by default

  @MnOnEnableRule("hideButton")
  onEnableRule(eventArg: CommandBarEventArg) {
    return this.showButton;
  }
}
```

To hide or display the button based on specific events (e.g., field change, tab change), you need to subscribe to those events and call `refreshRibbon()` in the event handler.
This will refresh the command-bar and re-evaluate the enable rules.

You don't need to manually register these events in Dynamics. Primno will automatically register them at runtime for you.

Here are a few examples:

### Showing the Button on Tab Change

If you want to show the button only when a tab is visible, subscribe to the `onTabChange` event and update the `showButton` value accordingly. Don't forget to call `refreshRibbon()` to refresh the command-bar.

Add the following code in your component.
```ts
@MnOnTabChange("tabName")
onTabChange(eventArg: FormEventArg) {
  const tab = eventArg.formCtx.ui.tabs.get(tabName);
  this.showButton = tab.getDisplayState() === "expanded";
  formCtx.ui.refreshRibbon();
}
```

### Hiding the Button on Field Change

To hide the button when a specific field has a certain value, subscribe to the `onFieldChange` event and update the  `showButton` value based on the field's value.

Add the following code in your component.
```ts
@MnOnFieldChange("fieldname")
onFieldChange(eventArg: FormEventArg) {
  const fieldNameAttr = eventArg.formCtx.data.entity.attributes.get("fieldname");
  this.showButton = fieldNameAttr.getValue() !== "value";
  formCtx.ui.refreshRibbon();
}
```

## Reusing the component

To reuse the component in others forms or tables, you need to set a input and a config property in the component.

Example for a component that shows a button only when a tab is visible:

```ts title="hide-button/hide-button.component.ts"
import { MnComponent, MnOnTabChange, MnInput, MnOnEnableRule, CommandBarEventArg, Input, Config } from '@primno/core';

/**
 * Describe the input property of the HideButtonComponent.
 */
interface HideButtonOptions {
  tabName: string;
  enableRuleName: string;
}

@MnComponent({
  scope: {
    page: "record"
  }
})
class HideButtonComponent implements Input, Config {
  /**
   * The input property is used to pass data to the component.
   */
  @MnInput()
  input!: HideButtonOptions;

  /**
   * The config property is used to configure the component.
   * Here, it used the input property.
   */
  @MnConfig(i => i)
  config!: HideButtonOptions;

  private showButton = false; // Hide the button by default

  @MnOnEnableRule(c => c.enableRuleName)
  onEnableRule(eventArg: CommandBarEventArg) {
    return this.showButton;
  }

  @MnOnTabChange(c => c.tabName)
  onTabChange(eventArg: FormEventArg) {
    const tab = eventArg.formCtx.ui.tabs.get(this.config.tabName);
    this.showButton = tab.getDisplayState() === "expanded";
    formCtx.ui.refreshRibbon();
  }
}
```

Example of usage in a parent component:

```ts title="account.component.ts"
import { MnComponent, MnSubComponent, SubComponent } from '@primno/core';
import { HideButtonComponent } from './hide-button/hide-button.component';

@MnComponent({
  scope: {
    page: "record"
    table: "account"
  }
})
class AccountComponent {
  @MnSubComponent({
    component: HideButtonComponent,
    input: {
      tabName: "general",
      enableRuleName: "hideButton"
    }
  })
  public hideButton!: SubComponent<HideButtonComponent>;
}
```