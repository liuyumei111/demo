$(document).ready(function () {
    //获取到url后面的productId
    function locationSearcher(key) {
        var search = location.search.split('?');
        if(search.length>1){
            var params = search[1].split('&');
            for(var i=0;i<params.length; i++){
                var item = params[i].split('=');
                var k = item[0];
                if(key == k){
                    return item[1];
                }
            }
        }
        return null;
    }

    var detailId=locationSearcher('productId');
    // console.log(detailId);

    //Handlebars详情数据模板
    var detailTpl=$('#detail-template').html();
    var detailCmp=Handlebars.compile(detailTpl);

    $.ajax({
        url:C.interface.detail,
        type:'POST',
        dataType:'json',
        data:{
            productId:detailId,
        },
        success:function (response) {
            if (response.result=='success'){
                var data=response.data;
                //Handlebars详情数据模板
                $('#detail-content-box').html(detailCmp(data));

            }else if (response.result == 'login') {
                alert('您还没有登录，请登录');
            } else {
                alert(response.errorMsg);
            }
        }
    });

});