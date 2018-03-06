/*lee 我的账户*/
app.controller('accountHomeCtrl', ['$rootScope','$scope', '$state', '$localStorage', 'resourceService','$filter','ngDialog','$location',function($rootScope,$scope, $state, $localStorage,resourceService,$filter,ngDialog,$location) {
	$filter('isLogin')($scope);
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;
	$scope.summaryContents= $localStorage.summaryContents;
	$scope.user={};
	$scope.user.product = [];
	$rootScope.title='我的账户-金吉利宝';
	$rootScope.activeNav = 'account';
	$localStorage.activeText = {name:'我的账户',url:'main.main.myAccount.accountHome'};
	if ($localStorage.user) {
		$scope.myPhone = $localStorage.user.mobilephone;
	}
	$scope.showPromoteTear = false;

	// 判断有红包可以拆
	if ($localStorage.promoteIsPayment != undefined && $localStorage.promoteIsPayment == true) {
		$scope.isPromote = true;
	} else {
		$scope.isPromote = false;
	}

	$scope.onClickToBillDetail=function (item,name) {
		switch(name){
			case '投资新手':
				$filter('跳转页面')('投资新手','main.home','main.billDetail');
			break;
			default:
				$filter('跳转页面')('产品推荐','main.myAccount.accountHome','main.billDetail',item,{pathName:'产品推荐',url:'/mainmyAccountaccountHome'});
			break;
		};
	};
	// 领取奖励
	$scope.getReward = function() {
		resourceService.queryPost($scope,$filter('交互接口对照表')('领取奖金'),{afid: $scope.inviteInfo.activity.id},'领取奖金');
	};
	$scope.closeDialog = function() {
		resourceService.queryPost($scope, $filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
		resourceService.queryPost($scope,$filter('交互接口对照表')('邀请好友统计'),{afid: $location.$$search.id},'邀请好友统计');
		ngDialog.closeAll();
	};
	$scope.showPop = 1;
	$scope.share = function() {
		// ngDialog.closeAll();
		// $filter('微信二维码弹窗')($scope);
		var qrcode = new QRCode('codeqrcode', {
			text: 'http://m.jushengcaifu.com/friendreg?frompc=true&recommCode=' + $scope.myPhone,
			render: 'table',
			width: 270,
			height: 270,
			colorDark : '#000000',
			colorLight : '#ffffff',
			correctLevel : QRCode.CorrectLevel.M
		});
		if(navigator.appName.indexOf("Microsoft") != -1){
			//IE
			if(navigator.appVersion.match(/8./i)=="8."){
				var qrcode = new QRCode('codeqrcode', {
					text: 'http://m.jushengcaifu.com/friendreg?frompc=true&recommCode=' + $scope.myPhone,
					render: 'table',
					width: 110,
					height: 110,
					colorDark : '#000000',
					colorLight : '#ffffff',
					correctLevel : QRCode.CorrectLevel.M
				});
			}
		}
		$scope.showPop = 2;
	};

	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case '用户信息':
				if (data.success) {
					$localStorage.user = data.map;
				}
				break;
			case "资产首页":
				$scope.accuntHome = data.map;
				$scope.investList = data.map.investList;
				$scope.infoList = data.map.infoList;
				$scope.fundsRecord = data.map.fundsRecord;
				$rootScope.isExperience = data.map.isExperience;
				$scope.drMemberFavourableList = data.map.drMemberFavourableList;
				$scope.experienceAmount = data.map.experienceAmount;
				$scope.isFuiou = data.map.isFuiou;
				if ($scope.drMemberFavourableList.length > 0) {
					$scope.hasNoACT = true;
				} else {
					$scope.hasNoACT = false;
				}
				// if (data.map.isPayment == true) {
				// 	if ($scope.isPromote) {
				// 		$scope.showPromoteTear = true;
				// 	} else {
				// 		$localStorage.promoteIsPayment = true;
				// 		$filter('促复投红包弹窗')($scope,'showTear');
				// 	}
				// } else {
					if(!$localStorage.promotefirstTime){
				        $localStorage.promotefirstTime = new Date().getDate();
				        $localStorage.promoteUser = $localStorage.user.mobilephone;
						resourceService.queryPost($scope,$filter('交互接口对照表')('获取复投红包'),{},'获取复投红包');
				    }else{
				        var day = new Date().getDate();
				        if ($localStorage.promoteUser != undefined && $localStorage.promoteUser == $localStorage.user.mobilephone) {
					        if($localStorage.promotefirstTime != day){
					        	resourceService.queryPost($scope,$filter('交互接口对照表')('获取复投红包'),{},'获取复投红包');
					            $localStorage.promotefirstTime = day;
					        }
				        } else if ($localStorage.promoteUser != undefined && $localStorage.promoteUser != $localStorage.user.mobilephone) {
				        	$localStorage.promoteUser = $localStorage.user.mobilephone;
				        	$localStorage.promotefirstTime = day;
				        	resourceService.queryPost($scope,$filter('交互接口对照表')('获取复投红包'),{},'获取复投红包');
				        }
				    }
				// }
			break;
			case "我的账户新手":
				$localStorage.product=$scope.newhand = data.map.newhand;
			break;
			case "邀请好友统计":
				if (data.success) {
					$scope.inviteInfo = data.map;
				}
			break;
			case "领取奖金":
				if (data.success) {
					$scope.amount = data.map.amount;
					$filter('奖金弹窗')($scope);
				}
			break;
			case "拆红包":
				if (data.success) {
					delete $localStorage.promoteIsPayment;
					ngDialog.closeAll();
					$scope.accountpromoteRedbags = data.map.redPacketList;
					$filter('促复投红包弹窗')($scope,'showRedBag');
					if (data.map.redMsg != undefined && data.map.redMsg.length > 0) {
						$scope.personList = data.map.redMsg;
						if ($scope.personList.length >= 6) {
							setInterval(function() {
								$('.promotelist').animate({'margin-top': '-233px'},1000,function() {
									$('.promotelist').find('li').eq(0).appendTo('.promotelist');
									$('.promotelist').find('li').eq(0).appendTo('.promotelist');
									$('.promotelist').find('li').eq(0).appendTo('.promotelist');
									$('.promotelist').css('margin-top','7px');
								});
							}, 5000);
						} else if ($scope.personList.length > 3 && $scope.personList.length < 6) {
							setInterval(function() {
								$('.promotelist').animate({'margin-top': '-73px'},1000,function() {
									$('.promotelist').find('li').eq(0).appendTo('.promotelist');
									$('.promotelist').css('margin-top','7px');
								});
							}, 5000);
						}
					}
				}
			break;
			// --------------促复投第一期-------------
			case '获取复投红包':
				if (data.success) {
					$rootScope.promoteGetCashFrom = false;
					if (data.map.isRedPacket) {
						if (data.map.returnedCount) {
							$rootScope.promoteHasReturn = true;
							$rootScope.returnedCount = data.map.returnedCount;
						} else {
							$rootScope.promoteHasReturn = false;
						}
					}
					$rootScope.promoteRedbags = data.map.redPacketList;
					if ($rootScope.promoteRedbags.length > 2) {
						$rootScope.promoteRedbags.length = 2;
					}
					$filter('红包弹窗')($rootScope);
				}
			break;
		};
	});
	resourceService.queryPost($scope,$filter('交互接口对照表')('产品列表'),{},'我的账户新手');
	resourceService.queryPost($scope, $filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
	resourceService.queryPost($scope, $filter('交互接口对照表')('邀请好友统计'),{},'邀请好友统计');
	// 用户信息
	if($localStorage.user != undefined){
		resourceService.queryPost($scope,$filter('交互接口对照表')('Home主数据'),{},'用户信息');
	}

	$scope.tearBag = function() {
		resourceService.queryPost($scope, $filter('交互接口对照表')('拆红包'),{},'拆红包');
	};

	$scope.showTearBag = function() {
		console.log(111);
		$filter('促复投红包弹窗')($scope,'showTear');
	};

	$scope.showOpenDialog = function() {
		$filter('开通账户弹窗')($scope);
	};


	// $filter('促复投红包弹窗')($scope,'showRedBag');
}])