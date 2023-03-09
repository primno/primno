---
sidebar_position: 2
description: Environment of Power Apps to deploy to.
---

# Environment

The environments of Power Apps / D365 are stored in the `primno.env.json` file.

It store the authentication information to connect to environments.

Because this file can contains sensitive information, it should not be saved in a version manager.
By default, `primno.env.json` is ignored by Git through the `.gitignore` file.

This JSON file is a array of environment objects. Each environment object contains the following properties:

- `name`: Name of the environment.
- `connectionString`: [Connection string](#connection-string) of the environment.

The `primno.json` file contains a `environment` property that references the environment to deploy to.

Example:

```json
[
  {
    "name": "Default",
    "connectionString": "AuthType=OAuth;Url=https://<Environnement>.crm.dynamics.com;UserName=<UserName>;Password=<Password>"
  }
]
```

## Connection string

The connection string is a string that contains the authentication information to connect to a Power Apps / D365 environment.
Primno uses the connection string format of Xrm Tooling.

The provided connection must have a admin or a customizer role.

Connection string supports:
- Dataverse (Dynamics 365 online).
- Dynamics 365 CE (on-premises) **since version 9.0**.

To learn more about connection string, see:
- [Dataverse connection string](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/xrm-tooling/use-connection-strings-xrm-tooling-connect).
- [Dynamics 365 (on-premise) connection string](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/xrm-tooling/use-connection-strings-xrm-tooling-connect?view=op-9-1).

:::tip
A easy way to get a connection string is to use the [XrmToolBox](https://www.xrmtoolbox.com/) tool.

Create a new connection by the wizard and copy the connection string though the `Show the connection string of this connection` button.
:::

:::caution
Connection string provides many `AuthType`, but only `OAuth` is supported by Primno.
:::

## OAuth

To authenticate though OAuth, you must [register an application](#register-an-application) in an authentication provider (ADFS or Azure AD) and set the `AuthType` property to `OAuth`.

### Flow

The OAuth flow is determined by the parameters of the connection string.

| Parameters | Flow | Description |
|-----------|--------|-------------|
| `UserName` and `Password` | User password | Authenticate with a user name and a password. |
| `ClientId` and `ClientSecret` | Client credential | Authenticate as a service principal, not a user. |
| `UserName` only | Device code | Authenticate by a url and a code. |

### Token cache

If you don't want to authenticate each time you run the CLI, you must enable persistent token caching by setting a file path in the `TokenCacheStorePath` property. Eg: `./cache/token.json`.

The token is stored encrypted in the file and will be used for the next authentication.

:::tip
If you switch between environments, but use the same account, set the same `UserName` and `TokenCacheStorePath` properties to connect without re-authentication.
:::

### Register an application

#### Dataverse

In Dataverse environment, you must register an application in Azure AD if you don't uses a Sandbox environment.
To learn more, see [Register an app in Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

:::tip
Sandboxes provides a pre-registered application that will be used if you don't specify the `ClientId` property.
:::

#### On-premises

In on-premises environment, you must have a CBA (Claim-Based Authentication) configured or a [IFD (Internet Facing Deployment)](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/deploy/configure-ifd-for-dynamics-365?view=op-9-1) configured by using ADFS 2019+ with [OAuth 2.0 support enabled](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/deploy/update-deployment-configuration-settings?view=op-9-1#oauthclaimssettings).

To register an application in ADFS, see [Add-AdfsClient](https://learn.microsoft.com/en-us/powershell/module/adfs/add-adfsclient?view=windowsserver2022-ps) and [Grant-AdfsApplicationPermission](https://learn.microsoft.com/en-us/powershell/module/adfs/grant-adfsapplicationpermission?view=windowsserver2022-ps) PowerShell commands.

## Examples

| Environment | OAuth flow | Connection string |
|-------------|------------|-------------------|
| Dataverse   | Device code | `AuthType=OAuth;Url=https://<Environnement>.crm.dynamics.com;UserName=<UserName>` |
| Dataverse   | User password | `AuthType=OAuth;Url=https://<Environnement>.crm.dynamics.com;UserName=<UserName>;Password=<Password>` |
| Dataverse   | Client credential | `AuthType=OAuth;Url=https://<Environnement>.crm.dynamics.com;ClientId=<ClientId>;ClientSecret=<ClientSecret>;RedirectUri=<RedirectUri>` |
| On-premises | User password | `AuthType=OAuth;RedirectUri=<RedirectUri>;Url=https://<D365Url>;UserName=<Domain>\<UserName>;Password=<Password>` |
