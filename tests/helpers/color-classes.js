import { hasClass } from 'ember-cli-page-object';
import { STATES, CLASSNAMES } from 'timer-app/utils/timer-states';

export default function colorClassesHelper(scope) {
  return {
    isPaused: hasClass(CLASSNAMES[STATES.PAUSED], scope),
    isDefault: hasClass(CLASSNAMES[STATES.DEFAULT], scope),
    isMinimum: hasClass(CLASSNAMES[STATES.MINIMUM], scope),
    isAverage: hasClass(CLASSNAMES[STATES.AVERAGE], scope),
    isMaximum: hasClass(CLASSNAMES[STATES.MAXIMUM], scope),
    isDisqualified: hasClass(CLASSNAMES[STATES.DISQUALIFIED], scope),
  };
}
