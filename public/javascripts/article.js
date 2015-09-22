/**
 * Created by GeoStar on 2015/8/31.
 */


var Article = {};
Article.init = function(){
    var url = window.location.pathname;
    //文章列表
    Article.page(url);
};

Article.readMore = function(id,obj){
    var parents = $(obj).parents(".box");
    var category = parents.find(".category");
    var url = category.attr('href') + "/" + id;
    window.open(url);
};



Article.last = function(){

};

Article.page = function(conditions){
    var url = "/article/list";
    var data = {};
    data.conditions = conditions;
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function(resObj) {
            if( resObj ){
                var option = {totalPage:resObj.totalPage, pageNumSize :5, callback : Article.list,conditions : conditions};
                $("#page").paginator(option);
                Article.show(resObj);
            }
        }
    });
};
Article.list = function(currentPage,conditions){
    var url = "/article/list";
    var data = {};
    data.conditions = conditions;
    data.currentPage = currentPage;
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function(resObj) {
            if( resObj ){
                Article.show(resObj);
            }
        }
    });
};
Article.show = function(resObj){
    var containerDiv = $("#article-con");
    containerDiv.empty();
    var list = resObj.list;
    var len = list.length;
    var categories = resObj.categories;
    for(var i = 0; i < len; i++){
        var item = list[i];
        var oneArticle = Article.getOneArticle(item,categories);
        containerDiv.append(oneArticle);
    }
};
function getBoxHeader(item,categories){
    var boxHeader = $("<div class='box-header with-border'>");
    var con = $("<div class='row'>");
    var title = $("<div class='col-sm-10'>");
    var h4 = $("<h4>");
    var a = $("<a>");
    var id = item._id.toString();
    a.attr("href",item.url || "#");
    a.append(item.title);
    h4.append(a);
    title.append(h4);

    var btnDiv = $("<div class='col-sm-2'>");
    var btn = $("<button class='btn btn-primary' >");
    btn.html("更多");
    btn.attr("onclick","Article.readMore('"+id+"',this);");
    btnDiv.append(btn);

    con.append(title);
    con.append(btnDiv);
    boxHeader.append(con);
    return boxHeader;
}
function getBoxBody(item,categories){
    var boxBody = $("<div class='box-body'>");
    var rowDiv = $("<div class='row'>");
    var leftDiv = $("<div class='col-sm-4'>");
    var rightDiv = $("<div class='col-sm-8'>");
    var img = $("<img src='" + item.img + "'/>");
    leftDiv.append(img);
    var p = $("<p>");
    p.append(item.introduction);
    rightDiv.append(p);
    rowDiv.append(leftDiv);
    rowDiv.append(rightDiv);
    boxBody.append(rowDiv);

    return boxBody;
}
function getBoxFooter(item,categories){
    var boxFooter = $("<div class='box-footer'>");
    var rowDiv = $("<div class='row'>");
    var timeDiv = $("<div class='col-sm-5'>");
    var categoryDiv = $("<div class='col-sm-5'>");
    var visitsDiv = $("<div class='col-sm-2'>");
    var timeI = $("<i class='glyphicon glyphicon-calendar'>");
    var visitI = $("<i class='glyphicon glyphicon-eye-open'>");
    var categoryA = $("<a class='category' href='#'></a>");
    timeDiv.append(timeI);
    var time = item.createDate;
    time = util.date(time,"yyyy-MM-dd");
    timeDiv.append(time);
    for(var i = 0; i <　categories.length; i++){
        var category = categories[i];
        if(item.category == category._id){
            categoryA.html(category.name);
            categoryA.attr("href",category.url);
            break;
        }
    }

    categoryDiv.append("分类:");
    categoryDiv.append(categoryA);

    visitI.append("(" + item.visits + ")");
    visitsDiv.append(visitI);

    rowDiv.append(timeDiv);
    rowDiv.append(categoryDiv);
    rowDiv.append(visitsDiv);

    boxFooter.append(rowDiv);
    return boxFooter;
}

Article.getOneArticle = function (item, categories){
    var box = $("<div class='box box-success'>");

    var boxHeader = getBoxHeader(item,categories);
    var boxBody = getBoxBody(item,categories);
    var boxFooter = getBoxFooter(item,categories);
    box.append(boxHeader);
    box.append(boxBody);
    box.append(boxFooter);
    return box;
};
$(document).ready(function(){
    Article.init();
});