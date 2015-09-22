/**
 * Created by GeoStar on 2015/8/24.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
var Article = {
    title : String,                   　　　　　　　　　　　　      //标题
    introduction : String,                                          //简介
    content : String,                                               //内容
    visits : {type : Number, default: 0},                           //浏览数
    img : { type: String, default: "../images/001.jpg" },           //图片位置
    category : { type: Schema.Types.ObjectId, ref: 'Category' },    //类别外键
    baseUrl : { type : String},                                     //url = baseUrl + "/"  + id(冗余)
    user : {type : String,default : "55dfd53a618064ec22f9880b"},    //作者id
    commentNum : {type : Number, default: 0},                       //评论数(冗余)
    createDate : { type: Number, default: new Date().getTime() }                  //创建时间
};

module.exports = Article;