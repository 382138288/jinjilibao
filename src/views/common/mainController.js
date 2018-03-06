app.controller('MainController', function (
    $scope, 
    httpService, 
    $filter, 
    $localStorage, 
    $state,
    Global,
    $location
) {
    $scope.state = $state;
    $scope.global = Global;
    $scope.user = $scope.global.getUser();
    $scope.logout = function () {
        httpService.queryPost($scope, $filter('交互接口对照表')('退出接口'), {}, function (data) { });
        $filter('清空缓存')();
        if ($location.$$url.indexOf('myAccount') != -1) {
            $filter("跳转页面")('denLu', 'main.myAccount.accountHome', 'dl');
        } else {
            location.reload();
        }
    };
})  