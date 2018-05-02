import Mixin from '@ember/object/mixin';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import TIMER_STATES from '../utils/timer-states';

const CONTAINER_STATE_CLASSES = {
  [TIMER_STATES.DEFAULT]: '--default-time',
  [TIMER_STATES.MINIMUM]: '--min-time',
  [TIMER_STATES.AVERAGE]: '--avg-time',
  [TIMER_STATES.MAXIMUM]: '--max-time',
  [TIMER_STATES.DISQUALIFIED]: '--disqualified-time'
};

export default Mixin.create({
  timer: service(),

  state: reads('timer.state'),
  isPaused: reads('timer.isPaused'),

  timerClasses: computed('{state,isPaused}', {
    get() {
      let state = this.get('state');
      let classNames = [ CONTAINER_STATE_CLASSES[state] ];
      if (this.get('isPaused')) { classNames.push('--paused'); }
      return classNames.join(' ');
    }
  })
});
