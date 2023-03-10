# Modules

Primno provides its modularity system to organize the structure of your application with modules. Modules are containers for a dedicated application domain that can contain components, service providers and related code.

A module defines the components that can be used and the services that can be injected as dependencies. It also define the components that will be bootstrapped when the module is loaded.

Every entry point (web resource uploaded to Power Apps) is a root module that will be bootstrapped by Primno.

## Metadata

A module is a class using the [`@MnModule`](../api-reference/functions/MnModule) decorator.
This decorator provides metadata that Primno uses to organize the application structure.

```ts title="A module that will start MyComponent"
@MnModule({
    bootstrap: [MyComponent],
    declarations: [MyComponent]
})
export class MyModule {}
```

`@MnModule` takes an object as parameter with the following properties:

| Property | Description |
| --- | --- |
| `declarations` | Components that are available in this module. They can be added as children of other components of this module. A component can be declared in only one module. |
| `providers` | Services injected as dependencies. They can be injected into the whole application. See [dependency injection](dependency-injection). |
| `exports` | Components that will be available to modules that import this module. Only exported components can be added as children in the components of the importing module. |
| `imports` | Modules that will be imported. Exported components from the imported modules will be available to the components of this module. |
| `bootstrap` | Components that will be instantiated when the module is bootstrapped. Unlike Angular, all modules can define `bootstrap`, sub-modules included. |

## Example

The following example shows how to import a module and use its components.
`MainModule` imports `SubModule` and uses the `NotifyComponent` component.

```ts title="sub.module.ts"
@MnModule({
    declarations: [
        NotifyComponent,
        CloseButtonComponent, // `CloseButtonComponent` is not exported
    ],
    exports: [NotifyComponent] // Export `NotifyComponent` to be available in `MainModule`
})
export class SubModule {}
```

```ts title="main.module.ts"
@MnModule({
    imports: [SubModule], // Import the sub module with `NotifyComponent`
    declarations: [MainComponent],
})
export class MainModule {}
```

```ts title="main.component.ts"
@MnComponent(/* ... */)
export class MainComponent {
    @MnSubComponent({
        component: NotifyComponent // NotifyComponent is available
    })
    subComponent: SubComponent<NotifyComponent>;

    // This can't work because `CloseButtonComponent` is not exported
    // @MnSubComponent({
    //     component: CloseButtonComponent // CloseButtonComponent is not available
    // })
    // subComponent: SubComponent<CloseButtonComponent>;
}
```