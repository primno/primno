---
title: Upload a web-resource to Power Apps and register events
sidebar_position: 3
description: Link your project to Power Apps environment and deploy it to a solution. Register events to be able to use them in your Power Apps.
sidebar_label: Deploy to Power Apps
---

# Deploy to Power Apps

In this part, we will deploy the project to your Power Apps environment with a connection string.

## Configuration

Before deploying the project, you need to link it to your environment and solution.

### Environment

To link the project to your environnement, you need to modify the `primno.env.json` file at the root of the project.

Primno uses a dataverse [connection string](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/xrm-tooling/use-connection-strings-xrm-tooling-connect) to connect to the environment.

If you are using an online sandbox environment, you can quickly setup your `primno.env.json` by using the following. Replace the `Username` and `Url` with your own values. It will use `device code` OAuth flow that will ask you to login in a browser.

```json title="primno.env.json"
[
    {
        "name": "dev",
        "connectionString": "AuthType=OAuth;Username=jsmith@contoso.onmicrosoft.com;Url=https://contosotest.crm.dynamics.com;TokenCacheStorePath=./cache/token.json"
    }
]
```

If you are using an other environment type, or if you want to use a different authentication method, see [connection string](../guides/configuration/environment.md#connection-string) page for more information.

### Solution

The deployment of the project is done by uploading the JS web-resource in a solution.

Create a solution in Power Apps and copy the solution unique name.

:::info
To create a solution, see [Create a solution](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-solution) page of Microsoft documentation.
:::

To link the solution in your project, you need to edit the `primno.config.json` file and change the `solutionUniqueName` property of the `deploy` section.

Example:

```json title="primno.config.json"
{
    "deploy": {
        "environment": "dev",
        "solutionUniqueName": "mysolution"
    }
}
```

## Upload

To deploy the project, run the following command:

```bash
mn deploy
```

This command build and deploy the `app` entry point as JS web-resource in the solution configured in the `primno.config.json` file.

The web-resource is added with a name following this format:

```text
{editorPrefix}_/{projectName}/js/app.js
```

Where 
- `{editorPrefix}` is the prefix of the editor in the selected solution.
- `{projectName}` is the name of the project. Here `myproject`.

For example, if you choose the default editor prefix `new`, your web-resource will be named `new_/myproject/js/app.js`.

## Add events handlers

Now that the javascript web resource is uploaded, the Primno's events handlers need to be associated to an account form and a button command to the contact sub-grid.

### Account form

The JS web resource must be added to the `account` form to be usable and the `onload` event handler must be set to initialize Primno.

The column change event handler of the `name` and `telephone1` columns don't need to be added because Primno will add them automatically at runtime.

To find out more about the events automatically subscribed by Primno see [Events](../guides/events.md) page.

To register the `onload` event handler, the function name to call is `mn_app.onFormLoad`.

:::caution
Ensure to check the `Pass execution context as first parameter` checkbox.
:::

Below is an example of on load event handler added to an `account` form.
![Customization of account form](/img/getting-started/account-onload-customization.png)

:::tip
Running the command `mn deploy` show the function name to call.
:::

:::info
To learn more about how to add a event handler function to an event, see [Add a event handler](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/events-forms-grids?tabs=add-event-handlers-unified-interface) page of Microsoft documentation.
:::

At this point, you can open a `account` record and see:

| Event | Column | Message |
| --- | --- | --- |
| Loading | - | `Welcome from Primno` |
| Column change | name | `The value of the column name changed from {oldValue} to {newValue}` |
| Column change | telephone1 | `The value of the column telephone1 changed from {oldValue} to {newValue}` |

### Contact sub-grid button

The event handler `mn_app.onCommandInvoke` must be register on a button command of the `contact` sub-grid.

The following parameters must be set:

| Parameter | Value |
| --- | --- |
| String parameter | `hello` |
| SelectedControl | - |
| PrimaryControl | - |

:::info
To learn about how to add a button command, see [Customize commands and ribbons](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/customize-commands-ribbon) page of Microsoft documentation.
This is can be done via [Ribbon Workbench](https://www.xrmtoolbox.com/plugins/RibbonWorkbench2016/) or the new [Command Designer](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/use-command-designer) tool.
:::

Below is an example of a button command added to the `contact` sub-grid with the Command Designer.
![Contact sub-grid button](/img/getting-started/command-bar.png)

Now, when you click on the button, you should see the following message: `Hello from Primno!`.