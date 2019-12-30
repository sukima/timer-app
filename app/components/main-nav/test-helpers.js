import { collection } from 'ember-cli-page-object';
import { getter } from 'ember-cli-page-object/macros';

export default function mainNavHelper(scope = '.main-nav') {
  return {
    scope,
    items: collection('.nav-list .item'),
    toggleButton: { scope: '.nav-list .item:eq(0) button' },
    restartButton: { scope: '.nav-list .item:eq(1) button' },
    details: getter(function () {
      return [this.items[5], this.items[6], this.items[7]];
    }),
  };
}
