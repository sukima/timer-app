import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { restartableTask } from 'ember-concurrency-decorators';
import { rawTimeout } from 'ember-concurrency';
import { parseSeconds } from 'timer-app/utils/parse-time';
import { STATES, CLASSNAMES } from 'timer-app/utils/timer-states';
import { action } from '@ember/object';
const { floor } = Math;

const ONE_MINUTE = 60; // Seconds
const TWO_MINUTES = 120; // Seconds
const FIVE_MINUTES = 300; // Seconds
const DISQUALIFICATION_OFFSET = 30; // Seconds

export default class TimerService extends Service {

  @tracked minTime = 'auto';
  @tracked avgTime = 'auto';
  @tracked maxTime = '07:00';
  @tracked time = 0;

  @restartableTask *clock () {
    let initialTime = this.time;
    let sTime = new Date().getTime();
    while (true) {
      yield rawTimeout(500);
      let cTime = new Date().getTime();
      this.time = cTime - sTime + initialTime;
    }
  }

  get isPaused() {
    return this.clock.isIdle;
  }

  get maxSeconds() {
    return parseSeconds(this.maxTime) || FIVE_MINUTES
  }

  get minSeconds() {
    let { minTime, maxSeconds } = this;
    let minSeconds = parseSeconds(minTime);
    let isManual = minTime !== 'auto' && minSeconds < maxSeconds;
    if (isManual) { return minSeconds; }
    if (maxSeconds > FIVE_MINUTES) { return maxSeconds - TWO_MINUTES; }
    if (maxSeconds > TWO_MINUTES) { return maxSeconds - ONE_MINUTE; }
    if (maxSeconds > ONE_MINUTE) { return maxSeconds - 30; }
    return 0;
  }

  get avgSeconds() {
    let { avgTime, minSeconds, maxSeconds } = this;
    let avgSeconds = parseSeconds(avgTime);
    let isManual = (
      avgTime !== 'auto'
      && avgSeconds > minSeconds
      && avgSeconds < maxSeconds
    );
    if (isManual) { return avgSeconds; }
    let duration = maxSeconds - minSeconds;
    return floor(duration / 2) + minSeconds;
  }

  get state() {
    let { seconds, minSeconds, avgSeconds, maxSeconds } = this;
    let disqualifiedSeconds = maxSeconds + DISQUALIFICATION_OFFSET;
    if (seconds >= disqualifiedSeconds) { return STATES.DISQUALIFIED; }
    if (seconds >= maxSeconds) { return STATES.MAXIMUM; }
    if (seconds >= avgSeconds) { return STATES.AVERAGE; }
    if (seconds >= minSeconds) { return STATES.MINIMUM; }
    return STATES.DEFAULT;
  }

  get seconds() {
    return floor(this.time / 1000);
  }

  get classNames() {
    return [
      CLASSNAMES[this.state],
      this.isPaused ? CLASSNAMES[STATES.PAUSED] : '',
    ].join(' ').trim();
  }

  @action reset() {
    this.pause();
    this.time = 0;
  }

  @action restart() {
    this.reset();
    this.resume();
  }

  @action pause() {
    this.clock.cancelAll();
  }

  @action resume() {
    this.clock.perform();
  }

  @action toggle() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

}
