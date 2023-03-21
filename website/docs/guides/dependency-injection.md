---
title: Use dependency injection to write loosely coupled code
sidebar_position: 5
description: Decouple your code from its dependencies. Write flexible and easily testable code. Primno will automatically instantiate the dependencies and pass it to your components.
sidebar_label: Dependency injection
---

# Dependency injection

Dependency injection is a design pattern that allows you to decouple your code from its dependencies. It allow to write more flexible and more easily testable code.

In Primno, you declare your classes dependencies without taking care of how they are instantiated. The framework will do it for you.

:::tip
Dependency injection of Primno is similar to [Angular](https://angular.io/guide/dependency-injection)'s dependency injection.
:::

The following example shows how to inject a `NotifyService` into a component:

```ts title="notify.service.ts"
import { Injectable } from '@primno/core';

@Injectable() // Mark the service as injectable
export class NotifyService {
  constructor() {}

  notify(message: string) {
    Xrm.Navigation.openAlertDialog({ text: message });
  }
}
```

```ts title="dependency-injection.component.ts"
import { MnComponent } from '@primno/core';
import { NotifyService } from './notify.service';

@MnComponent({
    /* ... */
    providers: [NotifyService] // Register the service as a provider
})
export class DependencyInjectionComponent {
    constructor(
        // Inject the service `NotifyService` into the component
        private notifyService: NotifyService
    ) {}

    notify() {
        this.notifyService.notify('Hello world!');
    }
}
```

Dependency injection system is split into 2 parts:
- [Dependency provider](#providing-a-dependency): Register a dependency in the dependency injection system.
- [Dependency consumer](#injecting-a-dependency): Use a dependency by injecting it into a component.

## Providing a dependency

Providers are classes or values that can be injected into consumers.
A provider can be a service, factory, repository, helper, etc.

Providers are registered in the dependency injection system using the `providers` array of a [component](components) or a [module](modules).
Primno have a resolving priority when it comes to finding a provider. The resolving priority is explained in the [resolving priority](#resolving-priority) section.

Register a provider is done with a token. Its a unique identifier for the provider that can be a class, string, or symbol.

The following example shows how to register a provider in a module with a string token.
The dependency `MyService` will be injected into consumers that use the `MyToken` token.

```ts title="di.module.ts"
@MnModule({
    /* ... */
    providers: {
        provide: "MyToken", // Token, can be a class, string, or symbol
        useClass: MyService // Provided class. Here `MyService` class.
    }
})
export class DIModule {}
```

There are three types of providers:

- `ClassProvider`: Creates an instance of a class. It is the most common provider.
- `ValueProvider`: Provides a value, such as a string, number, or function.
- `FactoryProvider`: Provides a value, or instance of a class, using a factory function.

### Class provider

To mark a class as providable, you must use the `@Injectable()` decorator.

```ts title="my.service.ts"
@Injectable()
export class MyService {}
```

Next, register the provider in the dependency injection system.
You can do it by adding the provider to the `providers` array of a [component](components) or [module](modules).

If the class identifier and the provided class is the same, you can just add the class to the `providers` array.

```ts title="my.component.ts"
@MnComponent({
    /* ... */
    providers: [MyService]
})
export class MyComponent {}
```

If the class identifier and the provided class is different, you must use the `useClass` property.

```ts title="my.component.ts"
@MnComponent({
    /* ... */
    providers: [
        {
            provide: MyService, // Class identifier
            useClass: RealService // Provided class
        }
    ]
})
export class MyComponent {}
```

### Value provider

Provides a value, such as a string, number, or function by using the `useValue` property.

```ts title="my.component.ts"
@MnComponent(
    /* ... */
    providers: [
        {
            provide: "MyToken"
            useValue: "Hello world!" // Value to provide
        }
    ]
)
export class MyComponent {}
```

### Factory provider

A factory provider is a function that returns a value, or instance of a class by using the `useFactory` property.

```ts title="my.module.ts"
@MnModule(
    /* ... */
    providers: [
        {
            provide: "randomNumber",
            useFactory: () => Math.random()
        }
    ]
)
export class MyModule {}
```

## Injecting a dependency

Dependency injection can be done via a dependency declared in the constructor or in a property of a class.

If the dependency is a class and its token is the class, you only need to add it to the constructor, the framework will inject it automatically.

```ts title="di.component.ts"
@MnComponent({
    /* ... */
    providers: [MyService]
})
class DiComponent {
    constructor(
        // Will be injected automatically with the token `MyService`
        private myService: MyService
    ) {}
}
```

If the dependency uses a specific token or declared in a property, you must use the [`@Inject()`](../api-reference/functions/Inject) decorator.

```ts title="Constructor injection with @Inject()"
@MnComponent(
    /* ... */
    providers: [
        {
            provide: "MyToken",
            useClass: MyService
        }
    ]
)
class DiComponent {
    constructor(
        @Inject("MyToken")
        private myService: MyService
    )
}
```

```ts title="Property injection"
@MnComponent(
    /* ... */
    providers: [
        {
            provide: MyService,
            useClass: MyService
        }
    ]
)
class DiComponent {
    @Inject(MyService)
    private myService: MyService;
}
```

### Dependency tree

Injection can be done for a component or a service as long as it has been created by the injector.

In the following example, the component `DiComponent` requires the service `AService` that itself requires the service `BService`.

```ts title="di.component.ts"
@MnComponent(
    /* ... */
    providers: [AService, BService]
)
class DiComponent {
    constructor(
        private aService: AService
    ) {}
}
```

```ts title="a.service.ts"
@Injectable()
class AService {
    constructor(
        private bService: BService
    ) {}
}
```

```ts title="b.service.ts"
@Injectable()
class BService {}
```

### Optional dependency

To inject a dependency that is not required, you can use the `@Optional()` decorator.
If the dependency is not found, the value will be `undefined`.

```ts title="Optional dependency"
@MnComponent(
    /* ... */
)
class DiComponent {
    constructor(
        @Optional()
        private myService?: MyService
    )
}
```

## Resolving priority

Register a provider in a module, makes it available in entire application.

When you register a provider in a component, it will be available only in that component, its children and services.

Primno searches in priority in component providers by going up the component tree, then it searches in module providers.

### Component vs module

In the following example, the component `DiComponent` requires the service `MyService` that is provided in itself and the module `DIModule`.
The injected service will be the one registered in the component: `DiComponentService`.

```ts title="di.component.ts"
@MnComponent(
    /* ... */
    providers: [
        {
            provide: MyService,
            // Injected in priority
            useClass: DiComponentService
        }
    ]
)
class DiComponent {
    constructor(
        private myService: MyService
    ) {}
}
```

```ts title="di.module.ts"
@MnModule({
    declarations: [DiComponent],
    providers: [
        {
            provide: MyService,
            // Not injected in `DiComponent` because component providers have priority
            useClass: DIModuleService
        }
    ]
})
export class DIModule {}
```

### Component tree

The following example illustrates the search priority in the component tree.
The component `DiChildComponent` requires the service `MyService` that is registered in itself and in the parent component `DiComponent`.

```ts title="di.component.ts"
@MnComponent(
    /* ... */
    providers: [
        {
            provide: MyService,
            useClass: DiComponentService
        }
    ]
)
class DiComponent {
    constructor(
        // `DiComponentService` because `DIChildComponentService` is provided in its child.
        private myService: MyService
    ) {}
}
```

```ts title="di-child.component.ts"
@MnComponent(
    /* ... */
    providers: [
        {
            provide: MyService,
            useClass: DiChildComponentService
        }
    ]
)
class DiChildComponent {
    constructor(
        // `DiChildComponentService` because `DiChildComponent` providers
        // are resolved before `DiComponent` providers.
        private myService: MyService
    ) {}
}
```

If you remove the `MyService` provider in the child component, the `DIComponentService` will be injected in `DiChildComponent` from the parent component.
