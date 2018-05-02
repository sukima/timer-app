export function padNumber(num) {
  return `0${num}`.substr(-2);
}

export function parseTime(time) {
  let parts = time.split(':');
  for (; parts.length < 3; parts.unshift('0'));
  return parts.map(n => parseInt(n, 10) || 0);
}

export function parseSeconds(time) {
  let [ hours, minutes, seconds ] = parseTime(time);
  return (hours * 60 * 60) + (minutes * 60) + seconds;
}

export function joinTimeParts(hours, minutes, seconds) {
  if (hours + minutes + seconds <= 0) { return 'auto'; }
  hours = hours > 0 ? hours : null;
  return [hours, minutes, seconds]
    .compact()
    .map(padNumber)
    .join(':');
}
