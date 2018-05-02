import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
  timer: service(),

  tagName: 'nav',
  classNames: ['main-nav'],

  minSeconds: reads('timer.minSeconds'),
  avgSeconds: reads('timer.avgSeconds'),
  maxSeconds: reads('timer.maxSeconds'),
  isPaused: reads('timer.isPaused'),

  actions: {
    resume() {
      this.get('timer').resume();
    },

    pause() {
      this.get('timer').pause();
    },

    restart() {
      this.get('timer').restart();
    }
  }
});
