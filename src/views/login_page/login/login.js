/*登录*/
app.controller('LoginController', [
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
        Global.pageTitel("用户登录");
        LoginService.loginInit($scope);

        
        var isDenLuSubmin = true;
        var changePicEvent;

        $scope.LoginClick = function (clickName, tegForm) {
            httpService.queryPost($scope, $filter('交互接口对照表')('登录接口'), $scope.userLogin, function (data) {
                if (data.success) {
                    httpService.queryPost($scope, $filter('交互接口对照表')('Home主数据'), {}, function (data) {
                    if (data.success) {
                        LoginService.loginOk(data, $scope.backPath);
                    }
                });
                    

                } else {
                    LoginService.loginError($scope);
                };
            });
        };
    $scope.clickInput = function (type, event, isLogin, tegForm) {
        switch (type) {
            case 'changePic': $scope.userLogin.picCode = null; changePicEvent = event; LoginService.changeIMG(changePicEvent); break;
        };
    };

}])