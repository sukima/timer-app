import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import timerDisplayHelper from 'timer-app/components/timer-display/test-helpers';

const page = PageObject.create({
  ...timerDisplayHelper(),
  testSpan: { scope: '#test-result' },
});

module('Integration | Component | TimerDisplay', function(hooks) {
  setupRenderingTest(hooks);

  test('assigns datetime attribute', async function(assert) {
    await render(hbs`<TimerDisplay @seconds={{3723}} />`);
    assert.equal(page.datetime, 'PT3723S');
  });

  test('shows a colon separated time stamp (HH:MM:SS)', async function(assert) {
    await render(hbs`<TimerDisplay @seconds={{3723}} />`);
    assert.equal(page.text, '01:02:03');
  });

  test('yields a colon separated time stamp (HH:MM:SS)', async function(assert) {
    await render(hbs`
      <TimerDisplay @seconds={{3723}} as |displayText|>
        <span id="test-result">{{displayText}}</span>
      </TimerDisplay>
    `);
    assert.equal(page.testSpan.text, '01:02:03');
  });

});
