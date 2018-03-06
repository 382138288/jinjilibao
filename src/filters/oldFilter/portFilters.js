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

