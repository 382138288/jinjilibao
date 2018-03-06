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