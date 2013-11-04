'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.data'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courseware', {templateUrl: 'parents/index.html', controller: 'CourseCtrl'});
  $routeProvider.when('/newcard', {templateUrl: 'parents/newcard.html', controller: 'NewCardCtrl'});
  $routeProvider.when('/reslib', {templateUrl: 'parents/resourcelib.html', controller: 'resLibCtrl'});
  $routeProvider.when('/child', {templateUrl: 'child/index.html', controller: 'childCtrl'});
  $routeProvider.otherwise({redirectTo: '/courseware'});
}]);
