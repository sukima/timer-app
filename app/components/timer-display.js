import Component from '@ember/component';
import { computed } from '@ember/object';
import { joinTimeParts } from '../utils/parse-time';
const { floor } = Math;

export default Component.extend({
  tagName: 'span',
  classNames: ['timer-display'],

  displayTime: computed('seconds', {
    get() {
      let seconds = this.get('seconds') || 0;
      let minutes = floor(seconds / 60);
      let hours = floor(minutes / 60);
      seconds -= minutes * 60;
      minutes -= hours * 60;
      let time = joinTimeParts(hours, minutes, seconds);
      return time === 'auto' ? '00:00' : time;
    }
  })
});
