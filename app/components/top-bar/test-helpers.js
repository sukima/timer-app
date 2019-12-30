import { text } from 'ember-cli-page-object';
import timerDisplayHelper from 'timer-app/components/timer-display/test-helpers';
import mainNavHelper from 'timer-app/components/main-nav/test-helpers';
import colorClassesHelper from 'timer-app/tests/helpers/color-classes';

export default function topBarHelper(scope = '.top-bar') {
  return {
    scope,
    timer: text('.header-timer'),
    mainNav: mainNavHelper(),
    timerDisplay: timerDisplayHelper(),
    ...colorClassesHelper(),
  };
}
