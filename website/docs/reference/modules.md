---
id: "modules"
title: "primno"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [ColumnType](enums/ColumnType.md)
- [ControlType](enums/ControlType.md)
- [EventTypes](enums/EventTypes.md)
- [PageType](enums/PageType.md)

## Interfaces

- [AppScopeConfig](interfaces/AppScopeConfig.md)
- [CommandBarEventArg](interfaces/CommandBarEventArg.md)
- [ComponentEvent](interfaces/ComponentEvent.md)
- [Config](interfaces/Config.md)
- [Configuration](interfaces/Configuration.md)
- [Event](interfaces/Event.md)
- [EventArg](interfaces/EventArg.md)
- [EventConfig](interfaces/EventConfig.md)
- [EventType](interfaces/EventType.md)
- [ExternalArgs](interfaces/ExternalArgs.md)
- [FormConfig](interfaces/FormConfig.md)
- [FormEventArg](interfaces/FormEventArg.md)
- [FormScopeConfig](interfaces/FormScopeConfig.md)
- [Input](interfaces/Input.md)
- [ListScope](interfaces/ListScope.md)
- [OnDestroy](interfaces/OnDestroy.md)
- [OnInit](interfaces/OnInit.md)
- [PopulateQueryEventArg](interfaces/PopulateQueryEventArg.md)
- [RecordScope](interfaces/RecordScope.md)
- [SubComponent](interfaces/SubComponent.md)

## Type Aliases

### CanBePromise

Ƭ **CanBePromise**<`T`\>: `T` \| `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/core/src/typing/common.ts:20](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L20)

___

### ColumnTypePropertyObject

Ƭ **ColumnTypePropertyObject**: `Object`

#### Index signature

▪ [key: `string`]: [`ColumnType`](enums/ColumnType.md) \| `undefined`

#### Defined in

[packages/core/src/typing/feature.ts:13](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/feature.ts#L13)

___

### Component

Ƭ **Component**: `Record`<`string` \| `number` \| `symbol`, `any`\>

#### Defined in

[packages/core/src/typing/component.ts:5](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L5)

___

### ComponentConfig

Ƭ **ComponentConfig**: `Record`<`string`, `unknown`\>

#### Defined in

[packages/core/src/typing/component.ts:49](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L49)

___

### ComponentConstructor

Ƭ **ComponentConstructor**<`T`\>: [`Constructor`](modules.md#constructor)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Component`](modules.md#component) |

#### Defined in

[packages/core/src/typing/component.ts:4](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L4)

___

### ComponentOrComponentConstructor

Ƭ **ComponentOrComponentConstructor**: [`ConstructorOrObject`](modules.md#constructororobject)<[`Component`](modules.md#component)\>

#### Defined in

[packages/core/src/typing/component.ts:6](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L6)

___

### ConfigMapperFromInput

Ƭ **ConfigMapperFromInput**<`T`\>: (`i`: [`InputOf`](modules.md#inputof)<`T`\>) => [`ConfigOf`](modules.md#configof)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Component`](modules.md#component) |

#### Type declaration

▸ (`i`): [`ConfigOf`](modules.md#configof)<`T`\>

Obtain config resolver of a component from it input

##### Parameters

| Name | Type |
| :------ | :------ |
| `i` | [`InputOf`](modules.md#inputof)<`T`\> |

##### Returns

[`ConfigOf`](modules.md#configof)<`T`\>

#### Defined in

[packages/core/src/typing/component.ts:42](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L42)

___

### ConfigOf

Ƭ **ConfigOf**<`TComponent`\>: `TComponent` extends [`Config`](interfaces/Config.md) ? `Readonly`<`TComponent`[``"config"``]\> : `never`

Obtain config type from a component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TComponent` | extends [`Component`](modules.md#component) |

#### Defined in

[packages/core/src/typing/component.ts:37](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L37)

___

### ConfigOrConfigMapper

Ƭ **ConfigOrConfigMapper**<`TInstance`\>: [`ConfigOf`](modules.md#configof)<`TInstance`\> \| [`ConfigMapperFromInput`](modules.md#configmapperfrominput)<`TInstance`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInstance` | extends [`Component`](modules.md#component) |

#### Defined in

[packages/core/src/typing/component.ts:44](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L44)

___

### Constructor

Ƭ **Constructor**<`T`\>: (...`args`: `any`[]) => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`any`, `any`\> |

#### Type declaration

• (`...args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Defined in

[packages/core/src/typing/common.ts:22](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L22)

___

### ConstructorOrObject

Ƭ **ConstructorOrObject**<`T`\>: [`Constructor`](modules.md#constructor)<`T`\> \| `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`any`, `any`\> = `Record`<`any`, `any`\> |

#### Defined in

[packages/core/src/typing/common.ts:23](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L23)

___

### Control

Ƭ **Control**: `Xrm.Events.EventContext` \| `Xrm.FormContext` \| `Xrm.Controls.GridControl`

#### Defined in

[packages/core/src/typing/events.ts:119](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L119)

___

### Esm

Ƭ **Esm**: `any`

#### Defined in

[packages/core/src/typing/esm.ts:1](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/esm.ts#L1)

___

### EventHandler

Ƭ **EventHandler**: (`targetName?`: `string`, ...`args`: `unknown`[]) => `unknown`

#### Type declaration

▸ (`targetName?`, `...args`): `unknown`

Internal event handler called when a specific event is triggered.

##### Parameters

| Name | Type |
| :------ | :------ |
| `targetName?` | `string` |
| `...args` | `unknown`[] |

##### Returns

`unknown`

#### Defined in

[packages/core/src/typing/events.ts:19](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L19)

___

### FeatureConfig

Ƭ **FeatureConfig**: [`ComponentConfig`](modules.md#componentconfig)

#### Defined in

[packages/core/src/typing/feature.ts:18](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/feature.ts#L18)

___

### IfElse

Ƭ **IfElse**<`TValue`, `TExtends`, `TTrue`, `TFalse`\>: `TValue` extends `TExtends` ? `TTrue` : `TFalse`

#### Type parameters

| Name |
| :------ |
| `TValue` |
| `TExtends` |
| `TTrue` |
| `TFalse` |

#### Defined in

[packages/core/src/typing/common.ts:4](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L4)

___

### InputMapper

Ƭ **InputMapper**<`T`\>: (`i`: `any` \| `unknown` \| `never`) => [`InputOf`](modules.md#inputof)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Type declaration

▸ (`i`): [`InputOf`](modules.md#inputof)<`T`\>

Resolve the input value from the config of the parent component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `any` \| `unknown` \| `never` |

##### Returns

[`InputOf`](modules.md#inputof)<`T`\>

#### Defined in

[packages/core/src/typing/component.ts:25](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L25)

___

### InputOf

Ƭ **InputOf**<`TComponent`\>: `TComponent` extends [`Input`](interfaces/Input.md) ? `Readonly`<`TComponent`[``"input"``]\> : `never`

Obtain input type from a component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TComponent` | extends [`Component`](modules.md#component) |

#### Defined in

[packages/core/src/typing/component.ts:11](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L11)

___

### InputOrInputMapper

Ƭ **InputOrInputMapper**<`T`, `TInstance`\>: [`InputOf`](modules.md#inputof)<`TInstance`\> \| [`InputMapper`](modules.md#inputmapper)<`TInstance`\>

Input value or input mapper

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Constructor`](modules.md#constructor) |
| `TInstance` | extends `InstanceType`<`T`\> = `InstanceType`<`T`\> |

#### Defined in

[packages/core/src/typing/component.ts:30](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L30)

___

### KeysMatching

Ƭ **KeysMatching**<`T`, `V`\>: { [K in keyof T]-?: T[K] extends V ? K : never }[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |
| `V` |

#### Defined in

[packages/core/src/typing/common.ts:25](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L25)

___

### ModuleConstructor

Ƭ **ModuleConstructor**: (...`args`: `any`) => `any`

#### Type declaration

• (`...args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any` |

#### Defined in

[packages/core/src/typing/module.ts:1](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/module.ts#L1)

___

### NoUndefinedColumn

Ƭ **NoUndefinedColumn**<`T`\>: { [P in keyof T]-?: NoUndefinedColumn<NonNullable<T[P]\>\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/core/src/typing/common.ts:2](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L2)

___

### PickOnly

Ƭ **PickOnly**<`T`, `V`\>: `Pick`<`T`, [`KeysMatching`](modules.md#keysmatching)<`T`, `V`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `V` |

#### Defined in

[packages/core/src/typing/common.ts:29](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L29)

___

### PropertyTypeReplacer

Ƭ **PropertyTypeReplacer**<`TObject`, `TNewType`\>: { [P in keyof TObject]: TNewType }

Replaces the property types of the object with the one specified in TReplace.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObject` | extends `Record`<`string`, `unknown`\> |
| `TNewType` | `TNewType` |

#### Defined in

[packages/core/src/typing/common.ts:9](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L9)

___

### RecursiveNoUndefined

Ƭ **RecursiveNoUndefined**<`T`\>: `NonNullable`<[`NoUndefinedColumn`](modules.md#noundefinedcolumn)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/core/src/typing/common.ts:3](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L3)

___

### RecursivePartial

Ƭ **RecursivePartial**<`T`\>: { [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U\>[] : T[P] extends Record<string, unknown\> ? RecursivePartial<T[P]\> : T[P] }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/core/src/typing/common.ts:13](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L13)

___

### ReplaceProp

Ƭ **ReplaceProp**<`T`, `V`\>: { [key in keyof T]: V }

Replace type of object properties

#### Type parameters

| Name |
| :------ |
| `T` |
| `V` |

#### Defined in

[packages/core/src/typing/common.ts:34](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L34)

___

### SaveEventArg

Ƭ **SaveEventArg**: [`FormEventArg`](interfaces/FormEventArg.md)<`Xrm.Events.SaveEventContext`\>

#### Defined in

[packages/core/src/typing/events.ts:71](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L71)

___

### Scope

Ƭ **Scope**: [`RecordScope`](interfaces/RecordScope.md) \| [`ListScope`](interfaces/ListScope.md)

#### Defined in

[packages/core/src/typing/scope.ts:33](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/scope.ts#L33)

___

### StageChangeEventArg

Ƭ **StageChangeEventArg**: [`FormEventArg`](interfaces/FormEventArg.md)<`Xrm.Events.StageChangeEventContext`\>

#### Defined in

[packages/core/src/typing/events.ts:73](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L73)

___

### StageSelectedEventArg

Ƭ **StageSelectedEventArg**: [`FormEventArg`](interfaces/FormEventArg.md)<`Xrm.Events.StageSelectedEventContext`\>

#### Defined in

[packages/core/src/typing/events.ts:72](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/events.ts#L72)

___

### StringPropertyObject

Ƭ **StringPropertyObject**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `undefined`

#### Defined in

[packages/core/src/typing/common.ts:1](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/common.ts#L1)

___

### ValueOrConfigPropertyMapper

Ƭ **ValueOrConfigPropertyMapper**<`T`\>: `T` \| `ConfigPropertyMapper`<`T`\>

Value or value mapper from component config.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/core/src/typing/component.ts:18](https://github.com/primno/primno/blob/21aeb72/packages/core/src/typing/component.ts#L18)

## Functions

### Inject

▸ **Inject**(`serviceIdentifier`): (`target`: `DecoratorTarget`<`unknown`\>, `targetKey?`: `string` \| `symbol`, `indexOrPropertyDescriptor?`: `number` \| `TypedPropertyDescriptor`<`any`\>) => `void`

Decorator on a dependency that specifies the identifier for that depencency.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceIdentifier` | `any` | Identifier of the dependency. |

#### Returns

`fn`

▸ (`target`, `targetKey?`, `indexOrPropertyDescriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `DecoratorTarget`<`unknown`\> |
| `targetKey?` | `string` \| `symbol` |
| `indexOrPropertyDescriptor?` | `number` \| `TypedPropertyDescriptor`<`any`\> |

##### Returns

`void`

#### Defined in

[packages/core/src/core/di/inject.ts:8](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/di/inject.ts#L8)

___

### Injectable

▸ **Injectable**(): <T\>(`target`: `T`) => `T`

Decorator that marks a class providable as a depencency.

#### Returns

`fn`

▸ <`T`\>(`target`): `T`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `never`) => `unknown` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |

##### Returns

`T`

#### Defined in

[packages/core/src/core/di/injectable.ts:7](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/di/injectable.ts#L7)

___

### MnComponent

▸ **MnComponent**<`T`\>(`config`): (`target`: `T`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Constructor`](modules.md#constructor)<`Record`<`any`, `any`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ComponentConfig` |

#### Returns

`fn`

▸ (`target`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/component.ts:20](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/component.ts#L20)

___

### MnConfig

▸ **MnConfig**<`TComp`\>(`config`): (`target`: `DecoratorTarget`<`unknown`\>, `targetKey?`: `string` \| `symbol`, `indexOrPropertyDescriptor?`: `number` \| `TypedPropertyDescriptor`<`unknown`\>) => `void`

Decorator that mark the property as component config.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TComp` | extends [`Component`](modules.md#component) = [`Component`](modules.md#component) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConfigOrConfigMapper`](modules.md#configorconfigmapper)<`TComp`\> |

#### Returns

`fn`

▸ (`target`, `targetKey?`, `indexOrPropertyDescriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `DecoratorTarget`<`unknown`\> |
| `targetKey?` | `string` \| `symbol` |
| `indexOrPropertyDescriptor?` | `number` \| `TypedPropertyDescriptor`<`unknown`\> |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/config.ts:10](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/config.ts#L10)

___

### MnInput

▸ **MnInput**(): (`target`: `DecoratorTarget`<`unknown`\>, `targetKey?`: `string` \| `symbol`, `indexOrPropertyDescriptor?`: `number` \| `TypedPropertyDescriptor`<`any`\>) => `void`

Decorator that mark a property as input.

#### Returns

`fn`

▸ (`target`, `targetKey?`, `indexOrPropertyDescriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `DecoratorTarget`<`unknown`\> |
| `targetKey?` | `string` \| `symbol` |
| `indexOrPropertyDescriptor?` | `number` \| `TypedPropertyDescriptor`<`any`\> |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/input.ts:7](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/input.ts#L7)

___

### MnModule

▸ **MnModule**<`T`\>(`moduleConfig`): (`target`: (...`args`: `any`[]) => `T`) => `void`

Decorator that mark a class as module.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `moduleConfig` | `ModuleConfig` | Configuration of the module. |

#### Returns

`fn`

▸ (`target`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | (...`args`: `any`[]) => `T` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/module.ts:37](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/module.ts#L37)

___

### MnOnColumnChange

▸ **MnOnColumnChange**(`columnName`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnName` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:37](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L37)

___

### MnOnCommandInvoke

▸ **MnOnCommandInvoke**(`commandName`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandName` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:17](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L17)

___

### MnOnDataLoad

▸ **MnOnDataLoad**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:24](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L24)

___

### MnOnEnableRule

▸ **MnOnEnableRule**(`name`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:30](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L30)

___

### MnOnFormLoad

▸ **MnOnFormLoad**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:44](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L44)

___

### MnOnGridLoad

▸ **MnOnGridLoad**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:48](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L48)

___

### MnOnIframeLoaded

▸ **MnOnIframeLoaded**(`controlName`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlName` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:52](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L52)

___

### MnOnLookupTagClick

▸ **MnOnLookupTagClick**(`controlName`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlName` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:59](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L59)

___

### MnOnPopulateQuery

▸ **MnOnPopulateQuery**(`name`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:66](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L66)

___

### MnOnPreProcessStatusChange

▸ **MnOnPreProcessStatusChange**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:73](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L73)

___

### MnOnPreSearch

▸ **MnOnPreSearch**(`controlName`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlName` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:79](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L79)

___

### MnOnPreStageChange

▸ **MnOnPreStageChange**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:86](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L86)

___

### MnOnProcessStatusChange

▸ **MnOnProcessStatusChange**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:92](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L92)

___

### MnOnSave

▸ **MnOnSave**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:98](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L98)

___

### MnOnStageChange

▸ **MnOnStageChange**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:104](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L104)

___

### MnOnStageSelected

▸ **MnOnStageSelected**(): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:110](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L110)

___

### MnOnTabState

▸ **MnOnTabState**(`tabName`): (`target`: `any`, `key`: `any`, `descriptor`: `PropertyDescriptor`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tabName` | [`ValueOrConfigPropertyMapper`](modules.md#valueorconfigpropertymapper)<`string`\> |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `key` | `any` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/events.ts:116](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/events.ts#L116)

___

### MnOutput

▸ **MnOutput**(): (`t`: `any`, `k?`: `any`, `i?`: `any`) => `void`

Decorator that mark a property as output (EventEmiiter).

#### Returns

`fn`

▸ (`t`, `k?`, `i?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `any` |
| `k?` | `any` |
| `i?` | `any` |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/output.ts:5](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/output.ts#L5)

___

### MnSubComponent

▸ **MnSubComponent**<`T`\>(`config`): (`target`: `DecoratorTarget`<`unknown`\>, `targetKey?`: `string` \| `symbol`, `indexOrPropertyDescriptor?`: `number` \| `TypedPropertyDescriptor`<`unknown`\>) => `void`

Decorator that mark a property as sub component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ComponentConstructor`](modules.md#componentconstructor)<[`Component`](modules.md#component)\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `SubComponentConfig`<`T`\> | Configuration of the sub component. |

#### Returns

`fn`

▸ (`target`, `targetKey?`, `indexOrPropertyDescriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `DecoratorTarget`<`unknown`\> |
| `targetKey?` | `string` \| `symbol` |
| `indexOrPropertyDescriptor?` | `number` \| `TypedPropertyDescriptor`<`unknown`\> |

##### Returns

`void`

#### Defined in

[packages/core/src/core/metadata/subcomponent.ts:40](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/metadata/subcomponent.ts#L40)

___

### Optional

▸ **Optional**(): <T\>(`target`: `DecoratorTarget`<`unknown`\>, `targetKey?`: `string` \| `symbol`, `indexOrPropertyDescriptor?`: `number` \| `TypedPropertyDescriptor`<`T`\>) => `void`

Decorator that marks an optionnal depencency.
null is provide if the dependency is not found.

#### Returns

`fn`

▸ <`T`\>(`target`, `targetKey?`, `indexOrPropertyDescriptor?`): `void`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `DecoratorTarget`<`unknown`\> |
| `targetKey?` | `string` \| `symbol` |
| `indexOrPropertyDescriptor?` | `number` \| `TypedPropertyDescriptor`<`T`\> |

##### Returns

`void`

#### Defined in

[packages/core/src/core/di/optionnal.ts:8](https://github.com/primno/primno/blob/21aeb72/packages/core/src/core/di/optionnal.ts#L8)
