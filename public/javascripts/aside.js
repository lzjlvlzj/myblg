/**
 * Created by ack on 2015/9/8.
 */
var Aside = window.Aside ||　{};

Aside.init = function(){
    var url = window.location.pathname;
    /*检测是不是包含数字
      有 : 文章详细页面
      默认 url = "/";
    */
    var ary = url.split("/");
    if(ary.length <= 4){
        if(ary[3]){
            url = "/";
        }

        //最新
        Aside.findLast(url);
        //最热
        Aside.findHot(url);
    }
    Aside.findMood();

};

Aside.request = function(data,url,callback){
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function(resObj) {
            if( resObj ){
                callback(resObj);
            }
        }
    });
};

Aside.showArticle = function(resObj,div,location) {
    div.empty();
    var ul = $("<ul class='nav nav-pills nav-stacked' >");
    for (var i = 0; i < resObj.length; i++) {
        var item = resObj[i];
        var li = $("<li>");
        var url = "#";
        //url = Navigation.getObjById(item.category);
        url = item.baseUrl + "/" + item._id;
        var a = $("<a href='" + url + "'>");
        a.append(item.title);
        li.append(a);
        ul.append(li);
    }
    div.append(ul);
};
/**
 * 查询最新
 * */
Aside.findLast = function(param){
    var url = "/article/last";
    var data = {};
    data.url = param;
    Aside.request(data,url,function(resObj){
        var div = $("#article-last");
        Aside.showArticle(resObj,div,param);
    });
};

/**
 * 查询最热
 * */
Aside.findHot = function(param){
    var url = "/article/hot";
    var data = {};
    data.url = param;
    Aside.request(data,url,function(resObj){
        var div = $("#article-hot");
        Aside.showArticle(resObj,div,param);
    });
};
/**
 * 每天来一句
 * */
Aside.showMood = function(resObj){
    $("#mood").empty().html(resObj.content);
    var time = resObj.createDate;
    time = util.date(time,"yyyy-MM-dd");
    $("#mood-time").empty().html(time);
};

Aside.findMood = function(){
    var url = "/mood/one";
    var data = {};
    Aside.request(data,url,Aside.showMood);
};

$(document).ready(function(){
    Aside.init();
});
