/**分页
 * Created by ack on 2015/8/31.
 */
var Page = {};
Page.size = 5;                                                                                                                       //每页显示
Page.currentPage = 1;                                                                                                                //当前页
Page.startNum = 0;
Page.execStartNum = function(){
    Page.startNum = (Page.currentPag-1) * Page.size || 0;
};                                                                                                                                   //起始位置
Page.list = [];                                                                                                                      //集合
Page.conditions = {};                                                                                                                //查询条件
Page.totalRecords = 0;                                                                                                               //总记录数
Page.totalPage = 0;
Page.execTotalPage = function(){                                                                                                     //总页数

    if(Page.totalRecords % Page.size == 0){
        Page.totalPage = Page.totalRecords / Page.size;
    } else {
        Page.totalPage = parseInt(Page.totalRecords / Page.size) + 1;
    }
};


module.exports = Page;
