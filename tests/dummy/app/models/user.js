import DS from 'ember-data';
import BaseModel from 'ember-data-base-model/models/-base';

const { attr } = DS;

export default BaseModel.extend({
  email: attr('string')
});
