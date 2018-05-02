import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';
import { EKMixin, keyUp } from 'ember-keyboard';

export default Route.extend(EKMixin, {
  timer: service(),

  activate() {
    this._super(...arguments);
    this.set('keyboardActivated', true);
  },

  deactivate() {
    this._super(...arguments);
    this.set('keyboardActivated', false);
  },

  toggleTimer: on(keyUp('Space'), function() {
    const timer = this.get('timer');
    if (timer.get('isPaused')) {
      timer.resume();
    } else {
      timer.pause();
    }
  }),

  resetTimer: on(keyUp('KeyR'), function() {
    this.get('timer').reset();
  }),

  showHelp: on(keyUp('KeyH'), keyUp('shift+Slash'), function() {
    this.transitionTo('about');
  }),

  showSettings: on(keyUp('KeyS'), function() {
    this.transitionTo('settings');
  })
});
