/** @documenter yuidoc */

import DS from 'ember-data';

/**
 * This is a convenience `JSONAPISerializer` that will ensure that both the
 * `createdAt` and `updatedAt` fields aren't serialized and pushed into the payload
 * for `POST`, `PATCH`, `PUT` operations.  There should be absolutely no reason
 * to pass these fields to your Rails API as it generates these values automatically.
 *
 * ```javascript
 * // app/serializers/application.js
 * import BaseSerializer from 'ember-data-base-model/serializers/-base';
 *
 * export default BaseSerializer.extend({
 *    // ... your serializer overrides ...
 * });
 * ```
 *
 * @class BaseSerializer
 * @extends DS.JSONAPISerializer
 */
export default DS.JSONAPISerializer.extend({

  /**
   * The `attrs` object can be used to declare a simple mapping between property names on
   * `DS.Model` records and payload keys in the serialized JSON object representing the
   * record. An object with the property key can also be used to designate the attribute's
   * `key` on the response payload.
   *
   * Setting `serialize` to `true` enforces serialization for hasMany relationships even if
   * it's neither a many-to-many nor many-to-none relationship.
   *
   * In this case we're merging in the following into `attrs`:
   *
   * ```javascript
   * {
   *    createdAt: { serialize: false },
   *    updatedAt: { serialize: false }
   * }
   * ```
   *
   * @property attrs
   * @type {Object}
   */
  attrs: {
    createdAt: { serialize: false },
    updatedAt: { serialize: false }
  }
});
