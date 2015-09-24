/**
 * Created by GeoStar on 2015/8/24.
 */
var express = require('express');
var categoryController = express();
var CategoryService = require("../../service/CategoryService");

/**
 * 新建
 * */
categoryController.get('/category/ui',function(req, res){
    res.render();
});


/**
 * 新建
 * */
categoryController.get('/category/add',function(req, res){
    var data = {};
    data.name = "首页";
    data.parent = "";
    data.level = 1;
    console.log(data);
    CategoryService.add(data,function(err, doc){
        if(!err){
             res.send("ok");
        } else {

        }
    });
});
categoryController.get('/category/list',function(req, res){
    var data = {};

    CategoryService.findAll(data,function(err, doc){
        if(!err){
           res.json(doc);
        } else {
            res.send("error");
        }
    });
});


module.exports = categoryController;