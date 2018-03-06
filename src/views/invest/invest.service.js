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