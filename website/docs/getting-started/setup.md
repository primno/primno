---
sidebar_position: 1
description: Install required tools and setup the environment.
---

# Setup

In this part, we will setup the environment.

## Pre-requisites

To use Primno, you need to install the following tools:

- [Node.js 16 or higher](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download) or an other IDE / text editor of your choice.

In this guide, we will use Visual Studio Code.

You must have a Power Apps or a Dynamics 365 CE environment and a user with administrator or customizer role.

:::info
You can use the [free trial](https://powerapps.microsoft.com/en-us/pricing/) of Power Apps to test Primno.
:::

It is recommended to have a basic knowledge of Typescript / JavaScript and [Client API Reference](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference).

## Installation

Once you have installed the pre-requisites, install primno cli globally with the following command:

```bash
npm install @primno/cli -g
```

Primno CLI is a command line tool that will help you to create, debug and deploy your projects.
