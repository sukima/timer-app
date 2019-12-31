import { clickable, visitable, triggerable } from 'ember-cli-page-object';
import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import contextMenuHelper from 'timer-app/components/context-menu/test-helpers';
import timerDisplayHelper from 'timer-app/components/timer-display/test-helpers';
import colorClassesHelper from 'timer-app/tests/helpers/color-classes';
import { currentURL } from '@ember/test-helpers';

const ONE_SECOND = 1000;
const MINIMUM_TIME = 5 * 60 * 1000;
const AVERAGE_TIME = 6 * 60 * 1000;
const MAXIMUM_TIME = 7 * 60 * 1000;
const DISQUALIFIED_TIME = 8 * 60 * 1000;

export function indexFlow() {
  return {
    visit: visitable('/'),
    contextMenu: contextMenuHelper(),
    timer: timerDisplayHelper('.main-timer .timer-display'),
    toggleTimer: clickable('.main-timer'),
    resetTimer: triggerable('dblclick', '.main-timer'),
    background: colorClassesHelper('.container'),
  };
}

export function createFlowMachine() {
  return Machine({
    id: 'index-flow',
    initial: 'first-render',
    states: {
      'first-render': {
        on: {
          START_TIMER: 'timer-started',
          OPEN_MENU: 'menu-opened',
        },
        meta: {
          test({ assert, page }) {
            assert.equal(currentURL(), '/');
            assert.equal(page.timer.text, '00:00');
            assert.ok(page.background.isDefault);
            assert.notOk(page.background.isMinimum);
            assert.notOk(page.background.isAverage);
            assert.notOk(page.background.isMaximum);
            assert.notOk(page.background.isDisqualified);
            assert.ok(page.background.isPaused);
            assert.ok(page.contextMenu.isVisible);
            assert.ok(page.contextMenu.isClosed);
          },
        },
      },
      'timer-started': {
        on: {
          WAIT_TILL_DEFAULT: 'timer-advanced-to-default',
          WAIT_TILL_MINIMUM: 'timer-advanced-to-minimum',
          WAIT_TILL_WARNING: 'timer-advanced-to-warning',
          WAIT_TILL_MAXIMUM: 'timer-advanced-to-maximum',
          WAIT_TILL_DISQUALIFIED: 'timer-advanced-to-disqualified',
        },
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '00:00');
            assert.ok(page.background.isDefault);
            assert.notOk(page.background.isMinimum);
            assert.notOk(page.background.isAverage);
            assert.notOk(page.background.isMaximum);
            assert.notOk(page.background.isDisqualified);
            assert.notOk(page.background.isPaused);
          },
        },
      },
      'timer-paused': {
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '00:01');
            assert.ok(page.background.isPaused);
          },
        },
      },
      'timer-reset': {
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '00:00');
            assert.ok(page.background.isDefault);
            assert.notOk(page.background.isMinimum);
            assert.notOk(page.background.isAverage);
            assert.notOk(page.background.isMaximum);
            assert.notOk(page.background.isDisqualified);
            assert.ok(page.background.isPaused);
            assert.ok(page.contextMenu.isVisible);
            assert.ok(page.contextMenu.isClosed);
          },
        },
      },
      'timer-advanced-to-default': {
        on: {
          PAUSE_TIMER: 'timer-paused',
          RESET_TIMER: 'timer-reset',
        },
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '00:01');
            assert.ok(page.background.isDefault);
            assert.notOk(page.background.isMinimum);
            assert.notOk(page.background.isAverage);
            assert.notOk(page.background.isMaximum);
            assert.notOk(page.background.isDisqualified);
            assert.notOk(page.background.isPaused);
          },
        },
      },
      'timer-advanced-to-minimum': {
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '05:00');
            assert.notOk(page.background.isDefault);
            assert.ok(page.background.isMinimum);
            assert.notOk(page.background.isAverage);
            assert.notOk(page.background.isMaximum);
            assert.notOk(page.background.isDisqualified);
            assert.notOk(page.background.isPaused);
          },
        },
      },
      'timer-advanced-to-warning': {
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '06:00');
            assert.notOk(page.background.isDefault);
            assert.notOk(page.background.isMinimum);
            assert.ok(page.background.isAverage);
            assert.notOk(page.background.isMaximum);
            assert.notOk(page.background.isDisqualified);
            assert.notOk(page.background.isPaused);
          },
        },
      },
      'timer-advanced-to-maximum': {
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '07:00');
            assert.notOk(page.background.isDefault);
            assert.notOk(page.background.isMinimum);
            assert.notOk(page.background.isAverage);
            assert.ok(page.background.isMaximum);
            assert.notOk(page.background.isDisqualified);
            assert.notOk(page.background.isPaused);
          },
        },
      },
      'timer-advanced-to-disqualified': {
        meta: {
          test({ assert, page }) {
            assert.equal(page.timer.text, '08:00');
            assert.notOk(page.background.isDefault);
            assert.notOk(page.background.isMinimum);
            assert.notOk(page.background.isAverage);
            assert.notOk(page.background.isMaximum);
            assert.ok(page.background.isDisqualified);
            assert.notOk(page.background.isPaused);
          },
        },
      },
      'menu-opened': {
        on: {
          CLICK_SETTINGS: 'visit-settings',
          CLICK_ABOUT: 'visit-about',
        },
        meta: {
          test({ assert, page }) {
            assert.ok(page.contextMenu.isOpen);
            assert.ok(page.contextMenu.dropdown.isVisible);
          },
        },
      },
      'visit-settings': {
        meta: {
          test({ assert }) {
            assert.equal(currentURL(), '/settings');
          }
        },
      },
      'visit-about': {
        meta: {
          test({ assert }) {
            assert.equal(currentURL(), '/about');
          }
        },
      },
    },
  });
}

export function createFlowModel(machine) {
  return createModel(machine).withEvents({
    START_TIMER: {
      async exec({ page }) {
        await page.toggleTimer();
      },
    },
    OPEN_MENU: {
      async exec({ page }) {
        await page.contextMenu.toggle();
      },
    },
    WAIT_TILL_DEFAULT: {
      exec({ clock }) {
        clock.tick(ONE_SECOND);
      },
    },
    WAIT_TILL_MINIMUM: {
      exec({ clock }) {
        clock.tick(MINIMUM_TIME);
      },
    },
    WAIT_TILL_WARNING: {
      exec({ clock }) {
        clock.tick(AVERAGE_TIME);
      },
    },
    WAIT_TILL_MAXIMUM: {
      exec({ clock }) {
        clock.tick(MAXIMUM_TIME);
      },
    },
    WAIT_TILL_DISQUALIFIED: {
      exec({ clock }) {
        clock.tick(DISQUALIFIED_TIME);
      },
    },
    PAUSE_TIMER: {
      async exec({ page }) {
        await page.toggleTimer();
      },
    },
    RESET_TIMER: {
      async exec({ page }) {
        await page.resetTimer();
      },
    },
    CLICK_SETTINGS: {
      async exec({ page }) {
        await page.contextMenu.dropdown.clickOn('Settings');
      },
    },
    CLICK_ABOUT: {
      async exec({ page }) {
        await page.contextMenu.dropdown.clickOn('About');
      },
    },
  });
}

export function createTestModel() {
  let machine = createFlowMachine();
  let model = createFlowModel(machine);
  return model;
}
