app.service('httpService', function ($rootScope,$http, $filter,ngDialog,$localStorage) {

    this.queryPost = function (scope, url, data, next) {
        this.post(scope, url, data, next)
    };

    this.post = function (scope,url, rawData, next) {
        var data = {};
        angular.copy(rawData, data);
        showMask();
        var myThis= this;

        $http.post(url, data,{
            // headers:{
                //     'X-Requested-With':'XMLHttpRequest',
                //     'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
                // }
            })
            .then(function (res) {
                removeMask();
                var data = res.data;
                myThis.success_error(url, data.errorCode, scope)
                next(data);
        })
        .catch(function (err) {
            removeMask();
        })
    }
    function showMask() {
        $rootScope.maskHidde++;
    }

    function removeMask() {
        $rootScope.maskHidde--;
    }

    /* 
        error处理  （直接success==false的）
        key:        错误对照的key（同url）
        errorCode： 服务器返回的错误码
        scope：     操作域
    */
    this.success_error = function (key, errorCode, scope) {
        if (errorCode) {
            $filter('serveErrorMap')(key, errorCode, scope);
        };
    };
    /*
         data-error处理 (服务器success是成功的，数据逻辑有部分错误的处理方法)
    */
    this.data_error = function (errorData) {
        console.log(errorData)
    };
}); 

