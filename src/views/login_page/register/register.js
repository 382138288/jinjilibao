/*注册*/
app.controller('RegisterController', [
    '$scope',
    'httpService',
    '$filter',
    'Global',
    'LoginService',

    function (
        $scope,
        httpService,
        $filter,
        Global,
        LoginService
    ) {
        Global.pageTitel("用户注册");
        var firGetCode = true;

        /*注册*/
        $scope.login = LoginService.getUrlParamet();
        $scope.Global = Global;

        $scope.isSubMin = true;
        $scope.isShowReferee = true;
        var isZhuCeSubmin = true;
        
        LoginService.changeIMG();
        
        $scope.onClickReferee = function () {
            if ($scope.isShowReferee) {
                $scope.isShowReferee = false;
            } else {
                $scope.isShowReferee = true;
            };
        };
        $scope.isGetVoice = false;
        var $userphone = $('#userphone'),
            $imgcode = $('#imgcode');

        $scope.clickInput = function (type, event, isLogin, tegForm, isvoice) {
            switch (type) {
                case 'changePic':
                    LoginService.changeIMG(event);
                    break;
                case 'phonecodeMSG':
                        if (!isvoice && parseInt($scope.nowTimer) > 0) { 
                            return;
                        }
                        $scope.isGetCode = true;
                        $scope.voiceRepeat = false;
                        $scope.isvoice = isvoice;
                        if ($scope.login.picCode && $scope.login.mobilephone){
                            $filter('60秒倒计时')($scope,60);
                            httpService.queryPost($scope, $filter('getUrl')('校验图片验证码'), {
                                picCode: $scope.login.picCode,
                                mobilephone: $scope.login.mobilephone,
                                type: isvoice + 1
                            }, function (data) {
                                if(!data.success){
                                    $scope.stop();
                                    $scope.login.picCode = '';
                                    LoginService.changeIMG();
                                };
                            });
                        };
                    break;
            };
        };
        /* 
            点击注册请求
        */
        $scope.LoginClick = function (clickName, tegForm) {
            console.log('login-clickName', clickName)
            httpService.queryPost($scope, $filter('getUrl')('立即注册'), $scope.login, function (data) {
                if (data.success) {
                    LoginService.registerOk(data);
                } else {
                    $scope.login.picCode = '';
                    $scope.login.smsCode = '';
                    LoginService.changeIMG();
                };
            });
        };

        /*
            焦点离开时向后台验证手机号合法性
        */
        $scope.blurID = function (code, tegForm) {
            if (!tegForm.mobilephone.$error.required && !tegForm.mobilephone.$error.minlength && !tegForm.mobilephone.$error.pattern) {
                httpService.post($scope, $filter('getUrl')('注册验证手机号'), {mobilephone:$scope.login.mobilephone}, function (data) {
                    $scope.exists = data.map.exists;
                });
            };
        };

        $scope.userOut = function (event) {
            $filter('清空缓存')();
            httpService.queryPost($scope, $filter('getUrl')('退出接口'), {}, '退出');
            $scope.hasLogin = false;
        };
    }
])
