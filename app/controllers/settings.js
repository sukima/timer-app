import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { alias, reads } from '@ember/object/computed';

export default Controller.extend({
  timer: service(),

  minTime: alias('timer.minTime'),
  avgTime: alias('timer.avgTime'),
  maxTime: alias('timer.maxTime'),

  minSeconds: reads('timer.minSeconds'),
  avgSeconds: reads('timer.avgSeconds'),
  maxSeconds: reads('timer.maxSeconds')
});
