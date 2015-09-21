/**
 * Created by ack on 2015/9/21.
 */
var express = require('express');
var mood = express();
var MoodService = require("../service/MoodService");
mood.post("/mood/one",function(req,res){
    var data = {};
    data.returnField = {};
    data.sortField = {createDate : -1};
    MoodService.findLast(data,function(err,doc){
        res.json(doc);
    });
});
module.exports = mood;