---
title: Build reusable customizations with components
sidebar_position: 2
description: Building your application with small reusable components. Each component is a independent unit of code that provide a specific functionality.
sidebar_label: Components
---

# Components

Components are the key concept in Primno, they are the building blocks of an application.
Each component is a independent unit of code that provide a specific functionality.

They can be [composed](#sub-component) of other components and reused, like Lego blocks. They can be packaged in [modules](./modules.md) to improve application structure and be shared between projects.

Components can subscribe to [events](#events) emitted by Power Apps to perform wanted actions.

When you create a component, you must add it to a [module](./modules.md) to be able to use it.

## Metadata

In Primno, a component is a class using the [`@MnComponent`](../api-reference/functions/MnComponent.md) decorator.
This decorator provides metadata that Primno use to know where the component can be used and how to instantiate it.

```ts title="Simple account component"
@MnComponent({
    scope: {
        pageType: "record", // Available in form records
        table: 'account' // Available in the account table
    }
})
export class AccountComponent {
    // ...
}
```

`@MnComponent` takes an object as parameter with the following properties:

| Property | Description |
| --- | --- |
| `scope` | Where the component can be used. See [Scope](#scope). |
| `providers` | Providers that will be instantiated by the injector. See [Providers](#providers). |

### Scope

The scope defines where a component can be run.

It is defined in the `@MnComponent` decorator in the `scope` property.

They are 2 types of scope:

| PageType | Description |
| --- | --- |
| `record` | Form (principal form, quick create form). |
| `list` | Home-grid, sub-grid or associated grid. |

Each page type have its own component tree.
You can't compose a component with a `record` scope in a component with a `list` scope, and vice versa.

To use both in the same web resource, you need to create 2 components, one for each page type and add them as bootstrap components in the root [module](modules). See [getting started](../getting-started/index.mdx) for an example.

#### Record

Below is the list of the available properties for a component with a `record` scope.

:::info
To learn more, see [RecordScope](../api-reference/interfaces/RecordScope.md).
:::

| Property | Description | Example |
| --- | --- | --- |
| `table` | Table(s) name(s). | `account` or `['account', 'contact']` |
| `app` | Application object with the `id` property. | `{ id: '00000000-0000-0000-0000-000000000000' }` |
| `form` | The form object with the `id` property. | `{ id: '00000000-0000-0000-0000-000000000000' }` |

```ts title="Component with a record scope"
@MnComponent({
    scope: {
        pageType: "record",
        table: 'account',
        form: {
            id: '00000000-0000-0000-0000-000000000000'
        }
        app: {
            id: '00000000-0000-0000-0000-000000000000'
        }
    }
})
export class MyComponent {
    // ...
}
```

#### List

Below is the list of the available properties for a component with a List scope.

:::info
To learn more, see [ListScope](../api-reference/interfaces/ListScope.md).
:::

| Property | Description | Example |
| --- | --- | --- |
| `table` | Table(s) name(s). | `account` or `['account', 'contact']` |
| `app` | Application object with the `id` property. | `{ id: '00000000-0000-0000-0000-000000000000' }` |

### Providers

A component can have his own providers.
When providers are defined in a component, they are instantiated by the injector and are available only in this component and his sub-components.

If the associated [module](./modules.md) defines the same providers, then the one of the component will be used in priority.

To learn more about providers, see [Dependency injection](./dependency-injection.md).

```ts title="Component with providers"
export abstract class CatService {
    abstract meow(): void;
}

@Injectable()
export class PersianCatService extends CatService {
    meow(): void {
        console.log('Persian cat: Meow!');
    }
}

@MnComponent({
    // ...
    providers: [
        {
            provide: CatService,
            useClass: PersianCatService
        }
    ]
})
export class CatComponent {
    constructor(
        // Will be an instance of PersianCatService
        private catService: CatService
    ) {}
}
```

## Data

A component can define data that can be passed to it by its parent component and that it owns.

For example, this data can be the fields names and tab names for a `record` component or command names for a `list` component.

This data can be used, for example, to subscribe to an event, to set a value of a field or to transmit input to a sub-component.

### Input

Input is data that is passed to a component by its parent component. See [sub-component](#transmit-data) to learn how to transmit data to a sub-component.

[`@MnInput`](../api-reference/functions/MnInput.md) decorator is used to the property named `input` of a component to add an input.

:::caution
The associated property **must be** named `input`. It is recommended to inherit from the `Input` interface.
:::

```ts title="Input that requires a name"
@MnComponent(/* ... */)
export class MyComponent implements Input {
    @MnInput()
    input: {
        name: string;
    }
}
```

### Configuration

Configuration is the owns data of a component. It can be fill by the input or by the component itself.

[`@MnConfig`](../api-reference/functions/MnConfig.md) decorator is used to the property named `config` to add a configuration.

:::caution
The associated property **must be** named `config`. It is recommended to inherit from the `Config` interface.
:::

The value of the configuration **must be** set by the decorator.

:::danger
Don't set a value in `config` property, only use the decorator.
```ts
@MnComponent(/* ... */)
export class MyComponent implements Config {
    @MnConfig({
        name: "This value will be set"
    })
    config: {
        name: string;
    } = {
        name: "Do NOT set a value here !"
    }
}
```
:::

The value can be set by the component itself:

```ts title="Self-configured component"
@MnComponent(/* ... */)
export class MyComponent implements Config {
    @MnConfig({
        name: 'My component'
    })
    config!: {
        name: string;
    }
}
```

Or, the value can be set by the input with a callback:

:::tip
Add the component type to the decorator to enable the discovery of the input type in the callback.
```ts
@MnConfig<MyComponent>(input => ({
    // ...
    someProperty: input./* Discovery enabled */
})
```
:::

```ts title="Input-configured component"
@MnComponent(/* ... */)
export class MyComponent implements Input, Config {
    @MnInput()
    input!: {
        name: string;
    }

    @MnConfig<MyComponent>(input => ({
        name: input.name
    })
    config!: {
        name: string;
    }
}
```

Configuration can also be partially set by the input.

```ts title="Partially input-configured component"
@MnComponent(/* ... */)
export class MyComponent implements Input, Config {
    @MnInput()
    input!: {
        name: string;
    }

    @MnConfig<MyComponent>(input => ({
        name: input.name,
        description: 'This is a description'
    })
    config!: {
        name: string;
        description: string;
    }
}
```

## Events

A component can listen to events emitted by Power Apps with decorators prefixed by `MnOn`.

For example, a component can listen to the `onformload` event to perform an action when the form is loaded.

```ts title="Component that subscribe to onload event"
@MnComponent(/* ... */)
export class MyComponent {
    @MnOnFormLoad()
    onFormLoad(): void {
        console.log('Form is loaded!');
    }
}
```

See [Events](events/index.mdx) to learn more.

## Sub-component

A sub-component is a component encapsulated in another one.
It is the way to build complex applications with small and reusable components.

[`MnSubComponent`](../api-reference/functions/MnSubComponent) decorator is used to a property of a component to add a sub-component.
The associated property must be of type `SubComponent`.

```ts title="Parent and child components"
@MnComponent(/* ... */)
class ChildComponent {
    // ...
}

@MnComponent(/* ... */)
export class ParentComponent {
    @MnSubComponent({
        component: ChildComponent
    })
    mySubComponent: SubComponent<ChildComponent>;
}
```

### Enable / Disable

A sub-component can be enabled or disabled using the `enable()` and `disable()` method of `SubComponent`.

By default, a sub-component is enabled. You can change the default behavior by setting the `enabled` property of the decorator.

```ts title="Disable a sub-component by default"
@MnSubComponent({
    component: ChildComponent,
    enabled: false
})
mySubComponent: SubComponent<ChildComponent>;
```

#### Enable

Enable a sub-component will instantiate it and add it to the component tree.

```ts title="Enable a sub-component"
mySubComponent.enable();
```

If a sub-component has an incompatible scope, it will not be enabled. Only a parent component can enable a sub-component.

This means that if we are on a `contact` form, a sub-component that targets `account` table
cannot be enabled if the parent component targets `contact` table.
If we are are on a `account` form, both components will stay disabled.

#### Disable

Disable a sub-component will destroy it and its children recursively.

```ts title="Disable a sub-component"
mySubComponent.disable();
```

When a component is deactivated it is destroyed and the subscribed [events](events/index.mdx) are automatically unsubscribed.

### Transmit data

A sub-component can receive data from its parent component.

```ts title="Sub-component with static transmission"
@MnComponent(/* ... */)
class ChildComponent {
    @MnInput()
    input!: {
        name: string;
    }
}

@MnComponent(/* ... */)
export class ParentComponent {
    @MnSubComponent({
        component: ChildComponent,
        input: {
            name: 'Value transmitted'
        }
    })
    mySubComponent: SubComponent<ChildComponent>;
}
```

This data can be set from the parent component configuration with a callback.

:::tip
Use the [`ConfigOf`](../api-reference/types/ConfigOf.md) type to get the configuration type of a component.
:::

```ts title="Transmission from config"
@MnComponent(/* ... */)
class ChildComponent implements Config {
    @MnInput()
    input!: {
        name: string;
    }
}

@MnComponent(/* ... */)
export class ParentComponent implements Config {
    @MnConfig({
        name: 'Value from config'
    })

    @MnSubComponent({
        component: ChildComponent,
        input: (c: ConfigOf<ParentComponent>) => ({
            name: c.config.name
        })
    })
    mySubComponent: SubComponent<ChildComponent>;
}
```

## Lifecycle

Primno provides lifecycle hooks to run registered code when they occur.

| Lifecycle | Interface | Description |
| --- | --- | --- |
| `mnOnInit` | [`OnInit`](../api-reference/interfaces/OnInit.md) | Called when the component is initialized. |
| `mnOnDestroy` | [`OnDestroy`](../api-reference/interfaces/OnDestroy.md) | Called when the component is destroyed. |

Example:

```ts title="Component with onInit and onDestroy lifecycle"
@MnComponent(/* ... */)
export class MyComponent implements OnInit, OnDestroy {
    mnOnInit(): void {
        console.log('My component is initialized!');
    }

    mnOnDestroy(): void {
        console.log('My component is destroyed!');
    }
}
```