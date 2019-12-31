import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';
import PageObject from 'ember-cli-page-object';
import timePickerHelper from 'timer-app/components/time-picker/test-helpers';

const page = PageObject.create(timePickerHelper());

module('Integration | Component | TimePicker', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.updateSpy = sinon.spy();
    this.time = '01:02:03';
  });

  test('renders picker form for a specified time', async function(assert) {
    await render(hbs`
      <TimePicker @time={{this.time}} @update={{this.updateSpy}} />
    `);
    assert.equal(page.hours, '1');
    assert.equal(page.minutes, '2');
    assert.equal(page.seconds, '3');
    assert.ok(page.canSetAuto);
  });

  test('hides auto button when hideAutoButton is true', async function(assert) {
    await render(hbs`
      <TimePicker
        @time={{this.time}}
        @update={{this.updateSpy}}
        @hideAutoButton={{true}}
      />
    `);
    assert.notOk(page.canSetAuto);
  });

  test('calls update when changes are made to each time part', async function() {
    await render(hbs`
      <TimePicker @time={{this.time}} @update={{this.updateSpy}} />
    `);
    await page.setHours('4');
    sinon.assert.calledWith(this.updateSpy, '04:02:03');
    await page.setMinutes('5');
    sinon.assert.calledWith(this.updateSpy, '01:05:03');
    await page.setSeconds('6');
    sinon.assert.calledWith(this.updateSpy, '01:02:06');
  });

});
