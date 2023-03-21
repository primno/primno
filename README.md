# Primno - Framework for Model-Driven Apps

[![npm](https://img.shields.io/npm/v/@primno/core.svg)](https://www.npmjs.com/package/@primno/core)
[![npm](https://img.shields.io/npm/l/@primno/core.svg)](https://github.com/primno/primno/blob/main/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/primno/primno/test.yml)

Primno is a modern client-side framework for building JavaScript customizations for Model-Driven Apps of Power Apps and Dynamics 365 that provides:

- A [developer tool](https://github.com/primno/cli) to build, develop and deploy your javascript web-resources to Power Apps / Dynamics 365.
- A [component-based architecture framework](https://github.com/primno/primno/tree/main/packages/core) for building scalable javascript code.

> Primno is in beta stage and subject to change.

## Documentation

The full documentation can be found on [https://primno.io](https://primno.io).

- [Getting Started](https://primno.io/docs/getting-started)
- [Guides](https://primno.io/docs/guides)
- [API Reference](https://primno.io/docs/api-reference)

## Quick Start

Install Primno CLI:

```bash
npm install -g @primno/cli
```

Create a new project:

```bash
mn new my-project
```

## Packages

| Package | NPM | Description |
| --- | --- | --- |
| [@primno/core](https://github.com/primno/primno/tree/main/packages/core) | [![npm](https://img.shields.io/npm/v/@primno/core.svg)](https://www.npmjs.com/package/@primno/core) | Core functionality of Primno (dependency injection, events, components) |