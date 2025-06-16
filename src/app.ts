import * as angular from 'angular';
import 'angular-ui-router';

import { homePageModule } from './homepage/index';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'src/homepage/homepage.html',
      controller: 'HomePageController',
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/home');
  }
]);