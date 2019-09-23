# Contributing

## Developer Workflow

* Fork this repo
* Make a branch
* Make changes
* Push
* Create a PR

## Committing

This repo follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/.)

### Consuming New Versions

This project utilizes a service known as [Renovate](https://github.com/renovateapp/renovate). This service runs at regularly scheduled times and ensures that all dependencies are up to date. The service will generate a PR when a new version is detected **in NPM under the `latest` tag**. If you are testing versions that are yet to be released, it is recommended you publish under a different NPM tag such as `next` or `beta`. Some good reading on this topic can be found:

* [NPM Label A Release With Tag](https://docs.npmjs.com/getting-started/using-tags)
* [NPM Versioning](https://docs.npmjs.com/cli/version)
* [np: better npm publishing](https://github.com/sindresorhus/np)

### Releasing

This project leverages [semantic-release](https://github.com/semantic-release/semantic-release) to handle it's release management
