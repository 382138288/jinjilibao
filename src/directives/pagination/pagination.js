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