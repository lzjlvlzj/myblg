/**
 * Created by GeoStar on 2015/9/24.
 */
function login(){
    var form =  $("#loginForm")[0];
    form.action = "/back/cms/login";
    form.submit();
}