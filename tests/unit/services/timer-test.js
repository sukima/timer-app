import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { STATES, CLASSNAMES } from 'timer-app/utils/timer-states';
import sinon from 'sinon';
import { settled } from '@ember/test-helpers';

const settleable = {
  async apply(fn, ctx, args) {
    fn.call(ctx, ...args);
    await settled();
  }
};

module('Unit | Services | timer', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.clock = new Proxy(sinon.useFakeTimers(), settleable);
    this.subject = new Proxy(this.owner.lookup('service:timer'), settleable);
  });

  hooks.afterEach(async function() {
    await this.subject.pause();
    await this.clock.restore();
  });

  test('updates derived states as clock ticks', async function(assert) {
    this.subject.minTime = '1';
    this.subject.avgTime = '2';
    this.subject.maxTime = '3';
    assert.equal(this.subject.time, 0);
    assert.strictEqual(this.subject.isPaused, true);
    assert.strictEqual(this.subject.state, STATES.DEFAULT);
    assert.equal(
      this.subject.classNames,
      `${CLASSNAMES[STATES.DEFAULT]} ${CLASSNAMES[STATES.PAUSED]}`
    );

    await this.subject.resume();
    await settled();
    assert.equal(this.subject.time, 0);
    assert.strictEqual(this.subject.isPaused, false);
    assert.strictEqual(this.subject.state, STATES.DEFAULT);
    assert.equal(this.subject.classNames, CLASSNAMES[STATES.DEFAULT]);

    await this.clock.tick(500);
    assert.equal(this.subject.time, 500);
    assert.strictEqual(this.subject.isPaused, false);
    assert.strictEqual(this.subject.state, STATES.DEFAULT);
    assert.equal(this.subject.classNames, CLASSNAMES[STATES.DEFAULT]);

    await this.clock.tick(500);
    assert.equal(this.subject.time, 1000);
    assert.strictEqual(this.subject.isPaused, false);
    assert.strictEqual(this.subject.state, STATES.MINIMUM);
    assert.equal(this.subject.classNames, CLASSNAMES[STATES.MINIMUM]);

    await this.clock.tick(1000);
    assert.equal(this.subject.time, 2000);
    assert.strictEqual(this.subject.isPaused, false);
    assert.strictEqual(this.subject.state, STATES.AVERAGE);
    assert.equal(this.subject.classNames, CLASSNAMES[STATES.AVERAGE]);

    await this.clock.tick(1000);
    assert.equal(this.subject.time, 3000);
    assert.strictEqual(this.subject.isPaused, false);
    assert.strictEqual(this.subject.state, STATES.MAXIMUM);
    assert.equal(this.subject.classNames, CLASSNAMES[STATES.MAXIMUM]);

    await this.clock.tick(30000);
    assert.equal(this.subject.time, 33000);
    assert.strictEqual(this.subject.isPaused, false);
    assert.strictEqual(this.subject.state, STATES.DISQUALIFIED);
    assert.equal(this.subject.classNames, CLASSNAMES[STATES.DISQUALIFIED]);
  });

  test('can pause and resume timer', async function(assert) {
    assert.equal(this.subject.time, 0);
    assert.strictEqual(this.subject.isPaused, true);
    await this.subject.resume();
    await this.clock.tick(500);
    assert.equal(this.subject.time, 500);
    assert.strictEqual(this.subject.isPaused, false);
    await this.subject.pause();
    await this.clock.tick(500);
    assert.equal(this.subject.time, 500);
    assert.strictEqual(this.subject.isPaused, true);
    await this.subject.resume();
    await this.clock.tick(500);
    assert.equal(this.subject.time, 1000);
    assert.strictEqual(this.subject.isPaused, false);
  });

});
