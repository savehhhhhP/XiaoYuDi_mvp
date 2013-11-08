'use strict';


/* Controllers */
//var test = require(".../models/test.js");

//angular.module('myApp.controllers', []);

var xiaoyudiControllers = angular.module('myApp.controllers', []);

xiaoyudiControllers.controller('childCtrl', ['$scope', 'surface_example', 'resource', 'cardtree','synManifest',
    function ($scope, surface_example, resource, cardtree,synManifest) {
        document.title = "孩子页面";
        $scope.layout = surface_example[0].layout;
        $scope.column_num = parseInt(surface_example[0].layout.substring(0, 1)); //布局的 列数
        $scope.row_num = parseInt(surface_example[0].layout.substring(1, 2));    //布局的 行数
        $scope.classLine = 12 / $scope.column_num;                              //布局行的样式

        var surface_id = getSurface(surface_example[0].uuid, cardtree);           //取得一个页面里的孩子id
        $scope.surfaces = getResource(surface_id, resource);                      //取得孩子id对应的卡片
        $scope.courseName = surface_example[0].name;                            //课件名称

        $scope.test = synManifest.query(function(response){
            console.log(response);
        },
        function(error){
            console.log("error");
        });
    }])

    .controller('CourseCtrl',
              ['$scope', '$log','synFile','synManifest','user','resources','card','card_tree',
    function ($scope, $log,synFile,synManifest,user,resources,card,card_tree) {
        document.title = "课件"
        //用户ID 设为u1 默认载入课件：《阶段一》
        var userName = "u1";
        //取得所有 课件(user.json)信息
        $scope.users = user.query(function(response){
            // Setting a cookie
            //$cookies.myUsers = response;
            //取得默认课件的root category 分类
            var rootSurface = findRootCategory(response,userName);   //u1: cat1
            var root_category = rootSurface.root_category;
            $scope.classLine = 12/ rootSurface.layoutx;     //布局行的样式
            $scope.courseName = rootSurface.name;

            //取得root category 分类下面的 元素（卡片或者分类）
            getChild(root_category,card_tree,card,$scope,userName);
        });
        //取得所有 资源的文件名
        $scope.resources = resources.query();
        $scope.changeLayout = function () {
            //记录修改的布局
            surface_example[0].layout = $scope.layout;
            $scope.column_num = parseInt($scope.layout.substring(0, 1));         //布局的 列数
            $scope.row_num = parseInt($scope.layout.substring(1, 2));            //布局的 行数
            $scope.classLine = 12 / $scope.column_num;
        }
        /*

        $scope.layout = surface_example[0].layout;
        $scope.column_num = parseInt(surface_example[0].layout.substring(0, 1)); //布局的 列数
        $scope.row_num = parseInt(surface_example[0].layout.substring(1, 2));    //布局的 行数

        $scope.classLine = 12 / $scope.column_num;                              //布局行的样式

        var surface_id = getSurface(surface_example[0].uuid, cardtree);           //取得一个页面里的孩子id
        $scope.surfaces = getResource(surface_id, resource);                      //取得孩子id对应的卡片
        $scope.courseName = surface_example[0].name;                            //课件名称
        $scope.changeLayout = function () {
            //记录修改的布局
            surface_example[0].layout = $scope.layout;
            $scope.column_num = parseInt($scope.layout.substring(0, 1));         //布局的 列数
            $scope.row_num = parseInt($scope.layout.substring(1, 2));            //布局的 行数
            $scope.classLine = 12 / $scope.column_num;
        }
        */
    }])

    .controller('NewCardCtrl', ['$scope', '$log',
    function ($scope, $log) {
        document.title = "新建卡片";
        $scope.$log = $log;
        $scope.message = 'Hello World!';
    }])

    .controller('resLibCtrl', ['$scope', '$log', 'resource',
    function ($scope, $log, resource) {
        document.title = "素材库";
        $scope.surfaces = findCatalog(resource);
    }])

    .controller('couseLibCtrl', ['$scope', 'surface_example',
    function ($scope, surface_example) {
        document.title = "课件库";
        //此处应该注入所有课件的 数据模型
        //当前注入surface_example一个数据模型
        $scope.courses = surface_example;
    }])

/**
 * 取得root category 分类下面的 元素（卡片或者分类）
 */
var getChild = function (root_category, card_tree,card, scope,cookies) {
    card_tree.query(function (response) {
        // Setting a cookie
        //cookies.myCard_tree = response;
        var childs = response.filter(function (item) {
            if (item.parent == root_category) {
                return true;
            }
        })
        scope.childs = childs;
        getChildRes(childs,card,scope,cookies);
    });
}
/**
 * 取得card.jason  对应课件root页的card信息
 */
var getChildRes = function(childs,card,scope,cookies){
    //取得所有 （card.json）信息
    card.query(function (response){
        // Setting a cookie
        //cookies.myCard = response;
        var chRes = response.filter(function(iteRes){
            return childs.some(function(ite){
                if(iteRes.id == ite.child){
                    return true;
                }
            });
        });
        scope.childResCards = chRes;
        console.log(chRes);
    });
}
/**
 * 取得默认课件的root category 分类
 */
var findRootCategory = function(users,name){
    return users.filter(function(item) {
        if(item.user ==name) {
            return true;
        }
    }).shift();
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
/**
 * 找出分类节点
 */
var findCatalog = function(resource){
    var results =[];
    var i=0;
    for(;i<resource.length;i++){
        if(resource[i].type == "catalog"){
            results.push(resource[i]);
        }
    }
    return results;
}
