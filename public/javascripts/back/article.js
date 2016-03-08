/**
 * Created by GeoStar on 2015/8/26.
 */

var SysArticle = {};
//var um = UM.getEditor('editor');
//var ue = UE.getEditor('editor');
//$('#bootstrap-editor').wysiwyg();
$(document).ready(function(){
    SysArticle.init();
});
SysArticle.init = function(){
    $("#submit-btn").click(SysArticle.add);

    $("#img-up-btn").click(SysArticle.uploadFaceImg);
};
//$("#categories")
SysArticle.uploadFaceImg = function(){
    var imageUpState = $("#image-up-state");
    var form = $("#articleForm");
    //提交请求处理的url
    var actionUrl = "/back/cms/img/upload";
    //开始ajax操作
    form.ajaxSubmit({
        type: "POST",//提交类型
        dataType: "json",//返回结果格式
        url: actionUrl,//请求地址
        //data: formData,//请求数据
        success: function (data) {//请求成功后的函数
            console.log(data);
            if (data.state == "SUCCESS") {//返回成功
                imageUpState.html("上传成功");
                imageUpState.css("color", "green");
                $("#faceImg").val(data.url);
            } else {
                imageUpState.html("上传失败");
                imageUpState.css("color", "red");
            }
        },
        //请求失败的函数
        error: function (data) {
            imageUpState.html("上传出错");
            imageUpState.css("color", "red");
        },
        async: true

    });
};
SysArticle.add = function(){
    //var data = $("#articleForm").serialize();
    var data = {};
    data.title = $("#title").val();
    data.introduction = $("#introduction").val();
    data.categories = $("#categories").val();
    data.content = $('#summernote-editor').code();
    data.img = $("#faceImg").val();
    data.createDate = new Date().getTime();
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


