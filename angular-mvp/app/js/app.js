'use strict';


// Declare app level module which depends on filters, and services
window.myApp =  {};
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
  $routeProvider.when('/couselib', {templateUrl: 'parents/coursewarelib.html', controller: 'couseLibCtrl'});
  $routeProvider.otherwise({redirectTo: '/courseware'});
}]).run(['$rootScope','$http',function($rootScope,$http){
        $rootScope.global = {};
        myApp.rootScope = $rootScope;
        myApp.http = $http;
    }]);;
