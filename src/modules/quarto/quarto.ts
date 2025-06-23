import * as angular from 'angular';
import { QuartoController } from './quarto.controller';

export const quartoModule = angular.module('quartoModule', [])
  .controller('QuartoController', QuartoController);
