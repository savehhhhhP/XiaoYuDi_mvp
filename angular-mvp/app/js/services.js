'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource','ngCookies'])
    //设置cookie  记录用户选择的课件
    .factory('serverCookie',['$cookies',
    function($cookies){
        return {
            getConfigCourse:function(name){
                if(name!=null){  //name 不为空说明此时应该改cookie
                    $cookies.defaultCourse=name;
                    return name;
                }
                //取cookie
                var result = $cookies.defaultCourse;
                console.log(result);
                if(result==null){   //说明是第一次取
                    $cookies.defaultCourse='u1'; //此处因该从数据库中查出默认的课件名
                    result = 'u1';
                }
                return result;
            }
        }
    }])
    //获取资源列表 （id）
    .factory('synManifest',['$resource',
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


