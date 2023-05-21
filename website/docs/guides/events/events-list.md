---
title: Exhaustive list of events available with usage examples
sidebar_position: 1
description: Exhaustive list of Power Apps events available with usage examples. This table lists all the events that can be subscribed to with Primno.
sidebar_label: Events list
---

# Events list

This table lists all the events that can be subscribed to with Primno.

:::tip
- **Decorator**: The decorator to use to subscribe to the event.
- **Trigger**: The event that will trigger the handler.
- **Page type**: The page type of the event (see [Types](index.mdx#page-type)).
- **Manual registration**: Whether the event must be manually registered or not. See [Manual registration](manual-registration.md).
- **External function**: The event handler function to call from Power Apps during registration. It must be prefixed with a prefix. See [Manual registration](manual-registration.md).
:::

:::tip
Open the decorator link to see the full documentation of the event with usage examples.
:::

Decorator | Trigger | Page type | Manual registration | External function |
| --- | --- | --- | --- | --- |
[`@MnOnFormLoad`](../../api-reference/functions/MnOnFormLoad.md) | Form is loaded. | Record | Yes | `onFormLoad` |
[`@MnOnDataLoad`](../../api-reference/functions/MnOnDataLoad.md) | Form data is loaded | Record | No | - |
[`@MnOnColumnChange`](../../api-reference/functions/MnOnColumnChange.md) | Column value is changed. | Record | No | - |
[`@MnOnSave`](../../api-reference/functions/MnOnSave.md) | Form is saving. | Record | No | - |
[`@MnOnPostSave`](../../api-reference/functions/MnOnPostSave.md) | Form is saved. | Record | No | - |
[`@MnOnCommandInvoke`](../../api-reference/functions/MnOnCommandInvoke.md) | Command is invoked by a button on the command-bar. | Record & List | Yes | `onCommandInvoke` |
[`@MnOnEnableRule`](../../api-reference/functions/MnOnEnableRule.md) | Enable rule is evaluated on the command-bar. | Record & List | Yes | `onEnableRule` |
[`@MnOnGridLoad`](../../api-reference/functions/MnOnGridLoad.md) | Sub-grid on a form is loaded. | Record | false | - |
[`@MnOnGridSave`](../../api-reference/functions/MnOnGridSave.md) | Grid is saved. | Record | Yes | `onGridSave` |
[`@MnOnGridRecordSelect`](../../api-reference/functions/MnOnGridRecordSelect.md) | A single row is selected. | Record | Yes | `onGridRecordSelect` |
[`@MnOnGridChange`](../../api-reference/functions/MnOnGridChange.md) | A cell value changed. | Record | Yes | `onGridChange` |
[`@MnOnLookupTagClick`](../../api-reference/functions/MnOnLookupTagClick.md) | Lookup tag is clicked. | Record | No | - |
[`@MnOnPopulateQuery`](../../api-reference/functions/MnOnPopulateQuery.md) | A flyout button must be populated on the command-bar. | Record & List | Yes | `onPopulateQuery` |
[`@MnOnPreProcessStatusChange`](../../api-reference/functions/MnOnPreProcessStatusChange.md) | BPF status is about to change. | Record | No | - |
[`@MnOnPreSearch`](../../api-reference/functions/MnOnPreSearch.md) | Search on a lookup is about to be executed. | Record | No | - |
[`@MnOnPreStageChange`](../../api-reference/functions/MnOnPreStageChange.md) | Stage of BPF is about to change. | Record | No | - |
[`@MnOnProcessStatusChange`](../../api-reference/functions/MnOnProcessStatusChange.md) | BPF status is changed. | Record | No | - |
[`@MnOnStageChange`](../../api-reference/functions/MnOnStageChange.md) | Stage of BPF is changed. | Record | No | - |
[`@MnOnStageSelected`](../../api-reference/functions/MnOnStageSelected.md) | Stage of BPF is selected. | Record | No | - |
[`@MnOnTabStateChange`](../../api-reference/functions/MnOnTabStateChange.md) | Tab state is changed. | Record | No | - |
[`@MnOnOutputChange`](../../api-reference/functions/MnOnOutputChange.md) | Output of a control changed. | Record | No | - |
