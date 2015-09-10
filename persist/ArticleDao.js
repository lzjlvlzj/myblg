/**
 * Created by GeoStar on 2015/8/26.
 */
var BaseDao = require("./BaseDao");
var ArticleDao = {};

ArticleDao.curdOption = function(){};
ArticleDao.curdOption.prototype = new BaseDao();
ArticleDao.model =  new ArticleDao.curdOption().getModelByName("Article");
module.exports = ArticleDao;
