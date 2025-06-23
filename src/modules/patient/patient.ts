import * as angular from 'angular';
import { PatientController } from './patient.controller';

export const patientModule = angular.module('patientModule', [])
  .controller('PatientController', PatientController);
