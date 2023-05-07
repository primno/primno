---
sidebar_position: 2
title: Create easily your first Primno project with Primno CLI
description: Create a new project with CLI, understand the structure of a project.
sidebar_label: Create a new project
---

# Create a new project

:::info
You must have [setup the environment](./setup.md) before creating a new project.
:::

To create a new project, execute the following command in your working directory:

```bash
mn new myproject
```

This command will create a new project in the current folder with the name "myproject".

Then, open the project in Visual Studio Code:

```bash
code myproject
```

You will see the following files and folders:

```bash
myproject
├── node_modules
├── src # Source code directory
│   ├── list # List (home-grid, sub-grid and associated-grid) components
│   │   ├── contact # Contact component and its sub-components
│   │   │   └── contact.component.ts # Component that say hello when a button is clicked on a contact grid
│   │   └── list.module.ts # Main module of the components tree of page type "list"
│   ├── record # Record (main form, quick create form) components
│   │   ├── account # Account component and its sub-components
│   │   │   ├── account.component.ts # Component that runs when on account form.
│   │   │   └── notify-column-change # Sub-component of AccountComponent
│   │   │       └── notify-column-change.component.ts # Notify the user when a column value is changed
│   │   └── record.module.ts # Main module of the components tree of page type "list"
│   └── app.entry.ts # Entry point for Power Apps. Contains the main module that load list and record modules.
├── package.json
├── primno.config.json # Configuration file of Primno CLI.
├── primno.env.json # Connection string of your PowerApps / Dynamics 365 environment.
├── README.md
├── .gitignore
└── tsconfig.json
```

Each file is highly commented to explain its functioning and purpose.