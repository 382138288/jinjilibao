app.controller('InvestController', [
	'$scope', 
	'$localStorage',
	'resourceService',
	'$filter',
	'InvestService',
	function(
		$scope, 
		$localStorage,
		resourceService,
		$filter,
		InvestService
	) {
		InvestService.investListInit($scope);
	
		$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
			switch(type){
				case '用户信息':
					if (data.success) {
						$localStorage.user = data.map;
					}
					break;
				case "优选理财":
					$scope.map = data.map;
				break;
				case "往期优选理财":
					$scope.map = data.map;
					$scope.bill = data.map.page;
					$scope.bill.pages = [];
					for(var i=0;i<parseInt($scope.bill.totalPage);i++){
						$scope.bill.pages[i]=i+1;
					};
				break;
			};
		});
	
	$scope.onClickPage=function (type,pageNum,listtype) {
		switch(type){
			case "beforPage":
				if($scope.bill.pageOn > 1){
					$scope.bill.pageOn -=1;
					InvestService.nextPage($scope);
				};
			break;
			case "currentPage":
				$scope.bill.pageOn = pageNum;
				InvestService.nextPage($scope);
			break;
			case "nextPage":
				if($scope.bill.pageOn < $scope.bill.pages.length){
					$scope.bill.pageOn +=1;
					InvestService.nextPage($scope);
				};
			break;
			case "期限":
				switch (listtype) {
					case 2:
						($scope.an.qx == 3) ? $scope.an.qx = $scope.an.order = 4 : $scope.an.qx = $scope.an.order = 3;
						$scope.an.lv = 1;
						InvestService.sortList($scope);
					break;
					case '往期优选理财':
						($scope.pastan.qx == 3) ? $scope.pastan.qx = $scope.pastan.order = 4 : $scope.pastan.qx = $scope.pastan.order = 3;
						$scope.pastan.lv = 1;
						$scope.bill.pageOn = 1;
						$scope.order = $scope.pastan.order;
						InvestService.nextPage($scope);
					break;
				}
			break;
			case "利率":
				switch (listtype) {
					case 2:
						($scope.an.lv == 1)? $scope.an.lv = $scope.an.order = 2 : $scope.an.lv = $scope.an.order = 1;
						InvestService.sortList($scope);
					break;
					case '往期优选理财':
						($scope.pastan.lv == 1) ? $scope.pastan.lv = $scope.pastan.order = 2 : $scope.pastan.lv = $scope.pastan.order = 1;
						InvestService.nextPage($scope);
					break;
				}
			break;
			case "起投金额":
				switch (listtype) {
					case 3:
						($scope.act.least == 5) ? $scope.act.least = $scope.act.order = 6 : $scope.act.least = $scope.act.order = 5;
						InvestService.nextPage($scope);
					break;
				}
			break;
			case "默认":
				switch (listtype) {
					case 2:
						$scope.an.lv = 1;
						$scope.an.qx = 3;
						$scope.an.order=0;
						InvestService.sortList($scope);
					break;
					case '往期优选理财':
						$scope.pastan.lv = 1;
						$scope.pastan.qx = 3;
						$scope.pastan.order=0;
						$scope.bill.pageOn = 1;
						$scope.order = $scope.pastan.order;
						InvestService.nextPage($scope);
					break;
				}
			break;
		};
	}
}])
