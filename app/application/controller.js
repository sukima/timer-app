import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {

  @service timer;

  queryParams = [
    { 'timer.minTime': { as: 'min' } },
    { 'timer.avgTime': { as: 'avg' } },
    { 'timer.maxTime': { as: 'max' } },
  ];

}
