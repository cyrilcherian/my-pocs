var app = angular.module('todoApp');

app.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
    /*.when('/todo-list', {
      template: '<todo-list></todo-list>'
    })
    .when('/todo-edit/:id', {
      template: '<todo-edit></todo-edit>'
    })*/
    .when('/todo-create', {
      template: '<todo-create></todo-create>'
    }).otherwise('/todo-create');
  }]);