import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from '../app'; // eslint-disable-line import/no-relative-parent-imports
import config from '../config/environment'; // eslint-disable-line import/no-relative-parent-imports

setApplication(Application.create(config.APP));

start();
