import * as angular from 'angular';
import { HospitalController } from './hospital.controller';

export const hospitalModule = angular.module('hospitalModule', [])
  .controller('HospitalController', HospitalController);
