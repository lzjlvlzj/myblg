/**
 * Created by GeoStar on 2015/8/26.
 */

var SysArticle = {};
$(document).ready(function(){
    SysArticle.init();
});
SysArticle.init = function(){
    $("#submit-btn").click(SysArticle.add);
};
//$("#categories")

SysArticle.add = function(){
    var data = $("#articleForm").serialize();
    var url = "/back/cms/article/add";
    $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success : function(resObj) {
            if( resObj == 1){
                console.log("添加成功");
            } else {
                console.log("添加失败");
            }
        }
    });
};


