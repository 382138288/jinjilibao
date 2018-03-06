app.controller('BDXQController', function ($scope, httpService, $filter, $stateParams) {
    httpService.post($scope, $filter('getUrl')('公告详情'), {
        id: $stateParams.newId,
    }, function (data) {
        if (data.success) {
            $scope.noticeData = data.map.sysArticle;
        }
    })
    $scope.goBack = function(){
        window.history.go(-1);
    }
})  