'use strict';

angular.
    module('todoCreate').
    component('todoCreate', {
        templateUrl: 'src/todo-create/todo-create.template.html',
        controller: ["$scope", function ($scope) {
            var ctrl = this;
            ctrl.$onInit = function(){
                console.log("hello")
            }
            ctrl.task = {};
            ctrl.users = {};
            ctrl.createTask = function () {
                console.log(ctrl.task)
            }
        }]
    });
