# Benefits

The `Base` model includes a number of helpful computed properties (and methods).

## `createdAt` & `updatedAt` Ember Data Attributes

The `createdAt` & `updatedAt` attributes are why you are using this addon.  Just bears mentioning
these here.

```javascript
someModel.createdAt // after or at Ember 3.1+
someModel.get('createdAt') // before Ember-3.1
```

## Helper Properties

### `isAltered`

Returns `true` when the the `createdAt` differs from the `updatedAt`.  This tells you that the model
instance has been _altered_ since it was initially created.

```javascript
someModel.isAltered // after or at Ember 3.1+
someModel.get('isAltered') // before Ember-3.1
```

### `isClean`

Returns `true` when the model's attributes have remained unchanged since the model was created
or last saved.

In actuality, it is the inverse of Ember Data model's 
[`hasDirtyAttributes`](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/hasDirtyAttributes?anchor=hasDirtyAttributes).

```javascript
someModel.isClean// after or at Ember 3.1+
someModel.get('isClean') // before Ember-3.1
```

### `isDirty`

Returns `true` when the model's attributes have been edited since the model was created or last
saved.

Is an alias to 
[`hasDirtyAttributes](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/hasDirtyAttributes?anchor=hasDirtyAttributes).

```javascript
someModel.isDirty// after or at Ember 3.1+
someModel.get('isDirty') // before Ember-3.1
```

### `isPersisted`

Returns `true` when the model has been persisted.

This is the inverse of Ember Data's
[`isNew`](https://api.emberjs.com/ember-data/3.10/classes/DS.Model/properties/isNew?anchor=isNew).

```javascript
someModel.isPersisted// after or at Ember 3.1+
someModel.get('isPersisted') // before Ember-3.1
```

### `isUnaltered`

Returns `true` when the `createdAt` is equivalent to the `updatedAt`.  This tells you that the model
instance has NOT been _altered_ since it was first persisted.

```javascript
someModel.isUnaltered// after or at Ember 3.1+
someModel.get('isUnaltered') // before Ember-3.1
```

## Helper Methods

### `becomeDirty()`

This function clears the model's `errors` collection and tells the `currentState` to become dirty.

Why would you use this?  When a model's relationships are edited, Ember Data does not trigger the dirty
state.  This function will do that for you.

Example: consider the Save button on your form has it's disabled state bound to the model's `isClean`
property.  If the form is configured to edit the model's relationships, you'll want to force
the model to appear dirty so that your Save button will become active.  In this example, when the
relationship is edited, you'll also want to call `becomeDirty()`.

## _Transitioning_ Helper Methods

This is helpful to mimic what is going on behind the scenes in Ember Data.  This works best in conjunction
with Mike North's [ember-api-actions](https://github.com/mike-north/ember-api-actions) addon.
Mike's addon allows you to consume API endpoints that differ from the standard CRUD variations.

**This has been a successful technique used with Ember Data against a `jsonapi_resources` enabled Rails
API server.**

Borrowing from Mike North's example, image you had a `Fruit` model whose API endpoint exposes a `ripen`
action (e.g. `PUT /fruits/:id/ripen`).  Your model might look like this:

```javascript
// app/models/fruit.js
import { memberAction } from 'ember-api-actions';
import BaseModel from 'ember-data-base-model/models/-base';

export default BaseModel.extend({

  // ...
  
  _ripen: memberAction({ path: 'ripen', type: 'PUT' }),
  
  ripen() {
    this.transitionToInFlight();  // tell Ember Data that the model is being transmitted to API server
    return new Promise((resolve, reject) => {
      this._ripen(this.serialized({includeId: true})) // call the `ripen` end point that `ember-api-actions` provides ... thanks Mike!
        .then((response) => {
          this.transitionToSaved(response); // success!  tell Ember Data this model has been saved
          resolve(this.get('store').peekRecord('fruit', get(response, 'data.id')));   // resolve with the updated model instance  
        })
        .catch((response) => {
          this.transitionToUncommitted(response); // tell Ember Data that this model failed persistence and update the model's `errors` collection
          reject(response); // reject with the API server's response 
        });
    });
  }
});
```

### `transitionToInFlight()`

1. Clears the model's `errors` collection
1. Sets the model's state to dirty
1. Tells Ember Data that the instance has transitioned to `inFlight`

### `transitionToSaved()`

1. Tells Ember Data that the instance has transitioned to `saved`
1. Pushes the payload from the server into the Ember Data store

### `transitionToUncommitted()`

1. Tells Ember Data that the instance has transitioned to `uncommitted`
1. Process the errors collection that was returned in the response payload 
