# javascript-lib-template

[![OpenSSF Scorecard](https://img.shields.io/ossf-scorecard/github.com/insurgent-lab/javascript-lib-template?label=openssf%20scorecard)
](https://securityscorecards.dev/viewer/?uri=github.com/insurgent-lab/javascript-lib-template)
[![Discord](https://img.shields.io/discord/1113785800329531473?logo=discord)](https://discord.gg/zsNC4Hqd6h)

A GitHub repository template for Open Source JavaScript libraries (ESM) following best practices.

- Linting & formatting with [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- Testing with [Jest](https://jestjs.io/)
- Automated dependency updates with [Renovate Bot](https://www.mend.io/renovate-free/)
- Conventional commits with [`commitlint`](https://commitlint.js.org/#/)
- Automated version management, changelog generation and package publishing with [`semantic-release`](https://semantic-release.gitbook.io/semantic-release/)
- Code Quality, Security and Coverage with [SonarCloud](https://sonarcloud.io).
- Security score with [OSSF Scorecard](https://github.com/ossf/scorecard)
- issues/PR templates, code of conduct, contributing docs & security policy

## Spinning up your repo (< 15 mins)

- [create your repository from this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).
- find and replace those variables with the correct values:

| Variable                               | Description                                                                                                                                                                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{{PACKAGE_NAME}}`                     | `npm` package name                                                                                                                                                                                                    |
| `{{SHORT_DESCRIPTION}}`                | short description of your library                                                                                                                                                                                     |
| `{{REPOSITORY_OWNER}}`                 | GitHub account owning the repository                                                                                                                                                                                  |
| `{{REPOSITORY_NAME}}`                  | repository name                                                                                                                                                                                                       |
| `{{DISCORD_SERVER_ID}}`                | [ID of your Discord community server](https://shields.io/badges/discord)                                                                                                                                              |
| `{{DISCORD_SERVER_URL}}`               | invite URL for your Discord community server                                                                                                                                                                          |
| `{{AUTHOR_NAME}}`                      | author's name                                                                                                                                                                                                         |
| `{{AUTHOR_EMAIL}}`                     | author's email                                                                                                                                                                                                        |
| `{{AUTHOR_GITHUB_USERNAME}}`           | author's GitHub account username                                                                                                                                                                                      |
| `{{COPYRIGHT_OWNER}}`                  | owner of the copyright                                                                                                                                                                                                |
| `{{COPYRIGHT_YEAR}}`                   | year of first publication                                                                                                                                                                                             |
| `{{CODEOWNER}}`                        | [GitHub user or team for `CODEOWNERS`](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-syntax) (without leading `@`) |
| `{{SONARCLOUD_PROJECT_KEY}}`           | [SonarCloud](https://sonarcloud.io/projects) project key                                                                                                                                                              |
| `{{SECURITY_POLICY_EMAIL}}`            | email that should be used to report security vulnerabilities                                                                                                                                                          |
| `{{SECURITY_POLICY_PGP_FINRGERPRINT}}` | fingerprint of the PGP key that should be used to report security vulnerabilities                                                                                                                                     |
| `{{SECURITY_POLICY_PGP_KEYSERVER}}`    | keyserver hosting your PGP key (e.g. `keyserver.ubuntu.com`)                                                                                                                                                          |
| `{{SECURITY_POLICY_PGP_URL}}`          | full URL to access your PGP key on the keyserver (e.g. `https://keyserver.ubuntu.com/pks/lookup?search=0x...&fingerprint=on&      op=index`)                                                                          |

- add some `keywords` in `package.json`.
- create and add the workflows secrets:
  - [create a GitHub fine-grained token for the release pipeline](https://stackoverflow.com/a/76550826/5567941) and add it to your repository secrets as `CI_GITHUB_TOKEN`.
  - [create a npm granular token for the package](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-granular-access-tokens-on-the-website) and add it to your repository secrets as `NPM_TOKEN`.
  - [create a GitHub token for OSSF ScoreCard](https://github.com/ossf/scorecard-action/blob/main/docs/authentication/fine-grained-auth-token.md) and add it to your repository secrets as `SCORECARD_GITHUB_TOKEN`.
  - [create a SonarCloud token](https://sonarcloud.io/account/security) and add it to your repository secrets as `SONAR_TOKEN`.
- [add the Renovate app to your repository](https://github.com/apps/renovate/installations/select_target).
- [add the Step Security app to your repository](https://github.com/apps/stepsecurity-actions-security)
- make sure you [enabled your Discord server's widget](https://shields.io/badges/discord)
- run `npm run lint:fix`.
- remove the `---` below and everything above it, commit changes, and you're good to go 🚀

---

# {{PACKAGE_NAME}}

> {{SHORT_DESCRIPTION}}

[![Version](https://img.shields.io/npm/v/{{PACKAGE_NAME}}?logo=npm)](https://www.npmjs.com/package/{{PACKAGE_NAME}})
[![Build](https://img.shields.io/github/actions/workflow/status/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}}/release.yml?logo=github)](https://github.com/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}}/actions/workflows/release.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}}/codeql.yml?logo=github&label=CodeQL)](https://github.com/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}}/actions/workflows/codeql.yml)
[![Coverage](https://img.shields.io/sonar/coverage/{{SONARCLOUD_PROJECT_KEY}}?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/summary/overall?id={{SONARCLOUD_PROJECT_KEY}})
[![OpenSSF Scorecard](https://img.shields.io/ossf-scorecard/github.com/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}}?label=openssf%20scorecard)
](https://securityscorecards.dev/viewer/?uri=github.com/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}})
[![Discord](https://img.shields.io/discord/{{DISCORD_SERVER_ID}}?logo=discord)]({{DISCORD_SERVER_URL}})

## Installation

```console
npm install {{PACKAGE_NAME}}
```

## Community

Join the [Discord server]({{DISCORD_SERVER_URL}})! Here you can discuss issues and get help in a more casual forum than GitHub.

## Contributing

This project is looking for help! If you're interested in helping with the project, please take a look at our [contributing documentation](https://github.com/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}}/blob/main/CONTRIBUTING.md).

### Submitting Bugs/Issues

Please have a look at our [contributing documentation](https://github.com/{{REPOSITORY_OWNER}}/{{REPOSITORY_NAME}}/blob/main/CONTRIBUTING.md), it contains all the information you need to know before submitting an issue.
