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
/**
 * console.log(" 是否为移动终端: "+browser.versions.mobile);
 console.log(" ios终端: "+browser.versions.ios);
 console.log(" android终端: "+browser.versions.android);
 console.log(" 是否为iPhone: "+browser.versions.iPhone);
 console.log(" 是否iPad: "+browser.versions.iPad);
 console.log(navigator.userAgent);
 *
 *
 *
 * */
util.browser={
    versions:function(){
        var u = window.navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
            iPad: u.indexOf('iPad') > -1, //是否为iPad
            webApp: u.indexOf('Safari') == -1 ,//是否为web应用程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
        };
    }()
};