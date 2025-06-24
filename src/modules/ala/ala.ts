import * as angular from 'angular';
import { AlaController } from './ala.controller';

export const alaModule = angular.module('alaModule', [])
  .controller('AlaController', AlaController);
