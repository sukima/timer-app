import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContextMenuComponent extends Component {

  @tracked open = false;

  @action toggleMenu() {
    this.open = !this.open;
  }

}
