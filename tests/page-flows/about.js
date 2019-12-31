import { clickable, visitable } from 'ember-cli-page-object';

export function aboutFlow() {
  return {
    visit: visitable('/about'),
    close: clickable('button[title="close"]'),
    content: { scope: '.content' },
  };
}
