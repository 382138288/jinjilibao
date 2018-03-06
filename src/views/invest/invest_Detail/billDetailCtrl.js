
/*lee 产品详情页*/
app.controller('billDetailCtrl', [
	'$rootScope',
	'$scope', 
	'$state', 
	'$localStorage', 
	'resourceService',
	'$filter',
	'communicationService',
	'$timeout',
	'$location',
	'ngDialog',
	'$element',
	'MAIN_MENU',
	'storage',
	'$stateParams',
	'InvestService',
	function(
		$rootScope,
		$scope, 
		$state, 
		$localStorage,
		resourceService,
		$filter,
		communicationService,
		$timeout,
		$location,
		ngDialog,
		$element,
		MAINMENU,
		storage,
		$stateParams,
		InvestService
	) {
	
		InvestService.investDetailInit($scope);
	$filter('isLogin')($scope);
	$(window).scrollTop(0);
	MAINMENU.menuname('bill','menu');
	$scope.product = $localStorage.product;
	$scope.path = $localStorage.pathObj;
	$scope.title = '项目详情';
	$scope.portName = '投资记录';
	$scope.playSound=true;
	$scope.amount = 0;
	$scope.showTabNum = 0;
	$scope.isShowIntroduce=true;
	$scope.isShowProInfo=false;
	$scope.isShowGuarantee=false;
	$scope.isShowInvest=false;
	$scope.ischufa=false;

	$scope.isFinish = false;

	$scope.isNewGay = true;

	$scope.bill= {};
    $scope.bill.pageOn = 1;
    $scope.bill.pageSize = 5;
    delete $localStorage.inProfitProductList;
    $scope.redbag = false;
	
    $scope.isLogin = $filter('isRegister')().register;
    


    // delete $localStorage.protocolIds;

	// 未设置交易密码时--去安全认证页面设置
	$scope.setTradeCode = function() {
		ngDialog.closeAll();
		$filter('跳转页面')('','main.myAccount.recharge','main.myAccount.accountSecurity','setTradeCode',null,{name:'账户管理',url:'main.myAccount.accountSecurity'});
	};
    $scope.showPastList = false;
    $scope.investListPast = [];
    $scope.isNumCash=false;
	var isSubmin=true;
	var balance;
	$scope.selectMyWinning=function(){
		$state.go('main.myAccount.winningRecord');
		ngDialog.closeAll();
	}
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case '投资记录':
				if (data.success) {
					$scope.investList = data.map.page.rows;
					$scope.allUserNum = data.map.page.rows.length;
					$scope.bill = data.map.page;
					$scope.bill.pages = [];
					for(var i=0;i<parseInt($scope.bill.totalPage);i++){
						$scope.bill.pages[i]=i+1;
					};
				}
			break;
			case '续投资记录':
				if (data.success) {
					$scope.investListPast = data.map.page.rows;
					$scope.allUserNumPast = data.map.page.rows.length;
					$scope.billPast = data.map.page;
					$scope.totalPast = data.map.page.total;
					$scope.billPast.pages = [];
					for(var i=0;i<parseInt($scope.billPast.totalPage);i++){
						$scope.billPast.pages[i]=i+1;
					};
				}
			break;
			case '用户信息':
				if (data.success) {
					$localStorage.user = data.map;
				}
			break;
			case "票据详情":
				$scope.repayPeriod = data.map.repayPeriod;
				$scope.firstRepayDate = data.map.firstRepayDate;
				$localStorage.product = $scope.product = data.map.info;
				$scope.extendInfos = data.map.extendInfos;
				$scope.repair = data.map.repair;
				$scope.isOldUser = data.map.isOldUser;
				$scope.specialRate = Number(data.map.specialRate);
				$scope.drMemberFavourableList = data.map.drMemberFavourableList;
				$scope.isShowLabel = data.map.isShowLabel;
				$scope.riskRatingList = data.map.riskRatingList;
				$scope.scoreList = data.map.scoreList&&data.map.scoreList.length>0?data.map.scoreList[0]:{};

				// 
				$scope.isFuiou = data.map.isFuiou;				

				if ($scope.isOldUser && $scope.specialRate != undefined && $scope.specialRate > 0) {
					$scope.onDoubleEgg = true;
				} else {
					$scope.onDoubleEgg = false;
				}

				if (data.map.projectList != undefined ) {
					if(data.map.projectList.length != 0){
						$scope.projectList = data.map.projectList;
						$scope.projectListData = true;
					}
				} else {
					$scope.projectListData = false;
				}
				if ($scope.product.fid != undefined) {
					$scope.showPast = true;
					resourceService.queryPost($scope,$filter('交互接口对照表')('投资记录'),{
						pid: $scope.product.fid,
						pageOn:1,
						pageSize:10
					},'续投资记录');
				} else {
					$scope.showPast = false;
				}
		
				if (data.map.info.type == 1){
					$rootScope.title = '新手标-';
					$scope.goPage($scope);

				} else if (data.map.info.type == 2) {
					$scope.goPage($scope);
					$rootScope.title = '优选理财-';
				} else if (data.map.info.type == 3) {
					$scope.goPage($scope);
					$rootScope.title = '优选理财-';
				}
				$scope.XQ = data.map;
				$scope.pics = data.map.picList;

				if(data.map.funds != undefined){
					$scope.account={};
					$scope.account = data.map.funds;//用户资金

					$scope.account.balance = $scope.account.fuiou_balance;

					balance = $scope.account.balance;
					// if($scope.account.investAmount <= 0 && $scope.product.type == 1){
					// 	$scope.isNewGay = true;
					// }else{
					// 	$scope.isNewGay = false;
					// };
					//判断以前的新手标
					// if($scope.XQ.newHandInvested == false && $scope.product.type == 1 && $scope.XQ.isInvested == false){
					// 	$scope.isNewGay = true;
					// }else{
					// 	$scope.isNewGay = false;
					// }
					if($scope.XQ.fuiouNewHandInvested == false && $scope.product.type == 3 && $scope.XQ.isNewUser == true){
						$scope.isNewGay = true;
					}else{
						$scope.isNewGay = false;
					}
					
				}else{
					delete $localStorage.user;
				}
					$scope.product = data.map.info;
					var borrower = $filter('截取段落')($scope.product.borrower);
					var introduce = $filter('截取段落')($scope.product.introduce);
					var repaySource = $filter('截取段落')($scope.product.repaySource);
					var windMeasure = $filter('截取段落')($scope.product.windMeasure);
					$scope.product.borrower = borrower;
					$scope.product.introduce = introduce;
					$scope.product.repaySource = repaySource;
					$scope.product.windMeasure = windMeasure;

					if ($scope.product.type == 3) {
						$scope.isShowIntroduce=false;
						$scope.isShowProInfo=true;
						$scope.isShowGuarantee=false;
						$scope.isShowInvest=false;
					}
					
					if($scope.product.establish != undefined){
						var date3 = $scope.product.establish - Date.parse(new Date());
						var day = Math.floor(date3/(24*3600*1000));
						var hh= Math.floor(date3/(3600*1000));
						if(day > 0){
							$scope.nowTimer = day+'天';
							// $scope.isFinish = true;
						}else
						if(day == 0&& hh > 1){
							$scope.nowTimer = hh+'小时';
							// $scope.isFinish = true;
							$scope.isBuTimer = true;
						}else
						if(day == 0&& hh < 1){
							$scope.nowTimer = '1小时内'
							// $scope.isFinish = true;
						}else
						if(hh < 0){
							$scope.nowTimer ='已结束';
							$scope.isFinish = true;
						}
					}else{
						$scope.nowTimer ='已结束';
						$scope.isFinish = true;
					};
				if($filter('isRegister')().register&&$scope.product.isRepair==1&& $scope.repair != undefined){
  					$scope.ischufa=true;
				}
				if($scope.product.isRepair!=1||$scope.repair == undefined ){
  					$scope.ischufa=false;
				}
				if(storage.storageData){
					$scope.isShowIntroduce=false;
					$scope.isShowProInfo=false;
					$scope.isShowGuarantee=false;
					$scope.isShowInvest=false;
					storage.storageData=false;
					$timeout(function(){
						$("html,body").animate({scrollTop:$('.bill-detail-info').offset().top})
					});
			    }
			break;
			case "确认投资":
				isSubmin = true;
				$scope.isShowOver=false;
				$scope.success = data.success;
				$scope.nextInvestNumber = $scope.product.nowNum;
				$scope.product.tpwd=null;
				$scope.redbag = false;
				if(data.success){
					_hmt.push(['_trackPageview', 'www.jinjilibao.com/maidian/tzcg']);
					
					// 新手标续投
					if ($scope.product.type == 1) {
						$localStorage.newhandPro = $scope.product;
						ngDialog.closeAll();
						$state.go('main.newhandSuccess',{nowNum: $scope.product.nowNum});
					}
					if (data.flag) {
						$scope.redbag = true;
					} else {
						$scope.redbag = false;
					}

					$scope.pText = '恭喜您！投资成功！';
					$scope.statusCode = 'success';
					resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),{id: $scope.product.id},'票据详情');
					$scope.investTime = data.map.investTime;
					$scope.luckCodeCount=data.map.luckCodeCount;
					$scope.luckCodes=data.map.luckCodes;
					if (data.map.isRepeats != undefined) {
						$scope.isRepeats = data.map.isRepeats;
					} else {
						$scope.isRepeats = false;
					}
					$scope.isDoubleEgg = data.map.isDoubleEgg;
				}else{
					if (data.errorCode == '2001') {
						$scope.showForgetPwd = true;
					} else {
						$scope.showForgetPwd = false;
					}
					if ($filter('确认投资服务器Error')(data.errorCode) == undefined) {
						$scope.statusCode = 'error';
						$scope.pText = data.errorMsg;
					} else {
						$scope.statusCode = $filter('确认投资服务器Error')(data.errorCode).classCode;
						$scope.pText = $filter('确认投资服务器Error')(data.errorCode).text;
					}
					$scope.redbag = false;
				}
			break;
			case "用户可用优惠券":
				$scope.hb=null;
				if(data.success){
					$scope.HBList=[];
					$scope.QList=[];
					$scope.FBQList=[];
					$scope.fristInvest=data.map;
					$scope.EggQList = [];

					$scope.clickBox = true;
					for (var i = 0; i < data.map.list.length; i++) {

						switch(data.map.list[i].type){
							case 1:
								data.map.list[i].sel=false;
								$scope.HBList.push(data.map.list[i]);

								// 复投红包
								if (Qtrget == null && $stateParams.redBagFid != undefined && $stateParams.redBagFid == data.map.list[i].id) {
									Qtrget = data.map.list[i];
									$scope.hb = data.map.list[i];
								}
							break;
							case 2:
								data.map.list[i].sel=false;
								$scope.QList.push(data.map.list[i]);

								// 砸金蛋的加息券
								if (data.map.list[i].fullName != undefined && Qtrget == null && $stateParams.redBagFid == undefined) {
									Qtrget = data.map.list[i];
									$scope.hb = data.map.list[i];
									// $scope.EggQList.push(data.map.list[i]);
								}
							break;
							case 4:
								data.map.list[i].sel=false;
								if(data.map.list[i].source==0){
									$scope.FBQList.unshift(data.map.list[i]);
								}else{
									$scope.FBQList.push(data.map.list[i])
								}
							break;
						};
					}

					// 砸金蛋的加息券
					if (Qtrget != null) {
						if (Qtrget.type == 1) {
							$scope.clickBox=0;
						} else if (Qtrget.type == 2) {
							$scope.clickBox=1;
						}
						Qtrget.sel = true;
					} else if($scope.HBList.length>0){
						$scope.clickBox=0;
					}else if($scope.QList.length>0){
						$scope.clickBox=1;
					}else if($scope.FBQList.length>0){
						$scope.clickBox=2;
					}else{
						$scope.clickBox=999;
					}
					$scope.isShowOver = true;
					// $filter('投资确认弹窗')($scope);
				}else{
				}
			break;
		};
	});

    $scope.closeDialog = function(bool) {
		ngDialog.closeAll();
	};
	var $win = $(window);
	$win.on('load resize scroll', function() {
    	$('.mask-imgs').height($win.height()).width($win.width());
        $('.mask-imgs li').height($win.height()).width($win.width());
        $('.mask-imgs li img').css('max-height',$win.height()).css('max-width',$win.width());
    });

    $('.explain').on('mouseover', function() {
    	$(this).addClass('showexplain');
    }).on('mouseout', function() {
    	$(this).removeClass('showexplain');
    });

	//controller里对应的处理函数
	$scope.renderFinish = function(){
    	if ($('.img-detail .imgs li').length <= 3) {
    		$('.img-detail .imgs ul').addClass('center-img');
    		$('.bill-turn-right').addClass('displaybtn');
    	}
		$('.bill-turn-left').addClass('displaybtn');
    	var lastindex = $('.img-detail .imgs li').length - 3;
		var mySwiper = new Swiper('.swiper-container', {
	        slidesPerView: 3,
	        paginationClickable: true,
	        loop: false
	    });

		$('.bill-turn-left').on('click', function(e){
			if ($('.bill-turn-left').hasClass('displaybtn')) {
				return;
			}
			e.preventDefault();
			mySwiper.slidePrev();
			$('.bill-turn-right').removeClass('displaybtn');
			if(mySwiper.slides[0].isActive()) {
				$('.bill-turn-left').addClass('displaybtn');
			} else {
				$('.bill-turn-left').removeClass('displaybtn');
			}
		});
		$('.bill-turn-right').on('click', function(e){
			if ($('.bill-turn-right').hasClass('displaybtn')) {
				return;
			}
			e.preventDefault();
			mySwiper.slideNext();
			$('.bill-turn-left').removeClass('displaybtn');
			// if(mySwiper.slides[lastindex].isActive()) {
			if(mySwiper.activeIndex == lastindex) {
				$('.bill-turn-right').addClass('displaybtn');
			} else {
				$('.bill-turn-right').removeClass('displaybtn');
			}
		});

		var mySwiper1 = new Swiper('.swiper-container1', {
			slidesPerView: 1,
	        paginationClickable: true
	    });

	    $('.img-detail .imgs li').on('click', function() {
	    	var index = $(this).index();
	    	if(!mySwiper1.browser.ie8) {
	    		mySwiper1.slideTo(index, 1000, false);
	    	}
	    	// mySwiper1.swipeTo(index, 1000, false);
	    	$('.mask-imgs').eq(0).addClass('show-mask');
	    });
	};
    $('.mask-imgs .close').on('click', function() {
    	$(this).parents('.mask-imgs').removeClass('show-mask');
    });
	var mySwiper2 = new Swiper('.swiper-container2', {
		slidesPerView: 1,
        paginationClickable: true
    });

	$scope.onClickPastPage=function (type,pageNum,listtype) {
        switch(type){
            case "beforPage":
                if($scope.billPast.pageOn > 1){$scope.billPast.pageOn -=1;$scope.goPagePast($scope);};
            break;
            case "currentPage":
                $scope.billPast.pageOn = pageNum;$scope.goPagePast($scope);
            break;
            case "nextPage":
                if($scope.billPast.pageOn < $scope.billPast.pages.length){$scope.billPast.pageOn +=1;$scope.goPagePast($scope);};
            break;
        };
    };

    $scope.goPagePast = function (scope) {
        var obj={};
        obj.pageOn =  scope.billPast.pageOn;
        obj.pageSize = 10;
        obj.pid = scope.product.fid;
        obj.pid = scope.product.fid;
        resourceService.queryPost($scope,$filter('交互接口对照表')('投资记录'),obj,'续投资记录');
    };

	// 忘记交易密码--去安全认证页面找回
	$scope.forgetTradeCode = function() {
		ngDialog.closeAll();
		$filter('跳转页面')('','main.myAccount.withdraw','main.myAccount.accountSecurity','forgetTradeCode',null,{name:'账户管理',url:'main.myAccount.accountSecurity'});
	};
	
	$localStorage.balanceNotEnough = false;
	$localStorage.balanceNotEnoughId = '';
	/*倒计时结束*/
	/*加减金额*/
	$scope.winterest = 0;
	var Qtrget=null;
	
	$scope.onClick=function (type,event,num) {
		switch(type){
			case "cut":
				if (parseInt($scope.product.nowNum) > parseInt($scope.product.leastaAmount)) {
					$scope.product.nowNum = parseInt($scope.product.nowNum);
					$scope.product.leastaAmount = parseInt($scope.product.leastaAmount);
					if($scope.product.nowNum < $scope.product.leastaAmount){
						$scope.product.nowNum = $scope.product.leastaAmount;
					}else{
						$scope.product.nowNum -= $scope.product.increasAmount;
					}
				}
				$scope.product.nowNum = parseInt($scope.product.nowNum);
			break;
			case "add":
				if (parseInt($scope.product.nowNum) < $scope.product.maxAmount) {
					$scope.product.nowNum = parseInt($scope.product.nowNum);
					// $scope.account.balance = $scope.account.balance;
					if($scope.product.nowNum > $scope.product.maxAmount){
						$scope.product.nowNum = $scope.product.maxAmount;
					}else{
						$scope.product.nowNum += $scope.product.increasAmount;
					}
				}
				$scope.product.nowNum = parseInt($scope.product.nowNum);
				
			break;
			case "keyUpBalance":
					$scope.product.nowNum = parseInt($scope.product.nowNum);
					$scope.isNumCash=false;
					
					if(angular.equals($scope.product.nowNum,NaN)){
						$scope.isHideNowNum = true;
						$scope.account.balance = balance;
					}else{
						$scope.isHideNowNum = false;
					}
					if($scope.product.nowNum > $scope.product.maxAmount){
						$scope.product.nowNum = $scope.product.maxAmount;
					}
					if(($scope.product.nowNum - $scope.product.leastaAmount)%$scope.product.increasAmount != 0 ){
						$scope.product.nowNum -= ($scope.product.nowNum - $scope.product.leastaAmount)%$scope.product.increasAmount;
					}
			break;
			case "产品描述":
				change(event);
				$scope.isShowIntroduce=false;
				$scope.isShowProInfo=true;
				$scope.isShowGuarantee=false;
				$scope.isShowInvest=false;
			break;
			case "项目介绍":
				change(event);
				$scope.isShowIntroduce=true;
				$scope.isShowProInfo=false;
				$scope.isShowGuarantee=false;
				$scope.isShowInvest=false;
			break;
			case "本息保障":
				change(event);
				$scope.isShowIntroduce=false;
				$scope.isShowProInfo=false;
				$scope.isShowGuarantee=true;
				$scope.isShowInvest=false;
				$('.guarantee img').on('click', function() {
			    	var index = $(this).parents('td').index();
			    	if(!mySwiper2.browser.ie8) {
				    	mySwiper2.slideTo(index, 1000, false);
				    }
			    	$('.mask-imgs').eq(1).addClass('show-mask');
			    });
			break;
			case "投资记录":
				change(event);
				$scope.isShowIntroduce=false;
				$scope.isShowProInfo=false;
				$scope.isShowGuarantee=false;
				$scope.isShowInvest=true;
				
			break;
			case "立即投资":
					
				$localStorage.balanceNotEnough = false;
				if (!$scope.isFuiou) {
					$filter('开通账户弹窗')($scope);
				} else {
					if (($scope.account.balance < $scope.product.leastaAmount)||($scope.account.balance - $scope.product.nowNum < 0)) {
						$localStorage.balanceNotEnough = true;
						$localStorage.balanceNotEnoughId = $location.$$search.id;
						$filter('投资余额不足弹窗')($scope);
					} else {

						Qtrget=null;
						$scope.isShowOver = true;

						resourceService.queryPost($scope,$filter('交互接口对照表')('用户可用优惠券'),{
							pid : $scope.product.id,
							amount:$scope.product.nowNum
						},'用户可用优惠券');

						$filter('投资确认弹窗')($scope);
					}
				}
			break;
			case "确认投资":
				if(isSubmin){
					isSubmin=false;
					var obj = {};
					obj.pid = $scope.product.id;
					obj.tpwd = $scope.product.tpwd;
					obj.amount = $scope.product.nowNum;
					if(Qtrget!=null){
						obj.fid = Qtrget.id;
					}else if ($scope.isNewGay) {
					}else if ($scope.fristInvest.investCount==0&&$scope.FBQList.length>0) {
						obj.fid = $scope.FBQList[0].id;
					};
					resourceService.queryPost($scope,$filter('交互接口对照表')('确认投资'),obj,'确认投资');
				}
			break;
			case "返回":
				$scope.isShowOver = true;
			break;
			case "券":
				$scope.hb = event;
				if(Qtrget == null){
					event.sel=true;
					Qtrget=event;
				}else if(Qtrget == event){
					if(Qtrget.sel){
						event.sel=false;
						Qtrget=null;
						$scope.hb = null;
					}else{
						event.sel=true;	
						Qtrget=event;
					};
				}else{
					event.sel=true;
					Qtrget.sel=false;
					Qtrget=event;
				}
				$scope.isShowOver = true;
			break;
			case "请关注其他项目":
				$filter("跳转页面")('','main.billDetail','main.invest');
			break;
		};
	};
	$scope.goPage = function (scope) {
        var obj={};
        obj.pageOn =  scope.bill.pageOn;
        obj.pageSize = scope.bill.pageSize;
        obj.pid = scope.product.id;
        resourceService.queryPost($scope,$filter('交互接口对照表')(scope.portName),obj,scope.portName);
     };
	/*更换加息券*/
	function changeQuan(item) {
		// body...
		switch(item.type){
			case 2:
			break;
			case 3:
			break;
		};
	}
	/*菜单切换*/

	var beforEvent=null;
	function change(event) {
		if(beforEvent == null){
			beforEvent = event.currentTarget;
			if(event.currentTarget.className == 'actived'){

			}else{
				event.currentTarget.parentNode.children[0].className='';
				event.currentTarget.className = 'actived';
			};
		}else if(beforEvent == event.currentTarget){

		}else{
			event.currentTarget.className = 'actived';
			beforEvent.className = '';
			beforEvent = event.currentTarget;
		};
	}
	/*×××××菜单切换结束××××××××××*/
	function showDetail() {

		if ($location.$$search.id == 2) {
			resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),{id: 2,type: 1},'票据详情');
		} else {
			if($location.$$search.id != undefined){
				$localStorage.pathUrl = 'main.billDetail';
				// $localStorage.pathUrl = 'main.invest';
				resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),$location.$$search,'票据详情');
			}else{
				if ($scope.product!= undefined) {
					$localStorage.pathUrl = 'main.billDetail';
					resourceService.queryPost($scope,$filter('交互接口对照表')('票据详情'),$scope.product,'票据详情');
				}else{
					$state.go('main.invest');
				}
			}
		}
	}
	showDetail();
	if($localStorage.user != undefined){
		resourceService.queryPost($scope,$filter('交互接口对照表')('Home主数据'),{},'用户信息');
	}
	// 监听退出是否成功
	$rootScope.$on('exitSuccess', function(event, flag) {
		if (flag) {
			$scope.isLogin = false;
		}
	});

	// 未绑定银行卡时--去安全认证页面绑定
	$scope.bindBank = function() {
		ngDialog.closeAll();
		$filter('跳转页面')('','main.myAccount.recharge','main.myAccount.accountSecurity','setTruename',null,{name:'账户管理',url:'main.myAccount.accountSecurity'});
	};
	$scope.active=1;
	$scope.activeFn=function(i){$scope.active=i;}
}])