import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import config from '../config/environment';

export default Controller.extend({
  timer: service(),

  sourceUrl: config.APP.sourceUrl,
  attributions: config.APP.attributions,

  minSeconds: reads('timer.minSeconds'),
  avgSeconds: reads('timer.avgSeconds'),
  maxSeconds: reads('timer.maxSeconds')
});
