ember-data-base-model
==============================================================================

Implementation of a Base model that leverages Rails Active Record timestamp fields. Additional helper 
functions are provided to query model status/persistence.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

Installation
------------------------------------------------------------------------------

```
ember install ember-data-base-model
```

### Upgrading

When working through the Ember upgrade process, I recommend
invoking the `ember install ember-data-base-model` command once 
you are done to get the latest version of the add-on.

If you've already got the package installed and just want to run the
add-on blueprint: `ember g ember-data-base-model`.

### Dependencies

* `ember-data` - Ember-Data; hopefully this obvious. 

Features
------------------------------------------------------------------------------

1. Includes date attributes for the Rails-like `createdAt` & `updatedAt` timestamp fields.
1. 

[![npm version](http://badge.fury.io/js/ember-data-base-model.svg)](http://badge.fury.io/js/ember-data-base-model) ![downloads](http://img.shields.io/npm/dy/ember-data-base-model.svg) [![CircleCI](http://circleci.com/gh/cybertooth-io/ember-data-base-model.svg?style=shield)](http://circleci.com/gh/cybertooth-io/ember-data-base-model) [![Code Climate](http://codeclimate.com/github/cybertooth-io/ember-data-base-model/badges/gpa.svg)](http://codeclimate.com/github/cybertooth-io/ember-data-base-model) 

![Dependencies](http://david-dm.org/cybertooth-io/ember-data-base-model.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-data-base-model.svg)](http://emberobserver.com/addons/ember-data-base-model) [![License](http://img.shields.io/npm/l/ember-data-base-model.svg)](LICENSE.md)

Motivation
------------------------------------------------------------------------------

1. Hide details of the AWS Amplify `Auth` & `CognitoUser`
1. Fold into familiar `ember-simple-auth` ecosystem
1. Automatically refresh access tokens on a schedule using `ember-concurrency`

Built With
------------------------------------------------------------------------------

[![ember-cli-3.4.3](https://img.shields.io/badge/ember--cli-3.4.3-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-data-base-model)

Tested Against
------------------------------------------------------------------------------

[![ember-lts-2.12](https://img.shields.io/badge/ember--try-ember--lts--2.12-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-data-base-model)
[![ember-lts-2.16](https://img.shields.io/badge/ember--try-ember--lts--2.16-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-data-base-model)
[![ember-release-2.18](https://img.shields.io/badge/ember--try-ember--release--2.18-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-data-base-model)

[![ember-default](https://img.shields.io/badge/ember--try-ember--default-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-data-base-model)
[![ember-beta](https://img.shields.io/badge/ember--try-ember--beta-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-data-base-model)
[![ember-canary](https://img.shields.io/badge/ember--try-ember--canary-brightgreen.svg)](https://circleci.com/gh/cybertooth-io/ember-data-base-model)


Usage
------------------------------------------------------------------------------

Simply extend your model classes with the `-base.js` class:

```javascript
import BaseModel from 'ember-data-base-model/models/-base';
import DS from 'ember-data';

export default BaseModel.extend({
  // your model goodies in here...
});
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
