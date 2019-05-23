/** @documenter yuidoc */

import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { deprecatingAlias, not, readOnly } from '@ember/object/computed';
import DS from 'ember-data';

/**
 * @class Base
 * @public
 */
export default DS.Model.extend({

  // Attributes
  // -------------------------------------------------------------------------------------------------------------------

  /**
   * If you have a Rails app and use timestamps in your table creation migrations, you'll have a `created_at`
   * attribute on most if not all of your models.
   *
   * @property createdAt
   * @type Date
   */
  createdAt: DS.attr('date'),

  /**
   * If you have a Rails app and use timestamps in your table creation migrations, you'll have a `updated_at`
   * attribute on most if not all of your models.
   * @property updatedAt
   * @type Date
   */
  updatedAt: DS.attr('date'),

  // Computed Helpers
  // -------------------------------------------------------------------------------------------------------------------

  /**
   * Deprecated, use `isAltered` instead.  Going away in Ember-Data-4.0.
   *
   * See: https://github.com/cybertooth-io/ember-data-base-model/issues/11
   *
   * @type boolean
   * @accessor altered?
   * @deprecated use `isAltered` instead because question marks in property names is not sustainable
   */
  'altered?': deprecatingAlias('isAltered', {
    id: 'ember-data-base-model/models/-base.deprecate-altered-question-mark',
    until: 'ember-data-4.0.0'
  }),

  /**
   * Deprecated, use `isClean` instead.  Going away in Ember-Data-4.0.
   *
   * See: https://github.com/cybertooth-io/ember-data-base-model/issues/11
   *
   * @type boolean
   * @accessor clean?
   * @deprecated use `isClean` instead because question marks in property names is not sustainable
   */
  'clean?': deprecatingAlias('isClean', {
    id: 'ember-data-base-model/models/-base.deprecate-clean-question-mark',
    until: 'ember-data-4.0.0'
  }),

  /**
   * Deprecated, use `isDirty` instead.  Going away in Ember-Data-4.0.
   *
   * See: https://github.com/cybertooth-io/ember-data-base-model/issues/11
   *
   * @type boolean
   * @accessor dirty?
   * @deprecated use `isDirty` instead because question marks in property names is not sustainable
   */
  'dirty?': deprecatingAlias('isDirty', {
    id: 'ember-data-base-model/models/-base.deprecate-dirty-question-mark',
    until: 'ember-data-4.0.0'
  }),

  /**
   * Returns `true` if the instance has been altered since creation; `false` otherwise.
   *
   * Has the model has been altered since creation?  Determined by comparing the `createdAt` timestamp
   * against the `updatedAt` timestamp.
   *
   * @type boolean
   * @accessor isAltered
   */
  isAltered: computed('createdAt', 'updatedAt', function () {
    const createdAt = this.get('createdAt');
    const updatedAt = this.get('updatedAt');
    return isPresent(createdAt) && isPresent(updatedAt) && createdAt.getTime() !== updatedAt.getTime();
  }),

  /**
   * Return `true` if the model has not had any of its attributes edited; `false` otherwise.
   *
   * Negation of the model's `hasDirtyAttributes` property.
   *
   * @type boolean
   * @accessor isClean
   */
  isClean: not('isDirty'),

  /**
   * Return `true` if the model is dirty and at least one attribute has been edited; `false` otherwise.
   *
   * Read-only peek at the model's `hasDirtyAttributes` property.
   *
   * @type boolean
   * @accessor isDirty
   */
  isDirty: readOnly('hasDirtyAttributes'),

  /**
   * Return `true` if the instance has been persisted to the store; `false` otherwise.
   *
   * Negation of the `isNew` property, meaning that the model has been persisted permanently to the store.
   *
   * @type boolean
   * @accessor isPersisted
   */
  isPersisted: not('isNew'),

  /**
   * Return `true` if the instance is unchanged since creation; `false` otherwise.
   *
   * Is the model unchanged since creation?  Basically the negation of `isAltered`.
   *
   * @type boolean
   * @accessor isUnaltered
   */
  isUnaltered: not('isAltered'),

  /**
   * Deprecated, use Ember Data `isNew` instead.  Going away in Ember-Data-4.0.
   *
   * See: https://github.com/cybertooth-io/ember-data-base-model/issues/11
   *
   * @type boolean
   * @accessor new?
   * @deprecated use `isNew` instead because question marks in property names is not sustainable
   */
  'new?': deprecatingAlias('isNew', {
    id: 'ember-data-base-model/models/-base.deprecate-new-question-mark',
    until: 'ember-data-4.0.0'
  }),

  /**
   * Deprecated, use `isPersisted` instead.  Going away in Ember-Data-4.0.
   *
   * See: https://github.com/cybertooth-io/ember-data-base-model/issues/11
   *
   * @type boolean
   * @accessor persisted?
   * @deprecated use `isPersisted` instead because question marks in property names is not sustainable
   */
  'persisted?': deprecatingAlias('isPersisted', {
    id: 'ember-data-base-model/models/-base.deprecate-persisted-question-mark',
    until: 'ember-data-4.0.0'
  }),

  /**
   * Deprecated, use `isUnaltered` instead.  Going away in Ember-Data-4.0.
   *
   * See: https://github.com/cybertooth-io/ember-data-base-model/issues/11
   *
   * @type boolean
   * @accessor unaltered?
   * @deprecated use `isUnaltered` instead because question marks in property names is not sustainable
   */
  'unaltered?': deprecatingAlias('isUnaltered', {
    id: 'ember-data-base-model/models/-base.deprecate-unaltered-question-mark',
    until: 'ember-data-4.0.0'
  }),

  // Instance Methods
  // -------------------------------------------------------------------------------------------------------------------

  /**
   * Force the model's state to dirty.
   *
   * You could use this function after you've edited a model's relationships so that your Ember application
   * knows that the model may need to be saved.
   *
   * @method becomeDirty
   */
  becomeDirty() {
    this.get('errors').clear();
    this.get('currentState').becomeDirty(this.get('_internalModel'));
  },

  /**
   * If you're manually saving a model, you could borrow this helper function to make sure the
   * model is marked as dirty and it's transitioned to `inFlight`.
   *
   * This method depends on accessing the `_internalModel` field.
   *
   * @method transitionToInFlight
   */
  transitionToInFlight() {
    this.becomeDirty();
    this.transitionTo('inFlight');
  },

  /**
   * If you're manually saving a model, you could borrow this helper function to make sure the
   * model is marked as saved and supplied payload is pushed into the store.
   *
   * This method depends on accessing the `_internalModel` field.
   *
   * @param {Object} payload the API server payload that will be pushed into the Ember Data `store`
   * @method transitionToSaved
   */
  transitionToSaved(payload) {
    this.transitionTo('saved');
    this.get('store').pushPayload(payload);
  },

  /**
   * If you're manually saving a model, you can borrow this helper method in your error/catch block
   * to transition the model to `uncommitted` and process all of the payload errors.
   *
   * This method depends on accessing the `_internalModel` field.
   *
   * @param {Object} payload the API server payload that includes the error messages that will be appended
   * to the model's `errors` collection.
   * @method transitionToUncommitted
   */
  transitionToUncommitted(payload) {
    const internalModel = this.get('_internalModel');
    const modelName = internalModel.modelName;
    const store = this.get('store');
    const modelClass = store.modelFor(modelName);

    this.transitionTo('uncommitted');

    const errors = store.serializerFor(modelName).extractErrors(store, modelClass, payload, this.get('id'));
    store.recordWasInvalid(internalModel, errors);
  }
});
