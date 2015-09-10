(function($){
	/*$.fn.extend({
		paginator : function(){
			 var obj = $(this);
		        //生产分页
		        var currentPage = option.currentPage || 1,     //当前页数
		            totalPage = option.totalPage || 5,         //总页数
		            pageNumSize = option.pageNumSize || 5,     //显示页码的个数(参数为奇数)
		            callback = option.callback;                //显示页码数
		        //初始化
		        var ul = $.fn.paginator.init();
		        obj.html(ul);
		        //展示页面
		        $.fn.paginator.show(currentPage, totalPage, pageNumSize);
		        //绑定事件
		        $.fn.paginator.event(callback,currentPage, totalPage, pageNumSize);
		}
	});*/
    $.fn.paginator = function(option){
        var obj = $(this);
        //生产分页
        var currentPage = option.currentPage || 1,     //当前页数
            totalPage = option.totalPage || 5,         //总页数
            pageNumSize = option.pageNumSize || 5,     //显示页码的个数(参数为奇数)
            conditions = option.conditions || {},       //查询条件
            callback = option.callback;                //显示页码数

        //初始化
        var ul = $.fn.paginator.init();
        obj.html(ul);
        //展示页面
        $.fn.paginator.show(currentPage, totalPage, pageNumSize);
        //绑定事件
        $.fn.paginator.event(callback,currentPage, totalPage, pageNumSize ,conditions);
    };
    //初始化分页
    $.fn.paginator.init = function(){
        var ul = $("<ul class='pagination' id='paginator1'>");
        var ltLi = $("<li id='page_pre'><a>&lt;</a></li>");
        var gtLi = $("<li id='page_last'><a>&gt;</a></li>");
        var laquoLi = $("<li id='page_start'><a>&laquo;</a></li>");
        var raquoLi = $("<li id='page_end'><a>&raquo;</a></li>");
        var oneLi =  $("<li class='page_num'><a>1</a></li>");

        ul.append(laquoLi);
        ul.append(ltLi);
        ul.append(oneLi);
        ul.append(gtLi);
        ul.append(raquoLi);
        return ul;
    };
    //生产页码
    $.fn.paginator.create = function(start ,showMaxNum){
        var pageLast = $("#page_last");
        for(var i = start;i <= showMaxNum; i++){
            var li = $("<li class='page_num'>");
            var a = $("<a>"+ i +"</a>");
            li.html(a);
            pageLast.before(li);
        }
    };
    //展示
    $.fn.paginator.show = function(currentPage, totalPage, pageNumSize){
        //取得当前最大的页码dom
        var pageLast =  $("#page_last");
        pageLast.prev().remove();//移除已有
        var showNum = pageNumSize;
        if(totalPage <= pageNumSize){
            showNum = totalPage;
        }
        for(var i = 0;i < showNum; i++){
            var li = $("<li class='page_num'>");
            var a = $("<a href='javascript:void(0);'>"+(i + 1)+"</a>");
            li.html(a);
            pageLast.before(li);
        }
        //刷新页面效果
        $.fn.paginator.flush(currentPage , totalPage ,pageNumSize);

    };
    //刷新分页效果
    $.fn.paginator.flush = function(currentPage , totalPage, pageNumSize){
        //判断当前页和显示最大页数关系
        var currentMaxMum = getCurrentMaxMum();
        var currentMinNum = getCurrentMinNum();
        var start = 0;
        var showMaxNum = 0;
        //显示下一篇页码
        if(currentPage > currentMaxMum){
            start = currentPage - parseInt(pageNumSize/2);
            showMaxNum = getShowMaxNum(currentPage , totalPage, pageNumSize);
            if(showMaxNum > totalPage){
                start = totalPage - pageNumSize + 1;
                showMaxNum = totalPage;
            }
            $(".page_num").remove();
            $.fn.paginator.create(start,showMaxNum);

        }
        //显示上一篇页码
        if(currentPage < currentMinNum ){
            start = currentPage - parseInt(pageNumSize/2);
            showMaxNum =  currentPage + parseInt(pageNumSize/2);
            if(start < 1){
                start = 1;
                showMaxNum = pageNumSize;
            }
            $(".page_num").remove();
            $.fn.paginator.create(start,showMaxNum);
        }
        var paginator = $("#paginator1");
        //分页页码效果
        var as = paginator.find("a");
        for(var i = 0; i < as.length; i++){
            var a = $(as[i]);
            var num = a.html();
            num = parseInt(num);
            if( num == currentPage){
                a.parent().addClass("active");
            } else {
                a.parent().removeClass("active");
            }
        }
        /**上一页下一页 首页 末页 效果
         *
         * 如果当前页为1
         *   上一页和首页不能用
         * 当前页为最后一页
         *   下一页和末页不可用
         * 当前页大于1小于总页数 首页、末页、上一页、下一页可用
         * */
        paginator.find("li").removeClass("disabled");
        if(currentPage == 1){
            $("#page_start").addClass("disabled");
            $("#page_pre").addClass("disabled");
        }
        if(currentPage == totalPage){
            $("#page_end").addClass("disabled");
            $("#page_last").addClass("disabled");
        }
        if(currentPage > 1 && currentPage < totalPage){
            $("#page_start").removeClass("disabled");
            $("#page_pre").removeClass("disabled");
            $("#page_end").removeClass("disabled");
            $("#page_last").removeClass("disabled");
        }

    };

    //绑定事件
    $.fn.paginator.event = function(callback, currentPage, totalPage, pageNumSize, conditions){

        //首页事件
        startPageEvent(callback, totalPage, pageNumSize, conditions);
        //末页事件
        endPageEvent(callback, totalPage, pageNumSize, conditions);
        //上一页事件
        prevPageEvent(callback,totalPage, pageNumSize, conditions);
        //下一页事件
        nextPageEvent(callback,totalPage, pageNumSize, conditions);
        //普通页码事件
        numberPageEvent(callback, totalPage, conditions);
    };
    var getCurrentMinNum = function(){
        var num = 0;
        var prve = $("#page_pre");
        var a = prve.next().find("a");
        num = parseInt(a.html());
        return num;
    };

    var getShowMaxNum = function(currentPage , totalPage, pageNumSize){
        var num = currentPage + parseInt(pageNumSize / 2);
        return num;
    };

    var checkEnable = function(obj){
        if(!obj){
            return false;
        }
        var clazz = obj.attr("class");
        if(clazz == "disabled"){
            return false;
        }
        return true;
    };
    var getCurrentMaxMum = function(){
        var pageLast =  $("#page_last");
        var num = pageLast.prev().find("a:first-child").html();
        num = parseInt(num);
        return num;
    };
    var getCurrentPageNum = function(){
        //取得当前页
        var a = $("#paginator1").find("li.active").find("a");
        var num = a.html();
        num = parseInt(num);
        return num;
    };
    var startPageEvent = function(callback, totalPage,pageNumSize, conditions){
        var pageStart = $("#page_start");
        pageStart.unbind().click(function(){
            var flag = checkEnable(pageStart);
            if(!flag){
                return ;
            }
            var currentPage = 1;
            $.fn.paginator.flush(currentPage , totalPage,pageNumSize);
            callback(currentPage,conditions);
        });

    };
    var endPageEvent = function(callback,totalPage,pageNumSize, conditions){
        var endPage = $("#page_end");
        endPage.unbind().click(function(){
            var flag = checkEnable(endPage);
            if(!flag){
                return ;
            }
            $.fn.paginator.flush(totalPage , totalPage,pageNumSize, conditions);
            callback(totalPage,conditions);
        });

    };
    var prevPageEvent = function(callback,totalPage ,pageNumSize, conditions){
        var prevPage = $("#page_pre");
        prevPage.unbind().click(function(){
            var flag = checkEnable(prevPage);
            if(!flag){
                return ;
            }
            var currentPage = getCurrentPageNum();
            if(currentPage <= 1){
                currentPage = 1;
            } else {
                currentPage = currentPage -1;
            }
            $.fn.paginator.flush(currentPage , totalPage, pageNumSize);
            callback(currentPage,conditions);
        });

    };
    var nextPageEvent = function(callback, totalPage, pageNumSize, conditions){
        var pageLast = $("#page_last");
        pageLast.unbind().click(function(){
            var flag = checkEnable(pageLast);
            if(!flag){
                return ;
            }
            var currentPage = getCurrentPageNum();
            if(currentPage  >= totalPage){
                currentPage = totalPage;
            } else {
                currentPage = currentPage + 1;
            }
            $.fn.paginator.flush(currentPage , totalPage, pageNumSize);
            callback(currentPage,conditions);
        });

    };
    var numberPageEvent = function(callback,totalPage, conditions){
        $("#paginator1").on("click",".page_num",function(){
            var li = $(this);
            var val = li.find("a").html();
            var currentPage = parseInt(val);
            $.fn.paginator.flush(currentPage , totalPage);
            callback(currentPage,conditions);
        });
    };

})(jQuery);