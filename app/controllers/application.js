import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import TimerClassMixin from '../mixins/timer-class';

export default Controller.extend(TimerClassMixin, {
  timer: service(),
  queryParams: ['min', 'avg', 'max'],

  min: alias('timer.minTime'),
  avg: alias('timer.avgTime'),
  max: alias('timer.maxTime')
});
