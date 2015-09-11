/**前台页面
 * Created by GeoStar on 2015/8/28.
 */

var express = require('express');
var article = express();
var ArticleService = require("../service/ArticleService");


/**
 * 首页
 * */
article.get("/",function(req,res){
    var currentPage = req.param("currentPage");
    res.render('common', { title: "ACK'S BLOG" });
});
/**
 * 首页
 * */
article.get("/about",function(req,res){
    res.render('about', { title: "关于" });
});
/**
 * 测试
 * */
article.get("/test123/article/list",function(req,res){
    var data = {};
    var currentPage = req.param("currentPage");
    var conditions = req.param("conditions");

    //当前页
    data.currentPage = currentPage || 1;
    data.conditions = {};
    data.conditions.categoryUrl = "/life";
    ArticleService.find(data,function(err,doc){
        if(err){
            console.log("查询出错！");
        } else {
            res.json(doc);
        }

    });
});
/**
 * 文章列表
 *
 * */
article.post("/article/list",function(req,res){
    var data = {};
    var currentPage = req.param("currentPage");
    var conditions = req.param("conditions");
    //当前页
    data.currentPage = currentPage || 1;
    data.conditions = {"categoryUrl": conditions};
    ArticleService.find(data,function(err,doc){
        if(err){
            console.log("查询出错！");
        } else {
            res.json(doc);
        }
    });
});
/**
 * 最新文章
 *
 * */
article.post("/article/last",function(req,res){
    var data = {};
    data.url = req.param("url");
    //排序字段
    data.sortField = {createDate : -1};
    ArticleService.findAside(data,function(err,doc){
        if(err){
            console.log(err);
            res.json([]);
        } else {
            res.json(doc);
        }
    });
});
/**
 * 热门文章
 *
 * */
article.post("/article/hot",function(req,res){
    var data = {};
    data.url = req.param("url");
    //排序字段
    data.sortField = {visits : -1};
    ArticleService.findAside(data,function(err,doc){
        if(err){
            res.json([]);
        } else {
            res.json(doc);
        }
    });
});
/**
 * 一级菜单
 * */
article.get("/:category",function(req,res,next){
    var category = req.param("category");
    var url = "/" + category;
    var flag = ArticleService.checkUrl(url);
    if(!flag){
        next();
        return;
    }
    res.render('common', { title: category });
});
/**
 * 二级菜单
 * */

article.get("/:category/:sub",function(req,res,next){
    var category = req.param("category");
    var sub = req.param("sub");
    var url = "/" + category + "/" + sub;
    var flag = ArticleService.checkUrl(url);
    if(!flag){
        next();
        return ;
    }
    res.render('common', { title: sub });
 });

/**
 * 文章细节
 * */
article.get("/:category/:sub/:id",function(req,res,next){
    var category = req.param("category");
    var sub = req.param("sub");
    var id = req.param("id");
    var data = {};
    data.conditions = {};
    data.conditions._id = id;
    var url = "/"+category  + "/" + sub;
    //data.conditions.url = url;
    var flag = ArticleService.checkUrl(url);
    if(!flag){
        next();
        return;
    }
    ArticleService.findById(data,function(err,doc){
        if(err || !doc){
            next();
        } else {
            res.render("articleDetail",{data:doc});
        }
    });
});


module.exports = article;