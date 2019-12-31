import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import PageObject, { hasClass } from 'ember-cli-page-object';
import topBarHelper from 'timer-app/components/top-bar/test-helpers';

class MockTimerService extends Service {
  @tracked seconds = 3723;
  @tracked isPaused = true;
  @tracked classNames = 'test-class';
  resume() {}
  restart() {}
  pause() {}
}

const page = PageObject.create({
  ...topBarHelper(),
  hasTestClass: hasClass('test-class'),
});

module('Integration | Component | TopBar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:timer', MockTimerService);
  });

  test('renders a main nav', async function(assert) {
    await render(hbs`<TopBar />`);
    assert.ok(page.mainNav.isVisible);
  });

  test('renders a timer', async function(assert) {
    let timerService = this.owner.lookup('service:timer');
    await render(hbs`<TopBar />`);
    assert.equal(page.timer, '01:02:03 (paused)');
    timerService.isPaused = false;
    await settled();
    assert.equal(page.timer, '01:02:03');
  });

  test('renders a timer', async function(assert) {
    let timerService = this.owner.lookup('service:timer');
    await render(hbs`<TopBar />`);
    assert.equal(page.timer, '01:02:03 (paused)');
    timerService.isPaused = false;
    await settled();
    assert.equal(page.timer, '01:02:03');
  });

  test('includes classNames from timer service', async function(assert) {
    await render(hbs`<TopBar />`);
    assert.ok(page.hasTestClass);
  });

});
