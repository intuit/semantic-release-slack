# @intuit/semantic-release-slack

[![npm](https://img.shields.io/npm/v/@intuit/semantic-release-slack.svg)](https://www.npmjs.com/package/@intuit/semantic-release-slack)
[![CircleCI](https://circleci.com/gh/intuit/semantic-release-slack/tree/master.svg?style=shield)](https://circleci.com/gh/intuit/semantic-release-slack/tree/master)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

---

> Post slack notifications to a webhook on success or failure of a semantic-release job

| Step               | Description                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| `verifyConditions` | Verify the `SLACK_WEBHOOK_URL` environment variable is set.                                           |
| `success`          | Send a formatted message to the slack webhook provided with information about the most recent release |
| `fail`             | Send a formatted message to the slack webhook if the release fails                                    |

## Installation

```sh
yarn add --dev @intuit/semantic-release-slack
```

## Usage

Add the following to your `release.config.js`

```js
  "plugins": [
    // ...
   ["@intuit/semantic-release-slack", {
       // These are the available platforms that the package can be downloaded from
       "platforms": ["brew", "npm", "docker"]
   }]
  ],
```

Ensure you have a webhook url in your `process.env` under the name `SLACK_WEBHOOK_URL`. The hook is
expected to contain `https://hooks.slack.com` in the URL. Without this, your release will fail
because the plugin won't know where to post to.

## Options

| Property           | Type       | Default                       | Example                              | Description                                                                                                                |
| ------------------ | ---------- | ----------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `platforms`        | `String[]` | `undefined`                   | `"platforms": ["brew", "npm"]`       | Available platforms that the package can be downloaded from. Can be anything. [Supported emoji](src/get-platform-emoji.js) |
| `skipCommit`       | `String`   | `undefined`                   | `"skipCommit": "^fix\\(deps\\):"`    | Skips notifying when `regex` matches at least one commit in the release                                                    |
| `semverFilter`     | `String[]` | `["major", "minor", "patch"]` | `"semverFilter": ["major", "minor"]` | Skips releases that do not match one of the configured types                                                               |
| `fullReleaseNotes` | `Boolean`  | `false`                       | `"fullReleaseNotes": true`           | Provides the full release notes in slack instead of a link to the release notes                                            |
