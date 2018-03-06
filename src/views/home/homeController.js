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