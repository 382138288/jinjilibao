'use strict';
var app = angular.module('angularJsPC',[
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'ngStorage',
    'ngResource',
    'ngDialog',
    'angular-md5'
]);
app
    .run(function ($rootScope, $location, $localStorage,$transitions) {
        $rootScope.version = '1.0.0';
        // $rootScope.channel = 5;

        // if (!$localStorage.registerObj) {
        //     $localStorage.registerObj = {};
        // }
        // if ($location.search()) {
        //     if ($location.search().toFrom) {
        //         $localStorage.registerObj.toFrom = $location.search().toFrom;
        //     }
        //     if ($location.search().recommPhone) {
        //         $localStorage.registerObj.recommPhone = $location.search().recommPhone;
        //     }
        //     if ($location.search().utm_content) {
        //         $localStorage.registerObj.utm_content = $location.search().utm_content;
        //     }
        //     if ($location.search().utm_campaign) {
        //         $localStorage.registerObj.utm_campaign = $location.search().utm_campaign;
        //     }
        //     if ($location.search().utm_kw) {
        //         $localStorage.registerObj.utm_kw = $location.search().utm_kw;
        //     }
        // }

        $rootScope.maskHidde = 0;
        // $rootScope.goBack = function (backTo) {
        //     if (backTo) {
        //         window.history.go(backTo);
        //     }
        //     else {
        //         window.history.go(-1);
        //     }
        // }
        // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        //     console.log('aaa')
        //     $('html').scrollTop(0);
        // })
        $transitions.onSuccess({ }, function(){
            $('html').scrollTop(0);
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //用于改变state时跳至顶部
        // $uiViewScrollProvider.userAnchorScroll();

        $locationProvider.html5Mode(true);
        var date = "?date=" + new Date().getTime();
        $stateProvider
            /*金吉利宝注册协议*/
            .state('zc', {
                url: '/zc',
                templateUrl: 'views/protocol_pages/zc.html' + date 
            })
            /*借款协议*/
            .state('loan', {
                url: '/loan?idx&pid&uid&investId',
                templateUrl: 'views/protocol_pages/loan.html' + date 
            })
            /*借款协议*/
            .state('storage', {
                url: '/storage',
                templateUrl: 'views/protocol_pages/storage.html' + date 
            })
            /*APP支付协议*/
            .state('pay', {
                url: '/pay',
                templateUrl: 'views/protocol_pages/pay.html' + date 
            })
            // 注册页
            .state('register', {
                url: '/register? recommPhone & toFrom & recommCode & backPath',
                templateUrl: 'views/login_page/register/register.html' + date,
                controller: 'RegisterController'
            }) 
            // 登录页
            .state('login', {
                url: '/login?backPath',
                templateUrl: 'views/login_page/login/login.html' + date,
                controller: 'LoginController'
            }) 
            .state('main', {
                abstract: true,
                url: '/main',
                templateUrl: 'views/common/main.html' + date,
                controller: 'MainController'
            })
            /* 找回密码 */
            .state('main.resetPasswd', {
                url: '/resetPasswd',
                templateUrl: 'views/login_page/reset-passwd/reset-passwd.html'
            })
            .state('main.home', {
                url: '/home',
                templateUrl: 'views/home/home.html' + date,
                controller: 'HomeController'
            })
            /*产品列表页*/
            .state('main.invest', {
                url: '/invest',
                templateUrl: 'views/invest/invest_List/invest.html' + date,
                controller: 'InvestController'
            })
             /*产品列表页*/
            .state('main.pastInvest', {
                url: '/pastInvest',
                templateUrl: 'views/invest/invest_List/past-invest.html' + date,
                controller: 'InvestController'
            })
            /*产品详情页*/
            .state('main.billDetail', {
                url: '/billDetail?id&redBagFid',
                templateUrl: 'views/invest/invest_Detail/bill-detail.html' + date
            })
            .state('main.aqbz', {
                url: '/aqbz',
                templateUrl: 'views/more/aqbz.html' + date,
                // controller: 'AqbzController'
            })
            // 信息披露
            .state('main.more', {
                abstract: true,
                url: '/more',
                templateUrl: 'views/more/more.html' + date,
            })
            .state('main.more.gywm', {
                url: '/gywm',
                templateUrl: 'views/more/gywm.html' + date,
            })
            .state('main.more.gszz', {
                url: '/gszz',
                templateUrl: 'views/more/gszz.html' + date,
                controller: 'GszzController'
            })
            .state('main.more.hzhb', {
                url: '/hzhb',
                templateUrl: 'views/more/hzhb.html' + date,
            })
            // 媒体报道
            .state('main.more.mtbd', {
                url: '/mtbd',
                templateUrl: 'views/more/mtbd.html' + date,
                controller:'MTBDController'
            })
            // 报道详情
            .state('main.more.bdxq', {
                url: '/bdxq?newId',
                templateUrl: 'views/more/bdxq.html' + date,
                controller:'BDXQController'
            })
            // 网站公告
            .state('main.more.wzgg', {
                url: '/wzgg',
                templateUrl: 'views/more/wzgg.html' + date,
                controller:'WZGGController'
            })
            // 公告详情
            .state('main.more.ggxq', {
                url: '/ggxq?newId',
                templateUrl: 'views/more/ggxq.html' + date,
                controller:'GGXQController'
            })
            .state('main.more.lxwm', {
                url: '/lxwm',
                templateUrl: 'views/more/lxwm.html' + date,
            })

            // 帮助中心
            .state('main.help', {
                abstract: true,
                url: '/help',
                templateUrl: 'views/help/help.html' + date,
                controller: 'HelpDetailController'
            })
            .state('main.help.dlzc', {
                url: '/dlzc',
                templateUrl: 'views/help/dlzc.html' + date,
                controller: 'HelpDetailController'
            })
            .state('main.help.cztx', {
                url: '/cztx',
                templateUrl: 'views/help/cztx.html' + date,
                controller: 'HelpDetailController'
            })
            .state('main.help.tzbk', {
                url: '/tzbk',
                templateUrl: 'views/help/tzbk.html' + date,
                controller: 'HelpDetailController'
            })
            .state('main.help.aqbz', {
                url: '/aqbz',
                templateUrl: 'views/help/aqbz.html' + date,
                controller: 'HelpDetailController'
            })
            .state('main.help.cpjs', {
                url: '/cpjs',
                templateUrl: 'views/help/cpjs.html' + date,
                controller: 'HelpDetailController'
            })
            .state('main.help.qtwt', {
                url: '/qtwt',
                templateUrl: 'views/help/qtwt.html' + date,
                controller: 'HelpDetailController'
            })
            //我的账户
            .state('main.myAccount', {
                url: '/myAccount',
                templateUrl: 'views/account/myAccount.html' + date,
                controller: 'myAccountCtrl'
            })
            //我的账户-账户中心
            .state('main.myAccount.accountHome', {
                url: '/accountHome',
                templateUrl: 'views/account/accountHome.html' + date,
                controller: 'accountHomeCtrl'
            })
            
            //我的账户-我的资产-我的投资
            .state('main.myAccount.accountMyInvest', {

                url: '/accountMyInvest',
                templateUrl: 'views/account/myAsset/accountMyInvest.html' + date,
                controller: 'accountMyInvestCtrl'
            })
            //我的账户-我的资产-投资记录
            .state('main.myAccount.accountMyAssets', {
                url: '/accountMyAssets',
                templateUrl: 'views/account/myAsset/accountMyAssets.html' + date,
                controller: 'accountMyAssetsCtrl'
            })
            //我的账户-资金管理-提现
            .state('main.myAccount.accountRecharge', {
                url: '/accountRecharge',
                templateUrl: 'views/account/AssetMgmt/accountRecharge.html' + date,
                controller: 'accountRechargeCtrl'
            })
            //我的账户-资金管理-充值
            .state('main.myAccount.accountWithdraw', {
                url: '/accountWithdraw',
                templateUrl: 'views/account/AssetMgmt/accountWithdraw.html' + date,
                controller: 'accountWithdrawCtrl'
            })
            //我的账户-账户管理-个人中心
            .state('main.myAccount.accountPerson', {
                url: '/accountPerson',
                templateUrl: 'views/account/accountMgmt/accountPerson.html' + date,
                controller: 'accountPersonCtrl'
            })
            //我的账户-账户管理-安全认证
            .state('main.myAccount.accountSecurity', {
                url: '/accountSecurity',
                templateUrl: 'views/account/accountMgmt/accountSecurity.html' + date,
                controller: 'accountSecurityCtrl'
            })
            //我的账户-账户管理-去认证
            .state('main.myAccount.accountStorage', {
                url: '/accountStorage',
                templateUrl: 'views/account/accountMgmt/accountStorage.html' + date,
                controller: 'accountStorageCtrl'
            })
            //我的账户-账户管理-认证成功
            .state('main.myAccount.accountStorageSuccess', {
                url: '/accountStorageSuccess',
                templateUrl: 'views/account/accountMgmt/accountStorageSuccess.html' + date,
                controller: 'accountStorageCtrl'
            })
            //我的账户-我的福利-我的优惠券
            .state('main.myAccount.accountMyCouPon', {
                url: '/accountMyCouPon',
                templateUrl: 'views/account/myCoupon/accountMyCouPon.html' + date,
                controller: 'accountMyCouPonCtrl'
            })
            //我的账户-我的邀请
            .state('main.myAccount.accountMyFriend', {
                url: '/accountMyFriend',
                templateUrl: 'views/account/myFriend/accountMyFriend.html' + date,
                controller: 'accountMyFriendCtrl'
            })
            //我的账户-消息中心-我的消息
            .state('main.myAccount.accountMyMsg', {
                url: '/accountMyMsg',
                templateUrl: 'views/account/myMessage/accountMyMsg.html' + date,
                controller: 'accountMyMsgCtrl'
            })
            
            // 活动
            .state('activity', {
                abstract: true,
                url: '/activity',
                templateUrl: 'views/common/activity.html' + date,
                controller: 'ActivityController'
            })
                    // 新年活动
            .state('activity.newyear', {
                url: '/newyear',
                templateUrl: 'views/activity/newyear/newyear.html' + date,
                controller: 'NewyearController'
            })
                    // 邀请好友
             .state('activity.investFriends', {
                url: '/investFriends',
                 templateUrl: 'views/activity/friends/invest_friends.html' + date,
                controller: 'InvestFriendsController'
            })

            // 活动专区
            .state('main.actarea', {
                url: '/actarea',
                templateUrl: 'views/actarea/actarea.html' + date,
                controller: 'actareaController'
            })

        $urlRouterProvider.otherwise('main/home');
    });
app.filter('asHtml', function ($sce) {
    return function (data) {
        return $sce.trustAsHtml(data);
    }
})

/*判断ie8*/
.filter('webIE8', function () {
    return function (p) {
        var browser = navigator.appName;    
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var hrefUrl = '/';
        var trim_Version;
        if (version[1] != undefined) {
            trim_Version = version[1].replace(/[ ]/g, "");
        } else {
            trim_Version = version[0].replace(/[ ]/g, "");
        }
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
            hrefUrl = '/#/';
        } else {
            hrefUrl = '/';
        };
        return hrefUrl;
    };
})
.filter('textarea',function(){
    return function(text){
        console.log(text);
        return text.replace(/\^/g,'<br />');
    }
})
/*
    服务器错误code对照表（有弹框提示错误功能）
    key:        错误对照的key（同url）
    errorCode： 服务器返回的错误码
    scope：     操作域
*/
app.filter('serveErrorMap', function (DialogService) {
    return function (key, code, scope) {
        var error = {
            'reg': {
                1001: "短信验证码为空",
                1002: "短信验证码错误",
                1003: "手机号为空",
                1004: "图片验证码为空",
                1005: "密码格式错误",
                1006: "未勾选注册协议",
                1007: "手机号已注册",
                1008: "推荐人不存在",
                9999: "系统错误"
            },
            'sendRegMsg': {
                1001: "图片验证码不正确",
                1002: "当天短信发送超过限制",
                1003: "短信发送失败",
                1004: "图片验证码为空",
                8888: "频繁操作",
                9999: "系统错误"
            },
            'doLogin': {
                1001: "账号或密码为空",
                1002: "图片验证码不正确",
                1003: "密码错误",
            },
            '': {}

        };
        scope.error = {};
        scope.error.title = '错误提示：';
        scope.error.text = error[key][code];
        DialogService.showError(scope);
    };
});
app
    .filter('getUrl', function () {
        return function (name) {
            var base = '/'
            var urls = {
                '首页公告列表': 'index/indexArticle.do',
				'首页新闻列表': 'aboutus/newsInformationList.do',
                '网站公告列表': 'aboutus/newsInformationList.do',
                '公告详情': 'aboutus/newsDetails.do',
                /*登录注册*/
                '注册验证手机号': 'existMobilePhone',
                '校验图片验证码': 'sendRegMsg',
                '立即注册': 'reg',
                '修改用户密码-手机验证': 'forgetPwdSmsCode',
                '修改用户密码-提交手机验证': 'validateSmsCode',
                '修改用户密码-提交密码': 'updatePwd',
            };
            return urls[name];
        }
    })

    /*接口对照表*/
    .filter('交互接口对照表', function () {

        return function (name) {
            var portUrlMap = {
                '登录接口': "doLogin",
                '退出接口': "exit",

                /*登录注册*/
                '注册验证手机号': 'existMobilePhone',
                '校验图片验证码': 'sendRegMsg',
                '立即注册': 'reg',
                '修改用户密码-手机验证': 'forgetPwdSmsCode',
                '修改用户密码-提交手机验证': 'validateSmsCode',
                '修改用户密码-提交密码': 'updatePwd',

                /*首页Home*/
                'Home主数据': 'indexMemberInfo',
                '产品列表': 'indexProduct',
                'banner': 'banner',
                '公司新闻': 'indexArticle',
                '投资统计数据': 'regAndInvestCount',
                '实时投资记录': 'indexInvestLogs',

                /*票据优选*/
                '票据优选列表': '/product/productList.do',

                /*票据安选*/
                '票据列表': '/product/productList.do',

                /*产品详情页*/
                '票据详情': 'detail',
                '确认投资': 'invest',
                '投资记录': 'depositsHistory',


                /*我的资产首页*/
                '我的资产首页数据': 'info',
                '我的投资': 'investStat',
                '我的投资明细': 'repayInfoDetail',
                '我的投资-收益中的产品': '/investCenter/productList.do',
                // '我的投资-已到期产品' :'expireProductList',
                '我的投资-资产记录': 'assetRecord',


                /*实名认证*/
                'test': 'listAx',

                /* 身份认证 */
                '身份认证': 'bankInfoVerify',
                '身份认证获取短信验证码': 'sendBankMsg',

                /* 安全认证 */
                '安全认证数据': 'memberSetting',
                '安全认证修改登录密码': 'updateLoginPassWord',

                /* 设置交易密码 */
                '设置交易密码': 'setTpwd',

                /* 修改交易密码 */
                '修改交易密码': 'updateTpwd',

                /* 找回交易密码获取短信验证码 */
                '找回交易密码获取短信验证码': 'sendForgetTpwdCode',

                /* 找回交易密码验证短信验证码 */
                '找回交易密码验证短信验证码': 'validateTpwdCode',

                /* 找回交易密码设置新交易密码 */
                '找回交易密码设置新交易密码': 'updateTpwdBySms',

                /* 充值提现数据 */
                '充值数据': 'recharge',
                '提现数据': 'withdrawals',

                /* 充值 */
                '创建订单': 'createPayOrder',
                '充值': 'goPay',
                '充值获取验证码': 'sendRechargeSms',
                '网银充值': 'goJYTWYPay',
                '充值成功数据': 'rechargeSuccess',

                /* 提现 */
                '提现': 'addWithdrawals',

                /* 我的消息 */
                '我的消息': 'myMessage',
                '消息列表': 'getMessage',
                '标记消息为已读': 'updateUnReadMsg',

                /* 个人中心 */
                '个人中心': 'personInfo',

                /* 优惠券 */
                '用户可用优惠券': 'usable',
                '我的优惠券': 'activity',

                /* 我的好友 */
                '我的好友': 'myRecommend',

                /* 新闻列表 */
                '新闻列表': 'newsInformationList',
                '新闻详情': 'newsDetails',

                /* 权益转让及受让协议 */
                '权益转让及受让协议': 'agreement',
                /* 借款协议 */
                '借款协议': 'borrow',
                /* 债权转让协议 */
                '债权转让协议': 'transfer',

                '好友互推列表': 'recommend/myFriendInvest.do',
                'selectInvest': 'product/selectInvest.do',

                // 我的幸运码
                '我的幸运码': 'product/getMyLuckCodes.do',
                // 财胜标详情
                '活动标详情': 'product/getNewActivityProduct.do',
                // 活动开奖结果
                '活动开奖结果': 'activity/getActivityPrizeResult.do',

                '砸金蛋加息券': 'activity/getRandomCouponByProductId.do',

                // 好友邀请
                '查询邀请活动信息': 'activity/getActivityFriendConfig.do',
                '获取邀请手机号': 'activity/getMobilePhoneByRecommCode.do',
                '邀请好友统计': 'activity/getActivityFriendStatistics.do',
                '邀请活动列表': 'activity/getActivityFriendConfigAll.do',
                '领取奖金': 'assetRecord/getTheRewards.do',

                '获取首页广告': 'index/advertisement.do',

                '获取复投红包': 'member/getPromoteRedelivery.do',
                '获取变现产品': 'member/getUse.do',
                '拆红包': 'member/getOpenRed.do',

                '预约下期': 'product/getReservation.do',

                '我的好友邀请': 'activity/myInvitation.do',

                '新手标领取现金': 'product/getContinueReward.do',
                '新手标续投': 'product/addContinueReward.do',

                '圣诞节活动页数据': 'activity/doubleAggIndex.do',
                '圣诞节拆红包': 'activity/tearOpen.do',

                '投即送活动页数据': 'activity/investSendPrizeIndex.do',
                '查询产品绑定的奖品': 'activity/selectProductPrize.do',
                '投即送获取收货地址': 'member/getReceiptAddress.do',
                '投即送投资记录': 'activity/accountInvestLogs.do',
                '投即送预约': 'activity/insertPrizeInfo.do',
                '投即送修改收货地址': 'member/updateReceiptAddress.do',
                '投即送添加收货地址': 'member/insertReceiptAddress.do',
                '活动聚合页列表': 'activity/getAllActivity.do',
                '投即送心愿提交': 'activity/wishCommit.do',
                '投即送获取默认地址': 'member/getReceiptAddress.do',

                '人脉王排行': 'activity/getTopTen.do',
                '长城宽带已登录数据': 'activity/getGreatWallInfo.do',
                '体验标详情': 'product/experienceDetail.do',
                '体验标投资': 'product/experienceInvest.do',
                '吃元宵': 'activity/eatGlutinous.do',
                '吃元宵领取记录': 'activity/getEatGlutinousLog.do',
                '意见反馈': 'system/feedback.do',
                '新手标排行榜': 'activity/getProductInvestList.do',

                '认证支持银行列表': 'memberSetting/selectBank.do',

                '开放日活动页详情': 'activity/getOpenDayDetail.do',
                '开放日往期列表': 'activity/getOpenDayList.do',
                '开放日详情': 'activity/getOpenDayArticleDetail.do',
                '开放日报名': 'activity/SignUp.do',

                '公益活动列表': 'activity/offlineActivityList.do',
                '公益活动详情': 'activity/offlineActivityDetail.do',

                '三重礼首投复投': 'activity/firstInvestList.do',
                '三重礼排行榜': 'activity/getRankingList.do',

                '518活动信息': 'activity/activityMay18d.do',
                '活动页产品列表': 'product/getPorductList.do',

                'iPhoneSEM': 'activity/iPhoneSEM.do',
                'financeSEM': 'activity/lastRegMember.do',

                '信息': 'member/openAccountSignature.do',
                '快捷充值': 'recharge/depositsRecharge.do',
                // '网银充值': 'recharge/onlineBankingRecharge.do',
                '提现': 'withdrawals/depositsWithdrawals.do',
                '账户信息': 'memberSetting/fuiouIndex.do',
                '修改交易密码': 'memberSetting/fuiouUpdatePwd.do',

                '开户直连': 'member/openAccount.do',
                '充值验证码直连': 'recharge/fuiouSendSms.do',
                '充值直连': 'recharge/fuiouFastRecharg.do',
                '网银充值': 'recharge/onlineBankingRecharge.do',

                '活动页账户信息': 'activity/getMyAccount.do',

                '聚划算产品列表': 'product/getPeroidProList.do',
                '端午节活动': 'activity/dragonBoat.do',

                '获取产品详情页': 'product/selectPorductClassifyByDeadline.do',
                '总注册人数': 'member/selectDrmembercount.do',

                'end': 'end',
                'getPrizeInfoByProductId': 'activity/getPrizeInfoByProductId.do',
                'getMyPrizeRecords': 'activity/getMyPrizeRecords.do',
                'invest': 'product/invest.do'
            };

            return portUrlMap[name];
        }
    }) 
app.service('Global', function (
    $localStorage,
    $rootScope
) {
    /* 
        公司相关静态文本
    */
    this.company={
        titleLong:'上海汴盛金融信息服务有限公司',
        ICP:'沪ICP备18001655号',
        date:'2018 - 2018',
        title:'汴盛金融',
        name:'金吉利宝',
        hotline : '400-671-7711',
        phoneLabel : '热线电话',
        bankName : '',//銀行名
    };
    /* 
        获取缓存的用户信息
    */
   this.getUser = function () {
       return $localStorage.user;
   };
    /* 
        注册 & 登录 - 页面标签名
        name: 当前的页头名称   
    */
    this.pageTitel = function (name) {
        $rootScope.title = name + '-' + this.company.title;
    };
})  
app.service('httpService', function ($rootScope,$http, $filter,ngDialog,$localStorage) {

    this.queryPost = function (scope, url, data, next) {
        this.post(scope, url, data, next)
    };

    this.post = function (scope,url, rawData, next) {
        var data = {};
        angular.copy(rawData, data);
        showMask();
        var myThis= this;

        $http.post(url, data,{
            // headers:{
                //     'X-Requested-With':'XMLHttpRequest',
                //     'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
                // }
            })
            .then(function (res) {
                removeMask();
                var data = res.data;
                myThis.success_error(url, data.errorCode, scope)
                next(data);
        })
        .catch(function (err) {
            removeMask();
        })
    }
    function showMask() {
        $rootScope.maskHidde++;
    }

    function removeMask() {
        $rootScope.maskHidde--;
    }

    /* 
        error处理  （直接success==false的）
        key:        错误对照的key（同url）
        errorCode： 服务器返回的错误码
        scope：     操作域
    */
    this.success_error = function (key, errorCode, scope) {
        if (errorCode) {
            $filter('serveErrorMap')(key, errorCode, scope);
        };
    };
    /*
         data-error处理 (服务器success是成功的，数据逻辑有部分错误的处理方法)
    */
    this.data_error = function (errorData) {
        console.log(errorData)
    };
}); 


app.directive(
        'menu',
        function() {
            var temp='<div class="side-mode" ng-class="{true: \'active-mode\', false: \'\'}[activeText == tool.memnTitle]" ng-repeat="tool in menuItems">'+
                        '<i ng-if="tool.children != undefined;" class="side-down"></i>'+
                        '<span class="mode-title" ng-click="onClickMenuItem($event,tool)">{{tool.memnTitle}}</span>'+'<b ng-if="$index==7 && showXiaoBiao" ng-click="onClickMenuItem($event,tool)">1</b>'+
                        '<strong ng-if="$index==4 && isExperience" class="finance-ficon"></strong>'+
                        '<div class="mode-con" ng-if="tool.children.length > 0">'+
                            '<a href="" ng-click="childOnClick($event, child, tool)" ng-class="{true: \'actived\', false: \'\'}[curUrl == child.url]" ng-repeat="child in tool.children">{{child.memnTitle}}</a>'+
                        '</div>'+
                    '</div>';
            return {
                restrict : 'E',
                template:temp,
                replace: false,
                transclude: true,
                scope: false,
                controller: [
                    '$scope',
                    '$state',
                    'resourceService',
                    '$location',
                    '$localStorage',
                    '$rootScope',
                    function($scope,$state,resourceService,$location,$localStorage,$rootScope) {
                        $scope.messag={};
                        $scope.activeMode='active-mode';
                        if($location.$$search.menuName != undefined){
                            $scope.activeText = $location.$$search.menuName;
                            $scope.curUrl = $location.$$path.replace('/main/jt/', 'main.jt.');
                        }

                        if ($localStorage.showXiaoBiao != undefined) {
                            $scope.showXiaoBiao = $localStorage.showXiaoBiao;
                        } else {
                            $scope.showXiaoBiao = true;
                        }
                        
                        var beforEvent=null;
                        $scope.onClickMenuItem=function (event,item) {
                            var $this = $(event.currentTarget);
                            if(item.url != undefined){
                                $scope.curUrl = item.url;
                                $scope.activeText = item.memnTitle;
                                $state.go(item.url);
                            } else if ($scope.activeText == item.memnTitle) {
                                $scope.activeText = '';
                            }else{
                                $scope.activeText = item.memnTitle;
                            }
                            if (item.memnTitle == '我的邀请') {
                                $scope.showXiaoBiao = false;
                                $localStorage.showXiaoBiao = false;
                            }
                        }
                        $scope.childOnClick = function(event,item,itemp) {
                            $scope.curUrl = item.url;
                            $scope.activeText = itemp.memnTitle;
                            $localStorage.activeText = {};
                            $localStorage.activeText.name = itemp.memnTitle;
                            $localStorage.activeText.url = item.url;
                            $state.go(item.url);
                        }
                }]
                
            };
        }
    );
/* 
 * @Author: lee
 * @Date:   2016-01-23 10:37:01
 * @Last Modified by:   lee
 * @Last Modified time: 2016-01-23 19:16:49
 */

'use strict';
app
/*错误信息*/
    .filter('errorUserMessages', function() {
        return function(name, dialog, scope) {
            var error = {
                noSelect: "请选需要操作的节点!",
                delVerify: "确定要删除节点：",
                loginErro: "登陆失败：",
                netErro: "网络异常：请检查你的网络！"
            };

            return error[name];
        }
    })
    /*修改密码*/
    .filter('resetPswCtrlPhoneError', function() {
        return function(code, name) {
            var error = {
                1001: "此手机号不存在",
                1002: "发送失败"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入手机号';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号无效';
            } else
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号长度错误';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*修改密码-手机验证码*/
    .filter('resetPswCtrlPhoneSmSError', function() {
        return function(code, name) {
            var error = {
                1001: "短信验证失败"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入短信验证码';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.required;
                text = '短信验证失败';
            }
            return text;
        }
    })
    /*登录用户名*/
    .filter('denLuUserNameError', function() {
        return function(code, name) {
            var error = {
                1001: "账号或密码为空",
                1003: "账号或密码错误"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入您的手机号';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '此用户名无效';
            } else
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '用户名长度错误';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*充值最低限额和最高限额的验证*/
    .filter('rechargeLimit', function() {
        return function(viewvalue, min, max) {
            var obj = {
                typemin: true,
                typemax: true
            }
            if (viewvalue < min) {
                obj.typemin = false;
            } else if (viewvalue > max) {
                obj.typemax = false;
            } else {
                obj = {
                    typemin: true,
                    typemax: true
                }
            }
            if (max=='') {
                obj.typemax = true;
            }
            return obj;
        }
    })
    /*登录图片验证*/
    .filter('denLuPicCodeNameError', function() {
        return function(code, name) {
            var error = {
                1002: "图片验证码不正确"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入您的手机号';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '用户名长度错误';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*登录密码验证*/
    .filter('denLuPassWordError', function() {
        return function(code, name) {
            var error = {
                1001: "账号或密码为空",
                1003: "账号或密码错误"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '密码必须6-18位数字和字母的组合';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '密码必须6-18位数字或字母的组合';
                // console.log('error',code);
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册手机号*/
    .filter('zhuCePhoneError', function() {
        return function(code, name) {
            var error = {
                1001: "此手机号不存在",
                1002: "发送失败",
                1003: "手机号为空 ",
                1007: "手机号已注册 ",
                8888: "此号码已注册"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入需验证的手机号码';
            }
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '无效的手机号码';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号码长度错误';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-图文验证*/
    .filter('zhuCePicCodeError', function() {
        return function(code, name) {
            var error = {
                1001: "图片验证码不正确",
                1002: "每个手机号当天只能发送5条,请更换手机",
                1004: "图片验证码不正确"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '验证为空';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '验证码应4位';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-手机短信*/
    .filter('zhuCesmsCodeCodeError', function() {
        return function(code, name) {
            var error = {
                1001: "图片验证码不正确",
                1002: "短信验证码错误",
                1003: "短信发送失败"
            };
            var text = '';
            code.$valid = false;
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '验证为空';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '验证码应4位';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-密码*/
    .filter('zhuCePassWordError', function() {
        return function(code, name) {
            var error = {
                1005: "密码格式错误"
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '密码未填';
            } else
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '密码必须是6-18位数字和字母的组合';
            } else
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*注册-密码*/
    .filter('zhuCeRefereeError', function() {
        return function(code, name) {
            var error = {
                1008: '推荐人不存在'
            };
            code.$valid = false;
            var text = '';
            if (code.$error["required"]) {
                if (code.$dirty) {
                    code.$valid = true;
                };
                delete code.$error.serverError;
                text = '请输入推荐人的手机号码';
            }
            if (code.$error["pattern"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号码不正确';
            }
            if (code.$error["minlength"]) {
                code.$valid = true;
                delete code.$error.serverError;
                text = '手机号码长度11位';
            }
            if (code.$error["serverError"]) {
                code.$valid = true;
                delete code.$error.pattern;
                delete code.$error.minlength;
                delete code.$error.required;
                if (error[name] != undefined) {
                    text = error[name];
                } else {
                    code.$valid = false;
                }
            }
            return text;
        }
    })
    /*1001=，1002=，1003=，1004=，1005==，1007=，1009=*/
    /*服务器-errorCode*/
    .filter('确认投资服务器Error', function() {
        return function(code) {
            var error = {
                1001: { text: "交易密码错误，连续输错三次，交易密码将被锁定", classCode: 'error' },
                1002: { text: "产品已募集完", classCode: 'error' },
                1003: { text: "项目可投资金额不足", classCode: 'error' },
                1004: { text: "小于起投金额", classCode: 'error' },
                1005: { text: "非递增金额整数倍", classCode: 'error' },
                1006: { text: "投资金额大于项目单笔投资限额", classCode: 'error' },
                1007: { text: "账户可用余额不足", classCode: 'error' },
                1008: { text: "已投资过产品，不能投资新手产品", classCode: 'error' },
                1009: { text: "用户未登录", classCode: 'error' },
                1010: { text: "优惠券不可用", classCode: 'error' },
                1011: { text: "投资失败，请稍后再试", classCode: 'error' },
                1012: { text: "非首投用户，不能参与投多少送多少活动", classCode: 'error' },
                2001: { text: "交易密码已锁定", classCode: 'error' },
                9999: "系统错误",
                test: "网络错误"
            };
            return error[code];
        };
    })
    /*服务器-errorCode*/
    .filter('服务器信息', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                1001: "账号或密码为空",
                1002: "验证码错误",
                1003: "账号或密码错误",
                9999: "系统错误",
                test: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                scope.msg = {};
                scope.msg.btnYes = '确定';
                scope.msg.btnNo = '忽略';
                scope.msg.title = '警告';
                scope.msg.text = $filter('静态接口对照表')('弹出框模板');
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*服务器获取产品详情-errorCode*/
    .filter('获取产品详情错误', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                1001: "产品不存在或下架",
                test: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                scope.msg = {};
                scope.msg.btnYes = '确定';
                scope.msg.btnNo = '忽略';
                scope.msg.title = '警告';
                scope.msg.text = $filter('静态接口对照表')('弹出框模板');
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*服务器-errorCode*/
    .filter('注册服务器error信息', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                1001: "图片验证码不正确",
                1002: "每个手机号当天只能发送5条",
                1003: "短信发送失败",
                9999: "系统错误",
                none: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*服务器-errorCode*/
    .filter('立即注册error信息', function(ngDialog, $filter) {
        return function(code, scope, YorN) {
            var error = {
                
                none: "网络错误"
            };
            scope.msg = {};
            scope.msg.text = error[code];
            if (YorN == 'y') {
                $filter('提示跳转')($filter('静态接口对照表')('弹出框模板'), scope);
            } else {
                return error[code];
            }
        };
    })
    /*身份认证error信息*/
    .filter('身份认证error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1001': '真实姓名不能为空',
                '1002': '身份证号不能为空',
                '1003': '银行卡号不能为空',
                '1004': '手机号码不能为空',
                '1005': '短信验证码不能为空',
                '1006': '短信验证码错误',
                '1007': '银行卡类型不符，请更换银行卡后重试',
                '1008': '此卡未开通银联在线支付功能，实名认证失败，请联系发卡银行',
                '1009': '不支持此银行卡的验证',
                '1010': '免费验证次数已用完，请联系客服人员',
                '1011': '认证失败',
                '1012': '该身份证号已认证',
                '1013': '已认证成功',
                '1014': '请核对个人信息',
                '1015': '请核对银行卡信息',
                '1016': '该银行卡bin不支持',
                '1017': '认证失败，系统异常请稍后再试'
            };
            return error[code];
        };
    })
    /*身份认证获取验证码error信息*/
    .filter('身份认证获取验证码error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1002': '每个手机号当天只能发送5条',
                '1003': '短信发送失败'
            };
            return error[code];
        };
    })
    /* 安全认证修改登录密码error信息 */
    .filter('安全认证修改登录密码error信息', function() {
        return function(code) {
            var error = {
                '1001': '原登录密码不正确',
                '1002': '新密码为空',
                '1003': '新密码和确认密码不一致',
                '1004': '登录密码不合法',
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*设置交易密码error信息*/
    .filter('设置交易密码error信息', function() {
        return function(code) {
            var error = {
                '1001': '交易密码为空',
                '1002': '两次交易密码不一致',
                '1003': '已存在交易密码',
                '1004': '格式不正确'
            };
            return error[code];
        };
    })
    /*修改交易密码error信息*/
    .filter('修改交易密码error信息', function() {
        return function(code) {
            var error = {
                '1001': '原交易密码不正确',
                '1002': '短信验证码错误',
                '1003': '交易密码为空',
                '1004': '两次输入不一致',
                '1005': '格式错误',
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /* 找回交易密码获取短信验证码error信息 */
    .filter('找回交易密码获取短信验证码error信息', function() {
        return function(code) {
            var error = {
                '1001': '短信发送失败',
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*找回交易密码设置新交易密码error信息*/
    .filter('找回交易密码设置新交易密码error信息', function() {
        return function(code) {
            var error = {
                '1002': '短信验证码错误',
                '1003': '交易密码为空',
                '1004': '两次输入不一致',
                '1005': '格式错误'
            };
            return error[code];
        };
    })
    /*充值数据error信息*/
    .filter('充值数据error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*创建订单error信息*/
    .filter('创建订单error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1001': '金额有误',
                '1002': '系统错误，请稍后重试',
                '1003': '超过限额，请修改金额后重试'
            };
            return error[code];
        };
    })
    /*提现数据error信息*/
    .filter('提现数据error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误'
            };
            return error[code];
        };
    })
    /*充值error信息*/
    .filter('充值error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1003': '验证码错误',
                '1004': '处理中',
                '1005': '系统错误，请稍后重试',
                '1006': '超出单卡号累计交易次数限制',
                '1007': '超出银行授信额度',
                '1008': '超过用户在银行设置的限额',
                '1009': '持卡人身份证验证失败',
                '1010': '对不起，您累计交易支付金额超出单笔限额',
                '1011': '对不起，您累计交易支付金额超出当日限额',
                '1012': '对不起，您累计交易支付金额超出当月限额',
                '1013': '非法用户号',
                '1014': '该卡暂不支持支付，请更换其他银行卡重试',
                '1015': '该卡暂不支持支付，请稍后再试',
                '1016': '交易超时',
                '1017': '交易金额不能大于最大限额',
                '1018': '交易金额不能低于最小限额',
                '1019': '交易金额超过渠道当月限额',
                '1020': '交易金额为空',
                '1021': '交易金额有误错误',
                '1022': '交易失败，风险受限',
                '1023': '交易失败，详情请咨询您的发卡行',
                '1024': '金额格式有误',
                '1025': '仅支持个人银行卡支付',
                '1026': '您的银行卡不支持该业务，请与发卡行联系',
                '1027': '请核对个人身份证信息',
                '1028': '请核对您的订单号',
                '1029': '请核对您的个人信息',
                '1030': '请核对您的银行卡信息',
                '1031': '请核对您的银行信息',
                '1032': '请核对您的银行预留手机号',
                '1033': '未开通无卡支付或交易超过限额，详情请咨询您的发卡行',
                '1034': '信息错误，请核对',
                '1035': '银行户名不能为空',
                '1036': '银行卡未开通银联在线支付，请向银行咨询',
                '1037': '银行名称无效',
                '1038': '银行系统繁忙，交易失败，请稍后再提交',
                '1039': '银行账号不能为空',
                '1040': '余额不足',
                '1041': '证件号错误，请核实',
                '1042': '证件号码不能为空',
                '1043': '证件类型与卡号不符',
                '1044': '银行账户余额不足',
                '1045': '交易银行不支持或金额超限'
            };
            return error[code];
        };
    })

/*网银充值error信息*/
.filter('网银充值error信息', function() {
    return function(code) {
        var error = {
            '9999': '系统错误',
            '1001': '充值金额有误',
            '1002': '银行编号不能为空'
        };
        return error[code];
    };
})

/*充值获取验证码error信息*/
.filter('充值获取验证码error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '8888': '频繁操作',
                '1001': '金额有误',
                '1002': '系统错误，请稍后重试',
                '1003': '超过限额，请修改金额后重试',
                '1004': '短信发送失败'
            };
            return error[code];
        };
    })
    /*提现error信息*/
    .filter('提现error信息', function() {
        return function(code) {
            var error = {
                '9999': '系统错误',
                '1001': '提现金额有误',
                '1002': '交易密码不能为空',
                '1003': '交易密码错误，连续输错三次，交易密码将被锁定',
                '1004': '余额不足',
                '1005': '交易失败，请再次申请',
                '1006': '处理中',
                '1007': '该笔需要收取手续费',
                '1008': '该笔不需要收取手续费',
                '2001': '交易密码已锁定',
                '2002': '返现或体验金收益需完成一次真实投资后才可提现'
            };
            return error[code];
        };
    })
    .filter('pageFilter', function() {
        return function(page, pageOn) {
            var array = [];
            for (var i = 1; i <= parseInt(page); i++) {
                array.push(i);
            }
            var array2 = [];
            if (page > 5) {
                if (pageOn >= page - 2) {
                    array2 = array.slice(-4);
                } else if (pageOn <=2) {
                    array2 = array.slice(0,4);
                }else{
                    for (var i = pageOn - 2; i < pageOn + 2; i++) {
                        array2.push(i);
                    }
                }
            } else {
                array2 = array.concat([]);
            }
            if(array2[0]>1){array2.unshift('...');}
            if(array2[array.length-1]<page){array2.push('...')};
            return array2;
        }
    })

/* 
* @Author: lee
* @Date:   2015-09-25 10:37:01
* @Last Modified by:   lee
* @Last Modified time: 2015-07-02 19:16:49
*/

'use strict';
app
/*网站公共静态字段*/
.filter('web',function(){
	return function(){
		var web ={} ;
		web.phone = '400-671-7711';
		web.phoneLabel = '热线电话';

		return web;
	};
})

/*网站公共静态字段*/
.filter('getBtnColor',function(){
	return function(type){
		var bgColor ='';
		if(type){
			bgColor='background:red!important!important';
		}else{
			bgColor='background:#000!important!important';

		}
		return bgColor;
	};
})

/*判断ie8*/
.filter('webIE8',function(){
	return function(p){
		var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var hrefUrl='/';
        var trim_Version; 
        if(version[1]!=undefined){
            trim_Version = version[1].replace(/[ ]/g,""); 
        }else{
            trim_Version = version[0].replace(/[ ]/g,""); 
        }
        if (browser == "Microsoft Internet Explorer" && trim_Version=="MSIE8.0") { 
            hrefUrl = '/#/';
        } else {
            hrefUrl = '/';
        };
		return hrefUrl;
	};
})
/*文章字段截取段落*/
.filter('截取段落',function(){
	return function(p){
		var arr= p.split('^');
		return arr;
	};
})

// /*网站 数字转换*/
.filter('isAmountToStr',function(){
	return function(num){
		if(num >= 10000){ num = num / 10000 + '万';}
		return num ;
	};
})
/*ispassword type 变化*/
.filter('ispassword',function(){
	return function(type){
		if(type){ return 'text'}else{ return 'passWord'}
	};
})
/*ispassword type 变化*/
.filter('isNumber2',function(){
	return function(num,type,flag){
		if(num==undefined){
			if (flag == undefined) {
				return 0;
			}
		}else{
			if(isNaN(num)){
				if (flag == undefined) {
					return 0;
				}
			}else{
				var num =new Number(num);
				var num=num.toFixed(3);
				if(type!=undefined){
					num= num.substring(0,num.lastIndexOf('.')+0) // 123456.78
				}else{
					num= num.substring(0,num.lastIndexOf('.')+3) // 123456.78
				}
			}
			return num;
		}
	};
})

.filter('setProgress',function() {
	return function(num) {
		if (num == undefined) {
			return 0 ;
		} else {
			if (isNaN(num)) {
				return 0;
			} else {
				if (num > 0 && num <= 1) {
					num =  1;
				} else if (num >= 99 && num < 100) {
					num = 99;
				} else {
					num = parseInt(num);
				}
			}
			return num;
		}
	}
})

/*优惠券类型*/
.filter('mapsFilters_couponType',function(){
	return function(code){
		var maps = [
		            {code :1,cnvalue  :"代金券"}
		            ];
		if(code != undefined){
			code--;
			return maps[code].cnvalue;
		}else{
			return maps;
		}
	};
})
/*票据产品类型*/
.filter('isProductType',function(){
	return function(code){
		var maps = [
		             {code :0,cnvalue  :"" , disabled:true}
		            ,{code :1,cnvalue  :"待审核" , disabled:true}
		            ,{code :2,cnvalue  :"已审核", disabled:true}
		            ,{code :3,cnvalue  :"已驳回", disabled:true}
		            ,{code :4,cnvalue  :"已作废", disabled:true}
		            ,{code :5,cnvalue  :"立即抢购", disabled:false}
		            ,{code :6,cnvalue  :"募集完成", disabled:true}
		            ,{code :7,cnvalue  :"募集失败", disabled:true}
		            ,{code :8,cnvalue  :"待还款", disabled:true}
		            ,{code :9,cnvalue  :"已还款", disabled:true}
		            ];
		return maps[code];
	};
})

/*我的资产类型*/
.filter('我的资产',function(){
	return function(code){
		var maps = [
		             {code :0,cnvalue  :"票据安选"}
		            ,{code :1,cnvalue  :"票据优选"}
		            ,{code :3,cnvalue  :"冻结资金"}
		            ];
		if(code != undefined){
			return maps[code].cnvalue;
		}else{
			return maps;
		}
	};
})
/*判断数值类型*/
.filter('isNaN',function(){
	return function(v){
		if(isNaN(v)){
			return 0;
		}else{
			return v;
		}
	};
})

/*我的投资-产品类型*/
.filter('isType',function(){
	return function(code){
		var maps = [
		             {code :'null',cnvalue  :"全部"}
		            ,{code :1,cnvalue  :"新手标"}
		            ,{code :2,cnvalue  :"优选理财"}
		            // ,{code :2,cnvalue  :"票据安选"}
		            // ,{code :3,cnvalue  :"票据优选"}
		            ];
		if(code != undefined){
			return maps[code].cnvalue;
		}else{
			return maps;
		}
	};
})

/*我的资产-资产记录*/
.filter('tradeType',function(){
	return function(code){
		var maps = [
		             // {code :'',cnvalue  :"全部"}
		            {code :1,cnvalue  :"充值"}
		            ,{code :2,cnvalue  :"提现"}
		            ,{code :3,cnvalue  :"投资"}
		            ,{code :4,cnvalue  :"活动"}
		            ,{code :5,cnvalue  :"提现手续费"}
		            ,{code :6,cnvalue  :"回款"}
		            ];
		if(code != undefined){
			return maps[code].cnvalue;
		}else{
			return maps;
		}
	};
})

/*银/商票LOGO*/
.filter('isBankLogo',function(){
	return function(code){
		var maps = [
		             {code :0,cnvalue  :"common-yin"}//银票LOGO
		            ,{code :1,cnvalue  :"common-shang"}//商票LOGO
		            ];
		if(code != undefined){
			return maps[code].cnvalue;
		}else{
			return maps;
		}
	};
})

/*银/商票还款方式*/
.filter('isRepayType',function(){
	return function(code){
		var maps = [
		             {code:0,cnvalue:""}
		            ,{code:1,cnvalue:"到期一次还本付息"}
		            ,{code:2,cnvalue:"按月付息到期还本"}
		            ,{code:3,cnvalue:"等本等息 按周回款"}
		            ,{code:4,cnvalue:"等本等息 按月回款"}
		            ,{code:5,cnvalue:"其他"}
		            ];
		return maps[code];
	};
})
/*银/商票还款方式*/
.filter('isSex',function(){
	return function(code){
		var maps = {
		             1:'先生'
		            ,2:'女士'
		           };
		return maps[code];
	};
})
/*银/商票计息方式*/
.filter('isInterestType',function(){
	return function(code){
		var maps = [
		             {code :0,cnvalue  :"次日起息"}
		            ,{code :1,cnvalue  :""}
		           ];
		return maps[code];	
	};
})
/*银/商票查询方式*/
.filter('isInterestType',function(){
	return function(code){
		var maps = {
			 '默认':0
			,"利率降序":1
			,"利率升序":2
			,"期限降序":3
			,"期限升序":4
		};
		return maps[code];	
	};
})
/*交易记录-交易类别*/
.filter('investListTradeType',function(){
	return function(code){
		var maps = {
			 1:'充值'
			,2:'提现'
			,3:'投资'
			,4:'活动'
			,5:'提现手续费'
			,6:'回款'
			,7:'体验金'
		};
		return maps[code];	
	};
})

/*用户认证状态*/
        .filter('isUserRegister', function($localStorage) {

            return function(code,name) {
                var type;
                switch(name){
                    case "card":
                        type=  { 
                                    1 : "my-card-set",
                                    0 : "my-no-card"
                                };
                    break;
                    case "phone":
                        type=  { 
                                    0 : "my-no-phone",
                                    1 : "my-phone-set"
                                };
                    break; 
                    case "cardId":
                        type=  { 
                                    1 : "my-bank-set",
                                    0 : "my-no-bank"
                                };
                    break;
                };
                
                return type[code];
            }
        }) 
/*翻页*/
        .filter('isUserRegister', function($localStorage) {

            return function(code,name) {
             $scope.onClickPage=function (type,pageNum,listtype) {
             	switch(type){
             		case "beforPage":
             			if($scope.bill.pageOn > 1){$scope.bill.pageOn -=1;goPage($scope.order,$scope.bill.pageOn);};
             		break;
             		case "currentPage":
             			$scope.bill.pageOn = pageNum;goPage($scope.order,$scope.bill.pageOn);
             		break;
             		case "nextPage":
             			if($scope.bill.pageOn < $scope.bill.pages.length){$scope.bill.pageOn +=1;goPage($scope.order,$scope.bill.pageOn);};
             		break;
             	};
             }
             function goPage(order,pageOn,type) {
             	// 翻页
             	var obj = {},
             		str = '';
             	obj.order = order; 
             	obj.pageOn = pageOn; 
             	obj.pageSize = 10;
             	if (type != undefined) {
             		obj.type = type;
             	}
             	obj.statuses = [5];
             	if (type == 2) {
             		str = '票据安选';
             	} else if (type == 3) {
             		str = '票据优选';
             	} else {
             		obj.pageSize = 5;
             		obj.statuses = [6,8,9];
             		str = '往期产品';
             	}
             	resourceService.queryPost($scope,$filter('交互接口对照表')('票据列表'),obj,str);
             };
            }
        })

         /*cp076 投资次日——产品 成立之间显示标签“计息中”*/
        .filter('isInvestTime', function() {

            return function(time) {

            	var t = '';
            	var qtDay=new Date(time).getDate();
            	var today=new Date().getDate();
				if(qtDay !=today){
					t ='计息中';
				}else{
					t ='投资成功';
				}
            	return t;
            }
        })
        .filter('prizeStatus',function(){
        	return function(code){
        		var map={
        			0:'待开奖',
        			1:'未中奖',
        			2:'恭喜，中奖了'
        		};
        		if(code>=0&&map[code]){return map[code]};
        		return '无数据';
        	}
        })
/* 
* @Author: lee
* @Date:   2016-01-23 10:37:01
* @Last Modified by:   lee
* @Last Modified time: 2016-01-23 19:16:49
*/

'use strict';

app
/*开发环境*/
        .filter('isOnLine', function() {
            return function() {
                var isOnLine = true;//fasle=静态调试；true=开发模式
                return isOnLine;
            }
        }) 
/*清空缓存*/
        .filter('清空缓存', function($localStorage) {
            return function() {
                if ($localStorage.pathUrl != undefined && $localStorage.pathUrl != 'main.home') {
                    delete $localStorage.pathUrl;
                }
                delete $localStorage.user;
                if ($localStorage.promoteIsPayment != undefined) {
                    delete $localStorage.promoteIsPayment;
                }
                if ($localStorage.showXiaoBiao != undefined) {
                    delete $localStorage.showXiaoBiao;
                }
            }
        }) 
/*开发环境*/
        .filter('isLinWidth', function() {
            return function(width) {
                // return 'width:'+width+'%';
                return 'WIDTH:50%';
            }
        }) 

/*当前登录状态*/
        .filter('isRegister', function($localStorage, $filter) {

            return function(name) {
                var obj = {};
                obj.register = false;
                obj.user={};
                if($localStorage.user != undefined){
                    obj.register = true;
                    if ($localStorage.user.realName == '' || $localStorage.user.realName == undefined || $localStorage.user.realName == null) {
                        $localStorage.user.userName = '亲爱的用户'; 
                    } else {
                        $localStorage.user.userName = $localStorage.user.realName;
                    }
                    obj.user = $localStorage.user;
                }else{
                    obj.register = false;
                    obj.user.userName = '亲爱的用户';
                }
                return obj;
            }
        }) 

/*判断login头部*/
        .filter('isLoginPage', function($rootScope) {
            return function(name) {
                if($rootScope.title == "login"){
                    return true;
                }else{ return false;}
            }
        }) 

 /*根据用户状态提示跳转页面方向*/
        .filter('提示跳转', function(ngDialog) {
            return function(templateurl,scope) {
                ngDialog.open({
                        template : templateurl,
                        scope : scope,
                        closeByDocument : true,
                        plain : false
                });
                // return  dialog;
            };
        })

/*投资确认弹窗*/
        .filter('投资确认弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                        template : '../views/dialog_views/oldDialog/invest-dialog.html',
                        scope : scope,
                        closeByDocument : true,
                        plain : false,
                        className: 'invest-dialog-wrapper ngdialog-theme-default'
                });
            };
        })

        .filter('投即送投资成功弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/investgift-dialog.html',
                    scope : scope,
                    closeByDocument : true,
                    plain : false,
                    className: 'invest-dialog-wrapper ngdialog-theme-default'
                });
            };
        })

        /*投资确认弹窗*/
        .filter('弹窗', function(ngDialog) {
            return function(scope,tpl) {
                ngDialog.open({
                        template : tpl,
                        scope : scope,
                        closeByDocument : true,
                        plain : false
                });
            };
        })

        /*广告弹窗*/
        .filter('广告弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                        template : '<a target="_blank" href="'+ scope.popList.location +'" ng-click="closeAD()"><div style="width:840px;height:460px;"><img style="width:100%;height:100%;" src="'+ scope.popList.imgUrl +'"><div></a>',
                        scope : scope,
                        closeByDocument : false,
                        plain : true,
                        animation:{
                            width:"100px",
                            height:"200px",
                            right:0,
                            bottom:0,
                            'margin-right':0,
                            'margin-bottom':0
                        },
                        className: 'ad-dialog-wrapper ngdialog-theme-default'
                });
                scope.$on('ngDialog.closing', function (e, $dialog) {
                    $dialog.find('.ngdialog-overlay').fadeOut(200);
                    $dialog.find('.donghua').animate({
                        width:"100px",
                        height:"200px",
                        right:0,
                        bottom:0,
                        'margin-right':0,
                        'margin-bottom':0
                    },1000,function(){
                        $dialog.find('.donghua').fadeOut(200);
                    })
                });
                // ngDialog.setPadding='0';
                scope.closeAD = function() {
                    ngDialog.closeAll();
                };
            };
        })

/*充值提现弹窗*/
        .filter('充值提现弹窗', function(ngDialog,$state,$localStorage) {//../views/dialog_views/oldDialog/success-dialog.html
            return function(scope) {
                scope.status = $localStorage.dialogStatus;
                scope.type = $localStorage.dialogType;
                scope.msg = $localStorage.dialogMsg;
                switch(scope.status) {
                    case 'success':
                        scope.text = '成功';
                        break;
                    case 'ing':
                        scope.text = '处理中';
                        break;
                    case 'error':
                        scope.text = '失败';
                        break;
                }
                if (scope.type === '充值' && scope.status == 'success') {
                    scope.showLittleTip = true;
                } else {
                    scope.showLittleTip = false;
                }
                scope.closeDialog = function(bool) {
                    ngDialog.closeAll();
                    if(!bool){
                        if (scope.type === '充值') {
                            if (scope.status == 'success' || scope.status == 'ing') {
                                $state.go('main.myAccount.recharge',null,{
                                    reload:true
                                });
                            } else if (scope.status == 'error') {
                                if (scope.recharge.errorCode != '1003') { 
                                    $state.go('main.myAccount.recharge',null,{
                                        reload:true
                                    });
                                }
                            }
                            scope.isSubmit = false;
                        } else if (scope.type === '提现') {
                            $state.go('main.myAccount.Withdraw',null,{
                                reload:true
                            });
                        }
                    }
                };
                scope.returnHome = function(bool) {
                    ngDialog.closeAll();
                    $state.go('main.myAccount.accountHome');
                };
                ngDialog.open({
                    template: '../views/dialog_views/oldDialog/success-dialog.html',
                    scope: scope,
                    closeByDocument: false,
                    // plain : true,
                    showClose: false
                });
                // return  dialog;
            };
        })
/*充值弹窗*/
        .filter('充值弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                        template : '../views/dialog_views/oldDialog/recharge-dialog.html',
                        scope : scope,
                        closeByDocument : false,
                        plain : false
                });
                // return  dialog;
            };
        })
/*充值弹窗*/

        //  登录弹窗
        .filter('登录弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/login-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    showClose: false
                });
            };
        })

        //  倒计时弹窗
        .filter('倒计时弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/countdown-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    showClose: false
                });
            };
        })


        //  幸运码弹窗
        .filter('幸运码弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/special-code-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    showClose: false
                });
            };
        })
        

        .filter('图片放大弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                        template : '../views/dialog_views/oldDialog/bigimg-dialog.html',
                        scope : scope,
                        closeByDocument : false,
                        plain : false
                });
                // return  dialog;
            };
        })

        .filter('砸金蛋弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/egg-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'egg-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
            };
        })

        .filter('计算器弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/calculator-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'cal-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
            };
        })
        .filter('奖金弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/pop-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'pop-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
            };
        })
        .filter('微信二维码弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/code-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'pop-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
            };
        })

        .filter('红包弹窗', function(ngDialog,$state) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/redbag-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'redbag-dialog-wrapper ngdialog-theme-default'
                });
                scope.promoteGoCoupon = function() {
                    ngDialog.closeAll();
                    $state.go('main.myAccount.myCoupon');
                }
                scope.promoteCloseDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('促复投红包弹窗', function(ngDialog,$state) {
            return function(scope,type) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/promote-redbag-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'redbag-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.promoteGoCoupon = function() {
                    ngDialog.closeAll();
                    $state.go('main.myAccount.myCoupon');
                }
                scope.promoteCloseDialog = function(flag) {
                    ngDialog.closeAll();
                    if (flag) {
                        scope.showPromoteTear = true;
                    } else {
                        scope.showPromoteTear = false;
                    }
                };
                scope.showBagType = type;
            };
        })

        .filter('预定弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/book-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'book-dialog-wrapper ngdialog-theme-default'
                });
            };
        })

        .filter('投即送预约弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/investgift-book-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'invest-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
            };
        })

        .filter('投即送常见问题弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/investgift-question.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'invest-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                
            };
        })

        .filter('新手标弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/newhand-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'newhand-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
            };
        })
        .filter('圣诞节弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/christmas-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('体验金认证弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/finance-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default'
                });
                scope.closeDialog = function(type) {
                    ngDialog.closeAll();
                    if (type != undefined) {
                        $localStorage.activeText = {name:'我的福利',url:'main.myAccount.'+type};
                    }
                };
            };
        })

        .filter('体验金投资弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/financeInvest-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('元宵弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/lantern-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('元宵未获奖弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/lantern-dialogno.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('意见弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/msg-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('银行卡选择弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/bank-dialog.html',
                    scope : scope,
                    closeByDocument : false,
                    plain : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('推广页登录注册弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/reglogin-dialog.html',
                    scope : scope,
                    closeByDocument : true,
                    plain : false,
                    className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('推广页注册弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/reg-dialog.html',
                    scope : scope,
                    closeByDocument : true,
                    plain : false,
                    className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                // scope.closeDialog = function() {
                //     ngDialog.closeAll();
                // };
            };
        })

        .filter('推广页不注册弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/regnoget-dialog.html',
                    scope : scope,
                    closeByDocument : true,
                    plain : false,
                    className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('不要体验金弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/goldnoact-dialog.html',
                    scope : scope,
                    // closeByDocument : true,
                    plain : false,
                    className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
                scope.goGoldACT = function() {
                    ngDialog.closeAll();
                    scope.goldACT = true;
                    scope.product.nowNum = 5000;
                };
                
            };
        })

        .filter('开通账户弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/storage-dialog.html',
                    scope : scope,
                    plain : false,
                    closeByDocument : false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                scope.closeDialog = function() {
                    ngDialog.closeAll();
                };
            };
        })

        .filter('开户成功弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/openaccount-dialog.html',
                    scope : scope,
                    plain : false,
                    closeByDocument: false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                
            };
        })

        .filter('提现跳转弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/withdraw-dialog.html',
                    scope : scope,
                    plain : false,
                    closeByDocument: false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                
            };
        })

        .filter('投资余额不足弹窗', function(ngDialog) {
            return function(scope) {
                ngDialog.open({
                    template : '../views/dialog_views/oldDialog/nomoney-dialog.html',
                    scope : scope,
                    plain : false,
                    closeByDocument: false,
                    className: 'christmas-dialog-wrapper ngdialog-theme-default',
                    showClose: false
                });
                
            };
        })


/**
    当点击投资时要判断当前用登录状态并决定页面跳转到哪里
*/
        .filter('clickTouZiGotoWhere', function($localStorage,$filter,communicationService,$state) {

            return function(scope,myUrl) {
                var url;
                scope.msg={};
                if($filter('isRegister')().register){//如果已登录
                    url=myUrl;
                }else{//未登录
                    communicationService.setTagPage('denLu','main.home');
                    url = 'main.loginPage';
                };
                 $state.go(url);
            }
        }) 

/*跳转去登录*/
        .filter('跳转页面', function($rootScope,communicationService,$state,$localStorage) {
            /*
                type:登录或注册状态,
                path:出自,
                url：要去,
                item：产品信息,
                pathMenu,按钮名
                activeText：按钮选择的状态name:上级按钮名url:子集按钮路径
            */
            return function(type,path,url,item,pathMenu,activeText) {
                
                if(item != undefined){
                    $localStorage.product = item;
                    communicationService.setProduct(item);
                };
                $localStorage.pathObj =[{pathName:'首页',url:'/mainhome'}];
                if(pathMenu != undefined || pathMenu != null){
                    $localStorage.pathObj.push(pathMenu);
                }
                $localStorage.pathUrl = path;

                // 跳转到我的账户里边左边栏显示
                if (activeText == undefined) {
                    $localStorage.activeText = {name:'我的账户',url:'main.myAccount.accountHome'};
                } else {
                    $rootScope.$broadcast('myEvent.WHDR_Ctrl',activeText);
                    $localStorage.activeText = activeText;
                }
                communicationService.setTagPage(type,path);
                if(item != undefined){
                     $state.go(url,item.id);
                }else{
                     $state.go(url);
                };
            }
        }) 
/*跳回上一页*/
        .filter('跳回上一页', function($localStorage,$state) {

            return function(type,path) {

                if ($localStorage.pathUrl != undefined && $localStorage.pathUrl != '') {
                    if($localStorage.product!=undefined){
                        $state.go($localStorage.pathUrl,{id:$localStorage.product.id});
                    }else{
                        $state.go($localStorage.pathUrl);
                    }
                    // delete $localStorage.pathUrl;
                }else{
                    $state.go('main.home');
                }
            }
        }) 
/* 数字转为两位小数 */
        .filter('changeTwoDecimal', function() {

            return function(x) {
                var f_x = parseFloat(x);
                if (isNaN(f_x)) {
                    return;
                }
                var f_x = Math.round(x * 100) / 100;
                var s_x = f_x.toString();
                var pos_decimal = s_x.indexOf('.');
                if (pos_decimal < 0) {
                    pos_decimal = s_x.length;
                    s_x += '.';
                }
                while (s_x.length <= pos_decimal + 2) {
                    s_x += '0';
                }
                if (s_x == '0.00') {
                    return '';
                }
                return s_x;
            }
        }) 

/*跳回上一页*/
        .filter('60秒倒计时', function($timeout) {

            return function(scope,timeNum) {
                scope.nowTimer = '';
                var timer;
                var nowTimer = timeNum;
                if(scope.isSubMin){
                    setTimerOut();
                }
                function setTimerOut() {
                    timer = $timeout(
                        function() {
                            if(nowTimer <= 0 ){
                                scope.nowTimer='';
                                scope.disabledPhoneBtn = false;
                                scope.isSubMin = true;
                                scope.isGetVoice = false;
                                scope.isGetCode = false;
                                scope.bool=true;
                                // if ($('.img-box img')[0] != undefined) {
                                //     $('.img-box img')[0].src += '?' + new Date().getTime();
                                // }
                                if(scope.changeIMGCode != undefined){
                                    scope.changeIMGCode();
                                }
                            }else{
                                if (scope.isvoice) {
                                    scope.isSubMin = false;
                                }
                                nowTimer-=1;
                                scope.nowTimer = nowTimer + 's';
                                setTimerOut();
                            }
                        },
                        1000
                    );
                };
                scope.stop=function(){
                    nowTimer = 0;
                    scope.isGetVoice = false;
                    scope.bool=false;
                };
            }
        }) 
/*跳回上一页　　　*/
        .filter('300秒倒计时', function($timeout) {

            return function(scope,timeNum,isOverBool) {
                scope.nowTimer = '';
                var timer;
                var nowTimer = timeNum;
                // var isOverBool=true;
                if(isOverBool){
                    setTimerOut();
                }
                function setTimerOut() {
                    timer = $timeout(
                        function() {
                            if(isOverBool){
                                if(nowTimer <= 0 ){
                                    scope.nowTimer='短信验证失效';
                                    scope.isDisabledPhoneMsg =true;
                                    scope.disabledPhoneBtn = true;
                                    if(scope.changeIMGCode != undefined){
                                        scope.changeIMGCode();
                                    };
                                    
                                }else{
                                    nowTimer -=1;
                                    setTimerOut();
                                }
                            }
                        },
                        1000
                    );
                };
                scope.stopmsmTimerout=function(){
                    isOverBool = false;
                };
            }
        }) 

/*跳回上一页*/
        .filter('6秒倒计时自动跳转', function($timeout,$filter) {

            return function(scope,timeNum) {
                scope.nowTimerGoto = '';
                var nowTimer = timeNum;
                setTimerOut();
                var isBool = true;
                scope.stopTimerout=function(){
                    isBool = false;
                };
                function setTimerOut() {
                    var timer = $timeout(
                        function() {
                            if(nowTimer <= 0 ){
                                if(isBool){
                                    $filter('跳转页面')('','main.home','main.home');
                                }
                            }else{
                                nowTimer-=1;
                                scope.nowTimerGoto = nowTimer + 's ';
                                setTimerOut();
                            }
                        },
                        1000
                    );
                };
            }
        }) 

/*路由状态*/
        .filter('isLogin', function($rootScope,$location,communicationService) {

            return function(scope) {
                switch($location.$$url){
                    case "/mainloginPage":
                        if( communicationService.getTagPage().url == undefined){
                            communicationService.setTagPage('denLu','main.home');
                        };
                        $rootScope.title="金吉利宝欢迎您！";
                        $rootScope.isLoginPage = true;
                    break;
                    case "/mainresetPasswd":
                        $rootScope.title="修改密码";
                        $rootScope.isLoginPage = true;
                    break;
                    case "/maintradepasswdSet":
                        $rootScope.title="实名认证";
                        $rootScope.isLoginPage = true;
                    break;
                    case "/mainbankBillList":
                        scope.path=[{pathName:'首页',url:'/mainhome'},{pathName:'优选理财',url:'/mainbankBillList'}];
                        $rootScope.title="金吉利宝-优选理财";
                        $rootScope.isLoginPage = false;
                    break;
                    case "/mainYbankBillList":
                        scope.path=[{pathName:'首页',url:'/mainhome'},{pathName:'票据优选',url:'/mainYbankBillList'}];
                        $rootScope.title="金吉利宝-优选理财";
                        $rootScope.isLoginPage = false;
                    break;
                    case "/mainbillDetail":
                        scope.path=[{pathName:'首页',url:'/mainhome'},{pathName:'票据优选',url:'/mainYbankBillList'}];
                        $rootScope.title="金吉利宝-理财详情";
                        $rootScope.isLoginPage = false;
                    break;
                    case "/mainmyAccountaccountHome":
                        $rootScope.title="金吉利宝-我的资产";
                        $rootScope.isLoginPage = false;
                    break;
                    default :
                        $rootScope.isLoginPage = false; 
                    break; 
                }
            }
        })


app.directive(
    'pagination',
    function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/pagination/pagination.html',
            replace: true,
            // transclude: true,
            // scope: true,
            // controller: [
            //     '$scope',
            //     '$filter',
            //     'resourceService',
            //     function ($scope, $filter, resourceService) {

            //     }]

        };
    }
);
/*
    username注意
    grid = 表格数据

 */
app.factory(
		'resourceService', 
		['$state','$resource', '$http','$rootScope', 'ngDialog','$filter','$localStorage',function($state,$resource, $http,$rootScope,ngDialog,$filter,$localStorage) {
	return new resourceService($resource, $http,$state,$rootScope,ngDialog,$filter,$localStorage);
}]);
app.factory('storage',function(){
	return {
		storageData:null
	}
})
/*缓存要跳转到页面名*/
app.factory(
		'communicationService', 
		['$state','$resource', '$http','$rootScope', 'ngDialog','$filter','$localStorage',function($state,$resource, $http,$rootScope,ngDialog,$filter,$localStorage) {
	return new function(){
		var tag = {};
		/*路径*/
		this.setTagPage=function(name,url){
			tag.name=name;
			tag.url=url;
		};
		this.getTagPage=function(){
			return tag;
		};
		/*产品*/
		this.setProduct=function(item){	tag.product = item;}
		this.getProduct=function(){return tag.product;}
	};
}]);
/*缓存要跳转到页面名*/
app.factory(
		'MAIN_MENU', 
		['$state','$resource', '$http','$rootScope', 'ngDialog','$filter','$localStorage',function($state,$resource, $http,$rootScope,ngDialog,$filter,$localStorage) {
	return new function(){

		this.menuname = function(name,type){
			$rootScope.$broadcast('MAIN_MENU.MYEVENT',name,type);
		}
	};
}]);
function resourceService(resource, http , $state, $rootScope, ngDialog, $filter,$localStorage) {
	var actions = {
		'query':{
            method:'GET'
        },
        'queryPost':{
        	method:'POST'
        	// headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'} 
        },
        'formGet':{
        	method:'GET',
        	async:false
        	// headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'} 
        }
    };
	//加载json模板页面
	this.getJsonServer = function(scope,url,data,type) {
		showMask($rootScope);
		var queryResource = resource(url, {}, actions);
		queryResource.query(data, function(data) {
			removeMask($rootScope);
				scope.$broadcast('resourceService_GET_JSON.MYEVENT',data,type);
		}, function(error) {
			removeMask($rootScope);
			$filter('errorUserMessages')('netErro', ngDialog,scope);
		});
	};
		//查找
	this.queryPost = function(scope,url,data,type) {
				showMask($rootScope);
				/*临时改变时间*/
				if ($filter('isOnLine')()) {
					var queryResource = resource(url, {}, actions);
					queryResource.queryPost(data, function(data) {
						removeMask($rootScope);
						if(data.success){
							scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
						}else{
							if(data.errorCode == '9999'){
								$state.go('404');
							}else{
								scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
							}
						}

					}, function(error) {
						removeMask($rootScope);
						// $filter('服务器信息')(type, scope,'y');
					});
				}else{
					if(type=='票据详情'){
						$filter('获取产品详情错误')(data.errorCode)
					}else{
						test(scope,url,data,type);
					}
				};
	};
		//查找
	this.formGet = function(scope,url,data,type) {
				showMask($rootScope);
				/*临时改变时间*/
				if ($filter('isOnLine')()) {
					var queryResource = resource(url, {}, actions);
					queryResource.queryPost(data, function(data) {
						removeMask($rootScope);
						if(data.success){
							scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
						}else{
							if(data.errorCode == '9999'){
								$state.go('404');
							}else{
								scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
							}
						}

					}, function(error) {
						removeMask($rootScope);
						// $filter('服务器信息')(type, scope,'y');
					});
				}else{
					test(scope,url,data,type);
				};
	};


	var testnum =0;
	/*静态调试模块*/
	function test(scope,url,data,type) {
		removeMask($rootScope);
		switch(type){
			case '登录': 
				/*
				name:用户姓名
				phone:用户手机号
				balance:用户帐户余额
				earningsNum：用户已投资产品数量
				userType:用户状态 0=普通登录;1=已绑卡；2=已绑手机
				*/
				var data ={name:'lee',phone:13661836696,balance:100.05,earningsNum:3,userType:0};
				$localStorage.user = data;
				data.name +='，';
		 		scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
			break;
			case '注册':  
				var data ={name:'lee',phone:13661836696,balance:100.05,earningsNum:3,userType:0};
		 		scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
			break;
			case '实名认证完成':  
				var data ={name:'lee',phone:13661836696,balance:100.05,earningsNum:3,userType:1};
		 		scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
			break;
			case '安全认证数据':  
				var data = {
						truename:{type: false,data: {name: "",idcard: ""}},
						passwd:{type: true}
					};
		 		scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
			break;
			case '安全认证实名认证表单提交':  
				var data ={status: true};
		 		scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
			break;
			case '安全认证原始密码验证':
				var data ={status: false};
		 		scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
			default:
				showMask($rootScope);
				var queryResource = resource(url, {}, actions);
				queryResource.query(data, function(data) {
					removeMask($rootScope);
					if(type == '实时更新注册人数'){
						testnum++;
						data.result.register += testnum;
						data.result.successfulTrade += (testnum + 1);
					}
						scope.$broadcast('resourceService.QUERY_POST_MYEVENT',data,type);
				}, function(error) {
					removeMask($rootScope);
					$filter('errorUserMessages')('netErro', ngDialog,scope);
				});
			break; 
		};
	}
	/******静态调结束*******/
	function showMask(rootSp){
		rootSp.maskHidde = true;
	};
	function removeMask(rootSp){
		rootSp.maskHidde = false;
	};
};

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
app.controller('InvestFriendsController', function ($scope, httpService, $filter, $localStorage,$state) {
    
})  
app.controller('NewyearController', function ($scope, httpService, $filter, $localStorage,$state) {
    
})  
app.controller('ActivityController', function ($scope, httpService, $filter, $localStorage,$state) {
    
 })  
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
app.service('DialogService', function (ngDialog) {
    /* 
        ------------错误提示框 
    */
    this.showError = function (scope) {
        ngDialog.open({
            template: '../views/dialog_views/error/error.html',
            scope: scope,
            plain: false,
            className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
            showClose: false
        });
    };

    /*  */
})  
app.controller('HelpDetailController', function ($scope, httpService, $filter, $localStorage) {
    $scope.changeToggle = function (event) {
        $(event.currentTarget).parent('li').toggleClass('active');
        $(event.currentTarget).parent('li').find('.answer').finish().slideToggle();
        if ($(event.currentTarget).find('i').hasClass('animation1')) {
            $(event.currentTarget).find('i').removeClass('animation1 active').addClass('animation2');
        }
        else if ($(event.currentTarget).find('i').hasClass('animation2')) {
            $(event.currentTarget).find('i').removeClass('animation2').addClass('animation1 active');
        }
        else if ($(event.currentTarget).find('i').hasClass('init')) {
            $(event.currentTarget).find('i').removeClass('init active').addClass('animation2');
        }
        else {
            $(event.currentTarget).find('i').addClass('animation1 active');
        }
    }
})  
app.controller('HomeController', function ($scope, httpService, $filter, $localStorage, $state, $timeout) {
    // 首页公告
    httpService.post($scope, $filter('getUrl')('首页公告列表'), {  }, function(data){
        if (data.success) {
            // if ($localStorage.indexNoticeArtiId != data.map.urgentNotice[0].arti_id) {
            //     $scope.indexNotice = data.map.urgentNotice[0];
            //     $localStorage.indexNoticeArtiId = data.map.urgentNotice[0].arti_id;
            // }
            $scope.ggList = data.map.urgentNotice;
            $scope.notice=data.map.notice[0];
        }
    });

    // var obj = {};
    // if ($scope.user) {
    //     obj.uid = $scope.user.uid;
    // }
    httpService.post($scope, $filter('getUrl')('首页新闻列表'), {proId:1}, function(data){
        $scope.news = data.map.page.rows[0];
        // $scope.index = data.map;
        // $scope.cpRoutine = data.map.preferredInvest;
        // $scope.newhand = data.map.fuiouNewHandProduct;
        // $scope.actList = data.map.activityAggregation;
    })
httpService.post($scope, $filter('交互接口对照表')('产品列表'), {}, function(data){
        $scope.products = data.map;
        // $scope.index = data.map;
        // $scope.cpRoutine = data.map.preferredInvest;
        // $scope.newhand = data.map.fuiouNewHandProduct;
        // $scope.actList = data.map.activityAggregation;
    })
    // banner图
    var swiper1 = new Swiper ('#swiper1', {
        direction: 'horizontal',
        loop: true,
        autoplay:{
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        // 分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            // dynamicBullets: true,
        },
          
    })  

    // 轮播2
    $timeout(function () {
        var swiper2 = new Swiper('#swiper2',{
            direction: 'horizontal',
            loop: true,
            slidesPerView : 6,
            spaceBetween : 30,
            // loopedSlides: 8,
            // 箭头
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    })
})
app.service('InvestService', function (
    $rootScope,
    $state,
    $filter,
    $location,
    $localStorage,
    httpService,
    resourceService,
    Global
) {
    /* 
        产品投资-详情页-初始化方法
    */
    this.investDetailInit= function (scope) {
        Global.pageTitel("理财产品详情");
        scope.global = Global.company;
    };
    /* 
        产品投资-列表页-初始化方法（显示募集中的）
        bill：往期产品列表{
            statuses：募集中产品状态 [5]=募集中产品，[6,8,9]=往期产品
            pageOn：当前位于第几页
            pageSize：每页显示条数
        }；
        order：查询状态 0=默认，1=利率降序，2=利率升序，3=期限降序，4=期限升序
        an：投資列表的篩選條件
        {
            qx：期限
            lv: 历史年化收益
        }
        pastan: 历史投資列表的篩選條件
    */
    this.investListInit= function (scope) { 
        Global.pageTitel("理财产品列表");
        scope.global = Global.company;
        scope.an = {};
        scope.pastan = {};

        switch ($location.$$path) {
            case '/main/invest':
                this.invesList(scope);
                break;
            case '/main/pastInvest':
                this.beforInvesList(scope);
                break;
            default:
                break;
        }
    };
    /* 
        往期历史投资
    */    
    this.beforInvesList= function(scope){
		var str = '往期优选理财';
         scope.bill = {
            pageOn: 1,
            statuses: [6,8,9],
            pageSize: 10,
            isActivity: 2,
            order:0,
            lv:1,
            qx:0
        };
        resourceService.queryPost(scope,$filter('交互接口对照表')('票据列表'),scope.bill,str);
    };
    /* 
        投资进行中的产品列表
    */    
    this.invesList= function(scope){
        var str = '优选理财';
         scope.bill = {
            pageOn: 1,
            statuses: [5],
            pageSize: 100,
            isActivity: 2,
            order:0,
            lv:1,
            qx:3
        };
        resourceService.queryPost(scope,$filter('交互接口对照表')('票据列表'),scope.bill,str);
    };
   
    /* 
        历史投资列表翻頁
    */    
    this.nextPage= function(scope){
        var str = '往期优选理财';
        scope.bill.order= scope.pastan.order;
        scope.bill.lv= scope.pastan.lv;
        scope.bill.qx= scope.pastan.qx;
        this._delBillData(scope);
        resourceService.queryPost(scope,$filter('交互接口对照表')('票据列表'),scope.bill,str);
    };
    /* 
        清除多余参数
    */
    this._delBillData = function (scope) {
        delete scope.bill.pages;
        delete scope.bill.rows;
        delete scope.bill.total;
        delete scope.bill.pageInfo;
        delete scope.bill.totalPage;
     };
    /* 
        投资列表排序
    */    
    this.sortList= function(scope){
        var str = '优选理财';
        scope.bill.order= scope.an.order;
        scope.bill.lv= scope.an.lv;
        scope.bill.qx= scope.an.qx;
        this._delBillData(scope);
        resourceService.queryPost(scope,$filter('交互接口对照表')('票据列表'),scope.bill,str);
    };
   

})  
app.service('LoginService', function (
    $rootScope,
    $location,
    $state,
    $localStorage
) {
    
    /* 
        注册 - 判断URL上带的参数
        toFrom：注册來源
        recommCode：推荐人号码
        tid：
        checkbox:注册协议复选框 | 默认状态为true
    */
       this.getUrlParamet = function () {
           var obj= {};
           if ($location.$$search.toFrom || $location.$$search.recommPhone || $location.$$search.tid) {
               $localStorage.webFormPath = obj = $location.$$search;
            };
            obj.checkbox = true;
            return obj;
        };
        
    /* 
        注册 - 注册成功后
        backPath: 到达登录的来源路径，登录完成后需要跳转回来源
    */
    this.registerOk = function (data, backPath) {
        $localStorage.user = data.map;
        var url = '';
        backPath ? url = backPath : url = 'main.home';
        $state.go(url);//跳转至首頁
        /* 
            //预留-回退到前一頁
            window.history.back(-1);
        */
   };

   /* 
        注册/登录 - 换图片验证码
   */
    this.changeIMG = function (event) { 
        if (event != undefined) {
            event.currentTarget.src += '?' + new Date().getTime();
        } else {
            if ($('.img-box img')[0] != undefined) {
                $('.img-box img')[0].src += '?' + new Date().getTime();
            }
        }
    };
   /* 
        登录 - 初始化参数
        backPath: 到达登录的来源路径，登录完成后需要跳转回来源
   */
    this.loginInit = function (scope) { 
        scope.userLogin = {};
        $location.$$search.backPath ? scope.backPath = $location.$$search.backPath : scope.backPath = false;
        console.log(scope.backPath)
    };
   /* 
        登录 - 完成登录
   */
    this.loginOk = function (data, backPath) { 
        this.registerOk(data,backPath);
    };
   /* 
        登录 - 登录错误处理
   */
    this.loginError = function (scope) { 
        this.changeIMG();
        scope.userLogin.picCode='';
        scope.isPicYanZhen = true;
    };

})  
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
app.controller('GGXQController', function ($scope, httpService, $filter, $stateParams) {
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
app.controller('GszzController', function ($scope, httpService, $filter, $localStorage) {
    $scope.isShow = 1;
    $scope.show = function (num) {
        $scope.isShow = num;
        console.log(num);
    }
})  
app.controller('MTBDController', function ($scope, httpService, $filter, $localStorage) {
    httpService.post($scope, $filter('getUrl')('网站公告列表'), {
        pageOn: 1,
        pageSize: 8,
        proId: 1
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
            proId: 1
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

/* 借款协议 */
app.controller('loanProtocolCtrl', ['$rootScope','$scope','$filter','resourceService','$localStorage','$location', function($rootScope,$scope,$filter,resourceService,$localStorage,$location) {
	$scope.ids={};
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;
	if($location.$$search.pid != undefined && $location.$$search.uid != undefined && $location.$$search.investId != undefined) {
		$scope.idLength = true;
		$scope.ids = $location.$$search;
	} else {
		if($localStorage.inProfitProductList != undefined){
			$scope.idLength = true;
			$scope.ids.pid=$localStorage.inProfitProductList[$location.$$search.idx].pid
			$scope.ids.uid=$localStorage.inProfitProductList[$location.$$search.idx].uid
			$scope.ids.investId= $localStorage.inProfitProductList[$location.$$search.idx].id
		}else{
			$scope.idLength = false;
		}
	}
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {
			case "借款协议":
				if (data.success) {
					$scope.info = data.map;
					$scope.list = $.parseJSON(data.map.result);
				} else {
				}
				break;
		};
	});
	if ($scope.ids.pid != undefined && $scope.ids.uid != undefined && $scope.ids.investId != undefined) {
		resourceService.queryPost($scope,$filter('交互接口对照表')('借款协议'),$scope.ids,'借款协议');
	}
}]);
/* 个人中心 */
app.controller('accountPersonCtrl', ['$rootScope','$scope','$filter','resourceService', function($rootScope,$scope,$filter,resourceService) {
	$rootScope.title = '个人中心-金吉利宝';
	$rootScope.activeNav = 'account';
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {

			case "个人中心":
				if (data.success) {
					$scope.user = data.map;
					if (data.map.sex == 1) {
						$scope.user.sexInfo = '男';
					} else if (data.map.sex == 2) {
						$scope.user.sexInfo = '女';
					} else if (data.map.sex == undefined) {
						$scope.user.sexInfo = '';
					}
					if (data.map.realName == '' || data.map.realName == undefined) {
						$scope.user.verify = false;
					} else {
						$scope.user.verify = true;
					}
				} else {
				}
				break;
		}
	});
	resourceService.queryPost($scope, $filter('交互接口对照表')('个人中心'),{},'个人中心');
}]);

/* si 安全认证 */
app.controller('accountSecurityCtrl', ['$rootScope','$scope','$filter','resourceService','$interval','$localStorage','$state','ngDialog', function($rootScope,$scope,$filter,resourceService,$interval,$localStorage,$state,ngDialog) {
	$scope.user = {};
	$scope.bank = {};
	$scope.trade = {};
	$scope.passwd = {};
	// $scope.settruename = false;
	$scope.subForm = '';
	$scope.user.getCodeText = '获取验证码';
	$scope.bank.getCodeText = '获取验证码';
	$scope.trade.getCodeText = '获取验证码';
	$scope.isSubmit = false;
	$rootScope.title = '安全认证-金吉利宝';
	$rootScope.activeNav = 'account';

	$scope.hasSysBank = false;

	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {

		switch(type) {

			case "安全认证数据":
				if (data.success) {
					$scope.member = data.map;
					$scope.truenameset = data.map.realFlag;
					$scope.tpwdset = data.map.tpwFlag;
					$('.trade-code-btn').text($scope.tpwdset ? '修改' : '设置');
					if ($localStorage.product == 'bindBank') {
						$('.set-bankinfo').addClass('actived-set-wrap').find('.btn a').text('取消绑定');
						$('#set-bankinfo').show();
						$localStorage.product = '';
					} else if ($localStorage.product == 'setTruename') {
						$('.set-truename').addClass('actived-set-wrap').find('.btn a').text('取消认证');
						$('#set-truename').show();
						$localStorage.product = '';
					} else if ($localStorage.product == 'setTradeCode') {
						$('.set-tradecode').addClass('actived-set-wrap').find('.btn a').text('取消设置');
						$('#set-tradecode').show();
						$localStorage.product = '';
					} else if ($localStorage.product == 'forgetTradeCode') {
						$('.set-tradecode').addClass('actived-set-wrap').find('.btn a').text('取消修改');
						$('#set-tradecode').show().find('.set-trade-box').hide();
						$('.set-before').show();
						$localStorage.product = '';
					}
					if ($scope.truenameset == 0) {
						resourceService.queryPost($scope, $filter('交互接口对照表')('认证支持银行列表'),{},'认证支持银行列表');
					}
				} else {

				}
				// $scope.isSubmit = false;
				break;

			// 身份认证--银行信息
			// case "身份认证":

			// 	if (data.success) {
			// 		$scope.isCps = data.map.isCps;
			// 		$filter('体验金认证弹窗')($scope);
			// 		switch($scope.subForm) {
			// 			case 'trueNameForm':
			// 				_hmt.push(['_trackPageview', 'www.jinjilibao.com/maidian/smrz']);
			// 				// $.qTip({
			// 				// 	'type': true,
			// 				// 	'text': '认证成功'
			// 				// });
			// 				$('#set-truename').slideUp(500, function() {
			// 					$scope.$apply(function() {
			// 						$scope.member.realName = data.map.realName;
			// 						$scope.member.idCards = data.map.idCards;
			// 						$scope.member.bankNum = data.map.bankNum;
			// 						$scope.member.bankCode = data.map.bankCode;

			// 						$scope.truenameset = true;
			// 					});
			// 					$scope.isSubmit = false;
			// 				});
			// 				break;

			// 			case 'bankInfoForm':
			// 				// $.qTip({
			// 				// 	'type': true,
			// 				// 	'text': '绑定成功'
			// 				// });
			// 				$('#set-bankinfo').slideUp(500, function() {
			// 					$scope.$apply(function() {
			// 						$scope.member.realName = data.map.realName;
			// 						$scope.member.idCards = data.map.idCards;
			// 						$scope.member.bankNum = data.map.bankNum;
			// 						$scope.member.bankCode = data.map.bankCode;
			// 						$scope.truenameset = true;
			// 					});
			// 					$scope.isSubmit = false;
			// 				});
			// 				break;
			// 		}
			// 	} else {
			// 		var errorMsg = $filter('身份认证error信息')(data.errorCode);
			// 		$.qTip({
			// 			'type': false,
			// 			'text': errorMsg
			// 		});
			// 		$scope.isSubmit = false;
			// 		if (data.errorCode == '1013') {
			// 			$state.go('main.myAccount.accountSecurity',null,{
			// 			    reload:true
			// 			});
			// 		}
			// 	}
			// 	break;

			// 身份认证-获取短信验证码
			// case "身份认证获取短信验证码":
			// 	if (data.success) {
			// 		$.qTip({
			// 			'type': true,
			// 			'text': '短信发送成功'
			// 		});
			// 	} else {
			// 		var errorMsg = $filter('身份认证获取验证码error信息')(data.errorCode);
			// 		$.qTip({
			// 			'type': false,
			// 			'text': errorMsg
			// 		});
			// 	}
			// 	$scope.isSubmit = false;
			// 	break;


			// 安全认证修改登录密码
			case "安全认证修改登录密码":
				if (data.success) {
					$.qTip({
						'type': true,
						'text': '修改成功'
					});
					$('#set-passwd').slideUp(500, function() {
						$('.reset-passwd-btn').text('修改');
						$('.set-passwd').removeClass('actived-set-wrap');
						$scope.$apply(function() {
							$scope.isSubmit = false;
						});
						$state.go('main.myAccount.accountSecurity',null,{
						    reload:true
						});
					});
				} else {
					var errorMsg = $filter('安全认证修改登录密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;
				
			// 设置交易密码
			case "设置交易密码":
				if (data.success) {
					$.qTip({
						'type': true,
						'text': '交易密码设置成功'
					});
					$('#set-tradecode').slideUp(500, function() {
						$('.trade-code-btn').text('修改');
						$('.set-tradecode').removeClass('actived-set-wrap');
						$scope.$apply(function() {
							$scope.isSubmit = false;
							$scope.tpwdset = true;
						});
					});

				} else {
					var errorMsg = $filter('设置交易密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;

			// 修改交易密码
			case "修改交易密码":
				if (data.success) {
					$.qTip({
						'type': true,
						'text': '交易密码修改成功'
					});
					$('#set-tradecode').slideUp(500, function() {
						$('.trade-code-btn').text('修改');
						$('.set-tradecode').removeClass('actived-set-wrap');
						$scope.$apply(function() {
							$scope.isSubmit = false;
						});
						$state.go('main.myAccount.accountSecurity',null,{
						    reload:true
						});
					});
				} else {
					var errorMsg = $filter('修改交易密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;

			// 找回交易密码获取短信验证码
			// case "找回交易密码获取短信验证码":
			// 	if (data.success) {
			// 		$.qTip({
			// 			'type': true,
			// 			'text': '短信发送成功'
			// 		});
			// 	} else {
			// 		var errorMsg = $filter('找回交易密码获取短信验证码error信息')(data.errorCode);
			// 		$.qTip({
			// 			'type': false,
			// 			'text': errorMsg
			// 		});
			// 	}
			// 	$scope.isSubmit = false;
			// 	break;

			// 找回交易密码验证短信验证码
			case "找回交易密码验证短信验证码":
				if (data.success) {
					$('.set-before').slideUp(500, function() {
						$('.set-new').slideDown(500);
						$scope.$apply(function() {
							$scope.isSubmit = false;
						});
					});
				} else {
					$.qTip({
						'type': false,
						'text': '验证码输入不正确'
					});
					$scope.isSubmit = false;
				}
				break;

			// 找回交易密码设置新交易密码
			case "找回交易密码设置新交易密码":
				if (data.success) {
					$('.set-new').slideUp(500, function() {
						$('.change-trade-success').slideDown(500);
						setTimeout(function() {
							$('.change-trade-success').slideUp(500, function() {
								$('.trade-code-btn').text('修改');
								$('.set-tradecode').removeClass('actived-set-wrap').find('.set-mod').hide();
								$('.set-trade-box').css('display', 'block');
								$scope.$apply(function() {
									$scope.isSubmit = false;
								});
								$state.go('main.myAccount.accountSecurity',null,{
								    reload:true
								});
							});
						}, 3000);
					});
				} else {
					var errorMsg = $filter('找回交易密码设置新交易密码error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
					$scope.isSubmit = false;
				}
				break;

			case "认证支持银行列表":
				if (data.success) {
					$scope.sysBankList = data.map.sysBankList;
					// $scope.sysBankList.length = 15;
					$scope.activeSysBank = $scope.sysBankList[0];
					$scope.spreadBank = false;
					if ($scope.sysBankList.length%3==0) {
						$scope.bankNumError = true;
					} else {
						$scope.bankNumError = false;
					}
				}
			break;
		}
	});

	// 显示下拉内容
	var isChange = false;
	$scope.showSetMod = function(event) {
		var $this = $(event.currentTarget),
			$mySetWrap = $this.parents('.set-wrap');

		if (!$mySetWrap.hasClass('actived-set-wrap')) {
			var $activeSetWrap = $('.actived-set-wrap'),
				$activeBtn = $activeSetWrap.find('.btn a');
			if (isChange) {
				return;
			}
			isChange = true;
			$activeSetWrap.find('.set-mod').slideUp(400, function() {
				$activeSetWrap.removeClass('actived-set-wrap');
				$activeBtn.text($activeBtn.text().replace('取消', ''));
			});
			$mySetWrap.find('.set-mod').slideDown(400, function() {
				$mySetWrap.addClass('actived-set-wrap');
				$this.text('取消' + $this.text());
				isChange = false;
			});
		} else {
			if (isChange) {
				return;
			}
			isChange = true;
			$mySetWrap.find('.set-mod').slideUp(400, function() {
				$mySetWrap.removeClass('actived-set-wrap');
				$this.text($this.text().replace('取消', ''));
				isChange = false;
			});
		}
	};

	$scope.submitForm = function(isvalid, event, formname) {
		if (!isvalid || $scope.isSubmit) {
			return;
		}
		else {
			if ($filter('isRegister')().register) {
				switch(formname) {

					// 身份认证
					// case 'trueNameForm':
					// 	$scope.subForm = 'trueNameForm';
					// 	resourceService.queryPost($scope, $filter('交互接口对照表')('身份认证'),{
					// 		realName: $scope.user.truename,
					// 		idCards: $scope.user.idcard,
					// 		bankNum: $scope.user.bankcardno,
					// 		phone: $scope.user.bankphone,
					// 		smsCode: $scope.user.phonecode
					// 	},'身份认证');
					// 	$scope.isSubmit = true;
					// 	break;

					// // 银行信息
					// case 'bankInfoForm':
					// 	$scope.subForm = 'bankInfoForm';
					// 	resourceService.queryPost($scope, $filter('交互接口对照表')('身份认证'),{
					// 		realName: $scope.bank.truename,
					// 		idCards: $scope.bank.idcard,
					// 		bankNum: $scope.bank.bankcardno,
					// 		phone: $scope.bank.bankphone,
					// 		smsCode: $scope.bank.phonecode
					// 	},'身份认证');
					// 	$scope.isSubmit = true;
					// 	break;

					// 修改登录密码
					case 'passwdFrom':
						resourceService.queryPost($scope, $filter('交互接口对照表')('安全认证修改登录密码'),{
							oldPwd: $scope.passwd.usedpasswd,
							newPwd: $scope.passwd.newpasswd,
							confirmPwd: $scope.passwd.repasswd
						},'安全认证修改登录密码');
						$scope.isSubmit = true;
						break;

					// 设置交易密码
					case 'tpwdSetForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('设置交易密码'),{
							tpwd: $scope.trade.tpasswd,
							confirm: $scope.trade.retpasswd
						},'设置交易密码');
						$scope.isSubmit = true;
						break;

					// 修改交易密码
					case 'changetpwdForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('修改交易密码'),{
							oldPwd: $scope.trade.usedtpasswd,
							tpwd: $scope.trade.newtpasswd,
							confirmTpwd: $scope.trade.retradepasswd
						},'修改交易密码');
						$scope.isSubmit = true;
						break;

					// 找回交易密码验证短信验证码
					case 'phonecodeForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('找回交易密码验证短信验证码'),{code: $scope.trade.phonecode},'找回交易密码验证短信验证码');
						$scope.isSubmit = true;
						break;

					// 找回交易密码设置新交易密码
					case 'setnewtpwdForm':
						resourceService.queryPost($scope, $filter('交互接口对照表')('找回交易密码设置新交易密码'),{
							tpwd: $scope.trade.newtpwd,
							confirmTpwd: $scope.trade.retpwd,
							code: $scope.trade.phonecode
						},'找回交易密码设置新交易密码');
						$scope.isSubmit = true;
						break;
				}
			}
		}
	};
	$scope.isGetVoice = false;
	// 身份认证--获取短信验证码
	$scope.bank.times = 59;
	$scope.user.times = 59;
	$scope.trade.times = 59;
	$scope.getPhoneCode = function(bankphone, bankcardno, event, item, isvoice) {
		var $this = $(event.currentTarget),
			type = 1;
		$this.parents('.set-mod').find('.voice-box span').hide();
		if ($this.hasClass('getcode-disabled')) {
			return;
		}
		if (!$filter('isRegister')().register) {
			return;
		}

		$this.addClass('getcode-disabled');

		if (isvoice) {
			type = 2;
		} else {
			type = 1;
		}
		
		if (bankphone && bankcardno) {

			$.ajax({
				headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
				url: $filter('交互接口对照表')('身份认证获取短信验证码'),
				type: 'post',
				data: JSON.stringify({mobilePhone: bankphone,bankNum: $filter('limitTo')(bankcardno, -4),type: type}),
				dataType: 'json',
				success: function(data){
					if (data.success) {
						if (isvoice) {
							item.isGetVoice = true;
						} else {
							item.isGetVoice = false;
						}

						// item.times = 59;
						// item.isGetCode = true;
						if (!isvoice || (isvoice && !item.isGetCode)) {
							if (!isvoice) {
								item.isGetCode = true;
							}
							item.timer = $interval(function(){
								if (item.times == 0) {
									$interval.cancel(item.timer);
									// if (!isvoice) {
										item.getCodeText = '获取验证码';
									// } else {
										item.isGetVoice = false;
									// }
									item.isGetCode = false;
									item.times = 59;
									return;
								}
								// if (!isvoice) {
									item.getCodeText = item.times + 's重新获取';
								// }
								item.times --;
					        }, 1000);
						}
						$.qTip({
							'type': true,
							'text': '短信发送成功'
						});
					} else {
						var errorMsg = $filter('身份认证获取验证码error信息')(data.errorCode);
						if (data.errorCode == '8888') {
							$this.parents('.set-mod').find('.voice-box span').show();
						} else {
							$.qTip({
								'type': false,
								'text': errorMsg
							});
						}
						$this.removeClass('getcode-disabled');
					}
					// $scope.isSubmit = false;
				}
			});

			// resourceService.queryPost($scope, $filter('交互接口对照表')('身份认证获取短信验证码'),{
			// 	mobilePhone: bankphone,
			// 	bankNum: $filter('limitTo')(bankcardno, -4),
			// 	type: type
			// },'身份认证获取短信验证码');
		} else {
			$.ajax({
				headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
				url: $filter('交互接口对照表')('找回交易密码获取短信验证码'),
				type: 'post',
				data: JSON.stringify({type: type}),
				dataType: 'json',
				success: function(data){
					if (data.success) {
						if (isvoice) {
							item.isGetVoice = true;
						} else {
							item.isGetVoice = false;
						}

						// item.times = 59;
						// item.isGetCode = true;
						if (!isvoice || (isvoice && !item.isGetCode)) {
							if (!isvoice) {
								item.isGetCode = true;
							}
							item.timer = $interval(function(){
								if (item.times == 0) {
									$interval.cancel(item.timer);
									// if (!isvoice) {
										item.getCodeText = '获取验证码';
									// } else {
										item.isGetVoice = false;
									// }
									item.isGetCode = false;
									item.times = 59;
									return;
								}
								// if (!isvoice) {
									item.getCodeText = item.times + 's重新获取';
								// }
								item.times --;
					        }, 1000);
						}
						$.qTip({
							'type': true,
							'text': '短信发送成功'
						});
					} else {
						var errorMsg = $filter('找回交易密码获取短信验证码error信息')(data.errorCode);
						if (data.errorCode == '8888') {
							$this.parents('.set-mod').find('.voice-box span').show();
						} else {
							$.qTip({
								'type': false,
								'text': errorMsg
							});
						}
						$this.removeClass('getcode-disabled');
					}
					// $scope.isSubmit = false;
				}
			});
			// resourceService.queryPost($scope, $filter('交互接口对照表')('找回交易密码获取短信验证码'),{},'找回交易密码获取短信验证码');
		}
	};

	// 忘记交易密码
	$scope.getCodeByMsg = function(event) {
		var $this = $(event.currentTarget);
		$this.parents('.set-trade-box').slideUp(500, function() {
			$('.set-before').slideDown(500);
		});
	};

	resourceService.queryPost($scope, $filter('交互接口对照表')('安全认证数据'),{},'安全认证数据');
	

	$scope.changeSysBank = function(index) {
		$scope.activeSysBank = $scope.sysBankList[index];
	};
	$scope.sureSysBank = function() {
		$scope.lastActiveBank = $scope.activeSysBank;
		$scope.hasSysBank = true;
		ngDialog.closeAll();
	};
	$scope.chooseSysBank = function() {
		if ($scope.lastActiveBank != undefined) {
			$scope.activeSysBank = $scope.lastActiveBank;
		}
		$filter('银行卡选择弹窗')($scope);
	};
}])
/* si 个人中心 */
app.controller('accountStorageCtrl', ['$rootScope','$scope','$filter','resourceService','$location','md5','ngDialog','$state', function($rootScope,$scope,$filter,resourceService,$location,md5,ngDialog,$state) {
	$rootScope.title = '开通账户-金吉利宝';
	$rootScope.activeNav = 'account';
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;

	var $storageForm = $('#storageForm'),
		isSubmit = false;
	$scope.user = {};
	$scope.error = {};
	$scope.list = [];
	resourceService.getJsonServer($scope,'/data/area.json',{},'地区');
	resourceService.getJsonServer($scope,'/data/bank.json',{},'银行');
	$scope.$on('resourceService_GET_JSON.MYEVENT', function(event, data, type) {
		switch(type) {
			case "地区":
				$scope.list = data.result;
			break;
			case "银行":
				$scope.bank = data.result;
			break;
		}
	});
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type) {
			case "资产首页":
				if (data.success) {
					$scope.accuntHome = data.map;
					$scope.isFuiou = data.map.isFuiou;
				}
			break;
			case "个人中心":
				if (data.success) {
					console.log(1);
					$scope.member = data.map;
					if ($scope.member.idCards != '') {
						$scope.user.realName = $scope.member.realName;
						$scope.user.idCards = $scope.member.idCards;
					}
					if ($scope.member.bankCode!=undefined) {
						$scope.user.bank = $scope.member.bankCode.substr(0,4);
					}
					if ($scope.member.bankNum!=undefined) {
						$scope.user.card = $scope.member.bankNum;
					}
				}
			break;
			case "信息":
				if (data.success) {
					$scope.storage = data.map;
					$scope.showSuccess = true;
				} else {
					$scope.errorMsg = data.errorMsg;
					$scope.showSuccess = false;
    				isSubmit = false;
				}
				$filter('开户成功弹窗')($scope);
			break;
		}
	});
	
	resourceService.queryPost($scope, $filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
	if ($location.$$path == '/main/myAccount/accountStorage') {
		resourceService.queryPost($scope, $filter('交互接口对照表')('个人中心'),{},'个人中心');
	} else if ($location.$$path == '/main/myAccount/storageSuccess') {
		$scope.successType = true;
		if ($location.$$search.success == 'true') {
			$scope.successType = true;
		} else if ($location.$$search.success == 'false') {
			$scope.successType = false;
			if ($location.$$search.errorMsg!=undefined && $location.$$search.errorMsg!='') {
				$scope.errorMsg = $location.$$search.errorMsg;
			} else {
				$scope.errorMsg = '开通失败';
			}
		}
	}
	$scope.storageSubmit = function() {
		if (!isSubmit) {
			isSubmit = true;
			resourceService.queryPost($scope, $filter('交互接口对照表')('开户直连'),{
				cust_nm:$scope.user.realName,
				certif_id:$scope.user.idCards,
				city_id:$scope.user.city,
				parent_bank_id:$scope.user.bank,
				capAcntNo:$scope.user.card,
				password:md5.createHash($scope.user.paycode),
				rpassword:md5.createHash($scope.user.repaycode)
			},'信息');
		}
    };

    // 省市区
    // $scope.changeP = function () {
    //     $scope.user.city = "";
    // };

    $scope.closeDialog = function(flag) {
    	isSubmit = false;
        ngDialog.closeAll();
        if (flag) {
        	$state.go('main.myAccount.accountHome');
        }
    };
			
}]);
/* si 充值成功 */
app.controller('accountRechargeSuccessCtrl', [
	'$rootScope',
	'$scope',
	'$filter',
	'resourceService',
	'ngDialog',
	'$localStorage',
	'$interval',
	'$location' ,
	'Global' ,
	function(
		$rootScope,
		$scope,
		$filter,
		resourceService,
		ngDialog,
		$localStorage,
		$interval,
		$location,
		Global
	) {
		$scope.Global = Global;
		Global.pageTitel('充值成功');
		$localStorage.dialogType = '充值';

	var data = $location.$$search;
	if (data.success == 'true') {
		$scope.success = true;
		$scope.amount = data.amount;
		$scope.ing = false;
		$scope.fail = false;
	} else {
		$scope.success = false;
		if (data.errorCode == '1001') {
			$scope.ing = true;
			$scope.fail = false;
		} else if (data.errorCode == '1002') {
			$scope.fail = true;
			$scope.ing = false;
		}
	}

	$scope.onClickToBillDetail = function(item) {
		$filter('跳转页面')('产品推荐','main.myAccount.accountHome','main.billDetail',item,{pathName:'产品推荐',url:'/mainmyAccountaccountHome'});
	};

	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case "资产首页":
				$scope.infoList = data.map.infoList;
			break;
		};
	});
	resourceService.queryPost($scope, $filter('交互接口对照表')('我的资产首页数据'),{},'资产首页');
	// resourceService.queryPost($scope, $filter('交互接口对照表')('充值成功数据'),{},'充值成功数据');
}]);

/* si 充值 */
app.controller('accountRechargeCtrl', ['$rootScope','$scope','$filter','resourceService','ngDialog','$localStorage','$interval','$http','$state','$location',function($rootScope,$scope,$filter,resourceService,ngDialog,$localStorage,$interval,$http,$state,$location) {
	$scope.user = {};
	$scope.code = {};
	$scope.code.isGetCode = false;
	$scope.code.getCodeText = '点击获取验证码';
	$localStorage.dialogType = '充值';
	$rootScope.title = '充值-金吉利宝';
	$scope.tab = 1;
	$scope.online = {};
	var $hiddenForm = $('#hiddenForm')[0];

	var $kjForm = $('#kjForm')[0],
		$wyForm = $('#wyForm')[0],
		isSubmit = false;

	$rootScope.activeNav = 'account';

	$scope.rechargemore = 3;
	$scope.quota = 500000;

	$scope.amountError = false;

	// 选择快捷网银
	$scope.chooseKJ = true;
	$scope.showChangeQA = function() {
		$localStorage.showCGQA = 'recharge';
	};
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type,item) {
		switch(type) {

			case "充值数据":
				if (data.success) {
					$scope.user = data.map;
					if ($scope.user.quota!=undefined && $scope.user.quota!='') {
						$scope.quota = $scope.user.quota;
					}
					if ($scope.user.bankList!=undefined) {
						$scope.bankCode = $scope.user.bankList[0].bankCode;
					}
					if (!$scope.user.isFuiou) {
						$filter('开通账户弹窗')($scope);
					}
				} else {
					var errorMsg = $filter('充值数据error信息')(data.errorCode);
					$.qTip({
						'type': false,
						'text': errorMsg
					});
				}
			break;
			case "充值直连":
				if (data.success) {
					if ($localStorage.balanceNotEnough == true) {
						$localStorage.balanceNotEnough = false;
						$state.go($localStorage.pathUrl,{id:$localStorage.balanceNotEnoughId});
						return;
					} else {
						$localStorage.dialogStatus = 'success';
						$scope.rechargeSuccess = true;
						$localStorage.dialogMsg = '您已成功充值'+ $filter('currency')($scope.user.amount,'') +'元';
					}
				} else {
					$scope.recharge = {};
					$scope.recharge.errorCode = data.errorCode;
					$scope.errorCode = data.errorCode;
					// isSubmit = false;
					$localStorage.dialogStatus = 'error';
					$localStorage.dialogMsg = data.errorMsg;
				}
				$filter('充值提现弹窗')($scope);
			break;
			case "网银充值":
				if (data.success) {
					// if ($localStorage.hasCGRecharge!=undefined) {
					// 	delete $localStorage.hasCGRecharge;
					// }
					$filter('充值弹窗')($scope);
					$scope.wystorage = data.map;
					getStorageForm($scope.wystorage.signature,'wyForm');
					$wyForm.action = $scope.wystorage.fuiouUrl;
    				$wyForm.submit();
				} else {
					isSubmit = false;
					$.qTip({
						'type': false,
						'text': data.errorMsg
					});
				}
			break;
			case "充值验证码直连":
				if (data.success) {
					$scope.quickOrder = data.map.order;
					if (!$scope.code.isGetCode) {
						$scope.code.isGetCode = true;
						$scope.code.timer = $interval(function(){
							if ($scope.code.times == 0) {
								$interval.cancel($scope.code.timer);
								$scope.code.getCodeText = '点击获取验证码';
								$scope.isGetVoice = false;
								$scope.code.isGetCode = false;
								$scope.code.times = 59;
								return;
							}
							$scope.code.getCodeText = $scope.code.times + 's重新获取';
							$scope.code.times --;
				        }, 1000);
					}
					$.qTip({
						'type': true,
						'text': '短信发送成功'
					});
				} else {
					$.qTip({
						'type': false,
						'text': data.errorMsg
					});
					$('a.getphonecode').removeClass('getcode-disabled');
				}
			break;
			// case "网银充值":
			// 	if (data.success) {
			// 		$scope.online = data.map;
			// 		$('.tranCode',$hiddenForm).val(data.map.tranCode);
			// 		$('.version',$hiddenForm).val(data.map.version);
			// 		$('.charset',$hiddenForm).val(data.map.charset);
			// 		$('.uaType',$hiddenForm).val(data.map.uaType);
			// 		$('.merchantId',$hiddenForm).val(data.map.merchantId);
			// 		$('.merOrderId',$hiddenForm).val(data.map.merOrderId);
			// 		$('.merTranTime',$hiddenForm).val(data.map.merTranTime);
			// 		$('.merUserId',$hiddenForm).val(data.map.merUserId);
			// 		$('.orderDesc',$hiddenForm).val(data.map.orderDesc);
			// 		$('.prodInfo',$hiddenForm).val(data.map.prodInfo);
			// 		$('.tranAmt',$hiddenForm).val(data.map.tranAmt);
			// 		$('.curType',$hiddenForm).val(data.map.curType);
			// 		$('.payMode',$hiddenForm).val(data.map.payMode);
			// 		$('.bankCode',$hiddenForm).val(data.map.bankCode);
			// 		$('.bankCardType',$hiddenForm).val(data.map.bankCardType);
			// 		$('.notifyUrl',$hiddenForm).val(data.map.notifyUrl);
			// 		$('.backUrl',$hiddenForm).val(data.map.backUrl);
			// 		$('.signType',$hiddenForm).val(data.map.signType);
			// 		$('.sign',$hiddenForm).val(data.map.sign);
			// 		$hiddenForm.action = data.map.url;

			// 		$hiddenForm.submit();
			// 		$filter('充值弹窗')($scope);
			// 	} else {
			// 		$localStorage.dialogMsg = $filter('网银充值error信息')(data.errorCode);
			// 		$localStorage.dialogStatus = 'error';
			// 		$filter('充值提现弹窗')($scope);
			// 	}
			// 	// $scope.isSubmit = false;
			// break;
		}
	});
	$('.amount').on('keyup change', function() {
		$scope.$apply(function() {
			if ($scope.user.amount == '' || $scope.user.amount == undefined) {
				$scope.amountIsTrue = true;
			}
		});
	});

	// onblur将金额保留两位小数
	$scope.setAmount = function() {
		$scope.user.amount = $filter('isNumber2')($scope.user.amount,undefined,1);
		var nowquota;
		if ($scope.tab==1) {
			nowquota = $scope.quota;
		} else if ($scope.tab==2) {
			nowquota = '';
		}
		var obj = $filter('rechargeLimit')($scope.user.amount,$scope.rechargemore,nowquota);
		// obj.typemax = true;
		if (obj.typemin == false || obj.typemax == false) {
			$scope.amountIsTrue = false;
			if (obj.typemin == false) {
				$scope.typemin = false;
				$scope.amountMsg = '充值金额至少为' + $scope.rechargemore + '元';
			}
			if (obj.typemax == false) {
				$scope.typemax = false;
				$scope.amountMsg = '单笔限额' + $filter('number')($scope.quota) + '元';
			}
		} else {
			$scope.amountIsTrue = true;
			$scope.typemin = true;
			$scope.typemax = true;
			$scope.amountMsg = '';
		}
	};

	// $scope.setAmountError = function() {
	// 	$scope.amountError = false;
	// };

	// 切换方式
	$scope.changeTab = function(type) {
		var myquota;
		switch(type) {
			case 1:
				$scope.tab = 1;
				myquota = $scope.quota;
			break;
			case 2:
				$scope.tab = 2;
				myquota = '';
			break;	
		}
		var obj = $filter('rechargeLimit')($scope.user.amount,$scope.rechargemore,myquota);
		if (obj.typemin == false || obj.typemax == false) {
			$scope.amountIsTrue = false;
			if (obj.typemin == false) {
				$scope.typemin = false;
				$scope.amountMsg = '充值金额至少为' + $scope.rechargemore + '元';
			}
			if (obj.typemax == false) {
				$scope.typemax = false;
				$scope.amountMsg = '单笔限额' + $filter('number')($scope.quota) + '元';
			}
		} else {
			$scope.amountIsTrue = true;
			$scope.typemin = true;
			$scope.typemax = true;
			$scope.amountMsg = '';
		}

	}

	resourceService.queryPost($scope, $filter('交互接口对照表')('充值数据'),{},'充值数据');

	// 身份认证--获取短信验证码
	$scope.code.times = 59;
	$scope.getPhoneCode = function(entrance, event, item, myentrance) {
		if (!entrance) {
			return;
		}
		if (myentrance!=undefined && !myentrance) {
			return;
		}
		if (!$filter('isRegister')().register) {
			return;
		}
		var $this = $(event.currentTarget);
		if ($this.hasClass('getcode-disabled')) {
			return;
		}
		$this.addClass('getcode-disabled');
		$scope.amountError = false;

		resourceService.queryPost($scope, $filter('交互接口对照表')('充值验证码直连'),{
			amt:$scope.user.amount,
			bank_mobile:$scope.user.bankMobilePhoneFuiou==''?$scope.user.bankPhoneFuiou:$scope.user.bankMobilePhoneFuiou
		},'充值验证码直连',item);

	};

	// 提交表单
	$scope.submitForm = function(valid) {
		if (!valid || isSubmit) {
			return;
		}
		isSubmit = true;
		resourceService.queryPost($scope, $filter('交互接口对照表')('充值直连'),{
			bank_mobile:$scope.user.bankMobilePhoneFuiou,
			yzm:$scope.user.phonecode,
			amt:$scope.user.amount,
			order:$scope.quickOrder
		},'充值直连');
	};

	// 选择银行
	$scope.chooseBank = function(code) {
		$scope.bankCode = code;
		// if (isSubmit) {
		// 	return;
		// }
		// isSubmit = true;
		// resourceService.queryPost($scope, $filter('交互接口对照表')('网银充值'),{
		// 	amt: $scope.user.amount,
		// 	iss_ins_cd: $scope.bankCode,
		// 	order_pay_type: 'B2C'
		// },'网银充值');
	}

	// 网银充值
	$scope.goWYPay = function() {

		if ($scope.isSubmit) {
			return;
		}
		$scope.isSubmit = true;
		resourceService.queryPost($scope, $filter('交互接口对照表')('网银充值'),{
			amt: $scope.user.amount,
			iss_ins_cd: $scope.bankCode,
			order_pay_type: 'B2C'
		},'网银充值');
	};

	function getStorageForm(json,form) {
		json = JSON.parse(json);
		for(var key in json.message){
			if(key !="signature") {
				$('#'+form).prepend('<input type="hidden" name="'+key+'" value="'+json.message[key]+'" /><br/>');
			}
		}
		$('#'+form).prepend('<input type="hidden" name="signature" value="'+json.signature+'" /><br/>');
	}

}]);

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

/*lee 资产记录*/
app.controller('accountMyAssetsCtrl', ['$rootScope','$scope','$filter','resourceService',function($rootScope,$scope,$filter,resourceService) {
	$scope.page={};
	$scope.page.pageOn=1;
	$scope.page.pageSize=5;
	$scope.format = "yyyy-MM-dd";
	// $scope.altInputFormats = ['d!/M!/yyyy'];
	// $scope.page.tradeType = '';
	$scope.types = $filter('tradeType')();
	$rootScope.title = '资产记录-金吉利宝';
	$rootScope.activeNav = 'account';
	resourceService.queryPost($scope,$filter('交互接口对照表')('我的投资-资产记录'),$scope.page,'资产记录');
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case "资产记录":
				if(data.success){
					$scope.page.pageOn = data.map.page.pageOn;
					$scope.pages = [];
					$scope.page.totalPage = data.map.page.totalPage;
					for(var i=0;i<parseInt(data.map.page.totalPage);i++){
						$scope.pages[i]=i+1;
					};
					$scope.accountMyassetsWrapList = data.map.page.rows;
				}else{
				}
			break;
		};
	});
	$scope.onClick = function(type,item){
		switch(type) {
			case "资产记录":
				$scope.page.pageOn = 1;
				if ($scope.page.tradeTypeVal == null) {
					delete $scope.page.tradeType;
				} else {
					$scope.page.tradeType = $scope.page.tradeTypeVal.code;
				}
				goPage();
			break;
			case "beforePage":
				if($scope.page.pageOn > 1){$scope.page.pageOn -=1;goPage()};
			break;
			case "currentPage":
				$scope.page.pageOn = item;goPage();
			break;
			case "nextPage":
				if($scope.page.pageOn < $scope.pages.length){$scope.page.pageOn +=1;goPage()};
			break;
		}
	};
	$scope.goPG=function(){
		$scope.page={};
		$scope.page.pageOn=1;
		$scope.page.pageSize=5;
		goPage();
	};
	function goPage() {
		if($scope.page.tradeType == '' || $scope.page.tradeType == undefined){
			delete $scope.page.tradeType;
		}
		resourceService.queryPost($scope,$filter('交互接口对照表')('我的投资-资产记录'),$scope.page,'资产记录');
	}
	$scope.today = function() {
    	$scope.startDate = new Date();
  	};
  	$scope.today();

	$scope.clear = function() {
	   $scope.startDate = null;
	};
	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.popup1 = {
		opened: false
	};

	$scope.popup2 = {
		opened: false
	};
}])

/*lee 我的投资*/
app.controller('accountMyInvestCtrl', ['$rootScope', '$scope', '$filter', 'resourceService', '$state', '$localStorage', function ($rootScope, $scope, $filter, resourceService, $state, $localStorage) {
	if (!$filter('isRegister')().register) {
		$state.go('login');
		return;
	}
	$scope.page = {};
	$scope.page.pageOn = 1;
	$scope.page.pageSize = 5;
	$scope.isActive = 0;
	$rootScope.title = '我的资产-金吉利宝';
	$scope.page.status = 0;
	$rootScope.activeNav = 'account';
	resourceService.queryPost($scope, $filter('交互接口对照表')('我的投资'), {}, '我的投资');

	$scope.types = $filter('isType')();
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function (event, data, type) {
		switch (type) {
			case "我的投资":
				if (data.success) {
					$scope.userInvest = data.map;
				} else {
				}
				resourceService.queryPost($scope, $filter('交互接口对照表')('我的投资-收益中的产品'), $scope.page, '收益中的产品');
				break;
			case "收益中的产品":
				if (data.success) {
					$localStorage.inProfitProductList = $scope.inProfitProductList = data.map.page.rows;
					$scope.pages = [];
					$scope.page.pageOn = data.map.page.pageOn;
					$scope.total = data.map.page.total;
					$scope.page.totalPage = data.map.page.totalPage;
					for (var i = 0; i < parseInt(data.map.page.totalPage); i++) {
						$scope.pages[i] = i + 1;
					};
				} else {
				}
				break;
		};
	});
	$scope.lv = 1;
	$scope.qx = 3;
	$scope.onClick = function (type, item) {
		switch (type) {
			case "收益中查询":
				goPage();
				break;
			case "beforePage":
				if ($scope.page.pageOn > 1) { $scope.page.pageOn -= 1; goPage() };
				break;
			case "currentPage":
				$scope.page.pageOn = item; goPage();
				break;
			case "nextPage":
				if ($scope.page.pageOn < $scope.pages.length) { $scope.page.pageOn += 1; goPage() };
				break;
		}
	};
	$scope.goPG = function () {
		$scope.page = {};
		$scope.page.pageOn = 1;
		$scope.page.pageSize = 5;
		goPage();
	};
	function goPage() {
		if ($scope.page.type == 'null') {
			delete $scope.page.type;
		}
		$scope.page.status = $scope.isActive;
		resourceService.queryPost($scope, $filter('交互接口对照表')('我的投资-收益中的产品'), $scope.page, '收益中的产品');
	};

	$scope.today = function () {
		$scope.startDate = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.startDate = null;
	};
	$scope.open1 = function () {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function () {
		$scope.popup2.opened = true;
	};

	$scope.popup1 = {
		opened: false
	};

	$scope.popup2 = {
		opened: false
	};
	$scope.gotoPage = function (ids, index, type, item) {
		if (type) {
			$localStorage.protocolIds = ids;
			var url = '';
			url = $state.href('loan', { idx: index });
			// if (item.prePid != undefined && item.sid != undefined) {
			// 	url = $state.href('mytransfer',{idx:index});
			// } else if (item.prePid == undefined && item.sid != undefined) {
			// 	url = $state.href('loan',{idx:index});
			// } else if (item.prePid == undefined && item.sid == undefined) {
			// 	url = $state.href('qy',{idx:index});
			// }
			window.open(url, '_blank');
		} else {
			var url = "/agreement/download.do?pid=" + ids.pid + "&uid=" + ids.uid + "&investId=" + ids.investId;
			window.open(url, '_blank');
		}
	}

}])
/*lee 我的优惠券*/
app.controller('accountMyCouPonCtrl', [
	'$rootScope',
	'$scope', 
	'$http', 
	'$state', 
	'$stateParams', 
	'$localStorage',
	'$sessionStorage', 
	'resourceService',
	'$filter',
	'communicationService',
	'Global',
	function(
		$rootScope,
		$scope, 
		$http, 
		$state, 
		$stateParams, 
		$localStorage,
		$sessionStorage,
		resourceService,
		$filter,
		communicationService,
		Global
	) {
		Global.pageTitel("优惠券");
		$scope.global = Global;
	resourceService.queryPost($scope,$filter('交互接口对照表')('我的优惠券'),{flag:1},'我的优惠券');
	$rootScope.activeNav = 'account';
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case '我的优惠券':
				if (data.success) {
					$scope.HBList=[];
					$scope.QList=[];
					$scope.FBQList=[];
					$scope.TYJ={};
					for (var i = 0; i < data.map.list.length; i++) {
						switch(data.map.list[i].type){
							case 1:
								data.map.list[i].sel=false;
								$scope.HBList.push(data.map.list[i]);
							break;
							case 2:
								data.map.list[i].sel=false;
								$scope.QList.push(data.map.list[i]);
							break;
							case 3:
								// $scope.TYJ = data.map.list[i];
								data.map.list[i].sel=false;
								$scope.HBList.push(data.map.list[i]);
							break;
							case 4:
								// $scope.TYJ = data.map.list[i];
								data.map.list[i].sel=false;
								$scope.FBQList.push(data.map.list[i]);
							break;
						};
					}
					$scope.couponLength = 0;
					$scope.couponUsedLength = 0;
					$scope.couponDisabledLength = 0;
					for (var i = 0; i < $scope.QList.length; i++) {
						if ($scope.QList[i].status == 0) {
							$scope.couponLength ++;
						} else if ($scope.QList[i].status == 1) {
							$scope.couponUsedLength ++;
						} else if ($scope.QList[i].status == 2) {
							$scope.couponDisabledLength ++;
						}
					}
					$scope.tipsLength = 0;
					$scope.tipsUsedLength = 0;
					$scope.tipsDisabledLength = 0;
					for (var i = 0; i < $scope.HBList.length; i++) {
						if ($scope.HBList[i].status == 0) {
							$scope.tipsLength ++;
						} else if ($scope.HBList[i].status == 1) {
							$scope.tipsUsedLength ++;
						} else if ($scope.HBList[i].status == 2) {
							$scope.tipsDisabledLength ++;
						}
					}
					$scope.fbqLength = 0;
					$scope.fbqUsedLength = 0;
					$scope.fbqDisabledLength = 0;

					for (var i = 0; i < $scope.FBQList.length; i++) {
						if ($scope.FBQList[i].status == 0) {
							$scope.fbqLength ++;
						} else if ($scope.FBQList[i].status == 1) {
							$scope.fbqUsedLength ++;
						} else if ($scope.FBQList[i].status == 2) {
							$scope.fbqDisabledLength ++;
						}
					}

				}
			break;
		}
	});
	 /*所有的点击事件*/
    $scope.onClick=function(name){
         switch(name){
            case '立即使用':
                $state.go('main.invest');
            break;
        };
    };
}])

// 我的好友
app.controller('accountMyFriendCtrl', ['$rootScope','$scope','$location','$localStorage','$filter','resourceService', function($rootScope,$scope,$location,$localStorage,$filter,resourceService) {

	$rootScope.title = '我的邀请-金吉利宝';
	$scope.cpoyFin = false;
	$scope.myPhone = $localStorage.user.mobilephone;
	document.getElementsByTagName('html')[0].scrollTop = 0;
	document.getElementsByTagName('body')[0].scrollTop = 0;
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case "我的好友邀请":
				if (data.success) {
					$scope.myinvite = data.map;

					$scope.friend = data.map.page.rows;
					$scope.mylistPage = data.map.page;
					$scope.mylistPage.pages = [];

					for(var i = 0; i < parseInt($scope.mylistPage.totalPage); i ++){
						$scope.mylistPage.pages[i] = i+1;
					}
				}
			break;
		};
	});

	// 复制并打开链接
	$scope.copyNow = function() {
		$('#copyTxt').select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		$scope.cpoyFin = true;
	};

	// 好友分页
	$scope.mylistPage = {
		pageOn: 1,
		pageSize: 10
	};

	$scope.goPage = function(scope) {
        var obj = {};
        obj.pageOn = scope.mylistPage.pageOn;
        obj.pageSize = scope.mylistPage.pageSize;
        resourceService.queryPost($scope,$filter('交互接口对照表')('我的好友邀请'),{pageOn: obj.pageOn,pageSize: obj.pageSize},'我的好友邀请');
    };
    $scope.goPage($scope);

	$scope.changePage = function(type,pageNum) {
        switch(type){
            case "beforPage":
                if($scope.mylistPage.pageOn > 1){$scope.mylistPage.pageOn -=1;$scope.goPage($scope);};
            break;
            case "currentPage":
                $scope.mylistPage.pageOn = pageNum;$scope.goPage($scope);
            break;
            case "nextPage":
                if($scope.mylistPage.pageOn < $scope.mylistPage.pages.length){$scope.mylistPage.pageOn +=1;$scope.goPage($scope);};
            break;
        };
    };

}]);
/*lee 我的消息*/
app.controller('accountMyMsgCtrl', ['$rootScope','$scope','$filter','resourceService','$sce',function($rootScope,$scope,$filter,resourceService,$sce) {
	$scope.page = {
		type: 1,
		pageSize: 5,
		pageOn: 1
	};
	$scope.isActive = 1;
	$rootScope.title = '我的消息-金吉利宝';
	$rootScope.activeNav = 'account';
	resourceService.queryPost($scope,$filter('交互接口对照表')('我的消息'),$scope.page,'我的消息');
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		switch(type){
			case "我的消息":
				if(data.success){
					$scope.msg = data.map;
				}else{
				}
			break;
			case "消息列表":
				if(data.success){
					$scope.page.pageOn = data.map.page.pageOn;
					$scope.pages = [];
					$scope.page.totalPage = data.map.page.totalPage;
					for(var i=0;i<parseInt(data.map.page.totalPage);i++){
						$scope.pages[i]=i+1;
					};

					$scope.myMsgList = data.map.page.rows;
					for(var i=0;i<$scope.myMsgList.length;i++){
						$scope.myMsgList[i].content=$sce.trustAsHtml($scope.myMsgList[i].content);
					}
					
				}else{
				}
			break;
		};
	});
	$scope.onClick = function(type,item){
		switch(type) {
			case "beforePage":
				if($scope.page.pageOn > 1){$scope.page.pageOn -=1;goPage();};
			break;
			case "currentPage":
				$scope.page.pageOn = item; goPage();
			break;
			case "nextPage":
				if($scope.page.pageOn < $scope.pages.length){$scope.page.pageOn +=1;goPage();};
			break;
		}
	};
	$scope.goPG = function(){
		goPage();
	};

	function goPage() {
		$scope.page.type = $scope.isActive;
		resourceService.queryPost($scope,$filter('交互接口对照表')('消息列表'),$scope.page,'消息列表');
	};
	goPage();
}])
app.controller('InvestFriendsController', function ($scope, httpService, $filter, $localStorage,$state) {
    
})  
app.controller('NewyearController', function ($scope, httpService, $filter, $localStorage,$state) {
    
})  
/*
 * ngDialog - easy modals and popup windows
 * http://github.com/likeastore/ngDialog
 * (c) 2013-2015 MIT License, https://likeastore.com
 */

;(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        if (typeof angular === 'undefined') {
            module.exports = factory(require('angular'));
        } else {
            module.exports = factory(angular);
        }
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['angular'], factory);
    } else {
        // Global Variables
        factory(root.angular);
    }
}(this, function (angular) {
    'use strict';

    var m = angular.module('ngDialog', []);

    var $el = angular.element;
    var isDef = angular.isDefined;
    var style = (document.body || document.documentElement).style;
    var animationEndSupport = isDef(style.animation) || isDef(style.WebkitAnimation) || isDef(style.MozAnimation) || isDef(style.MsAnimation) || isDef(style.OAnimation);
    var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';
    var focusableElementSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
    var disabledAnimationClass = 'ngdialog-disabled-animation';
    var forceElementsReload = { html: false, body: false };
    var scopes = {};
    var openIdStack = [];
    var keydownIsBound = false;

    m.provider('ngDialog', function () {
        var defaults = this.defaults = {
            className: 'ngdialog-theme-default',
            disableAnimation: false,
            plain: false,
            showClose: true,
            closeByDocument: true,
            closeByEscape: true,
            closeByNavigation: false,
            appendTo: false,
            preCloseCallback: false,
            overlay: true,
            cache: true,
            trapFocus: true,
            preserveFocus: true,
            ariaAuto: false,/*ie8 need false*/
            ariaRole: false,
            ariaLabelledById: null,
            ariaLabelledBySelector: null,
            ariaDescribedById: null,
            ariaDescribedBySelector: null
        };

        this.setForceHtmlReload = function (_useIt) {
            forceElementsReload.html = _useIt || false;
        };

        this.setForceBodyReload = function (_useIt) {
            forceElementsReload.body = _useIt || false;
        };
        this.setDefaults = function (newDefaults) {
            angular.extend(defaults, newDefaults);
        };

        var globalID = 0, dialogsCount = 0, closeByDocumentHandler, defers = {};

        this.$get = ['$document', '$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout', '$window', '$controller', '$injector',
            function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout, $window, $controller, $injector) {
                var $elements = [];

                angular.forEach(
                    ['html', 'body'],
                    function(elementName) {
                        $elements[elementName] = $document.find(elementName);
                        if (forceElementsReload[elementName]) {
                            var eventName = privateMethods.getRouterLocationEventName();
                            $rootScope.$on(eventName, function () {
                                $elements[elementName] = $document.find(elementName);
                            });
                        }
                    }
                );

                var privateMethods = {
                    onDocumentKeydown: function (event) {
                        if (event.keyCode === 27) {
                            publicMethods.close('$escape');
                        }
                    },

                    activate: function($dialog) {
                        var options = $dialog.data('$ngDialogOptions');

                        if (options.trapFocus) {
                            $dialog.on('keydown', privateMethods.onTrapFocusKeydown);

                            // Catch rogue changes (eg. after unfocusing everything by clicking a non-focusable element)
                            $elements.body.on('keydown', privateMethods.onTrapFocusKeydown);
                        }
                    },

                    deactivate: function ($dialog) {
                        $dialog.off('keydown', privateMethods.onTrapFocusKeydown);
                        $elements.body.off('keydown', privateMethods.onTrapFocusKeydown);
                    },

                    deactivateAll: function () {
                        angular.forEach(function(el) {
                            var $dialog = angular.element(el);
                            privateMethods.deactivate($dialog);
                        });
                    },

                    setBodyPadding: function (width) {
                        var originalBodyPadding = parseInt(($elements.body.css('padding-right') || 0), 10);
                        $elements.body.css('padding-right', (originalBodyPadding + width) + 'px');
                        $elements.body.data('ng-dialog-original-padding', originalBodyPadding);
                    },

                    resetBodyPadding: function () {
                        var originalBodyPadding = $elements.body.data('ng-dialog-original-padding');
                        if (originalBodyPadding) {
                            $elements.body.css('padding-right', originalBodyPadding + 'px');
                        } else {
                            $elements.body.css('padding-right', '');
                        }
                    },

                    performCloseDialog: function ($dialog, value) {
                        var options = $dialog.data('$ngDialogOptions');
                        var id = $dialog.attr('id');
                        var scope = scopes[id];

                        if (!scope) {
                            // Already closed
                            return;
                        }

                        if (typeof $window.Hammer !== 'undefined') {
                            var hammerTime = scope.hammerTime;
                            hammerTime.off('tap', closeByDocumentHandler);
                            hammerTime.destroy && hammerTime.destroy();
                            delete scope.hammerTime;
                        } else {
                            $dialog.unbind('click');
                        }

                        if (dialogsCount === 1) {
                            $elements.body.unbind('keydown');
                        }

                        if (!$dialog.hasClass('ngdialog-closing')){
                            dialogsCount -= 1;
                        }

                        var previousFocus = $dialog.data('$ngDialogPreviousFocus');
                        if (previousFocus) {
                            previousFocus.focus();
                        }

                        dialogsCount = dialogsCount < 0 ? 0 : dialogsCount;
                        if (animationEndSupport && !options.disableAnimation) {
                            scope.$destroy();
                            $dialog.unbind(animationEndEvent).bind(animationEndEvent, function () {
                                privateMethods.closeDialogElement($dialog, value);
                            }).addClass('ngdialog-closing');
                        } else {
                            scope.$destroy();
                            privateMethods.closeDialogElement($dialog, value);
                        }
                        if (defers[id]) {
                            defers[id].resolve({
                                id: id,
                                value: value,
                                $dialog: $dialog,
                                remainingDialogs: dialogsCount
                            });
                            delete defers[id];
                        }
                        if (scopes[id]) {
                            delete scopes[id];
                        }
                        openIdStack.splice(openIdStack.indexOf(id), 1);
                        if (!openIdStack.length) {
                            $elements.body.unbind('keydown', privateMethods.onDocumentKeydown);
                            keydownIsBound = false;
                        }
                    },

                    closeDialogElement: function($dialog, value) {
                        $dialog.remove();
                        if (dialogsCount === 0) {
                            $elements.html.removeClass('ngdialog-open');
                            $elements.body.removeClass('ngdialog-open');
                            privateMethods.resetBodyPadding();
                        }
                        $rootScope.$broadcast('ngDialog.closed', $dialog, value);
                    },

                    closeDialog: function ($dialog, value) {
                        var preCloseCallback = $dialog.data('$ngDialogPreCloseCallback');

                        if (preCloseCallback && angular.isFunction(preCloseCallback)) {

                            var preCloseCallbackResult = preCloseCallback.call($dialog, value);

                            if (angular.isObject(preCloseCallbackResult)) {
                                if (preCloseCallbackResult.closePromise) {
                                    preCloseCallbackResult.closePromise.then(function () {
                                        privateMethods.performCloseDialog($dialog, value);
                                    });
                                } else {
                                    preCloseCallbackResult.then(function () {
                                        privateMethods.performCloseDialog($dialog, value);
                                    }, function () {
                                        return;
                                    });
                                }
                            } else if (preCloseCallbackResult !== false) {
                                privateMethods.performCloseDialog($dialog, value);
                            }
                        } else {
                            privateMethods.performCloseDialog($dialog, value);
                        }
                    },

                    onTrapFocusKeydown: function(ev) {
                        var el = angular.element(ev.currentTarget);
                        var $dialog;

                        if (el.hasClass('ngdialog')) {
                            $dialog = el;
                        } else {
                            $dialog = privateMethods.getActiveDialog();

                            if ($dialog === null) {
                                return;
                            }
                        }

                        var isTab = (ev.keyCode === 9);
                        var backward = (ev.shiftKey === true);

                        if (isTab) {
                            privateMethods.handleTab($dialog, ev, backward);
                        }
                    },

                    handleTab: function($dialog, ev, backward) {
                        var focusableElements = privateMethods.getFocusableElements($dialog);

                        if (focusableElements.length === 0) {
                            if (document.activeElement) {
                                document.activeElement.blur();
                            }
                            return;
                        }

                        var currentFocus = document.activeElement;
                        var focusIndex = Array.prototype.indexOf.call(focusableElements, currentFocus);

                        var isFocusIndexUnknown = (focusIndex === -1);
                        var isFirstElementFocused = (focusIndex === 0);
                        var isLastElementFocused = (focusIndex === focusableElements.length - 1);

                        var cancelEvent = false;

                        if (backward) {
                            if (isFocusIndexUnknown || isFirstElementFocused) {
                                focusableElements[focusableElements.length - 1].focus();
                                cancelEvent = true;
                            }
                        } else {
                            if (isFocusIndexUnknown || isLastElementFocused) {
                                focusableElements[0].focus();
                                cancelEvent = true;
                            }
                        }

                        if (cancelEvent) {
                            ev.preventDefault();
                            ev.stopPropagation();
                        }
                    },

                    autoFocus: function($dialog) {
                        var dialogEl = $dialog[0];

                        // Browser's (Chrome 40, Forefix 37, IE 11) don't appear to honor autofocus on the dialog, but we should
                        var autoFocusEl = dialogEl.querySelector('*[autofocus]');
                        if (autoFocusEl !== null) {
                            autoFocusEl.focus();

                            if (document.activeElement === autoFocusEl) {
                                return;
                            }

                            // Autofocus element might was display: none, so let's continue
                        }

                        var focusableElements = privateMethods.getFocusableElements($dialog);

                        if (focusableElements.length > 0) {
                            focusableElements[0].focus();
                            return;
                        }

                        // We need to focus something for the screen readers to notice the dialog
                        var contentElements = privateMethods.filterVisibleElements(dialogEl.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span'));

                        if (contentElements.length > 0) {
                            var contentElement = contentElements[0];
                            $el(contentElement).attr('tabindex', '-1').css('outline', '0');
                            contentElement.focus();
                        }
                    },

                    getFocusableElements: function ($dialog) {
                        var dialogEl = $dialog[0];

                        var rawElements = dialogEl.querySelectorAll(focusableElementSelector);

                        return privateMethods.filterVisibleElements(rawElements);
                    },

                    filterVisibleElements: function (els) {
                        var visibleFocusableElements = [];

                        for (var i = 0; i < els.length; i++) {
                            var el = els[i];

                            if (el.offsetWidth > 0 || el.offsetHeight > 0) {
                                visibleFocusableElements.push(el);
                            }
                        }

                        return visibleFocusableElements;
                    },

                    getActiveDialog: function () {
                        var dialogs = document.querySelectorAll('.ngdialog');

                        if (dialogs.length === 0) {
                            return null;
                        }

                        // TODO: This might be incorrect if there are a mix of open dialogs with different 'appendTo' values
                        return $el(dialogs[dialogs.length - 1]);
                    },

                    applyAriaAttributes: function ($dialog, options) {
                        if (options.ariaAuto) {
                            if (!options.ariaRole) {
                                var detectedRole = (privateMethods.getFocusableElements($dialog).length > 0) ?
                                    'dialog' :
                                    'alertdialog';

                                options.ariaRole = detectedRole;
                            }

                            if (!options.ariaLabelledBySelector) {
                                options.ariaLabelledBySelector = 'h1,h2,h3,h4,h5,h6';
                            }

                            if (!options.ariaDescribedBySelector) {
                                options.ariaDescribedBySelector = 'article,section,p';
                            }
                        }

                        if (options.ariaRole) {
                            $dialog.attr('role', options.ariaRole);
                        }

                        privateMethods.applyAriaAttribute(
                            $dialog, 'aria-labelledby', options.ariaLabelledById, options.ariaLabelledBySelector);

                        privateMethods.applyAriaAttribute(
                            $dialog, 'aria-describedby', options.ariaDescribedById, options.ariaDescribedBySelector);
                    },

                    applyAriaAttribute: function($dialog, attr, id, selector) {
                        if (id) {
                            $dialog.attr(attr, id);
                        }

                        if (selector) {
                            var dialogId = $dialog.attr('id');

                            var firstMatch = $dialog[0].querySelector(selector);

                            if (!firstMatch) {
                                return;
                            }

                            var generatedId = dialogId + '-' + attr;

                            $el(firstMatch).attr('id', generatedId);

                            $dialog.attr(attr, generatedId);

                            return generatedId;
                        }
                    },

                    detectUIRouter: function() {
                        //Detect if ui-router module is installed if not return false
                        try {
                            angular.module("ui.router");
                            return true;
                        } catch(err) {
                            return false;
                        }
                    },

                    getRouterLocationEventName: function() {
                        if(privateMethods.detectUIRouter()) {
                            return '$stateChangeSuccess';
                        }
                        return '$locationChangeSuccess';
                    }
                };

                var publicMethods = {

                    /*
                     * @param {Object} options:
                     * - template {String} - id of ng-template, url for partial, plain string (if enabled)
                     * - plain {Boolean} - enable plain string templates, default false
                     * - scope {Object}
                     * - controller {String}
                     * - controllerAs {String}
                     * - className {String} - dialog theme class
                     * - disableAnimation {Boolean} - set to true to disable animation
                     * - showClose {Boolean} - show close button, default true
                     * - closeByEscape {Boolean} - default true
                     * - closeByDocument {Boolean} - default true
                     * - preCloseCallback {String|Function} - user supplied function name/function called before closing dialog (if set)
                     *
                     * @return {Object} dialog
                     */
                    open: function (opts) {
                        var options = angular.copy(defaults);
                        var localID = ++globalID;
                        var dialogID = 'ngdialog' + localID;
                        openIdStack.push(dialogID);

                        opts = opts || {};
                        angular.extend(options, opts);

                        var defer;
                        defers[dialogID] = defer = $q.defer();

                        var scope;
                        scopes[dialogID] = scope = angular.isObject(options.scope) ? options.scope.$new() : $rootScope.$new();

                        var $dialog, $dialogParent;

                        var resolve = angular.extend({}, options.resolve);

                        angular.forEach(resolve, function (value, key) {
                            resolve[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
                        });

                        $q.all({
                            template: loadTemplate(options.template || options.templateUrl),
                            locals: $q.all(resolve)
                        }).then(function (setup) {
                            var template = setup.template,
                                locals = setup.locals;

                            if (options.showClose) {
                                template += '<div class="ngdialog-close"></div>';
                            }

                            $dialog = $el('<div id="ngdialog' + localID + '" class="ngdialog"></div>');
                            $dialog.html((options.overlay ?
                                '<div class="ngdialog-overlay"></div><div class="ngdialog-content" role="document">' + template + '</div>' :
                                '<div class="ngdialog-content" role="document">' + template + '</div>'));

                            $dialog.data('$ngDialogOptions', options);

                            scope.ngDialogId = dialogID;

                            if (options.data && angular.isString(options.data)) {
                                var firstLetter = options.data.replace(/^\s*/, '')[0];
                                scope.ngDialogData = (firstLetter === '{' || firstLetter === '[') ? angular.fromJson(options.data) : options.data;
                                scope.ngDialogData.ngDialogId = dialogID;
                            } else if (options.data && angular.isObject(options.data)) {
                                scope.ngDialogData = options.data;
                                scope.ngDialogData.ngDialogId = dialogID;
                            }

                            if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {

                                var label;

                                if (options.controllerAs && angular.isString(options.controllerAs)) {
                                    label = options.controllerAs;
                                }

                                var controllerInstance = $controller(options.controller, angular.extend(
                                    locals,
                                    {
                                        $scope: scope,
                                        $element: $dialog
                                    }),
                                    null,
                                    label
                                );
                                $dialog.data('$ngDialogControllerController', controllerInstance);
                            }

                            if (options.className) {
                                $dialog.addClass(options.className);
                            }

                            if (options.disableAnimation) {
                                $dialog.addClass(disabledAnimationClass);
                            }

                            if (options.appendTo && angular.isString(options.appendTo)) {
                                $dialogParent = angular.element(document.querySelector(options.appendTo));
                            } else {
                                $dialogParent = $elements.body;
                            }

                            privateMethods.applyAriaAttributes($dialog, options);

                            if (options.preCloseCallback) {
                                var preCloseCallback;

                                if (angular.isFunction(options.preCloseCallback)) {
                                    preCloseCallback = options.preCloseCallback;
                                } else if (angular.isString(options.preCloseCallback)) {
                                    if (scope) {
                                        if (angular.isFunction(scope[options.preCloseCallback])) {
                                            preCloseCallback = scope[options.preCloseCallback];
                                        } else if (scope.$parent && angular.isFunction(scope.$parent[options.preCloseCallback])) {
                                            preCloseCallback = scope.$parent[options.preCloseCallback];
                                        } else if ($rootScope && angular.isFunction($rootScope[options.preCloseCallback])) {
                                            preCloseCallback = $rootScope[options.preCloseCallback];
                                        }
                                    }
                                }

                                if (preCloseCallback) {
                                    $dialog.data('$ngDialogPreCloseCallback', preCloseCallback);
                                }
                            }

                            scope.closeThisDialog = function (value) {
                                privateMethods.closeDialog($dialog, value);
                            };

                            $timeout(function () {
                                var $activeDialogs = document.querySelectorAll('.ngdialog');
                                privateMethods.deactivateAll($activeDialogs);

                                $compile($dialog)(scope);
                                var widthDiffs = $window.innerWidth - $elements.body.prop('clientWidth');
                                $elements.html.addClass('ngdialog-open');
                                $elements.body.addClass('ngdialog-open');
                                var scrollBarWidth = widthDiffs - ($window.innerWidth - $elements.body.prop('clientWidth'));
                                if (scrollBarWidth > 0) {
                                    privateMethods.setBodyPadding(scrollBarWidth);
                                }
                                $dialogParent.append($dialog);

                                privateMethods.activate($dialog);

                                if (options.trapFocus) {
                                    privateMethods.autoFocus($dialog);
                                }

                                if (options.name) {
                                    $rootScope.$broadcast('ngDialog.opened', {dialog: $dialog, name: options.name});
                                } else {
                                    $rootScope.$broadcast('ngDialog.opened', $dialog);
                                }
                            });

                            if (!keydownIsBound) {
                                $elements.body.bind('keydown', privateMethods.onDocumentKeydown);
                                keydownIsBound = true;
                            }

                            if (options.closeByNavigation) {
                                var eventName = privateMethods.getRouterLocationEventName();
                                $rootScope.$on(eventName, function () {
                                    privateMethods.closeDialog($dialog);
                                });
                            }

                            if (options.preserveFocus) {
                                $dialog.data('$ngDialogPreviousFocus', document.activeElement);
                            }

                            closeByDocumentHandler = function (event) {
                                var isOverlay = options.closeByDocument ? $el(event.target).hasClass('ngdialog-overlay') : false;
                                var isCloseBtn = $el(event.target).hasClass('ngdialog-close');

                                if (isOverlay || isCloseBtn) {
                                    publicMethods.close($dialog.attr('id'), isCloseBtn ? '$closeButton' : '$document');
                                }
                            };

                            if (typeof $window.Hammer !== 'undefined') {
                                var hammerTime = scope.hammerTime = $window.Hammer($dialog[0]);
                                hammerTime.on('tap', closeByDocumentHandler);
                            } else {
                                $dialog.bind('click', closeByDocumentHandler);
                            }

                            dialogsCount += 1;

                            return publicMethods;
                        });

                        return {
                            id: dialogID,
                            closePromise: defer.promise,
                            close: function (value) {
                                privateMethods.closeDialog($dialog, value);
                            }
                        };

                        function loadTemplateUrl (tmpl, config) {
                            $rootScope.$broadcast('ngDialog.templateLoading', tmpl);
                            return $http.get(tmpl, (config || {})).then(function(res) {
                                $rootScope.$broadcast('ngDialog.templateLoaded', tmpl);
                                return res.data || '';
                            });
                        }

                        function loadTemplate (tmpl) {
                            if (!tmpl) {
                                return 'Empty template';
                            }

                            if (angular.isString(tmpl) && options.plain) {
                                return tmpl;
                            }

                            if (typeof options.cache === 'boolean' && !options.cache) {
                                return loadTemplateUrl(tmpl, {cache: false});
                            }

                            return loadTemplateUrl(tmpl, {cache: $templateCache});
                        }
                    },

                    /*
                     * @param {Object} options:
                     * - template {String} - id of ng-template, url for partial, plain string (if enabled)
                     * - plain {Boolean} - enable plain string templates, default false
                     * - name {String}
                     * - scope {Object}
                     * - controller {String}
                     * - controllerAs {String}
                     * - className {String} - dialog theme class
                     * - showClose {Boolean} - show close button, default true
                     * - closeByEscape {Boolean} - default false
                     * - closeByDocument {Boolean} - default false
                     * - preCloseCallback {String|Function} - user supplied function name/function called before closing dialog (if set); not called on confirm
                     *
                     * @return {Object} dialog
                     */
                    openConfirm: function (opts) {
                        var defer = $q.defer();

                        var options = {
                            closeByEscape: false,
                            closeByDocument: false
                        };
                        angular.extend(options, opts);

                        options.scope = angular.isObject(options.scope) ? options.scope.$new() : $rootScope.$new();
                        options.scope.confirm = function (value) {
                            defer.resolve(value);
                            var $dialog = $el(document.getElementById(openResult.id));
                            privateMethods.performCloseDialog($dialog, value);
                        };

                        var openResult = publicMethods.open(options);
                        openResult.closePromise.then(function (data) {
                            if (data) {
                                return defer.reject(data.value);
                            }
                            return defer.reject();
                        });

                        return defer.promise;
                    },

                    isOpen: function(id) {
                        var $dialog = $el(document.getElementById(id));
                        return $dialog.length > 0;
                    },

                    /*
                     * @param {String} id
                     * @return {Object} dialog
                     */
                    close: function (id, value) {
                        var $dialog = $el(document.getElementById(id));

                        if ($dialog.length) {
                            privateMethods.closeDialog($dialog, value);
                        } else {
                            if (id === '$escape') {
                                var topDialogId = openIdStack[openIdStack.length - 1];
                                $dialog = $el(document.getElementById(topDialogId));
                                if ($dialog.data('$ngDialogOptions').closeByEscape) {
                                    privateMethods.closeDialog($dialog, value);
                                }
                            } else {
                                publicMethods.closeAll(value);
                            }
                        }

                        return publicMethods;
                    },

                    closeAll: function (value) {
                        var $all = document.querySelectorAll('.ngdialog');

                        // Reverse order to ensure focus restoration works as expected
                        for (var i = $all.length - 1; i >= 0; i--) {
                            var dialog = $all[i];
                            privateMethods.closeDialog($el(dialog), value);
                        }
                    },

                    getOpenDialogs: function() {
                        return openIdStack;
                    },

                    getDefaults: function () {
                        return defaults;
                    }
                };

                return publicMethods;
            }];
    });

    m.directive('ngDialog', ['ngDialog', function (ngDialog) {
        return {
            restrict: 'AE',
            scope: {
                ngDialogScope: '='
            },
            link: function (scope, elem, attrs) {
                elem.on('click', function (e) {
                    e.preventDefault();

                    var ngDialogScope = angular.isDefined(scope.ngDialogScope) ? scope.ngDialogScope : 'noScope';
                    angular.isDefined(attrs.ngDialogClosePrevious) && ngDialog.close(attrs.ngDialogClosePrevious);

                    var defaults = ngDialog.getDefaults();

                    ngDialog.open({
                        template: attrs.ngDialog,
                        className: attrs.ngDialogClass || defaults.className,
                        controller: attrs.ngDialogController,
                        controllerAs: attrs.ngDialogControllerAs,
                        bindToController: attrs.ngDialogBindToController,
                        scope: ngDialogScope,
                        data: attrs.ngDialogData,
                        showClose: attrs.ngDialogShowClose === 'false' ? false : (attrs.ngDialogShowClose === 'true' ? true : defaults.showClose),
                        closeByDocument: attrs.ngDialogCloseByDocument === 'false' ? false : (attrs.ngDialogCloseByDocument === 'true' ? true : defaults.closeByDocument),
                        closeByEscape: attrs.ngDialogCloseByEscape === 'false' ? false : (attrs.ngDialogCloseByEscape === 'true' ? true : defaults.closeByEscape),
                        overlay: attrs.ngDialogOverlay === 'false' ? false : (attrs.ngDialogOverlay === 'true' ? true : defaults.overlay),
                        preCloseCallback: attrs.ngDialogPreCloseCallback || defaults.preCloseCallback
                    });
                });
            }
        };
    }]);

    return m;
}));

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

/*登录*/
app.controller('LoginController', [
    '$scope', 
    'httpService', 
    '$filter',
    'Global',
    'LoginService',
    function (
        $scope, 
        httpService, 
        $filter, 
        Global,
        LoginService
    ) {
        Global.pageTitel("用户登录");
        LoginService.loginInit($scope);

        
        var isDenLuSubmin = true;
        var changePicEvent;

        $scope.LoginClick = function (clickName, tegForm) {
            httpService.queryPost($scope, $filter('交互接口对照表')('登录接口'), $scope.userLogin, function (data) {
                if (data.success) {
                    httpService.queryPost($scope, $filter('交互接口对照表')('Home主数据'), {}, function (data) {
                    if (data.success) {
                        LoginService.loginOk(data, $scope.backPath);
                    }
                });
                    

                } else {
                    LoginService.loginError($scope);
                };
            });
        };
    $scope.clickInput = function (type, event, isLogin, tegForm) {
        switch (type) {
            case 'changePic': $scope.userLogin.picCode = null; changePicEvent = event; LoginService.changeIMG(changePicEvent); break;
        };
    };

}])
/*注册*/
app.controller('RegisterController', [
    '$scope',
    'httpService',
    '$filter',
    'Global',
    'LoginService',

    function (
        $scope,
        httpService,
        $filter,
        Global,
        LoginService
    ) {
        Global.pageTitel("用户注册");
        var firGetCode = true;

        /*注册*/
        $scope.login = LoginService.getUrlParamet();
        $scope.Global = Global;

        $scope.isSubMin = true;
        $scope.isShowReferee = true;
        var isZhuCeSubmin = true;
        
        LoginService.changeIMG();
        
        $scope.onClickReferee = function () {
            if ($scope.isShowReferee) {
                $scope.isShowReferee = false;
            } else {
                $scope.isShowReferee = true;
            };
        };
        $scope.isGetVoice = false;
        var $userphone = $('#userphone'),
            $imgcode = $('#imgcode');

        $scope.clickInput = function (type, event, isLogin, tegForm, isvoice) {
            switch (type) {
                case 'changePic':
                    LoginService.changeIMG(event);
                    break;
                case 'phonecodeMSG':
                        if (!isvoice && parseInt($scope.nowTimer) > 0) { 
                            return;
                        }
                        $scope.isGetCode = true;
                        $scope.voiceRepeat = false;
                        $scope.isvoice = isvoice;
                        if ($scope.login.picCode && $scope.login.mobilephone){
                            $filter('60秒倒计时')($scope,60);
                            httpService.queryPost($scope, $filter('getUrl')('校验图片验证码'), {
                                picCode: $scope.login.picCode,
                                mobilephone: $scope.login.mobilephone,
                                type: isvoice + 1
                            }, function (data) {
                                if(!data.success){
                                    $scope.stop();
                                    $scope.login.picCode = '';
                                    LoginService.changeIMG();
                                };
                            });
                        };
                    break;
            };
        };
        /* 
            点击注册请求
        */
        $scope.LoginClick = function (clickName, tegForm) {
            console.log('login-clickName', clickName)
            httpService.queryPost($scope, $filter('getUrl')('立即注册'), $scope.login, function (data) {
                if (data.success) {
                    LoginService.registerOk(data);
                } else {
                    $scope.login.picCode = '';
                    $scope.login.smsCode = '';
                    LoginService.changeIMG();
                };
            });
        };

        /*
            焦点离开时向后台验证手机号合法性
        */
        $scope.blurID = function (code, tegForm) {
            if (!tegForm.mobilephone.$error.required && !tegForm.mobilephone.$error.minlength && !tegForm.mobilephone.$error.pattern) {
                httpService.post($scope, $filter('getUrl')('注册验证手机号'), {mobilephone:$scope.login.mobilephone}, function (data) {
                    $scope.exists = data.map.exists;
                });
            };
        };

        $scope.userOut = function (event) {
            $filter('清空缓存')();
            httpService.queryPost($scope, $filter('getUrl')('退出接口'), {}, '退出');
            $scope.hasLogin = false;
        };
    }
])

/*lee 修改用户密码*/
app.controller('resetPswCtrl', [
	'$rootScope',
	'$scope',
	'$filter',
	'resourceService',
	'Global',
	'LoginService',
	function(
		$rootScope,
		$scope,
		$filter,
		resourceService,
		Global,
		LoginService
	) {

	$scope.isRestPSWOne=true;
	$scope.isRestPSWTwo=false;
	$scope.isErrorPassWord=false;
	$scope.disabledPhoneBtn = true;
	$scope.isSubMin=true;
	$scope.smsFrom={};
	$scope.passwd={};
	$scope.bool=true;
	Global.pageTitel("密码重置");
	$scope.$on('resourceService.QUERY_POST_MYEVENT', function(event,data,type) {
		if (type.name == '手机验证') {
			if(data.success){
				if (type.isvoice) {
					$scope.isGetVoice = true;
				} else {
					$scope.isGetVoice = false;
				}
				if (parseInt(type.nowTimer) <= 0 || type.nowTimer == undefined || type.nowTimer == '') {
					$filter('60秒倒计时')($scope,60);
				}
			}else{
				$scope.bool=false;
				// $scope.stop();
				subform.phone.$error.serverError = true;
				if (data.errorCode == '8888') {
					$scope.voiceRepeat = true; 
				} else {
					$scope.serverErrorCode = data.errorCode;
				}
				$scope.isGetCode = false;
			}
		}
		switch(type){
			case "提交验证":
				if(data.success){
					$scope.isRestPSWOne=false;
					$scope.isRestPSWTwo = true;
				}else{
					subform.pcode.$error.serverError = true;
					// $scope.isSuccess = data.success;
				}
			break;
			case "提交密码":
				$scope.isRestPSWTwo = false;
				if(data.success){
					$scope.isupPswdok=true;
				}else{
					$scope.isupPswdError=true;
				}
				$filter('6秒倒计时自动跳转')($scope,6);
			break;
		};
	});
	var subform;
	$scope.isGetVoice = false;
	$scope.onClick = function(type,form,isvoice,event){
		switch(type) {
			case "checkPassWord":
				resourceService.queryPost($scope,$filter('交互接口对照表')('修改用户密码-提交密码'),$scope.passwd,'提交密码');
			break;
			case "next":
				subform = form;
				resourceService.queryPost($scope,$filter('交互接口对照表')('修改用户密码-提交手机验证'),$scope.smsFrom,'提交验证');
			break;
			case "获取验证码":
				if(!$scope.nowTimer&&$scope.bool){
					$scope.bool=false;
					$scope.disabledPhoneBtn = true;
					if (!form.phone.$dirty) {
						$('.phone-box input').focus();
						$scope.bool=true;

					}
					if($scope.isSubMin && form.phone.$valid == false && form.phone.$dirty){
						if (!isvoice && parseInt($scope.nowTimer) > 0) {
							return;
						}
						var $this = $(event.currentTarget);
						if ($this.hasClass('getcode-disabled')) {
							return;
						}
						$scope.isGetCode = true;
						$scope.voiceRepeat = false;
						$scope.isvoice = isvoice;
						subform = form;
						$scope.smsFrom.type = isvoice + 1;
						resourceService.queryPost($scope,$filter('交互接口对照表')('修改用户密码-手机验证'),$scope.smsFrom,{name: '手机验证',isvoice: isvoice,nowTimer: $scope.nowTimer});
					}
				}
			break;
			case "toLogin":
				$scope.stopTimerout();
				$filter('跳转页面')('denLu','main.home','dl');
			break;
		}
	}
}])