import PageObject from 'ember-cli-page-object';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { createTestModel, settingsFlow }
  from 'timer-app/tests/page-flows/settings';

const page = PageObject.create(settingsFlow());
const testModel = createTestModel();
const plans = testModel.getSimplePathPlans();

module('Acceptance | settings', function(hooks) {
  setupApplicationTest(hooks);

  hooks.after(function() {
    testModel.testCoverage();
  });

  plans.forEach(plan => {
    module(plan.description, function() {
      plan.paths.forEach(path => {
        test(path.description, async function(assert) {
          await page.visit();
          await path.test({ assert, page });
        });
      });
    });
  });

});
