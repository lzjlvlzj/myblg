/**
 * Created by GeoStar on 2015/8/24.
 */
var CategoryDao = require('../persist/CategoryDao');
var cd = new CategoryDao.curdOption();
/*
CategoryService.curdOption = function(){};
CategoryService.curdOption.prototype = new BaseService(CategoryDao);
*/
var CategoryService = {
   add : function(data, callback){
       var entity = new CategoryDao.model(data);
       return  cd.save(entity,callback);
   },
   findAll : function(data,callback){
      return cd.findAll(CategoryDao.model,data,callback);
   },
   getCategories : function(){
       return CategoryDao.categories;
   },
   findOneByUrl : function(url){
       var categories = CategoryDao.categories;
       for(var i = 0; i < categories.length; i++){
           var item = categories[i];
           if(item.url == url){
               return item;
           }
       }
   },
   findSubIdsByUrl : function(url){
       var categories = CategoryDao.categories;
       var ids = [];
       for(var i = 0; i < categories.length; i++){
           var item = categories[i];
           if(item.url.indexOf(url) >=0 ){
               ids.push(item._id);
           }
       }
       return ids;
   }
};

module.exports = CategoryService;