import {
  clickable,
  fillable,
  isVisible,
  value,
} from 'ember-cli-page-object';
import { getter } from 'ember-cli-page-object/macros';
import { parseTime } from 'timer-app/utils/parse-time';

export default function(scope = '.time-picker') {
  return {
    scope,
    hours: value('input[name="hours"]'),
    minutes: value('input[name="minutes"]'),
    seconds: value('input[name="seconds"]'),
    setHours: fillable('input[name="hours"]'),
    setMinutes: fillable('input[name="minutes"]'),
    setSeconds: fillable('input[name="seconds"]'),
    setAuto: clickable('button[name="auto"]'),
    canSetAuto: isVisible('button[name="auto"]'),
    values: getter(function() {
      return [this.hours, this.minutes, this.seconds];
    }),
    async setTime(time) {
      let [hours, minutes, seconds] = parseTime(time);
      await this.setHours(`${hours}`);
      await this.setMinutes(`${minutes}`);
      await this.setSeconds(`${seconds}`);
    }
  };
}
