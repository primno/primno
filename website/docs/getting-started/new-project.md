---
sidebar_position: 2
---

# Create project

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

You will see the following files and folders:

```bash
myproject
├── node_modules
├── src # Source code directory
│   ├── app # Main module directory
│   │   └── app.component.ts # Main component
│   │   └── app.module.ts # Main module
│   └── entry-point # Entry points for Power Apps (Webresources)
│       └── app.ts # Main entry point
├── package.json
├── primno.config.json # Primno configuration file
├── primno.env.json # Primno environment configuration file.
├── README.md
├── .gitignore
└── tsconfig.json
```

If not already done, open the project in Visual Studio Code:

```bash
code .
```