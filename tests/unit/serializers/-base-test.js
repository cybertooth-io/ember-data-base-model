import { isNone } from '@ember/utils';
import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer |  base', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('-base');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('-base', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

  test('when serialized the createdAt value is not packaged', async function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('-base', { createdAt: new Date(2001, 8, 11) });

    assert.equal(record.createdAt.toISOString(), '2001-09-11T06:00:00.000Z');
    assert.ok(isNone(get(record.serialize(), 'data.attributes.created-at')));
  });

  test('when serialized the updatedAt value is not packaged', async function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('-base', { updatedAt: new Date(2001, 8, 11) });

    assert.equal(record.updatedAt.toISOString(), '2001-09-11T06:00:00.000Z');
    assert.ok(isNone(get(record.serialize(), 'data.attributes.updated-at')));
  });
});
