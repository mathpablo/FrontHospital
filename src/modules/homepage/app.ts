import * as angular from 'angular';
import { HomePageController } from './homepage.controller';

export const homePageModule = angular.module('homePageModule', []);

homePageModule.controller('HomePageController', HomePageController);