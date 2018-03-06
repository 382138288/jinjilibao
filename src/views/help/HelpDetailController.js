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