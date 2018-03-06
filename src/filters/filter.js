app.filter('asHtml', function ($sce) {
    return function (data) {
        return $sce.trustAsHtml(data);
    }
})

/*判断ie8*/
.filter('webIE8', function () {
    return function (p) {
        var browser = navigator.appName;    
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var hrefUrl = '/';
        var trim_Version;
        if (version[1] != undefined) {
            trim_Version = version[1].replace(/[ ]/g, "");
        } else {
            trim_Version = version[0].replace(/[ ]/g, "");
        }
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
            hrefUrl = '/#/';
        } else {
            hrefUrl = '/';
        };
        return hrefUrl;
    };
})
.filter('textarea',function(){
    return function(text){
        console.log(text);
        return text.replace(/\^/g,'<br />');
    }
})