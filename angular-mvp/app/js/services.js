'use strict';

/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource','ngCookies'])
    .factory('init_Data',['$cookies','$http',
    function($cookies,$http){
        return {
            init:function(){
                console.log("post userid  :"+$cookies.user);
                //新用户预制数据
                $http.post(portName+"/services/newUser",{id:$cookies.user}).
                    success(function(msg) {
                        console.log(msg);
                    }).
                    error(function(err) {
                        alert('error: post newuser' + err);
                        $cookies.user = null;
                    });
            }
        }
    }])
    .factory('getData',['$cookies','$http',
        function ($cookies, $http) {
            return{
                getCoursewaveData: function (callback) {
                    //取得课件信息
                    var result = {};
                    $http.get(portName + "/services/courseData/" + $cookies.user).
                        success(function (msg) {
                            result.users = msg;
                            var rootSurface = findRootCategory(msg, $cookies.curSurface);   //u1: cat1
                            result.classLine = 12 / rootSurface.layoutx;     //布局行的样式
                            result.courseName = rootSurface.name;           //标题
                            result.layout = rootSurface.layoutx.toString() + rootSurface.layouty.toString();

                            //取得root category 分类下面的 元素（卡片或者分类）
                            $http.get(portName + "/services/cardData/" + rootSurface.rootcategory).
                                success(function (msg) {
                                    console.log("card: " + msg);
                                    result.childResCards = msg;

                                    callback(result);//返回数据的回调
                                }).
                                error(function (err) {
                                    alert('error:  get card data' + err);
                                });
                        }).
                        error(function (err) {
                            alert('error: get user data' + err);
                        });
                },
                getUserData:function(callback){
                    //取得所有课件信息
                    $http.get(portName+"/services/courseData/"+$cookies.user).
                        success(function(msg) {
                            callback(msg);
                        }).
                        error(function(err) {
                            alert('error: get user data' + err);
                        });
                }
            }
        }])
    .factory('setData',['$http',
        function($http){
            return {
                postLayout: function (data) {
                    //提交修改的数据
                    console.log("change layout "+ data.layoutx + data.layouty);
                    $http.post(portName + "/services/changeLayout/",data).
                        success(function (msg) {
                            console.log("post change layout cuccess " + msg);
                        }).
                        error(function (err) {
                            console.log("err post layout" + msg);
                        });
                },
                postCourseName:function(data){
                    $http.post(portName+"/services/changeCourseName/",data).
                        success(function(msg) {
                            console.log("post change layout cuccess "+msg);
                        }).
                        error(function(err) {
                            console.log("post change coursename"+err);
                        });
                }
            }
        }])


