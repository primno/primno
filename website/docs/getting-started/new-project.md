---
sidebar_position: 2
title: Create a new project
description: Create a new project and understand its structure.
---

# Create a new project

:::info
You must have [setup the environment](./setup) before creating a new project.
:::

To create a new project, execute the following command in your working directory:

```bash
mn new myproject
```

This command will create a new project in the current folder with the name "myproject".

Then enter in the project folder:

```bash
cd myproject
```

Open the project in Visual Studio Code:

```bash
code .
```

You will see the following files and folders:

```bash
myproject
├── node_modules
├── src # Source code directory
│   ├── list # List (home-grid, sub-grid and associated-grid) components
│   │   ├── contact.component.ts # Component that say hello when a button is clicked on a contact grid
│   │   └── list.module.ts # Main module of the components tree of page type "list"
│   ├── record # Record (form) components
│   │   ├── account # Account component and its sub-components
│   │   │   ├── account.component.ts # Component that runs when on account form
│   │   │   └── notify-column-change.component.ts # Sub-component of AccountComponent
│   │   └── record.module.ts # Main module of the components tree of page type "record"
│   └── entry-point # Entry points for Power Apps (JS web-resources)
│       └── main.ts # Main entry point with its main module. Load list and record modules
├── package.json
├── primno.config.json # Primno configuration file
├── primno.env.json # Primno environment configuration file
├── README.md
├── .gitignore
└── tsconfig.json
```

Each file is highly commented to explain its functioning and purpose.