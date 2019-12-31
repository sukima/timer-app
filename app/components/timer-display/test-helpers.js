import { attribute } from 'ember-cli-page-object';

export default function(scope = '.timer-display') {
  return {
    scope,
    datetime: attribute('datetime'),
  };
}
