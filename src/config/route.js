app
    .run(function ($rootScope, $location, $localStorage, $transitions, $templateCache, $filter, resourceService) {

        $rootScope.version = '1.0.0';
        /* 
            处理超时
        */
        $rootScope.$on('LOGIN_DEL_X-REQU', function () {
            delete $http.defaults.headers.common['X-Requested-With'];
        });
        $rootScope.$on('LOGIN_OUT', function (event, url) {
            delete $localStorage.user;
            $templateCache.remove(url);
            resourceService.queryPost($rootScope, $filter('交互接口对照表')('退出接口'), {}, '退出');
            if ($localStorage.pathUrl != undefined) {
                var pth = $localStorage.pathUrl.replace('/', '').replace('mainmyAccount', 'main.myAccount.')
            } else {
                $localStorage.pathUrl = pth = 'main.home';
            }
            if (pth.indexOf('main.myAccount')) {
                $filter("跳转页面")('denLu', $localStorage.pathUrl, $localStorage.pathUrl);
            } else if (pth.indexOf('main.newDetail')) {
            } else if (pth.indexOf('newFriend')) {
            } else {
                $filter("跳转页面")('denLu', $localStorage.pathUrl, 'dl');
            }

            $rootScope.maskHidde = false;
        });

        $rootScope.maskHidde = 0;
        $transitions.onSuccess({ }, function(){
            $('html').scrollTop(0);
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        //用于改变state时跳至顶部
        // $uiViewScrollProvider.userAnchorScroll();
        $httpProvider.interceptors.push('httpInterceptor');
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