import { isPresent } from '@ember/utils';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupTest } from 'ember-qunit';
import { module, skip, test } from 'qunit';

module('Unit | Model |  base', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {});
    assert.ok(model);
  });

  test('when initialized the createdAt is set to now', async function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base');

    assert.ok(isPresent(model.createdAt));
  });

  test('when initialized the updateAt is set to now', async function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base');

    assert.ok(isPresent(model.updatedAt));
  });

  test('when altered? because createdAt does not match updatedAt', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 12)
    });

    assert.ok(model.get('altered?'));
    assert.ok(model.get('isAltered'));
    assert.notOk(model.get('unaltered?'));
    assert.notOk(model.get('isUnaltered'));
  });

  test('when clean?', async function(assert) {
    let store = this.owner.lookup('service:store');
    let mirageModel = this.server.create('user');
    let model = await store.findRecord('user', mirageModel.id);

    assert.ok(model.isClean);
    assert.ok(model.get('clean?'));

    model.set('email', 'make dirty');

    assert.notOk(model.isClean);
    assert.notOk(model.get('clean?'));
  });

  test('when dirty?', async function(assert) {
    let store = this.owner.lookup('service:store');
    let mirageModel = this.server.create('user');
    let model = await store.findRecord('user', mirageModel.id);

    assert.notOk(model.isDirty);
    assert.notOk(model.get('dirty?'));

    model.set('email', 'make dirty');

    assert.ok(model.isDirty);
    assert.ok(model.get('dirty?'));
  });

  test('when new?', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    assert.ok(model.get('new?'));
    assert.ok(model.get('isNew'));
    assert.notOk(model.get('persisted?'));
    assert.notOk(model.get('isPersisted'));
  });

  test('when persisted?', async function(assert) {
    let store = this.owner.lookup('service:store');
    let mirageModel = this.server.create('user');
    let model = await store.findRecord('user', mirageModel.id);

    assert.ok(model.get('persisted?'));
    assert.ok(model.get('isPersisted'));
    assert.notOk(model.get('new?'));
    assert.notOk(model.get('isNew'));
  });

  test('when unaltered? because createdAt same as updatedAt', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    assert.notOk(model.get('altered?'));
    assert.notOk(model.get('isAltered'));
    assert.ok(model.get('unaltered?'));
    assert.ok(model.get('isUnaltered'));
  });

  test('when calling becomeDirty() the errors are cleared and state is set to dirty', async function(assert) {
    let store = this.owner.lookup('service:store');
    let mirageModel = this.server.create('user');
    let model = await store.findRecord('user', mirageModel.id);

    assert.ok(model.isClean);
    model.set('email', 'invalid');
    model.get('errors').add('email', 'Email invalid');
    assert.equal(model.get('errors.length'), 1);

    model.becomeDirty();
    assert.ok(model.get('isDirty'));
    assert.equal(model.get('errors.length'), 0);
  });

  skip('when transitioning to in flight an existing record', async function(assert) {
    let store = this.owner.lookup('service:store');
    let mirageModel = this.server.create('user');
    let model = await store.findRecord('user', mirageModel.id);

    assert.equal(model.get('currentState.stateName'), 'root.loaded.saved');

    model.set('email', 'invalid');

    model.transitionToInFlight(); // TODO: throws in unit test: "You can only unload a record which is not inFlight."

    assert.equal(model.get('currentState.stateName'), 'root.loaded.updated.inFlight');
  });

  skip('when transitioning to in flight a brand new record', async function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', { email: 'invalid' });

    assert.equal(model.get('currentState.stateName'), 'root.loaded.created.uncommitted');

    model.transitionToInFlight(); // TODO: throws in unit test: "You can only unload a record which is not inFlight."

    assert.equal(model.get('currentState.stateName'), 'root.loaded.created.inFlight');
  });

  test('when transitioned to saved', async function(assert) {
    let store = this.owner.lookup('service:store');
    let mirageModel = this.server.create('user');
    let model = await store.findRecord('user', mirageModel.id);

    assert.equal(model.get('currentState.stateName'), 'root.loaded.saved');

    model.set('email', 'new-email@example.com');

    assert.equal(model.get('currentState.stateName'), 'root.loaded.updated.uncommitted');

    // at this point you'd call your api to save the model and if it was successful, you'd transition to saved

    model.transitionToSaved({
      data: {
        attributes: {
          'created-at': mirageModel.createdAt.toISOString(),
          'email': 'new-email@example.com',
          'updated-at': new Date().toISOString(),
        },
        id: mirageModel.id,
        type: 'users'
      }
    });

    assert.equal(model.email, 'new-email@example.com');
  });

  test('when transitioned to uncommitted', async function(assert) {
    let store = this.owner.lookup('service:store');
    let mirageModel = this.server.create('user');
    let model = await store.findRecord('user', mirageModel.id);

    assert.equal(model.get('currentState.stateName'), 'root.loaded.saved');

    model.set('email', 'invalid');

    assert.equal(model.get('currentState.stateName'), 'root.loaded.updated.uncommitted');

    // at this point you'd call your api to save the model and when it fails for some reason you'd transition to uncommitted

    model.transitionToUncommitted({
      errors: [{
        code: 'CODE',
        detail: 'DETAIL',
        id: '',
        links: '',
        meta: {},
        source: {
          pointer: '/data/attributes/email'
        },
        status: '422',
        title: 'TITLE'
      }]
    });

    assert.equal(model.errors.length, 1, 'Errors were processed with the transition to uncommitted.');
  });
});
