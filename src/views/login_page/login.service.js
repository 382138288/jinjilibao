app.service('LoginService', function (
    $rootScope,
    $location,
    $state,
    $localStorage
) {
    
    /* 
        注册 - 判断URL上带的参数
        toFrom：注册來源
        recommCode：推荐人号码
        tid：
        checkbox:注册协议复选框 | 默认状态为true
    */
       this.getUrlParamet = function () {
           var obj= {};
           if ($location.$$search.toFrom || $location.$$search.recommPhone || $location.$$search.tid) {
               $localStorage.webFormPath = obj = $location.$$search;
            };
            obj.checkbox = true;
            return obj;
        };
        
    /* 
        注册 - 注册成功后
        backPath: 到达登录的来源路径，登录完成后需要跳转回来源
    */
    this.registerOk = function (data, backPath) {
        $localStorage.user = data.map;
        var url = '';
        backPath ? url = backPath : url = 'main.home';
        $state.go(url);//跳转至首頁
        /* 
            //预留-回退到前一頁
            window.history.back(-1);
        */
   };

   /* 
        注册/登录 - 换图片验证码
   */
    this.changeIMG = function (event) { 
        if (event != undefined) {
            event.currentTarget.src += '?' + new Date().getTime();
        } else {
            if ($('.img-box img')[0] != undefined) {
                $('.img-box img')[0].src += '?' + new Date().getTime();
            }
        }
    };
   /* 
        登录 - 初始化参数
        backPath: 到达登录的来源路径，登录完成后需要跳转回来源
   */
    this.loginInit = function (scope) { 
        scope.userLogin = {};
        $location.$$search.backPath ? scope.backPath = $location.$$search.backPath : scope.backPath = false;
        console.log(scope.backPath)
    };
   /* 
        登录 - 完成登录
   */
    this.loginOk = function (data, backPath) { 
        this.registerOk(data,backPath);
    };
   /* 
        登录 - 登录错误处理
   */
    this.loginError = function (scope) { 
        this.changeIMG();
        scope.userLogin.picCode='';
        scope.isPicYanZhen = true;
    };

})  