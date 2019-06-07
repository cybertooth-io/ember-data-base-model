import { isPresent } from '@ember/utils';
import { module, test } from 'qunit';
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
    assert.notOk(model.get('unaltered?'));
  });

  test('when clean?', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    // TODO: this should be improved somehow?  Mirage?
    assert.notOk(model.get('clean?'));
    assert.ok(model.get('dirty?'));
  });

  test('when dirty?', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    assert.ok(model.get('dirty?'));
    assert.notOk(model.get('clean?'));
  });

  test('when new?', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    assert.ok(model.get('new?'));
    assert.notOk(model.get('persisted?'));
  });

  test('when persisted?', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    // TODO: this should be improved somehow?  Mirage?
    assert.notOk(model.get('persisted?'));
    assert.ok(model.get('new?'));
  });

  test('when unaltered? because createdAt same as updatedAt', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('-base', {
      createdAt: new Date(2001, 8, 11),
      updatedAt: new Date(2001, 8, 11)
    });

    assert.notOk(model.get('altered?'));
    assert.ok(model.get('unaltered?'));
  });
});
