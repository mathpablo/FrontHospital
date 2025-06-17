import * as angular from 'angular';
import '@uirouter/angularjs';

import { homePageModule } from './modules/homepage/app';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name
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

    $urlRouterProvider.otherwise('/home');
  }
]);
