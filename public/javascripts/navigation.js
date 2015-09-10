/**
 * Created by GeoStar on 2015/8/25.
 */

var Navigation = {};
Navigation.coll = {};
Navigation.nav = [];
/**
 * 副标题
 * */
Navigation.subHead = function(coll){
    if(!coll){
        return false;
    }
    var url = window.location.pathname;
    console.log(url);
    var ary = url.split("/");
    if(ary.length <= 4) {
        if (ary[3]) {
            var index = url.indexOf("/" + ary[3]);
            url = url.substring(0,index);
        }
    }
    if("/" == url){
        return ;
    }
    var ul = $("#nav_1");

    /*取得菜单导航*/
    var obj = Navigation.getObjByUrl(url,coll);
    Navigation.nav.push(obj);
    Navigation.getParents(obj,coll);
    var nav = Navigation.nav;

    for(var i = nav.length-1; i >=0; i--){
        var item = nav[i];
        //首页
        if(item.level == 0){
            continue;
        }
        var li = $("<li>");
        //当前位置
        if(i == 0){
            li.addClass("active");
            li.append(item.name);
        } else {//中间位置
            var a = $("<a href='"+item.url+"'>"+item.name+"</a>");
            li.append(a);
        }
        ul.append(li);

    }


};
/**
 * 取得指定URL的所有父(递归)
 * */
Navigation.getParents = function(obj,coll){
    var o = Navigation.getObjByName(obj.parent,coll);
    if(o) {
        Navigation.nav.push(o);
        Navigation.getParents(o,coll);
    }
};

Navigation.getObjByName = function(name,coll){
    for(var i = 0; i <　coll.length; i++){
        var item = coll[i];
        if(item.name == name){
           return item;
        }
    }
    return null;
};
Navigation.getObjByUrl = function(url, coll){

    for(var i = 0; i <　coll.length; i++){
        var item = coll[i];
        if(item.url == url){
            return item;
        }
    }
    return null;
};
/**
 * 导航
 * */
Navigation.list = function(){
    var url = "/category/list";
    var data = {};
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function(resObj) {
            if( resObj ){
                Navigation.subHead(resObj);
                Navigation.show(resObj);
            }
        }
    });
};
Navigation.assemble = function(resObj){
    if(!util){
        return false;
    }
    return util.assemble(resObj)
};
Navigation.show = function(resObj){
    var container = $("#blog-navbar-ul");
    container.empty();
    var obj = Navigation.assemble(resObj);
    for(var i = 0; i < obj.length; i++){
        var item = obj[i];
        var li = $("<li>");
        var a = $("<a href='" + item.url + "'>");
        a.append(item.name);
        li.append(a);
        if(item.level == 0){
            li.addClass("active");
        }
        if(item.sub && item.sub.length > 0){
            li.addClass("dropdown");
            a.attr('data-toggle','dropdown').addClass('dropdown-toggle');
            var ul = $("<ul>");
            ul.addClass("dropdown-menu");
            for(var j = 0; j < item.sub.length; j++){
                var it = item.sub[j];
                var subLi = $("<li>");
                var subA = $("<a>");
                subA.attr("href",it.url);
                subA.append(it.name);
                var b = $("<b class='caret'>");
                subLi.append(subA);
                ul.append(subLi);
            }
            li.append(ul);
        }
        container.append(li);
    }
};
