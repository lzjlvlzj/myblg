/**
 * Created by GeoStar on 2015/8/24.
 */

var Category = {
    name : String,                         //分类名
    parent : String,                       //父
    level : Number,                        //等级
    url : String                           //链接地址
};
/*var CategoryScheme = new mongoose.Schema({
    name : String,                         //分类名
    parent : String,                       //父
    level : Number,                        //等级
    url : String                           //链接地址
});*/

module.exports = Category;