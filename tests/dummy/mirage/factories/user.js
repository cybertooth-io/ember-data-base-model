import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  createdAt() {
    return faker.date.past();
  },

  email() {
    return faker.internet.email();
  },

  updatedAt() {
    return faker.date.past();
  }
});
