---
sidebar_position: 3
description: Tool of Primno to manage your project from a terminal.
---

# CLI

CLI is the command-line interface tool of Primno to manage your project from a terminal.
It provides a set of commands to create a new project, run the developer mode, build the project, and more.

The executable name is `mn`.

## Installation

To install the CLI, run the following command:

```bash
npm install -g @primno/cli
```

## Commands

### new

The `new` command creates a new project.

```bash
mn new <name>
```

The `name` is the name of the project. It will be used as the name of the folder that will contain the project.

This command creates a new example project, which is explained in detail in [getting started](../getting-started/).

### start

The `start` command starts the developer mode.

```bash
mn start
```

This command deploy a special version of Primno that will load the entry points from your local machine. That means that you can edit the code and see the changes immediately after refreshing the page.

The loading of entry points is done by starting a local web server. The port of the web server is 12357 by default.

:::info
If you use the self-signed certificate (enabled by default), you will need to accept it in your browser.
:::

### build

The `build` command create a JS bundle for each entry points. The files are created in the `dist` folder.

```bash
mn build [options] [entry point]
```

The `entry point` is the name of the entry point that you want build. If not specified, it will build all entry points.

#### Options

| Option | Alias | Description |
| --- | --- | --- |
| `--production` | `-p` | Build the project in production mode. It will minify the bundle and remove the source map. |

### watch

The `watch` command watch for changes in the source code.

Files are built in development mode. That means that the JS bundle is not minified and the source map is generated.

```bash
mn watch [entry point]
```

The `entry point` is the name of the entry point that you want build. If not specified, it will build all entry points.

### deploy

The `deploy` command deploy the project to Power Apps as web resources.

It will deploy all entry points of the project.

```bash
mn deploy [options]
```

#### Options

| Option | Alias | Description |
| --- | --- | --- |
| `--production` | `-p` | Deploy the project in production mode. It will minify the bundle and remove the source map. |

### help

The `help` command display the help.

```bash
mn help
```