/**
 * Created by Administrator on 13-10-29.
 */

angular.module("myApp.data",[]).factory("surface_example",function(){
    return {
        uuid: "C249C594-0C1C-4653-AAA1-1B92B67DB2A0",    //场景标识
        layout: "34",                                    //布局样式
        cardtree: [
            {
                parent: "C249C594-0C1C-4653-AAA1-1B92B67DB2A0",     //父节点标识
                child:"C249C594-0C1C-4653-AAA1-1B92B67DB2A0",       //素材标识
                position: 0                                         //位置
            },
            {
                parent: "F6218FB2-42A4-4F07-909E-681318A512BA",
                child:"F6218FB2-42A4-4F07-909E-681318A512BA",
                position: 1
            },
            {
                parent: "F6218FB2-42A4-4F07-909E-681318A512BA",
                child:"AA218FB2-42A4-4F07-909E-681318A512BA",
                position: 2
            }
        ]
    }
}).factory("cards",function(){
        return [
            {
                id: "C249C594-0C1C-4653-AAA1-1B92B67DB2A0",     //素材标识
                type: "card",                                   //类型 ： 【卡片】 【分类】
                name: "我要吃苹果",                              //文字
                imageUrl: "img/apricot.jpg", //图片
                audioUrl: "4E4D66DA-E516-4F65-90EC-F773E27A83B2"  //声音
            },
            {
                id: "F6218FB2-42A4-4F07-909E-681318A512BA",    //素材标识
                type: "catalog",                               //类型 ： 【卡片】 【分类】
                name: "动物",                                  //文字
                imageUrl: "img/animals.jpg", //图片
                audioUrl: "4E4D66DA-E516-4F65-90EC-F773E27A83B2"  //声音
            },
            {
                id: "AA218FB2-42A4-4F07-909E-681318A512BA",    //素材标识
                type: "card",                               //类型 ： 【卡片】 【分类】
                name: "我要吃薯片",                                  //文字
                imageUrl: "img/chips 1.jpg", //图片
                audioUrl: "4E4D66DA-E516-4F65-90EC-F773E27A83B2"  //声音
            }

        ]
    })

//
//var surface_example = {
//    uuid: "C249C594-0C1C-4653-AAA1-1B92B67DB2A0",    //场景标识
//    layout: "44",                                    //布局样式
//    cardtree: [
//        {
//            parent: "C249C594-0C1C-4653-AAA1-1B92B67DB2A0",     //父节点标识
//            child:"C249C594-0C1C-4653-AAA1-1B92B67DB2A0",       //素材标识
//            position: 0                                         //位置
//        },
//        {
//            parent: "F6218FB2-42A4-4F07-909E-681318A512BA",
//            child:"F6218FB2-42A4-4F07-909E-681318A512BA",
//            position: 1
//        }
//    ]
//}
//
//var cards = [
//    {
//        id: "C249C594-0C1C-4653-AAA1-1B92B67DB2A0",     //素材标识
//        type: "card",                                   //类型 ： 【卡片】 【分类】
//        name: "我要吃饭",                              //文字
//        image: "7D1027EC-C2FD-45E7-B840-4CF80C22B39D", //图片
//        audio: "4E4D66DA-E516-4F65-90EC-F773E27A83B2"  //声音
//    },
//    {
//        id: "F6218FB2-42A4-4F07-909E-681318A512BA",    //素材标识
//        type: "catalog",                               //类型 ： 【卡片】 【分类】
//        name: "日常",                                  //文字
//        image: "7D1027EC-C2FD-45E7-B840-4CF80C22B39D", //图片
//        audio: "4E4D66DA-E516-4F65-90EC-F773E27A83B2"  //声音
//    }
//]