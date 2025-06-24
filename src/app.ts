import * as angular from 'angular';
import '@uirouter/angularjs';

import { homePageModule } from './modules/homepage/homepage';
import { hospitalModule } from './modules/hospital/hospital';
import { quartoModule } from './modules/quarto/quarto';
import { patientModule } from './modules/patient/patient';
import { leitoModule} from './modules/leito/leito';
import { alaModule} from './modules/ala/ala'
import { url } from 'inspector';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name,
  hospitalModule.name,
  quartoModule.name,
  patientModule.name,
  leitoModule.name,
  alaModule.name
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider: any, $urlRouterProvider: any) => {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'src/modules/homepage/homepage.html',
      controller: 'HomePageController',
      controllerAs: 'vm'
    });

    $stateProvider.state('hospitais', {
      url: '/hospitais',
      templateUrl: 'src/modules/hospital/hospital.html',
      controller: 'HospitalController',
      controllerAs: 'vm'
    });

    $stateProvider.state('quartos', {
      url: '/quartos',
      templateUrl: 'src/modules/quarto/quarto.html',
      controller: 'QuartoController',
      controllerAs: 'vm'
    });

    $stateProvider.state('patient', {
      url: '/patient',
      templateUrl: 'src/modules/patient/patient.html',
      controller: 'PatientController',
      controllerAs: 'vm'
    });

    $stateProvider.state('leito', {
      url: '/leito',
      templateUrl: 'src/modules/leito/leito.html',
      controller: 'LeitoController',
      controllerAs: 'vm'
    })

   $stateProvider.state('ala', {
      url: '/ala',
      templateUrl: 'src/modules/ala/ala.html',
      controller: 'AlaController',
      controllerAs: 'vm'
    })

    $urlRouterProvider.otherwise('/home');
  }
]);
