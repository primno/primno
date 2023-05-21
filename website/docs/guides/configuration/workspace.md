---
title: Setup workspace configuration of Primno
sidebar_position: 1
description: Setup the build, deploy, and start the dev mode of your project. Link your workspace to a web resource of your solution.
sidebar_label: Workspace
---
# Workspace configuration of Primno

The workspace configuration is stored in the `primno.json` file. It contains the following properties:

Property | Description | Default value
--- | --- | ---
`name` | Name of the project. | Name of the folder that contains the project.
`version` | Version of the project. | `1.0.0`
`sourceRoot` | Path of the source code. | `src`
`distDir` | Path of the output files. | `dist`
`build` | [Build configuration](#build) | -
`deploy` | [Deploy configuration](#deploy) | -
`serve` | [Serve configuration](#serve) | -

## Build

This configuration is used by the `mn build` and `mn watch` commands to build the project.

The build configuration contains the following properties:

Property | Description
--- | ---
`moduleNameTemplate` | [Format of prefix](#module-name-template) of an external function. Used when [registering](../events/manual-registration.md) an event.

### Module name template

The module name template is a string that will be used to generate the name of the prefix of an external function (called by Power Apps). It can contain the following placeholders:

Placeholder | Description
--- | ---
`{{projectName}}` | Name of the project.

The default module name template is `mn_{{projectName}}`.

## Deploy

This configuration is used by the `mn deploy` command to deploy the project to Power Apps.

The deploy configuration contains the following properties:

Property | Description
--- | ---
`environment` | Environment name to deploy to. Must be defined in the `primno.env.json` file.
`solutionUniqueName` | Unique name of the solution to deploy to.
`webResourceNameTemplate` | [Template of the name of the web resource](#web-resource-name-template) of the entry point.

### Web resource name template

The web resource name template is a string that will be used to generate the name of the web resource. It can contain the following placeholders:

Placeholder | Description
--- | ---
`{{editorName}}` | Editor prefix (without the _).
`{{projectName}}` | Name of the project.

The default web resource name template is `{{editorName}}_/js/{{projectName}}.js`.

## Serve

This configuration is used by the `mn start` command to start the local web server.

The serve configuration contains the following properties:

Property | Description | Default value
--- | --- | ---
`port` | Port of the web server. | `12357`
`https` | Set to `true` to use HTTPS. | `true`
`certificate` | [Certificate configuration](#certificate) | -

### Certificate

The certificate configuration is used to configure the HTTPS certificate of the web server.

The certificate configuration contains the following properties:

Property | Description | Default value
--- | --- | ---
`pfx` | Optional path of the PFX file. | `undefined`
`pfyPassword` | Optional password of the PFX file. | `undefined`
`selfSigned` | Set to `true` to generate a self-signed certificate. It is the recommended way. | `true`