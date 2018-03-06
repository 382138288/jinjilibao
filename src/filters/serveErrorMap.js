/*
    服务器错误code对照表（有弹框提示错误功能）
    key:        错误对照的key（同url）
    errorCode： 服务器返回的错误码
    scope：     操作域
*/
app.filter('serveErrorMap', function (DialogService) {
    return function (key, code, scope) {
        var error = {
            'reg': {
                1001: "短信验证码为空",
                1002: "短信验证码错误",
                1003: "手机号为空",
                1004: "图片验证码为空",
                1005: "密码格式错误",
                1006: "未勾选注册协议",
                1007: "手机号已注册",
                1008: "推荐人不存在",
                9999: "系统错误"
            },
            'sendRegMsg': {
                1001: "图片验证码不正确",
                1002: "当天短信发送超过限制",
                1003: "短信发送失败",
                1004: "图片验证码为空",
                8888: "频繁操作",
                9999: "系统错误"
            },
            'doLogin': {
                1001: "账号或密码为空",
                1002: "图片验证码不正确",
                1003: "密码错误",
            },
            '': {}

        };
        scope.error = {};
        scope.error.title = '错误提示：';
        scope.error.text = error[key][code];
        DialogService.showError(scope);
    };
});