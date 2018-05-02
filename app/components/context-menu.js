import Component from '@ember/component';

export default Component.extend({
  classNames: ['context-menu'],

  open: false,

  actions: {
    toggleMenu() {
      this.toggleProperty('open');
    }
  }
});
