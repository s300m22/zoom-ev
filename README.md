# Zoomev Web

![CI](https://github.com/dotintent/zoomev-web/workflows/Continuous%20Integration/badge.svg)

## Table of Contents

- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Prepare and fill secrets](#-prepare-and-fill-secrets)
  - [Running the app](#-running-the-app)
- [Conventional Commits](#-conventional-commits)
- [Available scripts](#-available-scripts)
- [Hygen - Creating React Elements](#hygen-creating-react-elements)
- [Useful docs](#-useful-docs)
- [Security concerns](#-security-concerns)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 12
- [Yarn](https://classic.yarnpkg.com/lang/en/) >=1.22

### Installation

```shell script
yarn
```

trigger pipeline

### Prepare and fill secrets

Copy and paste .env.example into .env.development and fill all secrets.

> **Note:** In order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`

| Secret                                         | Description                                           |
| ---------------------------------------------- | ----------------------------------------------------- |
| NODE_ENV                                       | Exposes current environment. Built in nextJS          |
| NEXT_PUBLIC_BASE_URL                           | Base url of this application                          |
| NEXT_PUBLIC_API_URL                            | URL to backend. Don't provide `/qraphql` endpoint     |
| NEXT_PUBLIC_COGNITO_AWS_REGION                 | -                                                     |
| NEXT_PUBLIC_COGNITO_USER_POOL_ID               | -                                                     |
| NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID        | -                                                     |
| NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT             | Defines contentful environment for fetching           |
| NEXT_PUBLIC_CONTENTFUL_SPACE_ID                | Defines space in contentful organisation for fetching |
| NEXT_PUBLIC_CONTENTFUL_DELIVERY_ACCESS_TOKEN   | Main API key for contentful                           |
| NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN | Generating types from contentful                      |
| NEXT_PUBLIC_RECAPTCHA_KEY                      | Google ReCaptcha Key (v3)                             |

### Running the app

```shell script
yarn start:dev
```

## Conventional Commits

Commitlint checks if your commit messages meet the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format.

Example:

```git
feat(blog): add comment section
```

Common types according to commitlint-config-conventional (based on the Angular convention) can be:
[conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)

## Available scripts

To run script, in terminal type `yarn {script}`.

| Script                            | Description                                                      | Note                                         |
| --------------------------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| `prebuild`                        | Runs yarn clean                                                  | It runs automatically before every build     |
| `build`                           | Builds app                                                       |                                              |
| `check`                           | Runs lint, prettier and type check                               |                                              |
| `clean`                           | Removes build directory if it exists                             |                                              |
| `contentful:update-types`         | Generates ts types based on contentful content models            |                                              |
| `format`                          | Fix prettier                                                     |                                              |
| `format:check`                    | Checks prettier rules                                            |                                              |
| `graphql:generate-typedefs`       | Generates ts types and resources hooks based on graphql endpoint | For more details check `graphql-codegen.yml` |
| `graphql:generate-typedefs:watch` | Runs type generation in watch mode                               |                                              |
| `hygen:element`                   | Creates new standarized React component, story and style file    | Run `hygen element help` for more details    |
| `preinstall`                      | Checks is yarn was used package manager                          | It runs automatically before every install   |
| `lint`                            | Fix linter                                                       |                                              |
| `lint:check`                      | Checks linter rules                                              |                                              |
| `serve:coverage`                  | Serve static files with coverage                                 | Before serve, run `yarn test:coverage`       |
| `sort:packageJson`                | Sort alphabetical all package.json in project                    | It runs automatically on every push          |
| `start`                           | Starts app                                                       |                                              |
| `start:dev`                       | Starts app in dev mode                                           |                                              |
| `test`                            | Runs test for utils and helpers                                  |                                              |
| `test:coverage`                   | Runs test and build dir with coverage                            |                                              |
| `test:watch`                      | Runs test in watch mode                                          |                                              |
| `type-check`                      | Checks TypeScript types                                          |                                              |
| `update-types`                    | Update types based on api and contentful                         |                                              |

## Hygen - Creating React Elements

Hygen is the dev tool that provides the ability for generating scalable code. All project templates are defined in the `__template` directory.
For more details check [Hygen docs](https://www.hygen.io/docs/quick-start/).
Instead of creating manually new React elements just run `hygen:element` which will Lead You to a faster starting point in creating new elements.

## Useful docs

- [Next.js](https://nextjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL code generator](https://graphql-code-generator.com/)
- [Styled-components](https://styled-components.com/docs)
- [Hygen](https://www.hygen.io/)

## 🔒 Security concerns

This project meets safety and privacy protection standards required by ISO 27001. All applied cybersecurity solutions are described [in a separate file - SECURITY.md](./SECURITY.md)

Making change to trigger pipeline
