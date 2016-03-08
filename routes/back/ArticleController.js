/**
 * Created by GeoStar on 2015/8/26.
 */
var express = require('express');
var articleController = express();
var ArticleService = require("../../service/ArticleService");
var BlgUtil = require('../../common/BlgUtil');


/**
 * 新建页面
 * */
articleController.get("/article/ui",function(req, res){
    /*var doc = ArticleService.getCategories();
    console.log(doc);
    var data = BlgUtil.assembleCategories(doc);
    res.render("back/article",{data : data});*/
    //查询分类
    ArticleService.findCategories({},function(err,doc){
        //返回页面视图
        var data = BlgUtil.assembleCategories(doc);
        res.render("back/article",{data : data});
    });

});
/**
 *添加
 *
 * */
articleController.post("/article/add",function(req, res){
    var title = req.param("title");
    var introduction = req.param("introduction");
    var content = req.param("content");
    var img = req.param("img");
    var tmp = req.param("categories");
    var createDate = req.param("createDate");
    var t = tmp.split("-");
    var category = t[0];
    var baseUrl = t[1];
    var data = {};
    data.title = title;
    data.introduction = introduction;
    data.content = content;
    data.category = category;
    data.baseUrl = baseUrl;
    data.img = img;
    if(createDate){
        data.createDate = parseInt(createDate);
    } else {
        data.createDate = new Date().getTime();
    }
    ArticleService.add(data,function(err, doc){
        if(!err){
            res.json(1);
        } else {
            res.json(0)
        }
    });
});





module.exports = articleController;