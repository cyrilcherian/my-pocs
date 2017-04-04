'use strict';

angular.
    module('todoEdit').
    component('todoEdit', {
        templateUrl: 'src/todo-edit/todo-edit.template.html',
        controller: ["$scope", "$location", "$routeParams", "User", "Task", function ($scope, $location, $routeParams, User, Task) {
            var ctrl = this;
            ctrl.task = {};
            ctrl.users = [];
            ctrl.$onInit = function(){
                User.getAll().then((data)=>{
                    $scope.$apply(()=>{
                        ctrl.users = data;
                    });
                });
                Task.get($routeParams.id).then((data)=>{
                    $scope.$apply(()=>{
                        ctrl.task = data;
                        ctrl.selected = data.user_id + "";
                    });
                });
                
            }
            
            ctrl.editTask = function () {
                ctrl.task.user_id = parseInt(ctrl.selected);
                $location.path( "/todo-list");
            }
        }]
    });
