'use strict';


/* Controllers */
//var test = require(".../models/test.js");

//angular.module('myApp.controllers', []);

angular.module('myApp.controllers', []);

var childCtrl = function($scope,surface_example,resource,cardtree){
    document.title = "孩子页面";
    $scope.layout = surface_example[0].layout;
    $scope.column_num = parseInt(surface_example[0].layout.substring(0,1)); //布局的 列数
    $scope.row_num = parseInt(surface_example[0].layout.substring(1,2));    //布局的 行数

    $scope.classLine= 12/$scope.column_num;                              //布局行的样式

    var surface_id = getSurface(surface_example[0].uuid,cardtree);           //取得一个页面里的孩子id
    $scope.surfaces = getResource(surface_id,resource);                      //取得孩子id对应的卡片
    $scope.courseName = surface_example[0].name;                            //课件名称
}

var CourseCtrl = function($scope, $log,surface_example,resource,cardtree) {
    document.title = "课件"
    $scope.layout = surface_example[0].layout;
    $scope.column_num = parseInt(surface_example[0].layout.substring(0,1)); //布局的 列数
    $scope.row_num = parseInt(surface_example[0].layout.substring(1,2));    //布局的 行数

    $scope.classLine= 12/$scope.column_num;                              //布局行的样式

    var surface_id = getSurface(surface_example[0].uuid,cardtree);           //取得一个页面里的孩子id
    $scope.surfaces = getResource(surface_id,resource);                      //取得孩子id对应的卡片
    $scope.courseName = surface_example[0].name;                            //课件名称
    $scope.changeLayout = function (){
        //记录修改的布局
        surface_example[0].layout = $scope.layout;
        $scope.column_num = parseInt($scope.layout.substring(0,1));         //布局的 列数
        $scope.row_num = parseInt($scope.layout.substring(1,2));            //布局的 列数
        $scope.classLine= 12/$scope.column_num;
    }
}
/**
 * 找出一个surface内的所有资源
 */
var getResource = function(resource_ids,resource){
    var results =[];
    var i= 0,j=0;
    for(;i<resource_ids.length;i++){
        for(j=0;j<resource.length;j++){
            if(resource_ids[i].child == resource[j].id){
                results.push(resource[j]);
                continue;
            }
        }
    }

    return results;
}

/**
 * 根据每个课件所对应的树将 对应父节点的子节点id找出
 * 子节点包括分类和卡片
 */
var getSurface = function(parents,cardtree){
    var i= 0;
    var results = [];
    for (; i < cardtree.length; i++) {              //循环分类
        if (cardtree[i].parent == parents) {
            results.push(cardtree[i]);
        }
    }
    return results;
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
    document.title = "新建卡片"
    $scope.$log = $log;
    $scope.message = 'Hello World!';
}

var resLibCtrl = function($scope, $log,resource){
    document.title = "素材库";
    $scope.cards = resource;
}

var couseLibCtrl = function($scope,surface_example){
    document.title = "课件库";
    //此处应该注入所有课件的 数据模型
    //当前注入surface_example一个数据模型
    $scope.columns = initData(new Array(surface_example.length));  //只有一个所以为1
    $scope.courses = surface_example;
}