'use strict';

angular.
    module('qbTab').
    component('qbTab', {
        templateUrl: 'app/minified/qb-tab/qb-tab.template.html',
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
