
//根据url中的key获取对应的value:
//网址:https://www.baidu.com?a=1&b=1
//locationSearcher('a')
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

//根据url中的key获取对应的value
//用res.key取值
var urs=window.location.search;
var strs=urs.substring(1);
var silp=strs.split('&');
var res={};
for (var i=0;i<silp.length;i++){
    res[silp[i].split("=")[0]]=silp[i].split("=")[1];
}
console.log(res);


//后退返回一步
/*后退一步*/

$('.button').click(function () {
    history.go(-1);
});


// Handlebars：
//服务器返回两种状态001和002，001代表一个状态，002代表一个状态
Handlebars.registerHelper('exemption',function (value) {
    if (value=='001'){
        return '退货免邮费';
    }else if (value=='002'){
        return '退货不包邮';
    }
});

//后台返回的数据是null或是''就返回0,如果后台返回了数据就渲染数据
Handlebars.registerHelper('isYesNull',function (p, options) {
    var flag=0;

    if (p==null||p==''){
        return flag;
    }else {
        flag=1;
        return flag;
    }
});

/*取整数*/
Handlebars.registerHelper('getInt',function (value) {
    return window.parseFloat(value).toFixed(0);
});


//数字+1
Handlebars.registerHelper('plus',function (sender) {
    return sender+1;
});


//分离以逗号隔开的Json数据
Handlebars.registerHelper('splitDetailImg',function (value) {
    var splitvalue=value.split(',');

    var reValues=[];

    for ( var i=0; i<splitvalue.length; i++ ){
        var reValue={};
        reValue.name=splitvalue[i];
        reValues[i]=reValue;
    }
    return reValues;

});


//比较两个值
//sym可以是<,>,=
Handlebars.registerHelper('compare',function (first, sym, sec) {
    var r=first+sym+sec;
    return eval(r);    //eval执行其中的的JavaScript代码
});


//判断value的状态，渲染不能的数据
//关于形参 left(值), operator(>=<), right(值), options(选项)
/* 关于使用:
{{#valueCompare backStatus '===' '1'}}
<span class="tuihuo-ing">退货中</span>
{{/valueCompare}}
{{#valueCompare backStatus '===' '2'}}
<span class="tuihuo-ed">已退款</span>
{{/valueCompare}}
{{#valueCompare backStatus '===' '3'}}
<span class="tuihuo-ed">已退货</span>
{{/valueCompare}}*/
Handlebars.registerHelper('valueCompare', function(left, operator, right, options) {
    // a>b 总共三个参数,小于三个参数不成立比较条件
    if (arguments.length < 3) {
        throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }
    var operators = {
        '==':     function(l, r) {return l == r; },
        '===':    function(l, r) {return l === r; },
        '!=':     function(l, r) {return l != r; },
        '!==':    function(l, r) {return l !== r; },
        '<':      function(l, r) {return l < r; },
        '>':      function(l, r) {return l > r; },
        '<=':     function(l, r) {return l <= r; },
        '>=':     function(l, r) {return l >= r; },
        'typeof': function(l, r) {return typeof l == r;
        }
    };

    if (!operators[operator]) {
        throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }

    var result = operators[operator](left, right);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
