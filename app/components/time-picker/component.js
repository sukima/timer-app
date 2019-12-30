import Component from '@glimmer/component';
import { parseTime, joinTimeParts } from 'timer-app/utils/parse-time';

export default class TimePickerComponent extends Component {

  get hours() {
    let { time = '' } = this.args;
    let [hours] = parseTime(time);
    return hours;
  }

  set hours(value) {
    let [, minutes, seconds] = parseTime(this.args.time);
    let hours = parseInt(value, 10);
    this.args.update(joinTimeParts(hours, minutes, seconds));
    return value;
  }

  get minutes() {
    let { time = '' } = this.args;
    let [, minutes] = parseTime(time);
    return minutes;
  }

  set minutes(value) {
    let [hours,, seconds] = parseTime(this.args.time);
    let minutes = parseInt(value, 10);
    this.args.update(joinTimeParts(hours, minutes, seconds));
    return value;
  }

  get seconds() {
    let { time = '0' } = this.args;
    let [,, seconds] = parseTime(time);
    return seconds;
  }

  set seconds(value) {
    let [hours, minutes] = parseTime(this.args.time);
    let seconds = parseInt(value, 10);
    this.args.update(joinTimeParts(hours, minutes, seconds));
    return value;
  }

}
