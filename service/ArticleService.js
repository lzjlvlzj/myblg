/**
 * Created by GeoStar on 2015/8/26.
 */
var ArticleDao = require('../persist/ArticleDao');
var ad = new ArticleDao.curdOption();
var CategoryService = require("./CategoryService");
var Config = require('../common/Config');
var Page = require('../common/Page');

var ArticleService = {
    add : function(data, callback){
        var entity = new ArticleDao.model(data);
        ad.save(entity,callback);
    },
    testFind: function (data,callback){
        //data = {"category" : {"$in" : ["55dd3aeba56cb8c188249c5e"]}};
       // var ObjectId = mongoose.Schema.ObjectId;
        data.conditions = {"category" : {"$in":"55dd3b1ca56cb8c188249c62"}};
        //data.conditions = {"category" : ObjectId("55dd3aeba56cb8c188249c5e")};

        return ad.find(ArticleDao.model,data,function(err,doc){
            callback(err,doc);
        });
    },
    findAll : function(data,callback){
        return ad.findAll(ArticleDao.model,data,callback);
    },
    findById : function(data,callback){
        var rt = ad.findOne(ArticleDao.model,data,function(err,doc){
            if(!doc || err){
                callback(undefined,undefined);
                return;
            }
            var d = {};
            d.conditions = {};
            d.conditions._id = doc._id;
            d.update = {"$set" : {visits : (doc.visits + 1)}};

            ad.update(ArticleDao.model,d,function(error){
                if(error){
                    callback(undefined,undefined);
                    return;
                }
                doc.visits = doc.visits + 1;
                callback(error,doc);
            });
        });

    },
    getIds : function(categories ,url){
        var len  =categories.length;
        var rt = [];
        for(var i = 0; i < len; i++){
            var item = categories[i];
            if(item.url.indexOf(url) >= 0){
                rt.push(item._id);
            }
        }
        return rt;
    },
    findAside : function(data,callback){
        //返回字段
        data.returnField = "title category";
        //查询条件
        data.conditions = {};
        //显示条数
        data.size = 6;
        //开始位置
        data.startNum = 0;
        var ids = CategoryService.findSubIdsByUrl(data.url);
        data.conditions ={ "category" : {"$in" : ids}};
        if("/" == data.url){
            data.conditions = {};
        }
        return ad.find(ArticleDao.model,data,callback);
    },
    find : function(data,callback){
        //每页显示大小
        data.size = Config.pagination.size;
        //起始位置
        data.startNum = (data.currentPage - 1) * data.size;
        //返回字段
        data.returnField = "";
        //排序字段
        data.sortField = {createDate : -1};
        //查询菜单

        var menus = ArticleService.findCategories({},function(){});
        //查询数量
        menus.then(function(categories){
            //console.log(data.conditions.categoryUrl);
            Page.categories = categories;
            var categoriesIds = ArticleService.getIds( Page.categories , data.conditions.categoryUrl);
            //console.log(categoriesIds);
            //data.conditions = {"category" : {"$in":"55dd3b1ca56cb8c188249c62"}};
            data.conditions ={ "category" : {"$in" : categoriesIds}};
            return ad.count(ArticleDao.model,data,function(err,doc){});
        }).then(function(count){

            Page.totalRecords = count;

            //console.log(Page.categories);
            ad.find(ArticleDao.model,data,function(err,doc){

                //不起作用 不知道为什么重新组装数据 data没变化
                //var d = ArticleService.getNewResult(Page.categories,doc);
                //console.log(d[0].categoryDetail);
                Page.size = data.size;
                Page.currentPage = data.currentPage;
                Page.list = doc;

                Page.execStartNum();
                Page.execTotalPage();
                callback(err,Page);
            });
        });

    },
    getNewResult : function(categories, doc){
        var d = [];
        for(var i = 0; i < doc.length; i++){
            var item = doc[i];
            for(var j = 0; j < categories.length; j++){
                var category = categories[j];
                 if(item.category.toString()  == category._id.toString()){
                     item.categoryDetail = category;
                     break;
                }
            }
            d.push(item);
        }
        return d;
    },
    findCategories : function(data,callback){
        return CategoryService.findAll(data,callback);
    },
    getCategories : function(){
        return CategoryService.getCategories();
    },
    checkUrl : function(url){
        var categories = CategoryService.getCategories();
        var len = categories.length;
        var flag = false;
        for(var i = 0 ; i < len; i++){
            var item = categories[i];
            if(url == item.url){
                flag = true;
                break;
            }
        }
        return flag;
    }

};

module.exports = ArticleService;

