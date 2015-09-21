/**
 * Created by ack on 2015/9/21.
 */
var BaseDao = require("./BaseDao");
var MoodDao = {};
MoodDao.curdOption = function(){};
//原型继承
MoodDao.curdOption.prototype = new BaseDao();
//初始化直接保存在这里，BaseDao中的array没用上
MoodDao.model =  new MoodDao.curdOption().getModelByName("Mood");


module.exports = MoodDao;
