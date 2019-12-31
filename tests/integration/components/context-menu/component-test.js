import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import PageObject from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import contextMenuHelper from 'timer-app/components/context-menu/test-helpers';

const page = PageObject.create(contextMenuHelper());

module('Integration | Component | ContextMenu', function(hooks) {
  setupRenderingTest(hooks);

  test('show/hides dropdown when user clicks toggle button', async function(assert) {
    await render(hbs`<ContextMenu>test-content</ContextMenu>`);
    assert.ok(page.isClosed);
    await page.toggle();
    assert.ok(page.isOpen);
    await page.toggle();
    assert.ok(page.isClosed);
  });

  test('yields dropdown content', async function(assert) {
    await render(hbs`<ContextMenu>test-content</ContextMenu>`);
    await page.toggle();
    assert.ok(page.isOpen);
    assert.equal(page.dropdown.text, 'test-content');
  });

});
