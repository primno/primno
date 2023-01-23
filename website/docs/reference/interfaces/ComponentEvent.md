---
id: "ComponentEvent"
title: "Interface: ComponentEvent"
sidebar_label: "ComponentEvent"
sidebar_position: 0
custom_edit_url: null
---

Event targeting an event handler of a component.
Registred in EventRegister.

## Hierarchy

- [`Event`](Event.md)

  ↳ **`ComponentEvent`**

## Properties

### component

• **component**: [`Component`](../modules.md#component)

#### Defined in

[packages/core/src/typing/events.ts:116](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L116)

___

### propertyName

• **propertyName**: `string`

#### Defined in

[packages/core/src/typing/events.ts:115](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L115)

___

### targetName

• `Optional` **targetName**: `string`

Event targer. Optional.

#### Inherited from

[Event](Event.md).[targetName](Event.md#targetname)

#### Defined in

[packages/core/src/typing/events.ts:107](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L107)

___

### type

• **type**: `string`

Event type

#### Inherited from

[Event](Event.md).[type](Event.md#type)

#### Defined in

[packages/core/src/typing/events.ts:103](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L103)
