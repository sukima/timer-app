import PageObject from 'ember-cli-page-object';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { aboutFlow } from 'timer-app/tests/page-flows/about';

const page = PageObject.create(aboutFlow());

module('Acceptance | about', function(hooks) {
  setupApplicationTest(hooks);

  test('shows about content', async function(assert) {
    await page.visit();
    assert.equal(currentURL(), '/about');
    assert.ok(page.content.isVisible);
  });

  test('navigates to index when close button clicked', async function(assert) {
    await page.visit();
    await page.close();
    assert.equal(currentURL(), '/');
  });

});
