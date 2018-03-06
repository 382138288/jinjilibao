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