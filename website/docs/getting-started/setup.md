---
sidebar_position: 1
description: Install required tools and setup the environment.
---

# Setup

:::info
Make sure you have read the [introduction](../intro.md) and [getting started overview](index.mdx) before starting this chapter.
:::

## Pre-requisites

To use Primno, you need to install the following tools:

- [Node.js 16 or higher](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download) or an other IDE / text editor of your choice.

In this guide, we will use Visual Studio Code.

You must have a Power Apps or a Dynamics 365 CE environment and a user with administrator or customizer role.

:::tip
You can use the [free trial](https://powerapps.microsoft.com/en-us/pricing/) of Power Apps to test Primno.
:::

It is recommended to have a basic knowledge of Typescript / JavaScript and [Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference).

:::tip
If you are not familiar with the Client API Reference, you can follow the [Common Actions in Client Script](https://learn.microsoft.com/en-us/training/modules/common-actions-client-script-power-platform/) course on Microsoft Learn.
:::

## Installation

Once you have installed the pre-requisites, install primno cli globally with the following command:

```bash
npm install @primno/cli -g
```

Primno CLI is a command line tool that will help you to create, debug and deploy your projects.

## Customization

This project required an active account form with a sub-grid of contacts.

The following fields must be present on the account form:
- `name`
- `telephone1`

The screenshot below is an example of expected customization.
![Account form](/img/getting-started/customization.png)