export const STATES = Object.freeze({
  PAUSED: 'paused',
  DEFAULT: 'default',
  MINIMUM: 'minimum',
  AVERAGE: 'average',
  MAXIMUM: 'maximum',
  DISQUALIFIED: 'disqualified',
});

export const CLASSNAMES = Object.freeze({
  [STATES.PAUSED]: '--paused',
  [STATES.DEFAULT]: '--default-time',
  [STATES.MINIMUM]: '--min-time',
  [STATES.AVERAGE]: '--avg-time',
  [STATES.MAXIMUM]: '--max-time',
  [STATES.DISQUALIFIED]: '--disqualified-time',
});
