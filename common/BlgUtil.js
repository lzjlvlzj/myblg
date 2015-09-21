/**
 * Created by GeoStar on 2015/8/26.
 */
var Config = require("./Config");
var http = require('http');
var util = require('util');
var fs = require('fs');
var path  = require('path');
var formidable = require('formidable');
var BlgUtil = {
    mkDir : function(path){
        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    },
    assembleCategories : function(resObj){
        var len = resObj.length;
        var rt = [];
        for(var i = 0; i < len; i++){
            var item = resObj[i];
            if(item.level <= 1){
                var sub = [];
                for(var j = 0; j < len; j++){
                    var it = resObj[j];
                    if(it.level > 1 && it.parent == item.name){
                        sub.push(it);
                    }
                }
                item.sub = sub;
                rt.push(item);
            }
        }
        console.log(rt);
        return rt;
    },
    getDateString : function(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var rt = year + "-" + month + "-" + day;
        console.log(rt);
        return rt;

    },
    uploadImg : function(req, res, option,callback) {
        option.uploadDir = Config.upload.basePath + "/image/" +option.path;
        option.maxFieldsSize = Config.upload.img.maxFieldsSize;
        //创建目录
        BlgUtil.mkDir(option.uploadDir);
        //上传文件
        BlgUtil.upload(req,res,option);
    },
    upload : function(req,res,option,callback){
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = option.uploadDir;
        form.maxFieldsSize = Config.upload.img.maxFieldsSize;
        var rt = {};
        var oldPath = "";
        //开始上传
        form.on('fileBegin', function(name, file) {
            console.log("开始上传文件 : " + file.name + "... ...");
            rt.originalName = file.name;
            var ext = path.extname(file.name);
            rt.type = ext;
            rt.name = (new Date() - 0) + ext;
            var len = "/public".length;
            var upDir = option.uploadDir.substr(len);
            rt.url =  "/" + upDir + "/" + rt.name;
            oldPath = file.path;
            //console.log(file);
        });
        form.on('field', function(field, value) {
            console.log("field...");
            console.log(field, value);
        });
        form.on('file', function(name, file) {
            console.log("文件正在上传... ...");
            rt.size = file.size;
        });
        form.on('error', function(err) {
            console.log("err...");
            console.log(err);
        });
        form.on('aborted', function() {
            console.log("aborted...");
        });
        form.on('end', function() {
            //fs.rename(filepath,newPath);
            var newPath = option.uploadDir + "/" + rt.name;
            console.log(newPath);
            fs.renameSync(oldPath, newPath);  //重命名
            rt.state = "SUCCESS";
            console.log("文件" + rt.originalName + "上传完毕!");
            option.callback(rt);
        });
        form.parse(req);
    }
};

module.exports = BlgUtil;

