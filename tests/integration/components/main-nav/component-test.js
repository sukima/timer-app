import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import PageObject from 'ember-cli-page-object';
import sinon from 'sinon';
import mainNavHelper from 'timer-app/components/main-nav/test-helpers';

class MockTimerService extends Service {
  @tracked isPaused = true;
  minSeconds = 60;
  avgSeconds = 90;
  maxSeconds = 120;
  resume = sinon.spy();
  pause = sinon.spy();
  restart = sinon.spy();
}

const page = PageObject.create(mainNavHelper());

module('Integration | Component | MainNav', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:timer', MockTimerService);
  });

  test('renders nav elements', async function(assert) {
    await render(hbs`<MainNav />`);
    assert.equal(page.items.length, 5);
  });

  test('renders timer details when @showDetails is true', async function(assert) {
    await render(hbs`<MainNav @showDetails={{true}} />`);
    assert.deepEqual(
      page.details.mapBy('text'),
      ['Min: 01:00', 'Avg: 01:30', 'Max: 02:00']
    );
  });

  test('toggles pause/resume button based on timer.isPaused', async function(assert) {
    let timerService = this.owner.lookup('service:timer');
    await render(hbs`<MainNav />`);
    assert.equal(page.toggleButton.text, 'Resume');
    await page.toggleButton.click();
    timerService.isPaused = false;
    await settled();
    assert.equal(page.toggleButton.text, 'Pause');
    await page.toggleButton.click();
    sinon.assert.calledOnce(timerService.resume);
    sinon.assert.calledOnce(timerService.pause);
    sinon.assert.callOrder(timerService.resume, timerService.pause);
  });

  test('restart button restarts timer', async function() {
    let timerService = this.owner.lookup('service:timer');
    await render(hbs`<MainNav />`);
    await page.restartButton.click();
    sinon.assert.calledOnce(timerService.restart);
  });

});
