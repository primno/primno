---
sidebar_position: 1
---

# Introduction

Primno is a Typescript framework for model driven apps of Power Apps / D365 that includes:

- A developer tool to build and deploy your javascript webresources to Power Apps / Dynamics 365
- A component-based architecture (CBA) for building scalable javascript code.

With Primno, you can write code for forms and grid. Eg: on form load, on command invoke.

<table>
<tr>
<th>Before</th>
<th>After</th>
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

Primno uses Angular's component style to make learning easier.

### Components

Components are the building blocks of an application. They are the smallest units of code that can be reused and composed.

A component is a class decorated with `@MnComponent()` specifying the scope of the component.

The follow example shows a component that will be executed only in the form page.
```ts
import { MnComponent } from '@primno/core';

@MnComponent({
    scope: {
        // This component will be available only in the form page.
        pageType: 'record'
    }
})
export class MyComponent {
    // Behavior of the component is coded here.
}
```

A component can subscribe to Power Apps / D365 events.
    
```ts
import { MnComponent, MnOnLoad, MnOnFieldChange, FormEventArgs } from '@primno/core';

@MnComponent({
    scope: {
        // This component will be available only in the form page.
        pageType: 'record'
    }
})
export class MyComponent {
    @MnOnLoad()
    onLoad(eventArg: FormEventArgs) {
        // This method will be executed when the form is loaded.
    }

    @MnOnFieldChange('firstname')
    onFirstNameChange(eventArg: FormEventArgs) {
        // This method will be executed when the firstname field is changed.
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