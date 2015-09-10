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

};
/**
 * 查询最新
 * */
Aside.findLast = function(param){
    var url = "/article/last";
    var data = {};
    data.url = param;
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function(resObj) {
            if( resObj ){
                var div = $("#article-last");
                Aside.show(resObj,div,param);
            }
        }
    });
};

/**
 * 查询最热
 * */
Aside.findHot = function(param){
    var url = "/article/hot";
    var data = {};
    data.url = param;
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function(resObj) {
            if( resObj ){
                var div = $("#article-hot");
                Aside.show(resObj,div,url);
            }
        }
    });
};

Aside.show = function(resObj,div,location) {
    div.empty();
    var ul = $("<ul class='nav nav-pills nav-stacked' >");
    for (var i = 0; i < resObj.length; i++) {
        var item = resObj[i];
        var li = $("<li>");
        var url = location + "/" + item._id;
        var a = $("<a href='" + url + "'>");
        a.append(item.title);
        li.append(a);
        ul.append(li);
    }
    div.append(ul);
};

$(document).ready(function(){
    Aside.init();
});
