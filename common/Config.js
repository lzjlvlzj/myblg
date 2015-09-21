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
      //dbName : "blg"//BDNlCYzrvoEbYRMObznF
      dbName : "blg"//
   },
   //上传路径
   upload : {
      basePath: "public/upload",
      img : {
         maxFieldsSize : 2 * 1024 * 1024                            //大小限制
      },
      docPath : "",
      videoPath : ""
   },
   //分页
   pagination : {
      size : 5           //每页显示5条记录

   }
};
module.exports = Config;