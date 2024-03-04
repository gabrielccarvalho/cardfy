# Contributing

Thanks for your interest in contributing to cardify. We are happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something familiar.

If you need any help, feel free to reach out to [@gabrielccarvalho](https://twitter.com/deliciadecampos)

## About this repository

This repository is a NextJS fullstack project.

- We use [bun](https://bun.sh/) as our package manager.

## Structure

This repository is structured as follows:

```
src
└── app
    ├── api
    └── app
components
└── ui
services
├── auth
└── database
```

| Path                  | Description                              |
| --------------------- | ---------------------------------------- |
| `src/app`             | The Next.js application for the website. |
| `src/app/api`         | All our backend logic.                   |
| `src/components`      | Our components.                          |
| `src/services`        | All our services config.                 |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/cardify.git
```

### Navigate to project directory

```bash
cd cardify
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
bun i
```

### Commiting
We use a semantic commit convention as follows:
> Please, refrain yourself to use `git commit -m`, use only
> `git commit` and add a brief description of your changes and
> the motivations that led you to push the commit.

#### Example:
`Feat 🎉: Add new page X`

| Type      | Emoji  |                          Description                               |
|---------- | ------ | ------------------------------------------------------------------ | 
| Feature   |   🎉   | new feature for the user, not a new feature for build script       |
| Fix       |   👨🏻‍🔧   | bug fix for the user, not a fix to a build script                  |
| docs      |   📝   | changes to the documentation                                       |
| style     |   🎨   | formatting, missing semi colons, etc; no production code change    |
| refactor  |   ♻️    | refactoring production code, eg. renaming a variable               |
| test      |   🧪   | adding missing tests, refactoring tests; no production code change |
| chore     |   🤖   | updating grunt tasks etc; no production code change                |

> Feel free to `git log` and check the latest commits to have more examples.