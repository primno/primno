---
sidebar_position: 3
---

# Deploy

In this part, we will deploy the project to a Power Apps environment.

## Configuration

To link the project to a Power Apps environnement, you need to configure the environment in the `primno.env.json` file.

Primno uses a dataverse [connection string](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/xrm-tooling/use-connection-strings-xrm-tooling-connect) to connect to the environment.

Example of primno.env.json file:

```json title="primno.env.json"
[
    {
        "name": "dev",
        "connectionString": "AuthType=OAuth;Username=jsmith@contoso.onmicrosoft.com;Password=passcode;Url=https://contosotest.crm.dynamics.com;AppId=51f81489-12ee-4a9e-aaae-a2591f45987d;RedirectUri=app://58145B91-0C36-4500-8554-080854F2AC97;"
    }
]
```