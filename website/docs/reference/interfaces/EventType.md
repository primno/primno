---
id: "EventType"
title: "Interface: EventType"
sidebar_label: "EventType"
sidebar_position: 0
custom_edit_url: null
---

Describes a type of event. 
Provides the generation of the event parameter (eventarg) and actions to be performed when subscribing to this event.

## Properties

### controlNameRequired

• **controlNameRequired**: `boolean`

#### Defined in

[packages/core/src/typing/events.ts:27](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L27)

___

### name

• **name**: `string`

#### Defined in

[packages/core/src/typing/events.ts:26](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L26)

___

### subscribable

• **subscribable**: `boolean`

#### Defined in

[packages/core/src/typing/events.ts:29](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L29)

___

### supportedPageType

• **supportedPageType**: [`PageType`](../enums/PageType.md)[]

#### Defined in

[packages/core/src/typing/events.ts:28](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L28)

## Methods

### createEventArg

▸ **createEventArg**(`extArgs`): [`EventArg`](EventArg.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `extArgs` | [`ExternalArgs`](ExternalArgs.md) |

#### Returns

[`EventArg`](EventArg.md)

#### Defined in

[packages/core/src/typing/events.ts:31](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L31)

___

### init

▸ **init**(`eventHandler`): `void`

Defines the event handler that should be called when the event occurs.
This method will be called only if subscribable is set to true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventHandler` | [`EventHandler`](../modules.md#eventhandler) | Callback to Primno |

#### Returns

`void`

#### Defined in

[packages/core/src/typing/events.ts:53](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L53)

___

### subscribe

▸ **subscribe**(`selectedControl`, `controlName?`): `void`

Subscribe at runtime to D365 event.
This method will be called only if subscribable is set to true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selectedControl` | [`Control`](../modules.md#control) | Control |
| `controlName?` | `string` | Target name |

#### Returns

`void`

#### Defined in

[packages/core/src/typing/events.ts:39](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L39)

___

### unsubscribe

▸ **unsubscribe**(`selectedControl`, `controlName?`): `void`

Unsubscribe at runtime to D365 event.
This method will be called only if subscribable is set to true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selectedControl` | [`Control`](../modules.md#control) | Control |
| `controlName?` | `string` | Target name |

#### Returns

`void`

#### Defined in

[packages/core/src/typing/events.ts:46](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L46)
