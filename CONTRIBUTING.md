# How To Contribute

## Installation

* `git clone git@github.com:cybertooth-io/ember-data-base-model.git`
* `cd ember-data-base-model`
* `yarn`

### Building The Add-on

* `ember b`
* `ember build`

### Linting

* `yarn run lint:hbs`
* `yarn run lint:js`
* `yarn run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running The Dummy Application

* `ember server`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

## Upgrading The Add-On

When upgrading this add-on, after successfully performing `ember init` use the following
commands to install the following dependencies required by this add-on.

```bash
ember install ember-auto-import
ember install ember-concurrency
yarn add @aws-amplify/auth @aws-amplify/core ember-simple-auth
```

## Linking This Add-on For Local Testing

### Linking

Use yarn.

```bash
# from this add-on project
$ yarn link
# from the other project that depends on this add-on
$ yarn link ember-data-base-model
```
In your other project's `package.json`, set `"ember-data-base-model": "*",`

Note: I've actually had to go into my _other project_ and put this into its `package.json`:
`"ember-data-base-model": "link:../ember-data-base-model",`

### Unlinking

Again, use yarn.

```bash
# from this add-on project
$ yarn unlink
# from the other project that linked to this add-on
$ yarn unlink ember-data-base-model
```

## Commiting Code

Fork and submit a pull request.

Try to use an emoji to help describe the commit:

* 🎉 Initial Commit
* 🔖 Version Tag
* ✨ New Feature
* 🐛 Bugfix
* 🔒 Security Fix
* 📇 Metadata
* ♻️ Refactoring
* 📚 Documentation
* 🌐 Internationalization
* ♿️ Accessibility
* 🐎 Performance
* 🎨 Cosmetic
* 🔧 Tooling
* 🚨 Tests
* 💩 Deprecation
* 🗑 Removal
* 🚧 Work In Progress 

## Deploying The Dummy Application

Make sure your `~/.aws/credentials` file has a profile named _cybertooth_ 
with a valid key and secret,

```
[cybertooth]
aws_access_key_id = <KEY>
aws_secret_access_key = <SECRET>
```

Deploy by invoking the following command: `ember deploy production`

Confirm your changes are showing up in our S3 container: http://ember-data-base-model.cybertooth.io/

You may need to go into AWS CloudFront to expire the index.html file before the site 
changes are picked up (see [issue](https://github.com/cybertoothca/ember-cli-text-support-mixins/issues/29)).

Releasing & Publishing To NPM
------------------------------------------------------------------------------

```bash
# `yarn publish` will prompt you for the next/new version name
$ yarn publish
$ git push
$ git push --tags
```
