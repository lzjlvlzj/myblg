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