'use strict';


/* Controllers */
//var test = require(".../models/test.js");

//angular.module('myApp.controllers', []);

var xiaoyudiControllers = angular.module('myApp.controllers', ['ngCookies']);
/**
 * Controller
 * 对话框
 */
xiaoyudiControllers.controller('dialogCtrl', ['$scope', 'user','$cookies','$http','$templateCache',
    function ($scope,user,$cookies,$http,$templateCache) {
        removeClass();
        $scope.$on("setUsersFromCourseCtrl",
            function (event, msg) {
                console.log("dialogCtrl", msg);
                msg.forEach(function(ite){
                    ite.imgUrl = "img/surface.jpg"; //给课件设一个图片    以后应该改为用缩略图
                });
                $scope.users = msg;
            });

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
            $http({method: "POST", url: portName+"/services/newcard",data:card, cache: $templateCache}).
                success(function(msg) {
                    console.log(msg);
                }).
                error(function(err) {
                    alert('error: ' + err);
                });
        }
        $scope.goEditAudio = function(){
            console.log($scope.file);
        }
        //切换课件
        $scope.changeCourse = function(rootcategory){
            $cookies.curSurface = rootcategory;//改变此时cookie
            $scope.$broadcast("CourseCtrlChangeFromDialogCtrl", rootcategory); //广播一个消息让课件页切换课件
            console.log(rootcategory);
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
    .controller('childCtrl', ['$scope','$cookies','getData',
    function ($scope,$cookies,getData) {
        removeClass();
        document.title = "孩子页面";
        //取得所有 课件信息
        getData.getCoursewaveData(function(result){
            $scope.user = result.users;
            $scope.classLine = result.classLine;
            $scope.courseName = result.courseName;
            $scope.layout = result.layout;
            $scope.childResCards = result.childResCards;
            console.log(result.childResCards);
        });


        //点击图片事件
        $scope.clickImg = function (audio) {
            console.log("play!~~~"+audio);
            $("#" + audio).jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://115.28.35.182/services/data/app/file/" + audio
                    }).jPlayer("play");
                },
                supplied: "mp3"
                //wmode: "window"
            }).jPlayer("play");
        }
    }])
/**
 * Controller
 * 课件编辑页                (首页)
 */
    .controller('CourseCtrl',
              ['$scope','$http','$templateCache','$cookies','init_Data','getData','setData',
    function ($scope,$http,$templateCache,$cookies,init_Data,getData,setData) {
        document.title = "课件";
        var userName;

//        此处验证用户是否为新用户，并且取得用户名---用户身份
        if($cookies.user == null){
            $cookies.user = new UUID().toString();
            init_Data.init();
        }
        userName = $cookies.user;
        console.log(userName);

        if($cookies.curSurface == null){                  //第一次进入
            //默认载入课件：《阶段一》
            $cookies.curSurface = "cat1";
        }
        //取得所有课件信息 和当前使用的课件信息
        getData.getCoursewaveData(function(result){
            console.log(result);
            $scope.user = result.users;
            $scope.classLine = result.classLine;
            $scope.courseName = result.courseName;
            $scope.layout = result.layout;
            $scope.childResCards = result.childResCards;
        });
        //切换了布局
        $scope.changeLayout = function () {
            //记录修改的布局                                                          数据库操作处打标记    db
            $scope.column_num = parseInt($scope.layout.substring(0, 1));              //布局的 列数
            var row = parseInt($scope.layout.substring(1, 2));                        //行数
            $scope.classLine = 12 / $scope.column_num;
            //提交修改的数据
            setData.postLayout({
                id:$cookies.user,
                rootcategory:$cookies.curSurface,
                layoutx:$scope.column_num,
                layouty:row
            });
        }
        //此处点击了切换课件的下拉按钮
        $scope.sayImChange= function(){
            getData.getUserData(function(user){
                $scope.$emit("setUsersFromCourseCtrl", user); //冒泡一个消息让父controller知道当前用户的所有课件信息
            });
        }

        //课件标题修改事件
        $scope.switch = function(){
            //修改完成时提交修改到服务器
            if($scope.changeCourseName){
                setData.postCourseName({
                    id:$cookies.user,
                    rootcategory:$cookies.curSurface,
                    name:$scope.courseName
                });
            }
            $scope.changeCourseName=($scope.changeCourseName)?false:true;
        }
        //点击了某个分类
        $scope.gotoCategory = function(childResCard){
            if(childResCard.type=="category"){
                console.log("test");
            }
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
 * 取得默认课件的root category 分类
 */
var findRootCategory = function(users,name){
    return users.filter(function(item) {
        if(item.rootcategory ==name) {
            return true;
        }
    }).shift();
}
