import Service from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { parseSeconds } from '../utils/parse-time';
import TIMER_STATES from '../utils/timer-states';
const { floor } = Math;

const ONE_MINUTE = 60; // Seconds
const TWO_MINUTES = 120; // Seconds
const FIVE_MINUTES = 300; // Seconds
const DISQUALIFICATION_OFFSET = 30; // Seconds

export default Service.extend({
  minTime: 'auto',
  avgTime: 'auto',
  maxTime: '7:00',
  _clockTime: 0,

  isPaused: reads('clock.isIdle'),

  maxSeconds: computed('maxTime', {
    get() {
      return parseSeconds(this.get('maxTime')) || FIVE_MINUTES;
    }
  }),

  minSeconds: computed('{minTime,maxSeconds}', {
    get() {
      let minTime = this.get('minTime');
      let maxSeconds = this.get('maxSeconds');
      let minSeconds = parseSeconds(minTime);
      let isManual = minTime !== 'auto' && minSeconds < maxSeconds;
      if (isManual) { return minSeconds; }
      if (maxSeconds > FIVE_MINUTES) { return maxSeconds - TWO_MINUTES; }
      if (maxSeconds > TWO_MINUTES) { return maxSeconds - ONE_MINUTE; }
      if (maxSeconds > ONE_MINUTE) { return maxSeconds - 30; }
      return 0;
    }
  }),

  avgSeconds: computed('{avgTime,minSeconds,maxSeconds}', {
    get() {
      let avgTime = this.get('avgTime');
      let minSeconds = this.get('minSeconds');
      let maxSeconds = this.get('maxSeconds');
      let avgSeconds = parseSeconds(avgTime);
      let isManual = avgTime !== 'auto'
        && avgSeconds > minSeconds
        && avgSeconds < maxSeconds;
      if (isManual) { return avgSeconds; }
      let duration = maxSeconds - minSeconds;
      return floor(duration / 2) + minSeconds;
    }
  }),

  state: computed('{seconds,minSeconds,avgSeconds,maxSeconds}', {
    get() {
      let seconds = this.get('seconds');
      let minSeconds = this.get('minSeconds');
      let avgSeconds = this.get('avgSeconds');
      let maxSeconds = this.get('maxSeconds');
      let disqualifiedSeconds = maxSeconds + DISQUALIFICATION_OFFSET;
      if (seconds >= disqualifiedSeconds) { return TIMER_STATES.DISQUALIFIED; }
      if (seconds >= maxSeconds) { return TIMER_STATES.MAXIMUM; }
      if (seconds >= avgSeconds) { return TIMER_STATES.AVERAGE; }
      if (seconds >= minSeconds) { return TIMER_STATES.MINIMUM; }
      return TIMER_STATES.DEFAULT;
    }
  }),

  seconds: computed('_clockTime', {
    get() {
      return floor(this.get('_clockTime') / 1000);
    }
  }),

  clock: task(function* () {
    const initialTime = this.get('_clockTime');
    const sTime = new Date().getTime();
    while (true) {
      yield timeout(500);
      let cTime = new Date().getTime();
      let clockTime = cTime - sTime + initialTime;
      this.set('_clockTime', clockTime);
    }
  }).restartable(),

  reset() {
    this.get('clock').cancelAll();
    this.set('_clockTime', 0);
  },

  restart() {
    this.set('_clockTime', 0);
    this.resume();
  },

  pause() {
    this.get('clock').cancelAll();
  },

  resume() {
    this.get('clock').perform();
  }
});
