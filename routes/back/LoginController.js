/**
 * Created by ack on 2015/9/24.
 */
var express = require('express');
var loginController = express();


loginController.get("/login/ui",function(req,res){
    res.render("back/login",{title : "登陆"});
});

loginController.post("/login",function(req,res,next){
    var loginName = req.param("loginName");
    var password = req.param("password");
    if("ack" != loginName || "123456" != password){
        res.redirect("/back/cms/login/ui");
    }
    req.session.user = {loginName : loginName};
    res.redirect("/back/cms/article/ui");
});


module.exports = loginController;