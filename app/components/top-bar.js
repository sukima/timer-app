import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import TimerClassMixin from '../mixins/timer-class';

export default Component.extend(TimerClassMixin, {
  timer: service(),

  classNames: ['top-bar'],
  classNameBindings: ['timerClasses'],

  seconds: reads('timer.seconds'),
  isPaused: reads('timer.isPaused')
});
