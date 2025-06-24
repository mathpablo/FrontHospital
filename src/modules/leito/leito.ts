import * as angular from 'angular';
import { LeitoController } from './leito.Controller';

export const leitoModule = angular.module('leitoModule', [])
  .controller('LeitoController', LeitoController);
