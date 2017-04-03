'use strict';

angular.
    module('todoCreate').
    component('todoCreate', {
        templateUrl: 'src/todo-create/todo-create.template.html',
        controller: ["$scope", "User", "Task", function ($scope, User, Task) {
            var ctrl = this;
            ctrl.$onInit = function(){
                User.getAll().then((data)=>{
                    $scope.$apply(()=>{
                        ctrl.users = data;
                        ctrl.selected = data[0].id + "";
                        console.log(ctrl.selected.id)
                    });
                });
            }
            ctrl.task = {};
            ctrl.users = [];
            
            ctrl.createTask = function () {
                ctrl.task.user_id = parseInt(ctrl.selected);
            }
        }]
    });
