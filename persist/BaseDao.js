/**
 * Created by GeoStar on 2015/8/24.
 */
var Config = require('../common/Config');
var mongoose = require('mongoose');
var Entities = require('../common/Entities');
// pool
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    user: Config.user,
    pass: Config.password
};

var db = mongoose.createConnection();
db.open(Config.db.host, Config.db.dbName, Config.db.port, options, function(err) {
    if(err){
        console.log("connect mongoDB failed");
        console.log(err);
    } else{
        console.log('mongoDB connected!');
    }

});
db.on('error', function (err) {
    if(err){
        console.log(err);
        db.close();
    }
});
//when close, reopen a connect
db.on('close', function() {
    db.open(Config.db.host, Config.db.dbName, Config.db.port, options);
});

var BaseDao = function (){
    BaseDao.unique = this;
    if( BaseDao.unique !== undefined ){
       return BaseDao.unique;
    }
};
/*
* 减少数据库交互保存collection(这个不起作用)
* */
BaseDao.models = new Array(16);//暂定大小,自动扩充.

BaseDao.prototype.getObjectId = function(){
    return mongoose.Schema.ObjectId;
};

BaseDao.prototype.getModelByName = function(name){
    var model = BaseDao.models[name];
    if(!model){
        var scheme = new mongoose.Schema(Entities[name]);
        model = db.model(name,scheme);
    }
    return model;
};
BaseDao.prototype.getModel = function(collName,scheme){
    return db.model(collName,scheme);
};

/**
 *添加操作
 * */
BaseDao.prototype.save = function(entity, callback){
    if(!entity){
        return false;
    }
    entity.save(callback);
};
/**
 * 查询所有数据
 * */
BaseDao.prototype.findAll = function(model,data,callback){
    if(!model){
        callback(undefined,undefined);
        return ;
    }
    return model.find(data).exec(callback);
};
/**
 * 分页
 * */
BaseDao.prototype.find = function(model,data,callback){
    return model.find(data.conditions)
        .sort(data.sortField)
        .skip(data.startNum)
        .limit(data.size)
        .select(data.returnField)
        .exec(callback);
};
/**
 * 查询记录数
 * */
BaseDao.prototype.count = function(model,data,callback){
    return model.count(data.conditions).exec(callback);
};

/**
 * 更加查询
 * */
BaseDao.prototype.findOne = function(model,data,callback){
   return model.findById(data.conditions).exec(callback);
   // return model.findOneAndUpdate(data.conditions,data.update,data.returnField).exec(callback);;
};

/**
 * 更加id查询
 * */
BaseDao.prototype.findById = function(model,id,callback){
    return model.findById(id).exec(callback);
};
/**
 * 查询最新
 * */
BaseDao.prototype.findLast = function(model,data,callback){
    return model.find(data).select(data.returnField).exec(callback);
};

BaseDao.prototype.update = function(model,data,callback){
    console.log("-*-*---*-**--*--*-");
    console.log(data);
    console.log("-*-*---*-**--*--*-");
    return model.update(data.conditions,data.update,data.returnField).exec(callback);
};
module.exports = BaseDao;

