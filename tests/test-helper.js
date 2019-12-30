import Application from '../app';
import QUnit from 'qunit';
import config from '../config/environment';
import sinon from 'sinon';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

sinon.assert.pass = function(assertion) {
  QUnit.assert.ok(true, assertion);
};

sinon.assert.fail = function(assertion) {
  QUnit.assert.ok(false, assertion);
};

setApplication(Application.create(config.APP));

start();
