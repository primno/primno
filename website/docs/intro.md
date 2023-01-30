---
sidebar_position: 1
---

# Introduction

Primno is a modern Typescript framework for building faster a scalable javascript code for Model-Driven Apps of Power Apps that provides:
- A developer tool to build, develop and deploy your javascript webresources to Power Apps / Dynamics 365.
- A component-based architecture framework for building scalable javascript code.

Primno works with:
- [Model-Driven](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/) Apps of Power Apps.
- Dynamics 365 Apps Online.
- [Dynamics 365 Customer Engagement](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/overview?view=op-9-1) (On-Premises) since version 9.0.

With Primno, you can write code for forms and grid. Eg: on form load, on command invoke.

<table>
<tr>
<th>Without Primno</th>
<th>With Primno</th>
</tr>
<tr>
<td>

```ts
function onLoad() {
    // Do something
}
```
</td>
<td>

```ts
@MnComponent()
class MyComponent {
    @MnOnFormLoad()
    onFormLoad() {
        // Do something
    }
}
```
</td>
</tr>
</table>

## Overview

Primno provides a component-based architecture (CBA) for building scalable javascript code.
This architecture is very popular in web development and is used by Angular, React, Vue, etc.

Primno uses Angular's component style to make learning easier.

### Components

Components are the building blocks of an application. They are the smallest units of code that can be reused and composed.

A component is a class decorated with `@MnComponent()` specifying the scope of the component.
The scope describes where the component can be run, eg: form, grid, app, entity, etc.

The follow example shows a component that will be executed only in the forms pages of the contact entity.
```ts
import { MnComponent } from '@primno/core';

@MnComponent({
    scope: {
        // This component will be available only in the forms pages of the contact entity.
        pageType: 'record',
        entityName: 'contact'
    }
})
export class MyComponent {
    // Behavior of the component is coded here.
}
```

A component can subscribe to Power Apps / D365 events with specific decorators.
Primno automatically subscribes the component to the events and execute the method when it is fired by Power Apps.

```ts
import { MnComponent, MnOnLoad, MnOnColumnChange, FormEventArgs } from '@primno/core';

@MnComponent({
    scope: {
        pageType: 'record',
        entityName: 'contact'
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

### Depencency injection

Dependency injection system enables a component to utilize a dependency without instantiating it. Primno will automatically instantiate the dependency and pass it to the component. This allows you to write loosely coupled code that is easier to test.

The decorator `Injectable()` marks a class as a dependency that can be injected into a component.

The folowing example shows how to use the dependency injection system to share a service between components.

```ts
import { MnComponent, MnInject, Injectable } from '@primno/core';

// Mark the service as injectable.
@Injectable()
export class MyService {
    // Service code here.
}

@MnComponent()
export class MyComponent {
    constructor(
        private myService: MyService
    ) {
    }
}
```