import PageObject from 'ember-cli-page-object';
import sinon from 'sinon';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { createTestModel, indexFlow } from 'timer-app/tests/page-flows/index';

const page = PageObject.create(indexFlow());
const testModel = createTestModel();
const plans = testModel.getSimplePathPlans();

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  hooks.after(function() {
    testModel.testCoverage();
  });

  plans.forEach(plan => {
    module(plan.description, function() {
      plan.paths.forEach(path => {
        test(path.description, async function(assert) {
          let clock = sinon.useFakeTimers();
          await page.visit();
          await path.test({ assert, page, clock });
          clock.restore();
        });
      });
    });
  });

});
