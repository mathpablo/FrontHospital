import * as angular from 'angular';
import { InternmentController } from './internment.controller';

export const internmentLogModule = angular.module('internmentLogModule', [])
  .controller('InternmentLogController', InternmentController);
