app.controller('WZGGController', function ($scope, httpService, $filter, $localStorage) {
    httpService.post($scope, $filter('getUrl')('网站公告列表'), {
        pageOn: 1,
        pageSize: 8,
        proId: 14
    }, function (data) {
        if (data.success) {
            $scope.ggList = data.map.page.rows;
            $scope.bill = data.map.page;
            $scope.bill.pages = [];
            for (var i = 0; i < parseInt($scope.bill.totalPage); i++) {
                $scope.bill.pages[i] = i + 1;
            };
        }
    });
    $scope.getList = function(pageOn){
        if(pageOn==$scope.bill.pageOn){
            return
        }
        httpService.post($scope, $filter('getUrl')('网站公告列表'), {
            pageOn: pageOn,
            pageSize: 8,
            proId: 14
        }, function (data) {
            if (data.success) {
                $scope.ggList = data.map.page.rows;
                $scope.bill = data.map.page;
                $scope.bill.pages = [];
                for (var i = 0; i < parseInt($scope.bill.totalPage); i++) {
                    $scope.bill.pages[i] = i + 1;
                };
            }
        });
    }
})  