'use strict';


/* Controllers */
//var test = require(".../models/test.js");

//angular.module('myApp.controllers', []);

angular.module('myApp.controllers', []);

var CourseCtrl = function($scope, $log,surface_example,cards) {
    $scope.layout = surface_example[0].layout;
    $scope.column_num = parseInt(surface_example[0].layout.substring(0,1)); //布局的 列数
    $scope.row_num = parseInt(surface_example[0].layout.substring(1,2));    //布局的 行数
    $scope.columns =initData(new Array($scope.column_num));
    $scope.rows =initData(new Array($scope.row_num));
    $scope.classLine= 12/$scope.column_num;                              //布局行的样式
    $scope.cards = cards;
    $scope.courseName = surface_example[0].name;                            //课件名称

    $scope.changeLayout = function (){
        //记录修改的布局
        surface_example[0].layout = $scope.layout;
        $scope.column_num = parseInt($scope.layout.substring(0,1)); //布局的 列数
        $scope.row_num = parseInt($scope.layout.substring(1,2)); //布局的 列数
        $scope.columns =initData(new Array($scope.column_num));
        $scope.rows =initData(new Array($scope.row_num));
        $scope.classLine= 12/$scope.column_num;
    }
}

/**
 * 初始化数据  行列 数组的值设为1
 * @param datas
 * @returns {*}
 */
var initData = function(datas){
    var i =0;
    for(;i<datas.length;i++){
        datas[i] = i;
    }
    return datas;
}

var NewCardCtrl = function($scope, $log) {
    $scope.$log = $log;
    $scope.message = 'Hello World!';
}

var resLibCtrl = function($scope, $log,cards){
    $scope.cards = cards;
}

var childCtrl = function($scope,surface_example,cards){
    $scope.layout = surface_example[0].layout;
    $scope.column_num = parseInt(surface_example[0].layout.substring(0,1)); //布局的 列数
    $scope.row_num = parseInt(surface_example[0].layout.substring(1,2));    //布局的 行数
    $scope.columns =initData(new Array($scope.column_num));
    $scope.rows =initData(new Array($scope.row_num));
    $scope.classLine= 12/$scope.column_num;                              //布局行的样式
    $scope.cards = cards;
    $scope.courseName = surface_example[0].name;                            //课件名称
}

var couseLibCtrl = function($scope,surface_example){
    //此处应该注入所有课件的 数据模型
    //当前注入surface_example一个数据模型
    $scope.columns = initData(new Array(surface_example.length));  //只有一个所以为1
    $scope.courses = surface_example;
}