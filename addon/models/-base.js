import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { not, readOnly } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({

  /** Attributes
   * ---------------------------------------------------------------------------------------------------------------- */

  /**
   * If you have a Rails app and use timestamps in your table creation migrations, you'll have a `created_at`
   * attribute on most if not all of your models.
   */
  createdAt: DS.attr('date'),

  /**
   * If you have a Rails app and use timestamps in your table creation migrations, you'll have a `updated_at`
   * attribute on most if not all of your models.
   */
  updatedAt: DS.attr('date'),

  /** Computed Helpers
   * ---------------------------------------------------------------------------------------------------------------- */

  /**
   * Has the model has been altered since creation?  Determined by comparing the `createdAt` timestamp
   * against the `updatedAt` timestamp.
   * Null-safe.
   * @return boolean `true` if the instance has been altered since creation; `false` otherwise.
   */
  'altered?': computed('createdAt', 'updatedAt', function () {
    const createdAt = this.get('createdAt');
    const updatedAt = this.get('updatedAt');
    return isPresent(createdAt) && isPresent(updatedAt) && createdAt.getTime() !== updatedAt.getTime();
  }),

  /**
   * Negation of the model's `hasDirtyAttributes` property.
   * @return boolean `true` if the model has not had any of its attributes edited; `false` otherwise.
   */
  'clean?': not('dirty?'),

  /**
   * Read-only peek at the model's `hasDirtyAttributes` property.
   * @return boolean `true` if the model is dirty and at least one attribute has been edited; `false` otherwise.
   */
  'dirty?': readOnly('hasDirtyAttributes'),

  /**
   * Read-only peek at the model's `isNew` property.
   * @return boolean `true` if the model is new and has not yet been persisted; `false` otherwise.
   */
  'new?': readOnly('isNew'),

  /**
   * Negation of the `isNew` property, meaning that the model has been persisted permanently to the store.
   * @return boolean `true` if the instance has been persisted to the store; `false` otherwise.
   */
  'persisted?': not('new?'),

  /**
   * Is the model unchanged since creation?  Basically the negation of `altered?`.
   * @return boolean `true` if the instance is unchanged since creation; `false` otherwise.
   */
  'unaltered?': not('altered?'),

  /** Instance Methods
   * ---------------------------------------------------------------------------------------------------------------- */

  /**
   * Force the model's state to dirty.  Trigger this function after you've edited a model's relationships.
   */
  becomeDirty() {
    this.get('errors').clear();
    this.get('currentState').becomeDirty(this.get('_internalModel'));
  },

  transitionToInFlight() {
    this.becomeDirty();
    this.transitionTo('inFlight');
  },

  transitionToSaved(payload) {
    this.transitionTo('saved');
    this.get('store').pushPayload(payload);
  },

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
