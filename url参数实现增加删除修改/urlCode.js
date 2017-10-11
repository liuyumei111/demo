
String.prototype.toQuery = function (obj) {
    /// <summary>
    /// 对象转query字符串
    /// </summary>
    /// <param name="obj" type="type">要转的对象</param>
    /// <returns type="">返回序列化后的查询字符串</returns>
    if (Object.prototype.toString.call(obj) !== "[object Object]") return false;
    var seatch = "";
    for (key in obj) {
        var item = key + "=" + obj[key] + "&";
        seatch += item;
    }
    return seatch.substring(0, seatch.length - 1);
};


String.prototype.getQueryString = function () {
    /// <summary>
    /// 获取QueryString
    /// </summary>
    /// <returns type="">返回序列化后的对象</returns>
    var query = this.substr(1);
    if (!query) return {};
    query = query.split("&");
    var result = {};
    for (var i = 0; i < query.length; i++) {
        query[i] = query[i].split("=");
        result[query[i][0]] = query[i][1];
    }
    query = null;
    return result
};

String.prototype.addQueryString = function (obj) {
    /// <summary>
    /// 添加QueryString
    /// </summary>
    /// <param name="obj" type="type">要添加的对象键值对</param>
    /// <returns type="">返回一个新的查询字符串</returns>
    var query = this.getQueryString();
    if (Object.prototype.toString.call(obj) !== "[object Object]") return this.toQuery(query);
    for (var key in obj) {
        query[key] = obj[key];
    }
    var search = "?" + this.toQuery(query);
    return search;
};


String.prototype.removeQueryString = function (key) {
    /// <summary>
    /// 删除QueryString
    /// </summary>
    /// <param name="key" type="type">指定要删除的key字符串 或 数组</param>
    /// <returns type="">返回删除后一个新的查询字符串</returns>
    var query = this.getQueryString();
    if (!(key instanceof Array || typeof key === "string")) return this.toQuery(query);
    var keys = typeof key === "string" ? [key] : key;
    for (var i = 0; i < keys.length; i++) {
        delete query[keys[i]];
    }
    return Object.keys(query).length > 0 ? "?" + this.toQuery(query) : "";
};


window.location.query = (function () {
        return window.location.search.getQueryString()
    })();

