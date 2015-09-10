/**
 * Created by GeoStar on 2015/8/24.
 */
var BaseDao = require("./BaseDao");
var CategoryDao = {};
CategoryDao.curdOption = function(){};
CategoryDao.categories = [];
//原型继承
CategoryDao.curdOption.prototype = new BaseDao();
//初始化直接保存在这里，BaseDao中的array没用上
CategoryDao.model =  new CategoryDao.curdOption().getModelByName("Category");
//CategoryDao.model =  new CategoryDao.curdOption().getModel("Category");
//初始化获取菜单
new CategoryDao.curdOption().findAll(CategoryDao.model,{},function(err,doc){
    CategoryDao.categories = doc;
});

module.exports = CategoryDao;
