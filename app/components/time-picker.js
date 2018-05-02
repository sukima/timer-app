import Component from '@ember/component';
import { computed } from '@ember/object';
import { parseTime, joinTimeParts } from '../utils/parse-time';

export default Component.extend({
  classNames: ['time-picker'],

  showAutoButton: true,

  hours: computed('time', {
    get() {
      let time = this.get('time') || '';
      let [ hours ] = parseTime(time);
      return hours;
    },
    set(key, value) {
      let [ , minutes, seconds ] = parseTime(this.get('time'));
      let hours = parseInt(value, 10);
      this.set('time', joinTimeParts(hours, minutes, seconds));
      return value;
    }
  }),

  minutes: computed('time', {
    get() {
      let time = this.get('time') || '';
      let [ , minutes ] = parseTime(time);
      return minutes;
    },
    set(key, value) {
      let [ hours, , seconds ] = parseTime(this.get('time'));
      let minutes = parseInt(value, 10);
      this.set('time', joinTimeParts(hours, minutes, seconds));
      return value;
    }
  }),

  seconds: computed('time', {
    get() {
      let time = this.get('time') || '0';
      let [ , , seconds ] = parseTime(time);
      return seconds;
    },
    set(key, value) {
      let [ hours, minutes ] = parseTime(this.get('time'));
      let seconds = parseInt(value, 10);
      this.set('time', joinTimeParts(hours, minutes, seconds));
      return value;
    }
  })
});
