import Component from '@glimmer/component';
import { joinTimeParts } from 'timer-app/utils/parse-time';
const { floor } = Math;

export default class TimerDisplayComponent extends Component {

  get displayTime() {
    let { seconds = 0 } = this.args;
    let minutes = floor(seconds / 60);
    let hours = floor(minutes / 60);
    seconds -= minutes * 60;
    minutes -= hours * 60;
    let time = joinTimeParts(hours, minutes, seconds);
    return time === 'auto' ? '00:00' : time;
  }

  get dateTime() {
    return `PT${this.args.seconds}S`;
  }

}
