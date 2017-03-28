'use strict';

angular.
    module('qbTabs').
    component('qbTabs', {
        templateUrl: 'app/minified/qb-tabs/qb-tabs.template.html',
        bindings: {
        },
        controller: ["$scope", "$routeParams",
            function($mdDialog, $scope, $routeParams) {
                var ctrl = this;
                ctrl.$onInit = function() {
                };
            }
        ]
    });
