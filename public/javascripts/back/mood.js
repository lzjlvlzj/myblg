/**
 * Created by ack on 2015/9/21.
 */

var  SysMood = {};

$('#bootstrap-editor').wysiwyg();

SysMood.add = function(){
    var data = {};
    data.content = $('#bootstrap-editor').html();
    var url = "/back/cms/mood/add";
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