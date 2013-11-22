'use strict';


/* Controllers */
//var test = require(".../models/test.js");

//angular.module('myApp.controllers', []);

var xiaoyudiControllers = angular.module('myApp.controllers', []);
/**
 * Controller
 * 对话框
 */
xiaoyudiControllers.controller('dialogCtrl', ['$scope', 'user','serverCookie','$http','$templateCache',
    function ($scope,user,serverCookie,$http,$templateCache) {
        removeClass();
        $scope.creatNewCard = function(){//提交操作
            var card ={
                card:"card5",
                name:"我要唱歌",
                image:"r9",
                imagefile:"r9.jpg",
                audio:"r10",
                audiofile:"r10.mp3",
                categroy:"cat22",
                position:10,
                user:"u1"
            }
            console.log(card);
            $http({method: "POST", url: "http://localhost:3000/services/newcard",data:card, cache: $templateCache}).
                success(function(msg, status, headers, config) {
                    console.log(msg);
                }).
                error(function(err, status, headers, config) {
                    alert('error: ' + err);
                });
        }
        $scope.goEditAudio = function(){
            console.log($scope.file);
        }
        $scope.users = user.query(function(response){
            response.forEach(function(ite){
                ite.imgUrl = "img/surface.jpg"; //给课件设一个图片    以后应该改为用缩略图
            });
        });
        $scope.changeCourse = function(name){
            serverCookie.getConfigCourse(name);//改变此时cookie

            $scope.$broadcast("CourseCtrlChangeFromDialogCtrl", name); //广播一个消息让课件页切换课件
            console.log(name);
        }
        $("#coursewave,#newResouse,#editAudio,#editImage").on('hide',function(e){
            e.preventDefault();
        });
        $scope.btnCreatCourseWare = function(){//功能未完成
            //创建新课件
            var newCourseWare = {
                "user": "u4",
                "name": "默认课程名称",
                "root_category": "cat4",
                "layoutx": 3,
                "layouty": 4
            };
            $scope.users.push(newCourseWare);
            //更改当前页
            serverCookie.getConfigCourse(newCourseWare.user);//改变此时cookie
            //更改数据库设置
        }
    }])
/**
 * Controller
 * 孩子页
 */
    .controller('childCtrl', ['$scope', 'card_tree','synManifest','card','serverCookie','resources','user',
    function ($scope,card_tree,synManifest,card,serverCookie,resources,user) {
        removeClass();
        document.title = "孩子页面";
        //用户ID 设为u1 默认载入课件：《阶段一》
        var userName = serverCookie.getConfigCourse(null);
        //取得所有 课件(user.json)信息
        $scope.users = user.query(function(response){
            console.log(response);
            //取得默认课件的root category 分类
            var rootSurface = findRootCategory(response,userName);   //u1: cat1
            var root_category = rootSurface.root_category;
            $scope.classLine = 12/ rootSurface.layoutx;     //布局行的样式
            $scope.courseName = rootSurface.name;           //标题
            $scope.layout = rootSurface.layoutx.toString()+rootSurface.layouty.toString();
            //取得root category 分类下面的 元素（卡片或者分类）
            getChild(root_category,card_tree,card,$scope,userName);
        });
        //取得所有 资源的文件名
        $scope.resources = resources.query();
    }])
/**
 * Controller
 * 课件编辑页                (首页)
 */
    .controller('CourseCtrl',
              ['$scope','synManifest','user','resources','card','card_tree','init_getData','$http','$templateCache',
    function ($scope,synManifest,user,resources,card,card_tree,init_getData,$http,$templateCache) {
        document.title = "课件";
        var userName;
//        此处验证用户是否为新用户，并且取得用户名---用户身份
        if(init_getData.isNewUser()){
            var newid = {id:"lxl"};
            init_getData.getUserData(newid);
            console.log("post"+newid);
            //新用户预制数据
            $http({method: "POST", url: "http://localhost:3000/services/newUser",data:newid, cache: $templateCache}).
                success(function(msg, status, headers, config) {
                    console.log(msg);
                }).
                error(function(err, status, headers, config) {
                    alert('error: ' + err);
                });
        }
        userName = init_getData.getUserData(newid);
        alert(userName);

        //用户ID 设为u1 默认载入课件：《阶段一》
        alert(userName);

        //取得所有 课件(user.json)信息
        $scope.users = user.query(function(response){
            console.log(response);
            //取得默认课件的root category 分类
            var rootSurface = findRootCategory(response,userName);   //u1: cat1
            var root_category = rootSurface.root_category;
            $scope.classLine = 12/ rootSurface.layoutx;     //布局行的样式
            $scope.courseName = rootSurface.name;           //标题
            $scope.layout = rootSurface.layoutx.toString()+rootSurface.layouty.toString();
            //取得root category 分类下面的 元素（卡片或者分类）
            getChild(root_category,card_tree,card,$scope,userName);
        });
        //取得所有 资源的文件名
        $scope.resources = resources.query();
        $scope.changeLayout = function () {
            //记录修改的布局                                                          数据库操作处打标记    db
            $scope.column_num = parseInt($scope.layout.substring(0, 1));              //布局的 列数
            $scope.classLine = 12 / $scope.column_num;
        }
        $scope.switch = function(){
            $scope.changeCourseName=($scope.changeCourseName)?false:true;
        }
        $scope.$on("CourseCtrlChangeFromDialogCtrl",
            function (event, msg) {
                console.log("CourseCtrl", msg);
            });

    }])
/**
 * Controller
 * 新建卡片
 */
    .controller('NewCardCtrl', ['$scope', '$log','synFile',
    function ($scope, $log,synFile) {
        removeClass();
        $('#fileupload').fileupload({
            done: function (e, data) {
                $.save()
            }
        });
        console.log($scope.file);
        document.title = "新建卡片";
        $scope.addCard = function(card){
            console.log(card);
        }
    }])
/**
 * Controller
 * 素材库
 */
    .controller('resLibCtrl', ['$scope', '$log', 'card',
    function ($scope, $log, card) {
        removeClass();
        document.title = "素材库";
        //取得用户所有资源
        card.query(function (response) {
            var Res = [];
            Res.push(    //第一个为未分类
                {
                    "id": "cat0",
                    "type": "category",
                    "name": "未分类",
                    "image": null,
                    "audio": null,
                    "user": null
                }
            );
            Res.concat(response.filter(function (iteRes) {
                if (iteRes.type == "category" && iteRes.name != "root_category") {             //迭代出为非跟目录的项
                    return true;
                }
            }));
            $scope.categorys = Res;
        });
    }])
/**
 * Controller
 * 某个分类
 */
    .controller('categroyCtrl', ['$scope', 'card','$routeParams',
    function ($scope,card,$routeParams) {
        $scope.params = $routeParams;           //取得进入的分类的id
        document.title = "分类页面";
        card.query(function(response){
            $scope.cards = response.filter(function(iteRes){
                if(iteRes.id==$routeParams.categroyId){
                    $scope.categroy = iteRes;
                    return false;
                }
                if(iteRes.name!="root_category"){
                    return true;
                }
            });
        });

    }]);

/**
 * 去除对话框的遮罩
 */
var removeClass = function(){                   //此处的jquery操作需要优化 （angular不提议直接操作dom）
    var exm = $("div:last");
    if(exm[0].className == "modal-backdrop fade in"){
        exm[0].remove()
    }
}

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
