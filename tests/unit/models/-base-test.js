import { isPresent } from '@ember/utils';
import { module, skip, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model |  base', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {});
    assert.ok(model);
  });

  test('when initialized the createdAt is set to now', async function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base');

    assert.ok(isPresent(model.createdAt));
  });

  test('when initialized the updateAt is set to now', async function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base');

    assert.ok(isPresent(model.updatedAt));
  });

  test('when altered? because createdAt does not match updatedAt', function (assert) {
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

  test('when clean?', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    // TODO: this should be improved somehow?  Mirage?
    assert.notOk(model.get('clean?'));
    assert.notOk(model.get('isClean'));
    assert.ok(model.get('dirty?'));
    assert.ok(model.get('isDirty'));
  });

  test('when dirty?', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    assert.ok(model.get('dirty?'));
    assert.ok(model.get('isDirty'));
    assert.notOk(model.get('clean?'));
    assert.notOk(model.get('isClean'));
  });

  test('when new?', function (assert) {
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

  test('when persisted?', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    // TODO: this should be improved somehow?  Mirage?
    assert.notOk(model.get('persisted?'));
    assert.notOk(model.get('isPersisted'));
    assert.ok(model.get('new?'));
    assert.ok(model.get('isNew'));
  });

  test('when unaltered? because createdAt same as updatedAt', function (assert) {
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

  test('when calling becomeDirty() the errors are cleared and state is set to dirty', async function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base');

    // assert.ok(model.isClean); // TODO: requires mirage to fetch a persisted clean record
    model.get('errors').add('createdAt', 'Some error');
    assert.equal(model.get('errors.length'), 1);

    model.becomeDirty();
    assert.ok(model.get('isDirty'));
    assert.equal(model.get('errors.length'), 0);
  });

  skip('when transitioning to in flight', async function (/*assert*/) {
    // TODO: need mirage to test this
  });

  skip('when transitioned to saved', async function (/*assert*/) {
    // TODO: need mirage to test this
  });

  skip('when transitioned to uncommitted', async function (/*assert*/) {
    // TODO: need mirage to test this
  });
});
