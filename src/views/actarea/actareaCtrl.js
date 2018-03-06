app.controller('actareaController', [
'$rootScope',
'$scope',
'$location',
'$localStorage',
'$filter',
'httpService',
'$state',
'ngDialog',
'storage',
'Global',
function(
    $rootScope,
    $scope,
    $location,
    $localStorage,
    $filter,
    httpService,
    $state,
    ngDialog,
    storage,
    Global
) {
	Global.pageTitel("活动专区");

	$scope.isLogin = $filter('isRegister')().register;
	$scope.showOn = true;
	$scope.showCode = 'wechat';
	$scope.oldNum = 0;
	$scope.newNum = 0;
	$scope.oldList = [];
	$scope.newList = [];

	$rootScope.activeNav = 'together';

	// 监听退出是否成功
	$rootScope.$on('exitSuccess', function(event, flag) {
		if (flag) {
			$scope.isLogin = false;
		}
	});

	if($localStorage.user != undefined){
		$scope.uid = $localStorage.user.uid;
		httpService.queryPost($scope,$filter('交互接口对照表')('Home主数据'),{},function(data) {
            $scope.user = data.map;
            if (data.map.realName == '' || data.map.realName == undefined) {
                $scope.user.userName = '亲爱的用户';
            } else {
                $scope.user.userName = data.map.realName;
            }
            $localStorage.user = $scope.user;
        });
	}

    httpService.queryPost($scope,$filter('交互接口对照表')('活动聚合页列表'),{},function(data) {
        if (data.success) {
            $scope.list = data.map.pageInfo.rows;
            var lengthlist = $scope.list.length;
            for (var i = 0; i < lengthlist; i++) {
                if ($scope.list[i].status == 1) {
                    $scope.newNum ++;
                    $scope.newList.push($scope.list[i]);
                } else if ($scope.list[i].status == 2) {
                    $scope.oldNum ++;
                    $scope.oldList.push($scope.list[i]);
                }
            }
            console.log($scope.newList);
            console.log($scope.oldList);
            if ($scope.newList.length > 4) {
                $scope.showNewBtn = true;
            } else {
                $scope.showNewBtn = false;
            }
            if ($scope.oldList.length > 4) {
                $scope.showOldBtn = true;
            } else {
                $scope.showOldBtn = false;
            }
        }
    });

    $scope.showMore = function(str) {
    	if (str == 'new') {
    		$scope.showNewBtn = false;
    	} else if (str == 'old') {
    		$scope.showOldBtn = false;
    	}
    };
}])