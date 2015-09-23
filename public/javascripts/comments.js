/**
 * Created by ack on 2015/9/1.
 */

var u = window.navigator.userAgent;
var isMobile = !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/);
var mobileScript = "<script id='changyan_mobile_js' charset='utf-8' type='text/javascript'"
    +" src='http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=cyrXdHsEM&conf=prod_7ca05d56e1d25c09225b6bb38e76fba1'>"
    +"</script>";

if(isMobile){
    document.write(mobileScript);
} else {
    document.write('<script charset="utf-8",type="text/javascript", src="http://changyan.sohu.com/upload/changyan.js" ></script>');
    document.write('<script src="/javascripts/changyan-pc.js",type="text/javascript" ></script>');
}

