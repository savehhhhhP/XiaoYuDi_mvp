'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
    //获取资源列表 （id）
    factory('synManifest',['$resource',
        function ($resource) {
            return $resource('http://115.28.35.182/services/data/app/manifest/:user', {}, {
                query: {
                    method: 'GET',
                    params: {user: 'public'},
                    isArray: false}
            });
        }])
    //获取资源 （mp3 image）
    .factory('synFile', ['$resource',
        function ($resource) {
            return $resource('http://115.28.35.182/services/data/app/file/:id', {}, {
                query: {
                    method: 'GET',
                    params: {id: '@id'},
                    isArray: false}
            });
        }
    ])
    //获取建数据库的sql语句
    .factory('synSQL', ['$resource',
        function ($resource) {
            return $resource('http://115.28.35.182/services/data/app/sql/:user', {}, {
                query: {
                    method: 'GET',
                    params: {user: 'public'},
                    isArray: false}
            });
        }
    ])


