---
sidebar_position: 3
---

# Deploy

In this part, we will deploy the project to a Power Apps environment.

## Configuration

### Environment

To link the project to a Power Apps environnement, you need to configure the environment in the `primno.env.json` file.

Primno uses a dataverse [connection string](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/xrm-tooling/use-connection-strings-xrm-tooling-connect) to connect to the environment.

:::info
A easy way to get a connection string is to use the [XrmToolBox](https://www.xrmtoolbox.com/) tool.
:::

To learn more about supported connection string, see [Connection string](/docs/guides/configuration#connection-string) page.

Example of primno.env.json file:

```json title="primno.env.json"
[
    {
        "name": "dev",
        "connectionString": "AuthType=OAuth;Username=jsmith@contoso.onmicrosoft.com;Password=passcode;Url=https://contosotest.crm.dynamics.com;AppId=51f81489-12ee-4a9e-aaae-a2591f45987d;RedirectUri=app://58145B91-0C36-4500-8554-080854F2AC97;"
    }
]
```

### Solution

The deployment of the project is done in a solution.

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

This command build and deploy the `app` entry point as JS webresource in the solution configured in the `primno.config.json` file.

The webresource is added with a name following this format:

```text
{editorPrefix}_/{projectName}/js/app.js
```

Where 
- `{editorPrefix}` is the prefix of the editor in the selected solution.
- `{projectName}` is the name of the project. Here `myproject`.

For example, if you choose the default editor prefix `new`, your webresource will be named `new_/myproject/js/app.js`.

## Add JS to form

The JS web resource must be added to the `account` form to be usable and the `onload` event handler must be set to initialize Primno.

The function name to call is `mn_app.onFormLoad`.

:::caution
Ensure to check the `Pass execution context as first parameter` checkbox.
:::

:::info
Running the command `mn deploy` show the function name to call.
:::

:::info
To learn about how to add a event handler function to event, see [Add a event handler](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/events-forms-grids?tabs=add-event-handlers-unified-interface) page of Microsoft documentation.
:::

