import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from 'timer-app/config/environment';

export default class AboutController extends Controller {

  @service timer;

  sourceUrl = config.APP.sourceUrl;

}
