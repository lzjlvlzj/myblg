/**
 * Created by GeoStar on 2015/8/24.
 */
var Config = {
   //数据库链接
   db : {
      user : "",
      password : "",
      host : "192.9.104.125",
      port : "27081",
      dbName : "blg"
   },
   //上传路径
   uploadPath : {
      imgPath : "",
      docPath : "",
      videoPath : ""
   },
   //分页
   pagination : {
      size : 5           //每页显示5条记录

   }
};
module.exports = Config;