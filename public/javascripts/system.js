/**
 * Created by GeoStar on 2015/8/31.
 */
var System = {};
System.init = function(){
    //判断终端
    var isMobile = util.browser.versions.mobile;
    //导航
    Navigation.list(isMobile);
};
$(document).ready(function(){
    //导航
    System.init();
});

