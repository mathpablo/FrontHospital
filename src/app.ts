import * as angular from 'angular';
import '@uirouter/angularjs';

import { homePageModule } from './modules/homepage/homepage';
import { hospitalModule } from './modules/hospital/hospital';
import { quartoModule } from './modules/quarto/quarto';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name,
  hospitalModule.name,
  quartoModule.name
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

    $urlRouterProvider.otherwise('/home');
  }
]);
