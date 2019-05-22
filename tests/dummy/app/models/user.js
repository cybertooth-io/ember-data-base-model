import DS from 'ember-data';
import BaseModel from 'ember-data-base-model/models/-base';

export default BaseModel.extend({
  email: DS.attr('string')
});
