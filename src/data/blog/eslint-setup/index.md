---
title: "My Personal Eslint Setup"
description: "Recommend to do it after initializing your project."
date: "May 30 2025"
---

## Setup from [antfu/eslint-config](https://github.com/antfu/eslint-config)

1. Install [@antfu/eslint-config](https://github.com/antfu/eslint-config)

```cmd
pnpm i -D @antfu/eslint-config
```

2. Manually set up `eslint.config.mjs` under project root

```js
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  {
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
    },
  },
);
```

3. Add lint scripts for `package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

4. Install required eslint config plugins

```cmd
pnpm lint
```

## VS Code settings for eslint

1. Enable lint auto fix on save on IDE (VS Code)

Add the following settings to `.vscode/settings.json`:

```json
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```

2. Stage the `.vscode/settings.json` in order to commit and push to remote

Normally, the file under `.vscode` will be ignored inside `.gitignore`, you can run the following cmd to force stage it:

```cmd
git add .vscode/settings.json -f
```

Then, you will find it has been staged!🎉

## Pre-commit hooks with [Husky](https://typicode.github.io/husky/get-started.html)

Enable the lint before each commit happens

1. Install package

```cmd
pnpm i -D husky
```

2. Husky init

The `init` command simplifies setting up husky in a project. It creates a `pre-commit` script in `.husky/` and updates the `prepare` script in `package.json`

```cmd
pnpm exec husky init
```

3. Update `.husky/pre-commit`

For now, just use script `pnpm lint` to enable lint before each commit:

```cmd
pnpm lint
```

Test it out, try to make some lint errors and commit it, you should see some lint errors!🎉

In some cases, you want to skip the pre-commit hooks(which means disable lint check pre-commit):

```cmd
git commit -m "..." -n # Skips Git hooks
```

However, each time we commit, the lint will check the whole codebase, which is kind of dump and will slow the process down...

## Optimization: Set up [lint-staged](https://github.com/lint-staged/lint-staged)

Instead to check the whole codebase, we use [lint-staged](https://github.com/lint-staged/lint-staged) to only run the lint for changed files.

1. Install

```cmd
pnpm i -D lint-staged
```

2. Add the `lint-staged` command under `package.json`

```json
{
  "lint-staged": {
    "*": "pnpm lint"
  }
}
```

3. Stage some changes and run the following command to test it out if the lint only runs for these staged changes:

```cmd
pnpm exec lint-staged
```

Lint should only works for these staged files!🎉

4. Update `.husky/pre-commit`

Remove `pnpm lint` script inside and update, so that the lint-staged cmd will be executed before each commit:

```cmd
pnpm exec lint-staged
```

Test it out, make some changes and try to commit, you will be noticed how many files have been checked by eslint and if there are any lint errors or not.

## Optional: Github actions for eslint check when making PR

Enable lint check for each PR, this is optional but recommended personally.

1. Write workflows for lint

Create `.github/workflows/lint.yaml` file under project root, paste following:

```yaml
name: Lint
on:
  pull_request:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22.x
      - run: pnpm i
      - run: pnpm lint
```

This workflow will be triggered each time the PR is made from XXX to `master` branch.

Test it out, checkout a new branch, make a few changes and commit it, make a PR to `master` branch, you should see the action is running!🎉
