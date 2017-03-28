'use strict';

angular.
module('qbankApp').
run(['$rootScope', '$location', '$http', '$window', 'User', function($rootScope, $location, $http, $window, userService) {
    $rootScope.$on('$routeChangeStart', function(event, newUrl) {
        if (newUrl && newUrl.$$route && newUrl.$$route.requireAuth == false) {
            if (userService.getLoggedInUser()) {
                $location.path('/assignments');
            }
            //delete $http.defaults.headers.common.Authorization;
        }
        if (!userService.getLoggedInUser() && newUrl.$$route && newUrl.$$route.requireAuth) {
            $rootScope.login = false;
            userService.clearLoggedInUser();
            $location.url('/login' + "?goto=" + $location.url());
        } else {
            if (userService.getLoggedInUser()) {
                $rootScope.login = true;
            }
        }
    });
    $rootScope.$on('$routeChangeSuccess', function(event, newUrl) {
        if (newUrl && newUrl.$$route && !_.isEmpty(newUrl.$$route.allowedRoles)) {
            if ((_(newUrl.$$route.allowedRoles).difference(_.pluck(userService.getLoggedInUser().roles, 'name'))).length === newUrl.$$route.allowedRoles.length) {
                $location.path('/assignments');
            }
        }
    });
}]).config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        var requireAuthResolves = {
            m: function(User) {
                return User.getLoggedInUserInfo();
            },
            n: function(Notification) {
                return Notification.getNotificationsInfo();
            }
        };
        var requireNoAuthResolves = {
            m: function(Configuration) {
                return Configuration.getConfigInfo();
            }
        };
        $locationProvider.hashPrefix('!');
        $routeProvider.
        when('/questions', {
            template: '<qb-question></qb-question>',
            requireAuth: true,
            allowedRoles: ["Admin", "Author", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/users', {
            template: '<qb-user-directory></qb-user-directory>',
            requireAuth: true,
            allowedRoles: ["Admin"],
            resolve: requireAuthResolves
        }).
        when('/reports', {
            template: '<qb-reports></qb-reports>',
            requireAuth: true,
            allowedRoles: ["Admin", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/users/:tab/:id', {
            template: '<qb-user-profile></qb-user-profile>',
            requireAuth: true,
            allowedRoles: ["Admin"],
            resolve: requireAuthResolves
        }).
        when('/question-import', {
            template: '<qb-question-import></qb-question-import>',
            requireAuth: true,
            allowedRoles: ["Admin", "Author", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/question-edit/:id?', {
            template: '<qb-question-edit></qb-question-edit>',
            requireAuth: true,
            allowedRoles: ["Admin", "Author", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/question-create/assignments/:assignmentId', {
            template: '<qb-question-create></qb-question-create>',
            requireAuth: true,
            allowedRoles: ["Admin", "Author", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/question/create', {
            template: '<qb-question-create></qb-question-create>',
            requireAuth: true,
            allowedRoles: ["Admin", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/question-history/:id', {
            template: '<qb-question-history></qb-question-history>',
            requireAuth: true,
            allowedRoles: ["Admin", "Author", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/question-revision/:id', {
            template: '<qb-question-revision></qb-question-revision>',
            requireAuth: true,
            allowedRoles: ["Admin", "Author", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/question-revision/question-revision-view/:versionId', {
            template: '<qb-question-revision-view></qb-question-revision-view>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/banks/', {
            template: '<qb-banks-screen></qb-banks-screen>',
            requireAuth: true,
            allowedRoles: ["Admin", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/banks/create/', {
            template: '<qb-bank-create></qb-bank-create>',
            requireAuth: true,
            allowedRoles: ["Admin", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/banks/details/:id', {
            template: '<qb-bank-edit></qb-bank-edit>',
            requireAuth: true,
            allowedRoles: ["Admin", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/assignments/create/:id?', {
            template: '<qb-assignment-create></qb-assignment-create>',
            requireAuth: true,
            allowedRoles: ["Admin", "Editor"],
            resolve: requireAuthResolves
        }).
        when('/assignments/', {
            template: '<qb-assignments></qb-assignments>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/assignment/:id/:tab/', {
            template: '<qb-assignments></qb-assignments>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/login', {
            template: '<qb-login></qb-login>',
            requireAuth: false,
            resolve: requireNoAuthResolves
        }).
        when('/assignment-history/:id', {
            template: '<qb-assignment-history></qb-assignment-history>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/assignment-reviewmine', {
            template: '<qb-assignment-reviewmine></qb-assignment-reviewmine>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/users-create/', {
            template: '<qb-user-profile-create></qb-user-profile-create>',
            requireAuth: true,
            allowedRoles: ["Admin"],
            resolve: requireAuthResolves
        }).
        when('/users-edit/:id', {
            template: '<qb-user-profile-create></qb-user-profile-create>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/:ref/question/preview/:id', {
            template: '<qb-question-preview></qb-question-preview>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/user-guide', {
            template: '<qb-user-guide></qb-user-guide>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/assignments/revision/create/:id?', {
            template: '<qb-assignment-revision-create></qb-assignment-revision-create>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/reset-password/:aid', {
            template: '<qb-reset-password></qb-reset-password>',
            requireAuth: false,
            resolve: requireNoAuthResolves
        }).
        when('/change-password/', {
            template: '<qb-change-password></qb-change-password>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).
        when('/forgot-password/', {
            template: '<qb-forgot-password></qb-forgot-password>',
            requireAuth: false,
            resolve: requireNoAuthResolves
        }).otherwise('/assignments');
    }
]).factory('httpRequestInterceptor', ["$q", "$rootScope", "$location", "$injector",
    function($q, $rootScope, $location, $injector) {
        return {
            request: function(config) {
                let userService = $injector.get("User");
                if (userService.getLoggedInUser()) {
                    //                    if (config.method === "POST") {
                    //                        config.headers['Content-Type'] = 'application/json; charset=UTF-8';
                    //                    }
                    config.headers['Authorization'] = 'Bearer ' + userService.getLoggedInUser().jwt;
                } else {
                    console.log("jwt not set");
                }

                return config;
            }
        };
    }
]);
