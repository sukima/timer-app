import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  timer: service(),

  isPaused: reads('timer.isPaused'),
  seconds: reads('timer.seconds'),

  actions: {
    restart() {
      this.get('timer').restart();
    },

    pause() {
      this.get('timer').pause();
    },

    resume() {
      this.get('timer').resume();
    },

    toggleTimer() {
      if (this.get('isPaused')) {
        this.send('resume');
      } else {
        this.send('pause');
      }
    },

    resetAndPause() {
      this.send('restart');
      this.send('pause');
    }
  }
});
