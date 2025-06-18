import * as angular from 'angular';
import '@uirouter/angularjs';

import { homePageModule } from './modules/homepage/homepage';
import { hospitalModule } from './modules/hospital/hospital';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name,
  hospitalModule.name
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

    $urlRouterProvider.otherwise('/home');
  }
]);
