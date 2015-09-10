/** 前台导航
 * Created by GeoStar on 2015/8/26.
 */
var express = require('express');
var categories = express();
var CategoryService = require("../service/CategoryService");

categories.get('/category/list',function(req, res){
    var data = {};
    res.json(CategoryService.getCategories());
    /*CategoryService.findAll(data,function(err,doc){
        if(!err){

            res.json(doc);
        } else {
            res.json([]);
        }
    })*/
});

categories.post('/category/list',function(req, res){

    res.json(CategoryService.getCategories());
    /*var data = {};
    CategoryService.findAll(data,function(err,doc){
        if(!err){
            res.json(doc);
        }else{
            res.json([]);
        }
    })*/
});

module.exports = categories;