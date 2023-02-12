---
sidebar_position: 2
description: Environment of Power Apps to deploy to.
---

# Environment

The environments of Power Apps / D365 are stored in the `primno.env.json` file.

This file contains sensitive information. It should not be saved in a version manager.

By default, the `primno.env.json` file is ignored by Git through the `.gitignore` file.

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

The connection string is a string that contains the information to connect to a Power Apps / D365 environment.
Primno uses the connection string format of Xrm Tooling.

The provided connection must have the permission a admin or a customizer role.

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

The following table shows the supported `AuthType` property values by environment type:

| AuthType                           | Dataverse (Online) | On-premises        |
|------------------------------------|--------------------|--------------------|
| OAuth                              | :heavy_check_mark: | :heavy_check_mark: |
| AD                                 | :x:                | :heavy_check_mark: |
| Certificate                        | :x:                | :x:                |

### OAuth

To authenticate though OAuth, you must register an application in authentication provider.

For now, only User Password flow is supported by the `OAuth` type.

#### Dataverse

In Dataverse environment, you must register an application in Azure AD if you don't uses a Sandbox environment.
To learn more, see [Register an app in Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

Sandboxes provides a pre-registered application that will be used if you don't specify the `ClientId` property.

#### On-premises

In on-premises environment, you must have a CBA (Claim-Based Authentication) configured or a [IFD (Internet Facing Deployment)](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/deploy/configure-ifd-for-dynamics-365?view=op-9-1) configured by using ADFS 2019+ with [OAuth 2.0 support enabled](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/deploy/update-deployment-configuration-settings?view=op-9-1#oauthclaimssettings).

To register an application in ADFS, see [Add-AdfsClient](https://learn.microsoft.com/en-us/powershell/module/adfs/add-adfsclient?view=windowsserver2022-ps) and [Grant-AdfsApplicationPermission](https://learn.microsoft.com/en-us/powershell/module/adfs/grant-adfsapplicationpermission?view=windowsserver2022-ps) PowerShell commands.

### AD

The `AD` type is only supported by on-premises environment. It doesn't work with environments that uses ADFS, if you want to use ADFS, you must use the `OAuth` type.

The authentication is done by NTLM v2.

The integrated windows authentication is not supported, that means that you need to specify the `UserName` and `Password` properties.

## Examples

Dynamics 365 Online : `AuthType=OAuth;Url=https://<Environnement>.crm.dynamics.com;UserName=<UserName>;Password=<Password>`

Dynamics 365 CE (on-premises) OAuth : `AuthType=OAuth;RedirectUri=<RedirectUri>;ClientSecret=<ClientSecret>;Url=https://<D365Url>;UserName=<Domain>\<UserName>;Password=<Password>`

Dynamics 365 CE (on-premises) AD (NTLM authentication): `AuthType=AD;Url=https://<D365Url>;UserName=<AdUserName>;Domain=<Domain>;Password=<Password>`