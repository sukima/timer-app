import { text, visitable } from 'ember-cli-page-object';
import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import { currentURL } from '@ember/test-helpers';
import topBarHelper from 'timer-app/components/top-bar/test-helpers';
import timePickerHelper from 'timer-app/components/time-picker/test-helpers';

export function settingsFlow() {
  return {
    visit: visitable('/settings'),
    topBar: topBarHelper(),
    maximum: {
      scope: '.--max-time',
      label: text('label'),
      picker: timePickerHelper(),
    },
    average: {
      scope: '.--avg-time',
      label: text('label'),
      picker: timePickerHelper(),
    },
    minimum: {
      scope: '.--min-time',
      label: text('label'),
      picker: timePickerHelper(),
    },
  };
}

export function createFlowMachine() {
  return Machine({
    id: 'settings-flow',
    initial: 'first-render',
    states: {
      'first-render': {
        on: {
          UPDATE_MAXIMUM: 'maximum-time-changed',
          UPDATE_MINIMUM: 'minimum-time-changed',
          UPDATE_AVERAGE: 'average-time-changed',
          UPDATE_ALL: 'all-times-changed',
        },
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings');
            assert.ok(page.topBar.isVisible);
            assert.deepEqual(page.maximum.picker.values, ['0', '7', '0']);
            assert.equal(page.maximum.label, 'Maximum time 07:00');
            assert.notOk(page.maximum.picker.canSetAuto);
            assert.deepEqual(page.average.picker.values, ['0', '0', '0']);
            assert.equal(page.average.label, 'Average time 06:00');
            assert.ok(page.average.picker.canSetAuto);
            assert.deepEqual(page.minimum.picker.values, ['0', '0', '0']);
            assert.equal(page.minimum.label, 'Minimum time 05:00');
            assert.ok(page.minimum.picker.canSetAuto);
          },
        },
      },
      'maximum-time-changed': {
        on: {
          RESET_MAXIMUM: 'maximum-time-reset',
        },
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings?max=01%3A08%3A30');
            assert.deepEqual(page.maximum.picker.values, ['1', '8', '30']);
            assert.equal(page.maximum.label, 'Maximum time 01:08:30');
          },
        },
      },
      'maximum-time-reset': {
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings');
            assert.deepEqual(page.maximum.picker.values, ['0', '7', '0']);
            assert.equal(page.maximum.label, 'Maximum time 07:00');
          },
        },
      },
      'average-time-changed': {
        on: {
          RESET_AVERAGE: 'average-time-reset',
        },
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings?avg=05%3A30');
            assert.deepEqual(page.average.picker.values, ['0', '5', '30']);
            assert.equal(page.average.label, 'Average time 05:30');
          },
        },
      },
      'average-time-reset': {
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings');
            assert.deepEqual(page.average.picker.values, ['0', '0', '0']);
            assert.equal(page.average.label, 'Average time 06:00');
          },
        },
      },
      'minimum-time-changed': {
        on: {
          RESET_MINIMUM: 'minimum-time-reset',
        },
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings?min=04%3A30');
            assert.deepEqual(page.minimum.picker.values, ['0', '4', '30']);
            assert.equal(page.minimum.label, 'Minimum time 04:30');
          },
        },
      },
      'minimum-time-reset': {
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings');
            assert.deepEqual(page.minimum.picker.values, ['0', '0', '0']);
            assert.equal(page.minimum.label, 'Minimum time 05:00');
          },
        },
      },
      'all-times-changed': {
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/settings?avg=02%3A00&max=03%3A00&min=01%3A00');
            assert.deepEqual(page.maximum.picker.values, ['0', '3', '0']);
            assert.equal(page.maximum.label, 'Maximum time 03:00');
            assert.deepEqual(page.average.picker.values, ['0', '2', '0']);
            assert.equal(page.average.label, 'Average time 02:00');
            assert.deepEqual(page.minimum.picker.values, ['0', '1', '0']);
            assert.equal(page.minimum.label, 'Minimum time 01:00');
          },
        },
      },
    },
  });
}

export function createFlowModel(machine) {
  return createModel(machine).withEvents({
    UPDATE_MAXIMUM: {
      async exec({ page }) {
        await page.maximum.picker.setTime('01:08:30');
      },
    },
    UPDATE_AVERAGE: {
      async exec({ page }) {
        await page.average.picker.setTime('05:30');
      },
    },
    UPDATE_MINIMUM: {
      async exec({ page }) {
        await page.minimum.picker.setTime('04:30');
      },
    },
    UPDATE_ALL: {
      async exec({ page }) {
        await page.maximum.picker.setTime('03:00');
        await page.average.picker.setTime('02:00');
        await page.minimum.picker.setTime('01:00');
      },
    },
    RESET_MAXIMUM: {
      async exec({ page }) {
        await page.maximum.picker.setTime('07:00');
      },
    },
    RESET_AVERAGE: {
      async exec({ page }) {
        await page.average.picker.setAuto();
      },
    },
    RESET_MINIMUM: {
      async exec({ page }) {
        await page.minimum.picker.setAuto();
      },
    },
  });
}

export function createTestModel() {
  let machine = createFlowMachine();
  let model = createFlowModel(machine);
  return model;
}
