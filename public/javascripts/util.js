/**
 * Created by GeoStar on 2015/8/26.
 */
var util = {};
util.assemble = function(resObj){
    var len = resObj.length;
    var rt = [];
    for(var i = 0; i < len; i++){
        var item = resObj[i];
        if(item.level <= 1){
            var sub = [];
            for(var j = 0; j < len; j++){
                var it = resObj[j];
                if(it.level > 1 && it.parent == item.name){
                    sub.push(it);
                }
            }
            item.sub = sub;
            rt.push(item);
        }
    }
    return rt;
};
util.date = function(time,fmt){
    var d = new Date(time);
    var o = {
        "M+": d.getMonth() + 1, //月份
        "d+": d.getDate(), //日
        "h+": d.getHours(), //小时
        "m+": d.getMinutes(), //分
        "s+": d.getSeconds(), //秒
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度
        "S": d.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};