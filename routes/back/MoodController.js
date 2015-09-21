/**
 * Created by ack on 2015/9/21.
 */
var express = require('express');
var moodController = express();
var MoodService = require("../../service/MoodService");

moodController.get("/mood/ui",function(req,res){
    res.render("back/mood",{title : "心情"});
});

moodController.post("/mood/add",function(req,res){
    var data = {};
    var content = req.param("content");
    if(content){
        data.content = content;
    }
    MoodService.add(data,function(err, doc){
        if(!err){
            res.json(1);
        } else {
            res.json(0)
        }
    });
});


module.exports = moodController;