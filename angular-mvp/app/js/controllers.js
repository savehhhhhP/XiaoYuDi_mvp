'use strict';


/* Controllers */
//var test = require(".../models/test.js");

//angular.module('myApp.controllers', []);

angular.module('myApp.controllers', []);

var CourseCtrl = function($scope, $log,surface_example,cards) {
    $scope.layout = surface_example.layout;
    $scope.column_num = parseInt(surface_example.layout.substring(0,1)); //布局的 列数
    $scope.row_num = parseInt(surface_example.layout.substring(1,2));    //布局的 行数
    $scope.columns =initData(new Array($scope.column_num));
    $scope.rows =initData(new Array($scope.row_num));
    $scope.classLine= 12/$scope.column_num;                              //布局行的样式
    $scope.cards = cards;

    $scope.changeLayout = function (){
        //记录修改的布局
        surface_example.layout = $scope.layout;
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
    $scope.columns =initData(new Array(3));
    $scope.rows =initData(new Array(4));
    $scope.cards = cards;
}

