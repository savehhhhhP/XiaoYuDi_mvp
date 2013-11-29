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
        $routeProvider.when('/cateChild/:categroyId/:categoryName/:classLine', {templateUrl: 'child/categroy.html', controller: 'cateChildCtrl'});
        $routeProvider.when('/cateParent/:categroyId/:categoryName/:classLine', {templateUrl: 'parents/categroy.html', controller: 'cateParentCtrl'});
        $routeProvider.otherwise({redirectTo: '/courseware'});
}]);
