---
sidebar_position: 1
---

# Introduction

Primno is a modern Typescript framework for building faster a scalable javascript code for Model-Driven Apps of Power Apps that provides:
- A developer tool to build, develop and deploy your javascript webresources to Power Apps / Dynamics 365.
- A component-based architecture framework for building scalable javascript code.

Primno works with:
- [Model-Driven Apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/) of Power Apps.
- Dynamics 365 Apps Online.
- [Dynamics 365 Customer Engagement](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/overview?view=op-9-1) (on-premises) since version 9.0.

## Overview

Primno provides a framework to customize Model-Driven Apps by javascript code. The javascript code is deployed as a webresource and executed by the browser when the user interacts with the form or grid.

The framework provides:
- A component-based architecture to write code in a modular way.
- A dependency injection system to write loosely coupled code.
- A set of decorators to subscribe to Power Apps / D365 events.

:::info
Primno uses Angular's decorator-based component style.
If you are familiar with Angular, it will be easier for you to learn Primno.
:::

<!-- TODO: Add architecture diagram -->

### Components
A component is an independent unit of code that can be reused and composed with other components.

A component is a class decorated with `@MnComponent()`. The decorator specifies the metadata of the component, especially its scope.
The scope describes where the component can be run, eg: form, grid, app, table, etc.

The following example shows a component that can be executed in all the forms of the contact table.

```ts
import { MnComponent, PageType } from '@primno/core';

@MnComponent({
    scope: {
        // This component will be available only in the forms pages of the contact table.
        pageType: PageType.record,
        table: 'contact'
    }
})
export class MyComponent {
    // Behavior of the component is coded here.
}
```

A component can subscribe to Power App events with specific decorators.
Primno automatically subscribes the component to the events and execute the method when it is fired by Power Apps.

```ts
import { MnComponent, MnOnLoad, MnOnColumnChange, FormEventArgs, PageType } from '@primno/core';

@MnComponent({
    scope: {
        pageType: PageType.record,
        table: 'contact'
    }
})
export class MyComponent {
    @MnOnFormLoad()
    onFormLoad(eventArg: FormEventArgs) {
        // This method will be executed when a contact form is loaded.
    }

    @MnOnColumnChange('firstname')
    onFirstNameChange(eventArg: FormEventArgs) {
        // This method will be executed when the 'firstname' column is changed.
    }
}
```

To learn more about components, see [Components](/docs/guides/components).

### Depencency injection

Dependency injection system enables a component to utilize a dependency without instantiating it. Primno will automatically instantiate the dependency and pass it to the component. This allows you to write loosely coupled code that is easier to test.

The decorator `Injectable()` marks a class as a dependency that can be injected into a component.

The following example shows how to use the dependency injection system to share a service between components.

```ts
import { MnComponent, MnInject, Injectable } from '@primno/core';

// Mark the service as injectable.
@Injectable()
export class MyService {
    doSomething() {
        // Do something.
    }
}

@MnComponent({
    scope: {
        pageType: PageType.record
    }
})
export class MyComponent {
    constructor(
        private myService: MyService
    ) {
        // The service is automatically injected.
        this.myService.doSomething();
    }
}
```

To learn more about the dependency injection system, see [Dependency Injection](/docs/guides/dependency-injection).

### Primno CLI

The Primno CLI is the recommended way to create, develop and deploy your project to Power Apps.

Example of the CLI commands:

| Command     | Description                                            |
|-------------|--------------------------------------------------------|
| `mn new`    | Create a new project.                                  |
| `mn start`  | Start the development server.                          |
| `mn build`  | Build the project.                                     |
| `mn deploy` | Deploy the project to Power Apps.                      |
| `mn watch`  | Watch the project for changes and build.               |

To learn more about the Primno CLI, see [CLI](/docs/guides/cli).