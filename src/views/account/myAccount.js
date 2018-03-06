app.controller('myAccountCtrl', ['$rootScope','$scope','$location','$localStorage','resourceService', function($rootScope,$scope,$location,$localStorage,resourceService) {
	var jsonUrl='/data/menu.json';
	resourceService.getJsonServer($scope,jsonUrl,{},'我的账户_菜单');
	$scope.$on('resourceService_GET_JSON.MYEVENT', function(event, data, type) {
			$scope.menuItems = data.result;
	});
	// if($localStorage.activeText !=undefined){
	// 	$scope.curUrl = $localStorage.activeText.url;
	// 	$scope.activeText = $localStorage.activeText.name;
	// }else
	// {
	// 	$scope.curUrl = $location.$$url.replace('/','').replace('mainmyAccount', 'main.myAccount.');
	// 	$scope.activeText = $scope.activeText = '我的账户';
	// };
}]);