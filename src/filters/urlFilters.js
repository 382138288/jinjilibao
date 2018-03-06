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