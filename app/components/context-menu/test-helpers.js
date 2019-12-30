import { clickable, hasClass, notHasClass } from 'ember-cli-page-object';

export default function contextMenuHelper(scope = '.context-menu') {
  return {
    scope,
    toggle: clickable('.context-menu__toggle-button'),
    isOpen: hasClass('context-menu--open', '.context-menu__dropdown'),
    isClosed: notHasClass('context-menu--open', '.context-menu__dropdown'),
    dropdown: { scope: '.context-menu__dropdown' },
  };
}
