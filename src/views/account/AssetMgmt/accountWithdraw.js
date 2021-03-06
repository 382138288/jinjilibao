
/* si 提现 */
app.controller('accountWithdrawCtrl', [
	'$rootScope',
	'$scope',
	'$filter',
	'resourceService',
	'ngDialog',
	'$localStorage',
	'$location',
	'Global',
	function(
		$rootScope,
		$scope,
		$filter,
		resourceService,
		ngDialog,
		$localStorage,
		$location,
		Global
	) {
		$scope.Global = Global;
		Global.pageTitel('提现')
	$localStorage.dialogType = '提现';
	$rootScope.activeNav = 'account';
	var $storageForm = $('#storageForm');
	$scope.isSubmit = false;
	$scope.showOld = false;
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {

			case "提现数据":
				if (data.success) {
					$scope.user = data.map;
					if (!$scope.user.isFuiou) {
						$filter('开通账户弹窗')($scope);
					}
					if ($scope.user.funds>0) {
						$scope.showOld = true;
					} else {
						$scope.showOld = false;
					}
					if (data.map.isChargeFlag) {
						$scope.user.cost = 2;
					} else {
						$scope.user.cost = 0;
					}
				} else {
					var errorMsg = $filter('提现数据error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
				}
			break;
			case "提现":
				if (data.success) {
					if ($localStorage.hasCGWithdraw!=undefined) {
						delete $localStorage.hasCGWithdraw;
					}
					$scope.storage = data.map;

					$filter('提现跳转弹窗')($scope);

					getStorageForm($scope.storage.signature);
					// $('#storageJson').val($scope.storage.signature);
					$('#storageForm')[0].action = $scope.storage.fuiouUrl;
    				$('#storageForm')[0].submit();
				} else {
    				$scope.isSubmit = false;
					$.qTip({
						'type': false,
						'text': data.errorMsg
					});
				}
			break;
			case '获取复投红包':
				if (data.success) {
					$rootScope.promoteGetCashFrom = true;
					if (data.map.isRedPacket) {
						if (data.map.returnedCount) {
							$rootScope.promoteHasReturn = true;
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
			case "提现":
				$localStorage.hasShowRedBagDialog = true;
				if (data.success) {
					$localStorage.dialogStatus = 'success';
					$localStorage.dialogMsg = '您已成功提现'+ $filter('currency')($scope.user.cash - $scope.user.cost,'') +'元';
				} else {
					$scope.errorCode = data.errorCode;
					if (data.errorCode == '2001') {
						$scope.showForgetPwd = true;
					} else {
						$scope.showForgetPwd = false;
					}
					$localStorage.dialogMsg = $filter('提现error信息')(data.errorCode);
					if ($localStorage.dialogMsg == '处理中') {
						$localStorage.dialogStatus = 'ing';
						$localStorage.dialogMsg = '提现申请我们正在处理，如您填写的账户信息正确无误，您的资金将会于1-2个工作日内到达您的银行账户';
					} else {
						$localStorage.dialogStatus = 'error';
					}
				}
				$filter('充值提现弹窗')($scope);
			break;
		}
	});

	// onblur将金额保留两位小数
	$scope.setAmount = function(event,type) {
		if (type==1) {
			$scope.user.cash=$filter('isNumber2')($scope.user.cash,undefined,1);
		} else if (type==2) {
			$scope.user.storagecash=$filter('isNumber2')($scope.user.storagecash,undefined,1);
		}
	};

	// 未绑定银行卡时--去安全认证页面绑定
	$scope.bindBank = function() {
		// $scope.$broadcast('myEvent.WHDR_Ctrl','账户管理');
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.accountSecurity','bindBank',null,{name:'账户管理',url:'main.myAccount.accountSecurity'});
	};

	// 未设置交易密码时--去安全认证页面设置
	$scope.setTradeCode = function() {
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.accountSecurity','setTradeCode',null,{name:'账户管理',url:'main.myAccount.accountSecurity'});
	};

	// 忘记交易密码--去安全认证页面找回
	$scope.forgetTradeCode = function() {
		// $rootScope.$emit('myEvent.WHDR_Ctrl','账户管理');
		ngDialog.closeAll();
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.accountSecurity','forgetTradeCode',null,{name:'账户管理',url:'main.myAccount.accountSecurity'});
	};

	// 提交表单
	$scope.submitForm = function(valid) {
		if (!valid || $scope.isSubmit) {
			return;
		}
		$scope.isSubmit = true;
		if ($scope.showOld) {
			resourceService.queryPost($scope, $filter('交互接口对照表')('提现'),{
				amount: $scope.user.cash,
				tpw: $scope.user.tradepwd,
				isChargeFlag: $scope.user.isChargeFlag
			},'提现');
		} else {
			resourceService.queryPost($scope, $filter('交互接口对照表')('提现'),{
				amount: $scope.user.storagecash,
				isChargeFlag: $scope.user.isChargeFlag
			},'提现');
		}
	};

	resourceService.queryPost($scope, $filter('交互接口对照表')('提现数据'),{},'提现数据');
	
	// 提现成功或失败弹窗
	if ($location.$$search.success != undefined && $localStorage.hasCGWithdraw==undefined) {
		$localStorage.hasShowRedBagDialog = true;
		$localStorage.hasCGWithdraw = true;
		if ($location.$$search.success == 'true') {
			$localStorage.dialogStatus = 'success';
			$scope.rechargeSuccess = true;
			$localStorage.dialogMsg = '您已成功提现'+ $filter('currency')($location.$$search.amount,'') +'元';
		} else if ($location.$$search.success == 'false') {
			$localStorage.dialogStatus = 'error';
			$localStorage.dialogMsg = $location.$$search.errorMsg;
		}
		$filter('充值提现弹窗')($scope);
	}

	// 红包弹窗暂时去掉
	// if (!$localStorage.hasShowRedBagDialog || $localStorage.hasShowRedBagDialog == undefined) {
	// 	resourceService.queryPost($scope,$filter('交互接口对照表')('获取复投红包'),{},'获取复投红包');
	// } else {
	// 	$localStorage.hasShowRedBagDialog = false;
	// }

	function getStorageForm(json) {
		json = JSON.parse(json);
		for(var key in json.message){
			if(key !="signature") {
				$storageForm.prepend('<input type="hidden" name="'+key+'" value="'+json.message[key]+'" /><br/>');
			}
		}
		$storageForm.prepend('<input type="hidden" name="signature" value="'+json.signature+'" /><br/>');
	}

	$scope.reload = function() {
		window.location.reload();
	};

	$scope.closeDialog = function() {
        ngDialog.closeAll();
    };

}]);