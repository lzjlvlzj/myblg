/**
 * Created by GeoStar on 2015/9/11.
 */
var express = require('express');
var uploadController = express.Router();
var path = require('path');
var util = require('util');
var BlgUtil = require('../../common/BlgUtil');


uploadController.get("/img/test",function(req,res){
    res.render("back/test");
});
/**
 * 图片上传
 * */
uploadController.post("/img/upload",function(req,res){
    var option = {};
    option.path =  BlgUtil.getDateString();
    option.callback=function(rt){
        rt.state = "SUCCESS";
        //res.json(rt);//这个不可以为什么? image.js eval()
        res.send(JSON.stringify(rt));
    };
    BlgUtil.uploadImg(req,res,option);
});

module.exports = uploadController;