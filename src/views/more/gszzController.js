app.controller('GszzController', function ($scope, httpService, $filter, $localStorage) {
    $scope.isShow = 1;
    $scope.show = function (num) {
        $scope.isShow = num;
    }
})  