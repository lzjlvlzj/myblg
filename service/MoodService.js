/**
 * Created by GeoStar on 2015/9/21.
 */
var MoodDao = require('../persist/MoodDao');
var md = new MoodDao.curdOption();

var MoodService = {
    findOne : function(data,callback){
        return md.findOne(MoodDao.model,data,callback);
    },
    add : function(data,callback){
        var entity = new MoodDao.model(data);
        return md.save(entity,callback);
    }
};

module.exports = MoodService;