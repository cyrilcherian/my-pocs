'use strict';

angular.
    module('todoList').
    component('todoList', {
        templateUrl: 'src/todo-list/todo-list.component.html',
        controller: ["$scope", "$location", "User", "Task", function ($scope, $location,User, Task) {
            var ctrl = this;
            ctrl.tasks = [];
            ctrl.users = [];
            ctrl.$onInit = function(){
                User.getAll().then((data)=>{
                    $scope.$apply(()=>{
                        ctrl.users = data;
                        ctrl.selected = "";
                    });
                });
                Task.getAll().then((data)=>{
                    $scope.$apply(()=>{
                        ctrl.tasks = data;
                        console.log(data)
                    });
                });
                
            }
            ctrl.userChange = function () {
                Task.getAll().then((data)=>{
                    $scope.$apply(()=>{
                        ctrl.tasks = data.filter((d)=>d.user_id==parseInt(ctrl.selected));
                    });
                });
            }
            ctrl.addTask = function() {
                $location.path( "/todo-create" );
            }
            ctrl.editTask = function(id) {
                $location.path( "/todo-edit/" + id );
            }

        }]
    });
