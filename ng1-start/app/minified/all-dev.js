'use strict';

// Define the `QuestionBank app` module

angular.module('qbankApp', ['ngAnimate', 'ngRoute', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'ngMessages', 'ui.tinymce', 'truncate', 'angular-md5', 'jkAngularCarousel', 'core', 'qbQuestion', 'qbBanksScreen', 'qbUserDirectory', 'qbUserProfile', 'qbTopics', 'qbTopicSections', 'qbQuestionImport', 'qbLogin', 'qbLogout', 'qbResetPassword', 'qbAssignmentSubmissions', 'qbAssignmentReviewmine', 'qbQuestionPreview', 'qbNotificationBar', 'qbAssignmentCreate', 'qbReports']);
'use strict';

angular.module('qbankApp').run(['$rootScope', '$location', '$http', '$window', 'User', function ($rootScope, $location, $http, $window, userService) {
    $rootScope.$on('$routeChangeStart', function (event, newUrl) {
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
    $rootScope.$on('$routeChangeSuccess', function (event, newUrl) {
        if (newUrl && newUrl.$$route && !_.isEmpty(newUrl.$$route.allowedRoles)) {
            if (_(newUrl.$$route.allowedRoles).difference(_.pluck(userService.getLoggedInUser().roles, 'name')).length === newUrl.$$route.allowedRoles.length) {
                $location.path('/assignments');
            }
        }
    });
}]).config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    var SSO = "@SSO@" == "true";
    var requireAuthResolves = {
        m: function m(User) {
            return User.getLoggedInUserInfo();
        },
        n: function n(Notification) {
            return Notification.getNotificationsInfo();
        }
    };
    var requireNoAuthResolves = {
        m: function m(Configuration) {
            return Configuration.getConfigInfo();
        }
    };
    if (SSO) {
        requireAuthResolves = {
            m: function m(User) {
                return User.getSSOUserInfo();
            }
        };
        requireNoAuthResolves = {
            m: function m(User) {
                return User.getSSOUserInfo();
            }
        };
    }
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/questions', {
        template: '<qb-question></qb-question>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: requireAuthResolves
    }).when('/users', {
        template: '<qb-user-directory></qb-user-directory>',
        requireAuth: true,
        allowedRoles: ["Admin"],
        resolve: requireAuthResolves
    }).when('/reports', {
        template: '<qb-reports></qb-reports>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: requireAuthResolves
    }).when('/users/:tab/:id', {
        template: '<qb-user-profile></qb-user-profile>',
        requireAuth: true,
        allowedRoles: ["Admin"],
        resolve: requireAuthResolves
    }).when('/question-import', {
        template: '<qb-question-import></qb-question-import>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: requireAuthResolves
    }).when('/question-edit/:id?', {
        template: '<qb-question-edit></qb-question-edit>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: requireAuthResolves
    }).when('/question-create/assignments/:assignmentId', {
        template: '<qb-question-create></qb-question-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: requireAuthResolves
    }).when('/question/create', {
        template: '<qb-question-create></qb-question-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: requireAuthResolves
    }).when('/question-history/:id', {
        template: '<qb-question-history></qb-question-history>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: requireAuthResolves
    }).when('/question-revision/:id', {
        template: '<qb-question-revision></qb-question-revision>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: requireAuthResolves
    }).when('/question-revision/question-revision-view/:versionId', {
        template: '<qb-question-revision-view></qb-question-revision-view>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/topics', {
        template: '<qb-topics></qb-topics>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/topic/:section/:id', {
        template: '<qb-topic-sections></qb-topic-sections>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/banks/', {
        template: '<qb-banks-screen></qb-banks-screen>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: requireAuthResolves
    }).when('/banks/create/', {
        template: '<qb-bank-create></qb-bank-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: requireAuthResolves
    }).when('/banks/details/:id', {
        template: '<qb-bank-edit></qb-bank-edit>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: requireAuthResolves
    }).when('/assignments/create/:id?', {
        template: '<qb-assignment-create></qb-assignment-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: requireAuthResolves
    }).when('/assignments/', {
        template: '<qb-assignments></qb-assignments>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/assignment/:id/:tab/', {
        template: '<qb-assignments></qb-assignments>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/login', {
        template: '<qb-login></qb-login>',
        requireAuth: false,
        resolve: requireNoAuthResolves
    }).when('/assignment-history/:id', {
        template: '<qb-assignment-history></qb-assignment-history>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/assignment-reviewmine', {
        template: '<qb-assignment-reviewmine></qb-assignment-reviewmine>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/users-create/', {
        template: '<qb-user-profile-create></qb-user-profile-create>',
        requireAuth: true,
        allowedRoles: ["Admin"],
        resolve: requireAuthResolves
    }).when('/users-edit/:id', {
        template: '<qb-user-profile-create></qb-user-profile-create>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/:ref/question/preview/:id', {
        template: '<qb-question-preview></qb-question-preview>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/user-guide', {
        template: '<qb-user-guide></qb-user-guide>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).when('/assignments/revision/create/:id?', {
        template: '<qb-assignment-revision-create></qb-assignment-revision-create>',
        requireAuth: true,
        resolve: requireAuthResolves
    }).otherwise('/assignments');
    if (!SSO) {
        $routeProvider.when('/reset-password/:aid', {
            template: '<qb-reset-password></qb-reset-password>',
            requireAuth: false,
            resolve: requireNoAuthResolves
        }).when('/change-password/', {
            template: '<qb-change-password></qb-change-password>',
            requireAuth: true,
            resolve: requireAuthResolves
        }).when('/forgot-password/', {
            template: '<qb-forgot-password></qb-forgot-password>',
            requireAuth: false,
            resolve: requireNoAuthResolves
        });
    }
}]).factory('httpRequestInterceptor', ["$q", "$rootScope", "$location", "$injector", function ($q, $rootScope, $location, $injector) {
    return {
        request: function request(config) {
            var userService = $injector.get("User");
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
}]).factory("HttpErrorInterceptorModule", ["$q", "$rootScope", "$location", "$injector", function ($q, $rootScope, $location, $injector) {
    $rootScope.calls = [];
    $rootScope.firstLogin = true;
    return {
        request: function request(config) {
            $rootScope.calls.push(config);
            return config || $q.when(config);
        },
        requestError: function requestError(request) {
            $rootScope.calls.pop();
            return $q.reject(request);
        },
        response: function response(_response) {
            $rootScope.calls.pop();
            return _response || $q.when(_response);
        },
        responseError: function responseError(response) {
            $rootScope.calls.pop();
            if (response && response.status === 401) {
                localStorage.removeItem("astutech");
                $rootScope.user = undefined;
                $location.path('/login');
            }
            if (response && response.status === 500) {
                var toast = $injector.get('$mdToast');
                toast.show(toast.simple().textContent('Server Failure').parent(document.body).hideDelay(1000).position('top right'));
            }
            if (response && response.status === 403) {
                $location.path('/login');
            }
            if (response && response.status === 400) {
                $location.path('/login');
                var toast = $injector.get('$mdToast');
                toast.show(toast.simple().textContent(response.data.message).parent(document.body).hideDelay(1000).position('top right'));
            }

            return $q.reject(response);
        }
    };
}]).config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("HttpErrorInterceptorModule");
    $httpProvider.interceptors.push('httpRequestInterceptor');
}]);
'use strict';

// Define the `core` module

angular.module('core', ['core.role', 'core.user', 'core.question', 'core.notifier', 'core.tag', 'core.version', 'core.media', 'core.assignment-orchestrator', 'core.bank', 'core.comment', 'core.review', 'core.constants', 'core.util', 'core.logging', 'core.configuration', 'core.filter', 'core.report', 'core.notification', 'core.state']);
'use strict';

angular.module('core.notifier', []);
'use strict';

angular.module('core.notifier').factory('Notifier', ['$rootScope', function ($rootScope) {
    function subscribe(scope, eventName, callback) {
        var handler = $rootScope.$on(eventName, callback);
        scope.$on('$destroy', handler);
    }
    function notify(eventName, data) {
        $rootScope.$emit(eventName, data);
    }
    return {
        subscribe: subscribe,
        notify: notify
    };
}]);
'use strict';

angular.module('core.comment', ['ngResource']);
'use strict';

angular.module('core.comment').factory('Comment', ['$http', '$resource', function ($http, $resource) {
    return {
        addComment: addComment,
        getComments: getComments
    };

    function addComment(comment) {
        return $http({
            method: "POST",
            url: COMMENT_ORCHESTRATOR_URL + "for/" + comment.ownerId,
            data: comment
        });
    };
    function getComments(parentId) {
        return $http({
            method: "GET",
            url: COMMENT_ORCHESTRATOR_URL + "for/" + parentId
        });
    };
}]);
'use strict';

angular.module('core.configuration', ['ngResource']);
'use strict';

angular.module('core.configuration').factory('Configuration', ['$q', '$http', '$resource', function ($q, $http, $resource) {
    var me = {
        loadConfig: loadConfig,
        getConfigInfo: getConfigInfo,
        getConfig: getConfig
    };
    return me;

    function getConfig() {
        return me.config;
    };

    function loadConfig() {
        return $http({
            method: "GET",
            url: CONFIGURATION_URL
        });
    };

    function getConfigInfo() {
        var defer = $q.defer();
        loadConfig().then(function (response) {
            me.config = response.data.data;
            defer.resolve(response);
        });
        return defer.promise;
    }
}]);
'use strict';

angular.module('core.constants', ['ngResource']);
'use strict';

angular.module('core.constants').constant("APP_CONSTANTS", {
    "YOUTUBE_PREFIX": "https://www.youtube.com/embed/",
    "CAROUSEL_IMG_PREFIX": "app/resources/images/"
}).constant("QB_ASSIGNMENT_KIND", {
    "QUESTION_CREATE": "QuestionCreation",
    "QUESTION_REVIEW": "Review",
    "QUESTION_REVISION": "QuestionRevision"
}).constant("QB_QUESTION", {
    "DONE": "Done",
    "DRAFT": "Draft",
    "SUBMITTED": "Submitted",
    "EDITORIAL": "Editorial",
    "INREVIEW": "InReview",
    "APPROVED": "Approved",
    "ARCHIVED": "Archived",
    "REJECTED": "Rejected"
}).constant("QB_ASSIGNMENT", {
    "DRAFT": "Draft",
    "OPEN": "Open",
    "COMPLETE": "Complete",
    "ARCHIVED": "Archived"
}).constant("QB_USER", {
    "ACTIVE": "Active",
    "INACTIVE": "Inactive"
}).constant("QB_QUESTION_TYPE", {
    "SINGLECHOICE": "singleResponse",
    "MULTIPLECHOICE": "multipleResponse",
    "SHORTANSWER": "shortText",
    "ESSAY": "longText",
    "NAME": {
        "SINGLECHOICE": "Single Choice",
        "MULTIPLECHOICE": "Multiple Choice",
        "SHORTANSWER": "Short Answer",
        "ESSAY": "Essay"
    }
}).constant("QB_ASSIGNEE", {
    "DRAFT": "Draft",
    "SUBMITTED": "Submitted",
    "COMPLETE": "Complete"
}).constant("QB_NOTIFICATION", {
    "ACTION": {
        "ASSIGNED": "assigned",
        "SUBMITTED": "submitted",
        "RECALLED": "recalled",
        "RETURNED": "returned",
        "MARKED_COMPLETE": "marked_complete",
        "COMPLETED": "completed"
    },
    "NOTIFICATION_TYPE": {
        "ASSIGNMENT": "assignment"
    }
}).constant("QB_USER_ROLES", {
    "AUTHOR": "Author",
    "EDITOR": "Editor",
    "ADMIN": "Admin",
    "REVIEWER": "Reviewer"
});
'use strict';

angular.module('core.review', ['ngResource']);
'use strict';

angular.module('core.review').factory('Review', ['$http', '$resource', function ($http, $resource) {
    return {
        addReview: addReview,
        getReviews: getReviews,
        getMyReviews: getMyReviews,
        getMyQuestionnaire: getMyQuestionnaire,
        getReviewsFor: getReviewsFor
    };

    function addReview(review) {
        return $http({
            method: "POST",
            url: REVIEW_URL + "for/" + review.ownerId,
            data: review
        });
    };

    function getReviews(ids, parentId) {
        return $http({
            method: "POST",
            url: REVIEW_URL + "for/user/" + parentId,
            data: ids
        });
    };

    function getMyReviews(ids) {
        return $http({
            method: "POST",
            url: REVIEW_URL + "for/me/",
            data: ids
        });
    };

    function getMyQuestionnaire() {
        return $http({
            method: "GET",
            url: REVIEW_URL + "questionnaire",
            cache: true
        });
    };

    function getReviewsFor(id) {
        return $http({
            method: "GET",
            url: REVIEW_URL + "for/" + id
        });
    };
}]);
'use strict';

angular.module('core.assignment-orchestrator', ['ngResource']);
'use strict';

angular.module('core.assignment-orchestrator').factory('Assignment', ['$http', '$resource', '$filter', function ($http, $resource, $filter) {
    return {
        assignmentOwn: assignmentOwn,
        reviewerUserList: reviewerUserList,
        allUserList: allUserList,
        authorUserList: authorUserList,
        createdByMe: createdByMe,
        assignmentCompleted: getCompletedAssignments,
        turnIn: turnIn,
        questionsInDone: questionsInDone,
        createAssignment: createAssignment,
        getAssignment: getAssignment,
        updateAssignment: updateAssignment,
        saveItems: saveItems,
        completeAssignment: completeAssignment,
        getSavedItems: getSavedItems,
        returnAssignment: returnAssignment,
        completeForAssignee: completeForAssignee,
        questionsInEditorial: questionsInEditorial,
        getAssignmentReviews: getAssignmentReviews,
        setAssignmentData: setAssignmentData,
        getAssignmentData: getAssignmentData,
        getAllAssignments: getAllAssignments,
        createdByOthers: createdByOthers,
        assignmentSubmitted: assignmentSubmitted,
        association: association,
        adminUserList: adminUserList,
        editorUserList: editorUserList,
        searchCustomId: searchCustomId,
        filter: filter
    };

    function questionsInDone(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "done-questions",
            params: params
        });
    }

    function questionsInEditorial(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "editorial-questions",
            params: params
        });
    }

    function createdByMe(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "created-by-me",
            params: params
        });
    }

    function createdByOthers(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "created-by-others",
            params: params
        });
    }

    function getCompletedAssignments(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "assignment-completed",
            params: params
        });
    }

    function assignmentOwn(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "own",
            params: params
        });
    }

    function saveItems(id, items) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "save/" + id,
            data: items
        });
    }

    function reviewerUserList(params, name) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "user-filter",
            params: params,
            data: {
                "roles": [{
                    "name": "Reviewer"
                }],
                "name": name
            }
        });
    }

    function allUserList(params, rolesArray) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "user-filter",
            params: params,
            data: {
                "roles": rolesArray || []
            }
        });
    }

    function authorUserList(params, name) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "user-filter",
            params: params,
            data: {
                "roles": [{
                    "name": "Author"
                }],
                "name": name
            }
        });
    }
    function adminUserList(params, name) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "user-filter",
            params: params,
            data: {
                "roles": [{
                    "name": "Admin"
                }],
                "name": name || ""
            }
        });
    }
    function editorUserList(params, name) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "user-filter",
            params: params,
            data: {
                "roles": [{
                    "name": "Editor"
                }],
                "name": name || ""
            }
        });
    }
    function turnIn(assignmentId) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "turnIn" + "/" + assignmentId
        });
    }

    function createAssignment(assignment) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL,
            data: assignment
        });
    }

    function updateAssignment(assignment) {
        return $http({
            method: "PUT",
            url: ASSIGNMENT_ORCHESTRATOR_URL,
            data: assignment
        });
    }

    function getAssignment(id) {
        return $http.get(ASSIGNMENT_ORCHESTRATOR_URL + id);
    }

    function completeAssignment(id) {
        return $http.put(ASSIGNMENT_ORCHESTRATOR_URL + 'completed/' + id);
    }

    function getSavedItems(id) {
        return $http.get(ASSIGNMENT_ORCHESTRATOR_URL + 'all-items/' + id);
    }

    function returnAssignment(assignmentId, user_id) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "return-assignment" + "/" + assignmentId + "/user/" + user_id
        });
    }

    function completeForAssignee(assignmentId, user_id) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "complete-for-assignee" + "/" + assignmentId + "/user/" + user_id
        });
    }

    function getAssignmentReviews(assignmentId) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "my-reviews/for/" + assignmentId
        });
    }

    function setAssignmentData(assignment) {
        fctr.assignment = assignment || {
            assignees: [],
            items: []
        };
    }

    function getAssignmentData() {
        return fctr.assignment;
    }

    function getAllAssignments(query) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "all-created-by-me/",
            params: query
        });
    }

    function assignmentSubmitted(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "assignment-submitted",
            params: params
        });
    }
    function searchCustomId(params) {
        return $http({
            method: "GET",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "search-custom-id",
            params: params
        });
    }
    function filter(params, filter) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "search",
            data: filter,
            params: params
        });
    }

    function association(items, customId) {
        var ids = _.pluck(items, "id");
        if (_.isEmpty(ids)) {
            return;
        }
        $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "association",
            data: ids
        }).then(function (response) {
            items.forEach(function (item) {
                var ob = _.find(response.data.data, {
                    "questionId": item.id
                });
                if (ob) {
                    var assignment = _.last($filter('orderBy')(ob.assignments, 'creationDate'));
                    if (assignment) {
                        item.linkedAssignment = {
                            id: assignment.id,
                            customId: assignment.customId
                        };
                    }
                    if (customId && assignment.customId == customId) {
                        delete item.linkedAssignment;
                    }
                }
            });
        });
    }
}]);
'use strict';

angular.module('core.question', ['ngResource']);
'use strict';

angular.module('core.question').factory('Question', ['$http', '$resource', function ($http, $resource) {
    return {
        questionList: questionList,
        questionOwnList: questionOwnList,
        questionCreate: questionCreate,
        questionGet: questionGet,
        questionEdit: questionEdit,
        customIdExists: customIdExists,
        approve: approve,
        review: review,
        disapprove: disapprove,
        getAllQuestions: getAllQuestions,
        searchQuestionByCustomId: searchQuestionByCustomId,
        searchQuestions: searchQuestions,
        filterOrQuestionList: filterOrQuestionList
    };

    function questionGet(id) {
        return $http.get(QUESTION_ORCHESTRATOR_URL + id);
    }

    function questionList(params, payload) {
        return $http({
            method: "POST",
            url: QUESTION_ORCHESTRATOR_URL + "filter",
            data: payload,
            params: params
        });
    }
    function filterOrQuestionList(params, payload) {
        return $http({
            method: "POST",
            url: QUESTION_ORCHESTRATOR_URL + "filter?or=1",
            data: payload,
            params: params
        });
    }

    function questionOwnList(params, payload) {
        return $http({
            method: "POST",
            url: QUESTION_ORCHESTRATOR_URL + "own",
            data: payload,
            params: params
        });
    }

    function questionEdit(question) {
        return $http.put(QUESTION_ORCHESTRATOR_URL, question);
    }

    function questionCreate(question) {
        return $http({
            method: 'POST',
            url: QUESTION_ORCHESTRATOR_URL,
            data: question,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    function customIdExists(query) {
        return $http({
            method: "GET",
            url: QUESTION_ORCHESTRATOR_URL + "exists",
            params: query
        });
    }

    function approve(items) {
        return $http({
            method: "PUT",
            url: QUESTION_ORCHESTRATOR_URL + "approve/",
            data: items
        });
    }

    function review(items) {
        return $http({
            method: "PUT",
            url: QUESTION_ORCHESTRATOR_URL + "review/",
            data: items
        });
    }

    function disapprove(items) {
        return $http({
            method: "PUT",
            url: QUESTION_ORCHESTRATOR_URL + "disapprove/",
            data: items
        });
    }
    function getAllQuestions(query) {
        return $http({
            method: "GET",
            url: QUESTION_ORCHESTRATOR_URL + "all-created-by-me/",
            params: query
        });
    }
    function searchQuestionByCustomId(customId) {
        return $http({
            method: "GET",
            url: QUESTION_ORCHESTRATOR_URL + "search-custom-id" + "?query=" + customId
        });
    }
    function searchQuestions(params, payload) {
        return $http({
            method: "POST",
            url: QUESTION_ORCHESTRATOR_URL + "search",
            data: payload,
            params: params
        });
    }
}]);
'use strict';

angular.module('core.util', ['ngResource']);
'use strict';

angular.module('core.util').factory('Util', ['$http', '$resource', '$window', '$routeParams', '$location', '$mdDialog', "Media", function ($http, $resource, $window, $routeParams, $location, $mdDialog, mediaService) {
    tinymce.PluginManager.add("qbimage", function (editor) {
        editor.addButton('qbimage', {
            tooltip: 'Add Image',
            classes: 'mce-ico mce-i-image',
            icon: 'image',
            onclick: function onclick(event) {
                var callback = function callback(url, obj) {
                    var im = '<img src="' + url + '" ng-src="' + url + '" alt="' + obj.alt + '" width="200" height="200">';
                    editor.insertContent(im);
                };
                var query = {
                    order: 'id',
                    limit: 25,
                    page: 1
                };
                mediaService.mediaList(query).then(function (response) {
                    var lib = response.data.data;
                    var total = response.data.count;
                    $mdDialog.show({
                        templateUrl: 'app/minified/qb-question-add-image/qb-question-add-image.template.html',
                        targetEvent: event,
                        controller: 'questionAddImageController',
                        controllerAs: '$ctrl',
                        bindToController: true,
                        skipHide: true,
                        locals: {
                            callback: callback,
                            lib: lib,
                            total: total
                        }
                    });
                });
            }
        });
    });
    tinymce.PluginManager.add("qbvideo", function (editor) {
        editor.addButton('qbvideo', {
            tooltip: 'Add Video',
            classes: 'mce-ico mce-i-media',
            icon: 'media',
            onclick: function onclick(event) {

                var callback = function callback(url, obj) {
                    var im = '<iframe width="560" height="315" src="' + url + '" ng-src="' + url + '" frameborder="0" allowfullscreen></iframe>';
                    editor.insertContent(im);
                };
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-question-add-video/qb-question-add-video.template.html',
                    targetEvent: event,
                    controller: 'questionAddVideoController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        video: {},
                        callback: callback
                    }
                });
            }
        });
    });
    return {
        back: back,
        tinyMceOptions: getTinyMceOptions(),
        pagination: getPaginationOptions(),
        mdAlert: mdAlert
    };

    function back() {
        $window.history.back();
    }

    function getTinyMceOptions() {
        return {
            setup: function setup(theEditor) {
                //adding the blur opens #QB-292
                /*theEditor.on('focus', function() {
                 $(this.contentAreaContainer.parentElement).find("div.mce-toolbar-grp").show();
                 }).on('blur', function(e) {
                 $(this.contentAreaContainer.parentElement).find("div.mce-toolbar-grp").hide();
                 }).on('init', function() {
                 $(this.contentAreaContainer.parentElement).find("div.mce-toolbar-grp").hide();
                 });*/
            },
            browser_spellcheck: true,
            menubar: false,
            toolbar: 'undo redo | bold italic | qbimage qbvideo',
            plugins: "autoresize spellchecker paste qbimage qbvideo",
            automatic_uploads: false,
            statusbar: false,
            paste_as_text: true
        };
    }

    function getPaginationOptions() {
        return {
            mdLimit: function mdLimit() {},
            mdLimitOptions: [5, 10, 15, 25, 50, 100],
            mdPage: 1,
            mdTotal: 0,
            mdPageSelect: 1,
            mdOnPaginate: function mdOnPaginate() {}
        };
    }

    function mdAlert(event, message, successCallback, finalCallback) {
        $mdDialog.show($mdDialog.alert().title(message).ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
            if (successCallback) {
                successCallback(event);
            }
        }).finally(function () {
            if (finalCallback) {
                finalCallback(event);
            }
        });
    }
}]);
'use strict';

angular.module('core.report', ['ngResource']);
'use strict';

angular.module('core.report').factory('Report', ['$http', '$resource', function ($http, $resource) {
    return {
        generateReport: generateReport
    };
    function generateReport(report) {
        return $http({
            method: "POST",
            url: REPORT_URL + "export?limit=-1",
            data: report
        });
    }
}]);
'use strict';

angular.module('core.bank', ['ngResource']);
'use strict';

angular.module('core.bank').factory('Bank', ['$http', '$resource', function ($http, $resource) {
    return {
        save: saveBank,
        update: updateBank,
        getBanks: getBanks,
        getBank: getBank,
        exportBank: exportBank,
        getAllBanks: getAllBanks,
        searchByCustomId: searchByCustomId,
        searchBanks: searchBanks,
        exportBankToCSV: exportBankToCSV
    };
    function saveBank(bank) {
        return $http({
            method: "POST",
            url: BANK_URL,
            data: bank
        });
    }
    function updateBank(bank) {
        return $http({
            method: "PUT",
            url: BANK_URL,
            data: bank
        });
    }
    function getBanks(params) {
        return $http({
            method: "GET",
            url: BANK_URL,
            params: params
        });
    }
    function searchBanks(params, payload) {
        return $http({
            method: "POST",
            url: BANK_URL + "search",
            data: payload,
            params: params
        });
    }
    function getBank(id) {
        return $http.get(BANK_URL + id);
    }
    function exportBank(id) {
        return $http({
            method: "GET",
            url: BANK_URL + "getxml/" + id
        });
    }
    function exportBankToCSV(id) {
        return $http({
            method: "GET",
            url: BANK_URL + "getCsv/" + id
        });
    }
    function getAllBanks(query) {
        return $http({
            method: "GET",
            url: BANK_URL + "all-created-by-me/",
            params: query
        });
    }
    function searchByCustomId(customId) {
        return $http({
            method: "GET",
            url: BANK_URL + "search-custom-id" + "?query=" + customId
        });
    }
}]);
'use strict';

angular.module('core.logging', ['ngResource']);
'use strict';

angular.module('core.logging').factory('Log', ['$http', '$resource', function ($http, $resource) {
    return {
        addLog: addLog,
        getLogs: getLogs,
        getUserActivity: getUserActivity
    };

    function addLog(logEntry) {
        return $http({
            method: "POST",
            url: LOGGING_URL,
            data: logEntry
        });
    };

    function getLogs(query) {
        return $http({
            method: "GET",
            url: LOGGING_URL,
            params: query
        });
    };
    function getUserActivity(userId) {
        return $http({
            method: "GET",
            url: LOGGING_URL + 'user-activity/' + userId
        });
    };
}]);
'use strict';

// Define the `qbQuestionTable` module

angular.module('qbQuestionTableInprogress', ['md.data.table', 'qbQuestionImport', 'qbQuestionCreate', 'qbQuestionEdit', 'qbTableSearchBar', 'qbQuestionEditDialog', 'qbAssignmentCreateDialog', 'qbQuestionManageQuestions']);
'use strict';

angular.module('qbQuestionTableInprogress').component('qbQuestionTableInprogress', {
    templateUrl: 'app/minified/qb-question-table-inprogress/qb-question-table-inprogress.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", "$location", "$route", "$routeParams", "Util", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $filter, $location, $route, $routeParams, util, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants, questionTypeConstants) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 10;
            ctrl.fields = [{
                field: "ID",
                key: "customId",
                selected: true,
                allow: ["Admin", "Author", "Editor"],
                make: ctrl.makeCustomID,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Stem",
                key: "stem",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Question",
                key: "question",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Created Date",
                key: "creationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Modified Date",
                key: "lastModificationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Topics",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeTopics,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Level",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeLevel,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Status",
                key: "status",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Review Count",
                key: "reviewCount",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "TimesUsed",
                key: "timesUsed",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Kind",
                key: "questionType",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeQuestionType,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Author",
                key: "author",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeAuthor,
                makeClass: ctrl.makeDefaultClass
            }];
            ctrl.sortFields = [{
                field: "Modified date",
                key: "lastModificationDate"
            }, {
                field: "ID",
                key: "customId"
            }, {
                field: "Stem",
                key: "stem"
            }];
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
            if (userService.isAdmin() || userService.isEditor()) {
                ctrl.sortFields.push({
                    field: "Status",
                    key: "status"
                }, {
                    field: "Review Count",
                    key: "reviewCount"
                });
            }
            ctrl.query = {
                size: 25,
                page: 1
            };

            var status = [questionConstants.SUBMITTED, questionConstants.EDITORIAL, questionConstants.INREVIEW];
            if (userService.isAuthor()) status = [questionConstants.DRAFT, questionConstants.SUBMITTED, questionConstants.EDITORIAL, questionConstants.INREVIEW, questionConstants.DONE];

            ctrl.filter = {
                statuses: status,
                sortBy: "lastModificationDate",
                order: ""
            };

            notifier.subscribe($scope, 'load-questions-inprogress', function (event, data) {
                ctrl.selected.length = 0;
                ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            });
            ctrl.canSeeEditAssignment = userService.isAdmin() || userService.isEditor();
            ctrl.previlege = util.getQuestionPrevileges;
            if (userService.isAdmin() || userService.isEditor()) {
                ctrl.questionTasks = [{
                    item: 'Add to Edit Assignment',
                    action: createRevisionAssignment
                }, {
                    item: 'Add to Review Assignment',
                    action: createReviewAssignment
                }];
            }
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.makeCustomID = function (question, field) {
            return $filter("numberFixedLen")(question.customId, 5);
        };
        ctrl.makeDefault = function (data, field) {
            return data[field.key];
        };
        ctrl.makeDefaultDate = function (data, field) {
            return $filter('date')(new Date(data[field.key]), 'MM/dd/yyyy').toUpperCase();
        };

        ctrl.makeDefaultClass = function (data, field) {
            return "";
        };
        ctrl.makeStemAndQuestion = function (data, field) {
            return $filter("htmlFilter")(data[field.key]);
        };
        ctrl.makeAuthor = function (question, field) {
            if (question.createdBy) {
                return question.createdBy.name;
            }
        };
        ctrl.allowField = function (field) {
            if (_(field.allow).difference(_.pluck(userService.getLoggedInUser().roles, 'name')).length === field.allow.length) {
                return false;
            }
            return true;
        };
        ctrl.makeTopics = function (data, field) {
            if (data.tags) {
                var topics = data.tags.filter(function (d) {
                    return d.taxonomy == "Topic";
                });
                return data.topics = topics.map(function (elem) {
                    return elem.name;
                }).join(", ");
            }
        };
        ctrl.makeLevel = function (data, field) {
            if (data.tags) {
                return data.level = data.tags.find(function (d) {
                    return d.taxonomy == "Level";
                }).name;
            }
        };
        ctrl.makeQuestionType = function (question, field) {
            if (question.sections) {
                var mainSection = question.sections.find(function (s) {
                    return ctrl.isMainSection(s);
                });
                if (mainSection) {
                    return mainSection.category;
                }
            }
        };

        ctrl.isMainSection = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE || section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                return true;
            }
            return false;
        };

        ctrl.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            boundaryLinks: false,
            decapitate: false,
            limitSelect: true,
            pageSelect: true
        };

        ctrl.selected = [];

        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            var filter = angular.copy(ctrl.filter);
            filter.sortBy = filter.order + filter.sortBy;
            questionService.searchQuestions(ctrl.query, filter).then(function (response) {
                ctrl.questionData = response.data.data;
                ctrl.total = response.data.count;
            });
        };
        ctrl.importQuestions = function (event, task) {
            if (task == "import") {
                $location.url('/question-import');
            }
            if (task == "create") {
                $location.url('/question-create');
            }
        };

        ctrl.loadEditQuestion = function (question, event) {
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question,
                    state: "Inprogress",
                    readOnly: true
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().split(/\s+/).length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };

        ctrl.menuItemClick = function (event, task) {
            ctrl.validQuestions = _.filter(ctrl.selected, function (question) {
                if (question.status === questionConstants.EDITORIAL) return question;
            });
            if (ctrl.selected.length > 0) {
                if (ctrl.validQuestions.length === 0) {
                    util.mdAlert(event, "Only Editorial Questions can be added");
                } else if (ctrl.validQuestions.length < ctrl.selected.length) {
                    util.mdAlert(event, "Only Editorial Questions can be added", task.action);
                } else {
                    task.action(event);
                }
            } else util.mdAlert(event, "Please select question(s).");
        };

        var createRevisionAssignment = function createRevisionAssignment(event) {
            if (ctrl.validQuestions.length > 0) var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: ctrl.validQuestions,
                    assignment: {
                        assignees: [],
                        items: ctrl.validQuestions,
                        kind: assignmentKindConstants.QUESTION_REVISION
                    }
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };

        var createReviewAssignment = function createReviewAssignment(event) {
            var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: ctrl.validQuestions,
                    assignment: {
                        assignees: [],
                        kind: assignmentKindConstants.QUESTION_REVIEW,
                        items: ctrl.validQuestions
                    }
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
    }]
});
'use strict';

angular.module('qbQuestionTableInpublished', ['md.data.table', 'qbQuestionImport', 'qbQuestionCreate', 'qbQuestionEdit', 'qbTableSearchBar', 'qbQuestionEditDialog', 'qbQuestionPreviewDialog', 'qbQuestionAddToQuestionBankDialog', 'qbQuestionManageQuestions']);
'use strict';

angular.module('qbQuestionTableInpublished').component('qbQuestionTableInpublished', {
    templateUrl: 'app/minified/qb-question-table-inpublished/qb-question-table-inpublished.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", "$location", "$route", "$routeParams", "Util", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $filter, $location, $route, $routeParams, util, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants, questionTypeConstants) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 10;
            ctrl.fields = [{
                field: "ID",
                key: "customId",
                selected: true,
                allow: ["Admin", "Author", "Editor"],
                make: ctrl.makeCustomID,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Stem",
                key: "stem",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Question",
                key: "question",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Created Date",
                key: "creationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Modified Date",
                key: "lastModificationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Topics",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeTopics,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Level",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeLevel,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Status",
                key: "status",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Review Count",
                key: "reviewCount",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "TimesUsed",
                key: "timesUsed",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Kind",
                key: "questionType",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeQuestionType,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Author",
                key: "author",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeAuthor,
                makeClass: ctrl.makeDefaultClass
            }];
            ctrl.sortFields = [{
                field: "Modified date",
                key: "lastModificationDate"
            }, {
                field: "ID",
                key: "customId"
            }, {
                field: "Stem",
                key: "stem"
            }];
            if (userService.isAdmin() || userService.isEditor()) {
                ctrl.sortFields.push({
                    field: "Status",
                    key: "status"
                }, {
                    field: "Review Count",
                    key: "-reviewCount"
                });
            }
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
            ctrl.query = {
                size: 25,
                page: 1
            };
            ctrl.filter = {
                statuses: [questionConstants.APPROVED],
                sortBy: "lastModificationDate",
                order: ""
            };

            notifier.subscribe($scope, 'load-questions-published', function (event, data) {
                ctrl.selected.length = 0;
                ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            });
            ctrl.canSeeEditAssignment = userService.isAdmin() || userService.isEditor();
            ctrl.previlege = util.getQuestionPrevileges;
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.makeCustomID = function (question, field) {
            return $filter("numberFixedLen")(question.customId, 5);
        };
        ctrl.makeDefault = function (data, field) {
            return data[field.key];
        };
        ctrl.makeDefaultDate = function (data, field) {
            return $filter('date')(new Date(data[field.key]), 'MM/dd/yyyy').toUpperCase();
        };

        ctrl.makeDefaultClass = function (data, field) {
            return "";
        };
        ctrl.makeStemAndQuestion = function (data, field) {
            return $filter("htmlFilter")(data[field.key]);
        };
        ctrl.makeAuthor = function (question, field) {
            if (question.createdBy) {
                return question.createdBy.name;
            }
        };
        ctrl.allowField = function (field) {
            if (_(field.allow).difference(_.pluck(userService.getLoggedInUser().roles, 'name')).length === field.allow.length) {
                return false;
            }
            return true;
        };
        ctrl.makeTopics = function (data, field) {
            if (data.tags) {
                var topics = data.tags.filter(function (d) {
                    return d.taxonomy == "Topic";
                });
                return data.topics = topics.map(function (elem) {
                    return elem.name;
                }).join(", ");
            }
        };
        ctrl.makeLevel = function (data, field) {
            if (data.tags) {
                return data.level = data.tags.find(function (d) {
                    return d.taxonomy == "Level";
                }).name;
            }
        };
        ctrl.makeQuestionType = function (question, field) {
            if (question.sections) {
                var mainSection = question.sections.find(function (s) {
                    return ctrl.isMainSection(s);
                });
                if (mainSection) {
                    return mainSection.category;
                }
            }
        };

        ctrl.isMainSection = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE || section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                return true;
            }
            return false;
        };

        ctrl.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            boundaryLinks: false,
            decapitate: false,
            limitSelect: true,
            pageSelect: true
        };

        ctrl.selected = [];

        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            stateService.fetchState().published = ctrl.query;
            stateService.fetchState().published.stem = ctrl.filter.stem;
            var filter = angular.copy(ctrl.filter);
            filter.sortBy = filter.order + filter.sortBy;
            questionService.searchQuestions(ctrl.query, filter).then(function (response) {
                ctrl.questionData = response.data.data;
                ctrl.total = response.data.count;
            });
        };

        ctrl.importQuestions = function (event, task) {
            if (task == "import") {
                $location.url('/question-import');
            }
            if (task == "create") {
                $location.url('/question-create');
            }
        };

        ctrl.loadEditQuestion = function (question, event) {
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question,
                    state: "Published",
                    readOnly: true
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().split(/\s+/).length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };

        ctrl.menuItemClick = function (event, task) {
            ctrl.validQuestions = _.filter(ctrl.selected, function (question) {
                if (question.status === questionConstants.EDITORIAL) return question;
            });
            if (ctrl.selected.length > 0) {
                if (ctrl.validQuestions.length === 0) {
                    util.mdAlert(event, "Only Editorial Questions can be added");
                } else if (ctrl.validQuestions.length < ctrl.selected.length) {
                    util.mdAlert(event, "Only Editorial Questions can be added", task.action);
                } else {
                    task.action(event);
                }
            } else util.mdAlert(event, "Please select question(s).");
        };

        ctrl.addToQuestionBank = function (event) {
            if (ctrl.selected.length == 0) {
                util.mdAlert(event, "Please select question(s).");
            } else {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-question-add-to-question-bank-dialog/qb-question-add-to-question-bank-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionAddToQuestionBankDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        questions: ctrl.selected
                    }
                });
            }
        };
    }]
});
'use strict';

angular.module('qbQuestionTableInretired', ['md.data.table', 'qbQuestionImport', 'qbQuestionCreate', 'qbQuestionEdit', 'qbTableSearchBar', 'qbQuestionEditDialog', 'qbQuestionManageQuestions']);
'use strict';

angular.module('qbQuestionTableInretired').component('qbQuestionTableInretired', {
    templateUrl: 'app/minified/qb-question-table-inretired/qb-question-table-inretired.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", "$location", "$route", "$routeParams", "Util", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $filter, $location, $route, $routeParams, util, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants, questionTypeConstants) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 10;
            ctrl.fields = [{
                field: "ID",
                key: "customId",
                selected: true,
                allow: ["Admin", "Author", "Editor"],
                make: ctrl.makeCustomID,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Stem",
                key: "stem",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Question",
                key: "question",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Created Date",
                key: "creationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Modified Date",
                key: "lastModificationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Topics",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeTopics,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Level",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeLevel,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Status",
                key: "status",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Review Count",
                key: "reviewCount",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "TimesUsed",
                key: "timesUsed",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Kind",
                key: "questionType",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeQuestionType,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Author",
                key: "author",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeAuthor,
                makeClass: ctrl.makeDefaultClass
            }];
            ctrl.sortFields = [{
                field: "Modified date",
                key: "lastModificationDate"
            }, {
                field: "ID",
                key: "customId"
            }, {
                field: "Stem",
                key: "stem"
            }];
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
            if (userService.isAdmin() || userService.isEditor()) {
                ctrl.sortFields.push({
                    field: "Status",
                    key: "status"
                }, {
                    field: "Review Count",
                    key: "-reviewCount"
                });
            }
            ctrl.query = {
                size: 25,
                page: 1
            };
            ctrl.filter = {
                statuses: [questionConstants.ARCHIVED, questionConstants.REJECTED],
                sortBy: "-lastModificationDate",
                order: ""
            };

            notifier.subscribe($scope, 'load-questions-retired', function (event, data) {
                ctrl.selected.length = 0;
                ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            });
            ctrl.canSeeEditAssignment = userService.isAdmin() || userService.isEditor();
            ctrl.previlege = util.getQuestionPrevileges;
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.makeCustomID = function (question, field) {
            return $filter("numberFixedLen")(question.customId, 5);
        };
        ctrl.makeDefault = function (data, field) {
            return data[field.key];
        };
        ctrl.makeDefaultDate = function (data, field) {
            return $filter('date')(new Date(data[field.key]), 'MM/dd/yyyy').toUpperCase();
        };

        ctrl.makeDefaultClass = function (data, field) {
            return "";
        };
        ctrl.makeStemAndQuestion = function (data, field) {
            return $filter("htmlFilter")(data[field.key]);
        };
        ctrl.makeAuthor = function (question, field) {
            if (question.createdBy) {
                return question.createdBy.name;
            }
        };
        ctrl.allowField = function (field) {
            if (_(field.allow).difference(_.pluck(userService.getLoggedInUser().roles, 'name')).length === field.allow.length) {
                return false;
            }
            return true;
        };
        ctrl.makeTopics = function (data, field) {
            if (data.tags) {
                var topics = data.tags.filter(function (d) {
                    return d.taxonomy == "Topic";
                });
                return data.topics = topics.map(function (elem) {
                    return elem.name;
                }).join(", ");
            }
        };
        ctrl.makeLevel = function (data, field) {
            if (data.tags) {
                return data.level = data.tags.find(function (d) {
                    return d.taxonomy == "Level";
                }).name;
            }
        };
        ctrl.makeQuestionType = function (question, field) {
            if (question.sections) {
                var mainSection = question.sections.find(function (s) {
                    return ctrl.isMainSection(s);
                });
                if (mainSection) {
                    return mainSection.category;
                }
            }
        };

        ctrl.isMainSection = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE || section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                return true;
            }
            return false;
        };

        ctrl.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            boundaryLinks: false,
            decapitate: false,
            limitSelect: true,
            pageSelect: true
        };

        ctrl.selected = [];

        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            var filter = angular.copy(ctrl.filter);
            filter.sortBy = filter.order + filter.sortBy;
            questionService.searchQuestions(ctrl.query, filter).then(function (response) {
                ctrl.questionData = response.data.data;
                ctrl.total = response.data.count;
            });
        };

        ctrl.importQuestions = function (event, task) {
            if (task == "import") {
                $location.url('/question-import');
            }
            if (task == "create") {
                $location.url('/question-create');
            }
        };

        ctrl.loadEditQuestion = function (question, event) {
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question,
                    state: "Published",
                    readOnly: true
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().split(/\s+/).length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };

        // ctrl.menuItemClick = (event, task) => {
        //     ctrl.validQuestions = _.filter(ctrl.selected, (question) => {
        //         if (question.status === questionConstants.EDITORIAL)
        //             return question;
        //     });
        //     if (ctrl.selected.length > 0) {
        //         if (ctrl.validQuestions.length === 0) {
        //             util.mdAlert(event, "Only Editorial Questions can be added");
        //         } else if (ctrl.validQuestions.length < ctrl.selected.length) {
        //             util.mdAlert(event, "Only Editorial Questions can be added", task.action);
        //         } else {
        //             task.action(event);
        //         }
        //     } else
        //         util.mdAlert(event, "Please select question(s).");
        // };
    }]
});
'use strict';

// Define the `qbQuestion` module

angular.module('qbQuestion', ['qbQuestionTab']);
'use strict';

angular.module('qbQuestion').component('qbQuestion', {
    templateUrl: 'app/minified/qb-question/qb-question.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
    }]
});
'use strict';

// Define the `qbQuestionTab` module

angular.module('qbQuestionTab', ['qbQuestionTableInprogress', 'qbQuestionTableInpublished', 'qbQuestionTableInretired', 'qbQuestionFilterDialog', 'qbQuestionTableFilter']);
'use strict';

angular.module('qbQuestionTab').component('qbQuestionTab', {
    templateUrl: 'app/minified/qb-question-tab/qb-question-tab.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", "$location", "$route", "$routeParams", "Util", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $filter, $location, $route, $routeParams, util, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants, questionTypeConstants) {
        var ctrl = this;
        ctrl.selected = _.isNumber(stateService.getStateFor("questionTab").index) ? stateService.getStateFor("questionTab").index : 0;
        ctrl.$onInit = function () {
            ctrl.filter = {
                statuses: ctrl.resetStates()
            };
            ctrl.show = { filter: false };
        };
        ctrl.resetStates = function () {
            var allStates = [{
                name: questionConstants.DONE,
                selected: false
            }, {
                name: questionConstants.DRAFT,
                selected: false
            }, {
                name: questionConstants.SUBMITTED,
                selected: false
            }, {
                name: questionConstants.EDITORIAL,
                selected: false
            }, {
                name: questionConstants.INREVIEW,
                selected: false
            }, {
                name: questionConstants.APPROVED,
                selected: false
            }, {
                name: questionConstants.ARCHIVED,
                selected: false
            }, {
                name: questionConstants.REJECTED,
                selected: false
            }];
            return angular.copy(allStates);
        };
        ctrl.inProgress = function (tab) {
            notifier.notify('load-questions-inprogress', {});
            stateService.getStateFor("questionTab").index = 0;
        };
        ctrl.inPublished = function () {
            notifier.notify('load-questions-published', {});
            stateService.getStateFor("questionTab").index = 1;
        };
        ctrl.inRetired = function () {
            notifier.notify('load-questions-retired', {});
            stateService.getStateFor("questionTab").index = 2;
        };
        ctrl.getFilter = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-filter-dialog/qb-question-filter-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionFilterDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    data: ctrl.filter,
                    resetStates: ctrl.resetStates
                }
            }).then(function () {
                ctrl.show.filter = true;
                notifier.notify('load-questions-filter', {});
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserDirectory', ['qbUserActiveTable', 'qbUserInactiveTable', 'qbSidenav']);
'use strict';

angular.module('qbUserDirectory').component('qbUserDirectory', {
    templateUrl: 'app/minified/qb-user-directory/qb-user-directory.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "Notifier", function ($mdDialog, $scope, $element, $timeout, notifier) {
        var ctrl = this;
        ctrl.active = function (tab) {
            notifier.notify('load-users-active', {});
        };
        ctrl.inactive = function (tab) {
            notifier.notify('load-users-inactive', {});
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserActiveTable', ['md.data.table', 'qbUsersMenu', 'qbUserProfileCreate', 'qbTableSearchBar']);
'use strict';

angular.module('qbUserActiveTable').component('qbUserActiveTable', {
    templateUrl: 'app/minified/qb-user-active-table/qb-user-active-table.template.html',
    controller: ["$filter", "$mdDialog", "$scope", "$element", "$timeout", "$mdToast", "$location", "Notifier", "User", "Role", "QB_USER", function ($filter, $mdDialog, $scope, $element, $timeout, $mdToast, $location, notifier, userService, roleService, userConstants) {
        var ctrl = this;
        ctrl.query = {
            sort: '-creationDate',
            limit: 25,
            page: 1,
            status: userConstants.ACTIVE
        };
        ctrl.$onInit = function () {
            ctrl.search = false;
            ctrl.searchParam = "";
            var filter = _.debounce(ctrl.doFilter, 1000);
            $scope.$watch(function () {
                return ctrl.searchParam;
            }, function (newValue, oldValue, scope) {
                filter();
            });
            notifier.subscribe($scope, 'load-users-active', function (event, data) {
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            });
        };

        ctrl.doFilter = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };

        ctrl.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            boundaryLinks: false,
            decapitate: false,
            limitSelect: true,
            pageSelect: true
        };

        ctrl.selected = [];
        ctrl.orderBy = function (field) {
            ctrl.query.sort = field;
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };
        ctrl.processData = function (data) {
            data.forEach(function (d) {
                d.role = d.roles.map(function (elem) {
                    return elem.name;
                }).join(", ");
                d.created = $filter('date')(new Date(d.creationDate), "MM/dd/yyyy");
            });
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.query.sort = '-creationDate';
            ctrl.query.name = ctrl.searchParam;
            userService.userList(ctrl.query).then(function (response) {
                ctrl.processData(response.data.data);
                ctrl.userData = response.data.data;
                ctrl.total = response.data.count;
            });
        };
        ctrl.loadProfile = function (id) {
            $location.url('/users/profile/' + id);
        };
        ctrl.editProfile = function (user) {
            $location.url('/users-edit/' + user.id);
        };
        ctrl.filterUser = function () {
            ctrl.search = true;
        };
        ctrl.clearSearch = function () {
            ctrl.search = false;
            ctrl.searchParam = "";
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserInactiveTable', ['md.data.table', 'qbUsersMenu', 'qbTableSearchBar']);
'use strict';

angular.module('qbUserInactiveTable').component('qbUserInactiveTable', {
    templateUrl: 'app/minified/qb-user-inactive-table/qb-user-inactive-table.template.html',
    controller: ["$filter", "$mdDialog", "$scope", "$element", "$timeout", "$location", "Notifier", "User", "QB_USER", function ($filter, $mdDialog, $scope, $element, $timeout, $location, notifier, userService, userConstants) {
        var ctrl = this;
        ctrl.query = {
            sort: '-creationDate',
            limit: 25,
            page: 1,
            status: userConstants.INACTIVE
        };
        ctrl.$onInit = function () {
            ctrl.search = false;
            ctrl.searchParam = "";
            var filter = _.debounce(ctrl.doFilter, 1000);
            $scope.$watch(function () {
                return ctrl.searchParam;
            }, function (newValue, oldValue, scope) {
                filter();
            });
            notifier.subscribe($scope, 'load-users-inactive', function (event, data) {
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            });
        };

        ctrl.doFilter = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };

        ctrl.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            boundaryLinks: false,
            decapitate: false,
            limitSelect: true,
            pageSelect: true
        };

        ctrl.selected = [];
        ctrl.orderBy = function (field) {
            ctrl.query.sort = field;
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };
        ctrl.processData = function (data) {
            data.forEach(function (d) {
                d.role = d.roles.map(function (elem) {
                    return elem.name;
                }).join(", ");
                d.created = $filter('date')(new Date(d.creationDate), "MM/dd/yyyy");
            });
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.query.sort = '-creationDate';
            ctrl.query.name = ctrl.searchParam;
            userService.userList(ctrl.query).then(function (response) {
                ctrl.processData(response.data.data);
                ctrl.userData = response.data.data;
                ctrl.total = response.data.count;
            });
        };
        ctrl.loadProfile = function (id) {
            $location.url('/users/profile/' + id);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUsersMenu', ['qbUserProfileCreate']);
'use strict';

angular.module('qbUsersMenu').component('qbUsersMenu', {
    templateUrl: 'app/minified/qb-user-directory-menu/qb-user-directory-menu.template.html',
    bindings: {
        title: '@',
        selected: '<',
        tab: '<'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "Role", "User", "Notifier", "QB_USER", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, roleService, userService, notifier, userConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {};
        ctrl.createUser = function (event) {
            $location.url('/users-create/');
        };
        ctrl.deleteUnDeleteUser = function (event) {
            ctrl.selected.forEach(function (user) {
                user.status = ctrl.tab == 'active' ? userConstants.INACTIVE : userConstants.ACTIVE;
                userService.userEdit(user).then(function (response) {
                    if (response.data.status == "success") {
                        notifier.notify('load-users-inactive', {});
                        notifier.notify('load-users-active', {});
                    }
                });
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserProfile', ['qbUserProfileDetails', 'material.components.expansionPanels']);
'use strict';

angular.module('qbUserProfile').component('qbUserProfile', {
    templateUrl: 'app/minified/qb-user-profile/qb-user-profile.template.html',
    controller: ["$filter", "$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$routeParams", "User", "Log", function ($filter, $mdDialog, $scope, $element, $timeout, $route, $location, $routeParams, userService, loggingService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.currentDate = $filter('date')(new Date(), "MM/dd/yyyy");
            ctrl.selectedIndex = 0;
            if ($route.current.params.tab === "activity") ctrl.selectedIndex = 1;else ctrl.selectedIndex = 0;
            userService.userGet($route.current.params.id).then(function (d) {
                ctrl.userdata = d.data.data;
                ctrl.userdata.role = ctrl.userdata.roles.map(function (elem) {
                    return elem.name;
                }).join(", ");
                ctrl.userdata.created = $filter('date')(new Date(ctrl.userdata.creationDate), "MM/dd/yyyy");
            });

            ctrl.getActivities();
        };
        ctrl.getActivities = function () {
            loggingService.getUserActivity($route.current.params.id).then(function (response) {
                ctrl.activityData = response.data.data;
                if (ctrl.activityData && ctrl.activityData.length != 0) {
                    ctrl.activityData.forEach(function (activity) {
                        var activityDate = $filter('date')(new Date(activity.creationDate), "MM/dd/yyyy");
                        activity.creationDay = ctrl.currentDate == activityDate ? 'TODAY' : activityDate;
                    });
                    ctrl.groupedActivities = _.groupBy(ctrl.activityData, 'creationDay');
                }
            });
        };
        ctrl.switchTab = function (tab) {
            $location.url('/users/' + tab + "/" + $route.current.params.id);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserProfileDetails', []);
'use strict';

angular.module('qbUserProfileDetails').component('qbUserProfileDetails', {
    templateUrl: 'app/minified/qb-user-profile-details/qb-user-profile-details.template.html',
    bindings: {
        data: '<'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "Question", "Assignment", "Bank", "QB_QUESTION", function ($mdDialog, $scope, $element, $timeout, $location, questionService, assignmentService, bankService, questionConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.count = {
                questions: 0,
                banks: 0,
                assignments: 0
            };
            questionService.getAllQuestions({}).then(function (response) {
                if (response.data.status === "success") ctrl.count.questions = response.data.count;
            });
            assignmentService.getAllAssignments({}).then(function (response) {
                if (response.data.status === "success") ctrl.count.assignments = response.data.count;
            });
            bankService.getAllBanks({}).then(function (response) {
                if (response.data.status === "success") ctrl.count.banks = response.data.count;
            });
        };
        ctrl.goto = function (relativeUrl) {
            $location.url(relativeUrl);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionImport', ['lfNgMdFileInput']);
'use strict';

angular.module('qbQuestionImport').component('qbQuestionImport', {
    templateUrl: 'app/minified/qb-question-import/qb-question-import.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
        $scope.$watch('files.length', function (newVal, oldVal) {
            ctrl.uploadFiles = $scope.files;
        });
        ctrl.activated = "true";
        ctrl.importQuestions = function (ev) {
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog style="width:100%">' + '  <md-dialog-content>' + '<md-progress-circular md-diameter="40"></md-progress-circular>' + '     100% ' + '     <br/>' + '     Processing...............' + '     <br/>' + '     The time to complete your data import depends on complexity of the file' + '     <br/>' + '     Please be Patient' + '  </md-dialog-content>' + '</md-dialog>',
                targetEvent: ev,
                bindToController: true
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionCreate', ['qbQuestionCreateForm', 'qbQuestionCreateHeader']);
'use strict';

angular.module('qbQuestionCreate').component('qbQuestionCreate', {
    templateUrl: 'app/minified/qb-question-create/qb-question-create.template.html',
    bindings: {
        assignmentId: "<",
        assignment: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$mdToast", "$routeParams", "Util", "Question", "User", "Media", "Assignment", "QB_QUESTION", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $location, $mdToast, $routeParams, util, questionService, userService, mediaService, assignmentService, questionConstants, questionTypeConstants) {
        var ctrl = this;
        ctrl.question = {};
        ctrl.$onInit = function () {
            ctrl.question = {
                stem: "",
                customId: "",
                rationale: "",
                references: [],
                tags: []
            };
            if (ctrl.assignmentId) {
                getAssignment();
            } else {
                ctrl.media = [];
                ctrl.noMedia = [{
                    category: questionTypeConstants.SINGLECHOICE,
                    position: 0
                }];
            }
        };
        $scope.$watch('files.length', function (newVal, oldVal) {
            ctrl.uploadFiles = $scope.files;
        });
        ctrl.importQuestions = function () {};
        ctrl.save = function () {
            var currentUser = userService.getLoggedInUser();
            ctrl.question.createdBy = {
                name: currentUser.name,
                id: currentUser.id,
                email: currentUser.email
            };
            ctrl.question.modifiedBy = {
                name: currentUser.name,
                email: currentUser.email,
                id: currentUser.id
            };
            ctrl.question.sections = ctrl.noMedia.concat(ctrl.media);
            ctrl.question.sections.forEach(function (d, i) {
                d.position = i;
            });
            ctrl.question.sections = _.sortBy(ctrl.question.sections, "position");
            ctrl.question.tags = _.map(ctrl.question.tags, function (t) {
                return {
                    name: t.name,
                    id: t.id,
                    taxonomy: t.taxonomy
                };
            });
            questionService.questionCreate(ctrl.question).then(function (d) {
                if (ctrl.assignment) {
                    ctrl.saveToAssignment(d.data.data);
                } else {
                    $location.path("/questions");
                }
                $mdToast.show($mdToast.simple().textContent('Question created successfully').parent(document.body).hideDelay(3000).position('top right'));
                $mdDialog.cancel();
            }, function () {
                ctrl.saveInProgress = false;
            });
        };
        ctrl.saveToAssignment = function (question) {
            var items = _.map(ctrl.assignment.items, function (item) {
                return {
                    id: item.id,
                    customId: item.customId
                };
            });
            items.push({
                id: question.id,
                customId: question.customId
            });
            assignmentService.saveItems(ctrl.assignment.id, {
                items: items
            }).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    getAssignment();
                    //                            ctrl.goBack();
                }
            });
        };
        ctrl.showQuestionInformation = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-information/qb-question-information.template.html',
                targetEvent: ev,
                controller: 'questionInformationController',
                controllerAs: 'infoCtrl',
                bindToController: true
            });
        };
        ctrl.isMainSectionWithChoices = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE)) {
                return true;
            }
            return false;
        };
        ctrl.addText = function () {
            ctrl.question.sections.push({
                category: "text",
                text: "",
                title: "",
                position: ctrl.question.sections.length
            });
            splitSections();
        };
        ctrl.addImage = function (ev) {
            var section = {
                category: "image",
                position: ctrl.question.sections.length,
                url: "",
                name: ""
            };
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };
            mediaService.mediaList(ctrl.query).then(function (response) {
                var lib = response.data.data;
                var total = response.data.count;
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-question-add-image/qb-question-add-image.template.html',
                    targetEvent: ev,
                    controller: 'questionAddImageController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        section: section,
                        lib: lib,
                        total: total
                    }
                }).then(function () {
                    ctrl.question.sections.push(section);
                    splitSections();
                });
            });
        };
        ctrl.addVideo = function (ev) {
            var section = {
                category: "video",
                position: ctrl.question.sections.length,
                url: "",
                name: ""
            };
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-add-video/qb-question-add-video.template.html',
                targetEvent: ev,
                controller: 'questionAddVideoController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    video: section
                }
            }).then(function () {
                ctrl.question.sections.push(section);
                splitSections();
            });
        };
        ctrl.goBack = function () {
            if ($routeParams.goto) {
                $location.url($routeParams.goto);
            } else if (ctrl.assignmentId) {
                $mdDialog.cancel();
            } else {
                util.back();
            }
        };
        ctrl.checkInValidDraft = function () {
            if (ctrl.saveInProgress) {
                return true;
            }
            return _.isEmpty(ctrl.question.question);
        };
        ctrl.checkInvalidFinal = function (question) {
            ctrl.showValidation = [];
            if (ctrl.noMedia) {
                ctrl.noMedia.forEach(function (section) {
                    if (section && (section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                        return section;
                    } else if (ctrl.isMainSectionWithChoices(section) && section.choices.length > 1) {
                        var addedChoices = _.filter(section.choices, function (d) {
                            return d.choice.length > 0;
                        });
                        var correctChoiceFilter = _.filter(section.choices, function (d) {
                            return d.correct;
                        });
                        if (question && correctChoiceFilter.length == 0) {
                            ctrl.showValidation.push({
                                name: 'choiceCorrect'
                            });
                        }
                        if (addedChoices.length != section.choices.length) {
                            ctrl.showValidation.push({
                                name: 'NoAnswer'
                            });
                        }
                    } else if (ctrl.isMainSectionWithChoices(section) && section.choices.length < 2) {
                        ctrl.showValidation.push({
                            name: 'addChoice'
                        });
                    }
                });
            }
            if (ctrl.question && ctrl.question.references && ctrl.question.references.length == 0) ctrl.showValidation.push({
                name: 'references'
            });
            if (ctrl.question && _.isEmpty(ctrl.question.rationale)) ctrl.showValidation.push({
                name: 'rationale'
            });
            return ctrl.showValidation;
        };
        ctrl.saveDraft = function () {
            ctrl.saveInProgress = true;
            if (ctrl.question.status !== questionConstants.EDITORIAL) ctrl.question.status = questionConstants.DRAFT;
            $timeout(function () {
                ctrl.save();
            }, 1);
        };
        ctrl.saveAsFinal = function (event) {
            ctrl.validation = ctrl.checkInvalidFinal(ctrl.question);
            if (ctrl.validation.length > 0) {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-validation-dialog/qb-validation-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbValidationDialog',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        validations: ctrl.validation
                    }
                });
            } else {
                if (ctrl.question.status !== questionConstants.EDITORIAL) ctrl.question.status = questionConstants.DONE;
                $timeout(function () {
                    ctrl.save();
                }, 1);
            }
        };
        /*-------- private functions ---------*/
        var getCategory = function getCategory() {
            if (ctrl.assignment.questionType === questionTypeConstants.MULTIPLECHOICE) ctrl.category = questionTypeConstants.NAME.MULTIPLECHOICE;else if (ctrl.assignment.questionType === questionTypeConstants.SINGLECHOICE) ctrl.category = questionTypeConstants.NAME.SINGLECHOICE;else if (ctrl.assignment.questionType === questionTypeConstants.SHORTANSWER) ctrl.category = questionTypeConstants.NAME.SHORTANSWER;else if (ctrl.assignment.questionType === questionTypeConstants.ESSAY) ctrl.category = questionTypeConstants.NAME.ESSAY;
        };
        var splitSections = function splitSections() {
            ctrl.media = ctrl.question.sections.filter(function (section) {
                return section['category'] === 'image' || section['category'] === 'video';
            }).map(function (item) {
                return item;
            });
            ctrl.noMedia = ctrl.question.sections.filter(function (section) {
                return section['category'] !== 'image' && section['category'] !== 'video';
            }).map(function (item) {
                return item;
            });
        };
        var getAssignment = function getAssignment() {
            assignmentService.getAssignment(ctrl.assignmentId).then(function (a) {
                ctrl.assignment = a.data.data;
                if (ctrl.assignment.questionType) {
                    ctrl.question.sections = [{
                        category: ctrl.assignment.questionType,
                        position: 0
                    }];
                    getCategory();
                    splitSections();
                }
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionDetails', ['qbQuestionAddImage', 'qbQuestionAddVideo', 'qbQuestionDisplayText', 'qbQuestionDisplayImage', 'qbQuestionDisplayVideo', 'qbQuestionAddMultiplechoice', 'qbQuestionAddMultipleresponse', 'qbQuestionAddShortanswer', 'qbQuestionAddEssay', 'qbQuestionAnswerkey', 'qbQuestionAddRationale', 'ngMessages', 'ui.sortable', 'ui.tinymce']);
'use strict';

angular.module('qbQuestionDetails').component('qbQuestionDetails', {
    templateUrl: 'app/minified/qb-question-details/qb-question-details.template.html',
    bindings: {
        data: "<",
        view: "<",
        media: "<",
        other: "<",
        addText: "&",
        addImage: "&",
        addVideo: "&",
        type: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$routeParams", "Util", "Media", "Question", "User", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $location, $routeParams, util, mediaService, questionService, userService, questionTypeConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isEditor = userService.isEditor();
            ctrl.show = {
                stem: true
            };
            ctrl.hideType = true;
            ctrl.data = ctrl.data || {};
            if (ctrl.data.sections) {
                var mainSection = _.find(ctrl.data.sections, function (s) {
                    return ctrl.isMainSection(s);
                });
                if (mainSection) {
                    ctrl.type = mainSection.category;
                } else {
                    ctrl.type = questionTypeConstants.SINGLECHOICE;
                }
            }
            if ((ctrl.isAdmin || ctrl.isEditor) && !ctrl.data.id) {
                //To handle Create Question for Admin & Editor
                ctrl.hideType = false;
                ctrl.data.sections = ctrl.other;
            }
            ctrl.tinyMceOptions = util.tinyMceOptions;
            ctrl.showAnswerKey = false;
            ctrl.category = questionTypeConstants;
        };
        ctrl.isMainSection = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE || section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                return true;
            }
            return false;
        };
        ctrl.dragControlListeners = {
            stop: function stop(e, ui) {
                $timeout(function () {
                    ctrl.show.stem = true;
                }, 200);
            },
            //                    start: function(e, ui) {
            //                        ctrl.show.stem = false;
            //                    },
            handle: '.container-drag',
            axis: "y",
            containment: "#dragBox",
            scroll: true,
            scrollSensitivity: 0,
            delay: 0,
            tolerance: "pointer",
            helper: "clone",
            refreshPositions: true
        };
        ctrl.showAnswer = function () {
            ctrl.showAnswerKey = !ctrl.showAnswerKey;
        };
        ctrl.removeSection = function (section) {
            ctrl.data.sections = ctrl.other.concat(ctrl.media);
            var i = _.findIndex(ctrl.data.sections, {
                $$hashKey: section.$$hashKey
            });
            ctrl.data.sections.splice(i, 1);
            ctrl.data.sections.forEach(function (d, i) {
                d.position = i;
            });
            splitSections();
        };
        var splitSections = function splitSections() {
            ctrl.media = ctrl.data.sections.filter(function (section) {
                return section['category'] === 'image' || section['category'] === 'video';
            }).map(function (item) {
                return item;
            });
            ctrl.other = ctrl.data.sections.filter(function (section) {
                return section['category'] !== 'image' && section['category'] !== 'video';
            }).map(function (item) {
                return item;
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionTag', ['qbCriteria']);
'use strict';

angular.module('qbQuestionTag').component('qbQuestionTag', {
    templateUrl: 'app/minified/qb-question-tag/qb-question-tag.template.html',
    bindings: {
        data: "<",
        view: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$q", "Tag", "User", function ($mdDialog, $scope, $element, $timeout, $q, tagService, userService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isEditor = userService.isEditor();
            ctrl.tagNames = [];
            tagService.getClass().then(function (response) {
                ctrl.tags = response.data.data;
            });
        };
        ctrl.showDialog = function (name, event) {
            if (!name) {
                return;
            }
            var promises = {};
            ctrl.tags.forEach(function (tag) {
                promises[tag.name] = tagService.getTaxonomies(tag.id);
            });
            $q.all(promises).then(function (values) {
                ctrl.tags.forEach(function (tag) {
                    var subTags = ctrl.data.filter(function (d) {
                        return d.taxonomy == tag.name;
                    });
                    values[tag.name].data.data.forEach(function (d) {
                        if (_.find(subTags, { name: d.name })) {
                            d.selected = true;
                        } else {
                            d.selected = false;
                        }
                    });
                });
                var index = _.findIndex(ctrl.tags, { name: name });
                ctrl.openDialog(index, values, event);
            });
        };
        ctrl.openDialog = function (index, values, event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-criteria/qb-criteria.template.html',
                targetEvent: event,
                controller: 'criteriaController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    selectedIndex: index,
                    hideType: true,
                    data: values,
                    tag: "tag",
                    labels: {
                        heading: "Tag Question",
                        set: "Set",
                        cancel: "CANCEL"
                    }
                }
            }).then(function () {
                ctrl.data.length = 0;
                ctrl.tags.forEach(function (tag) {
                    var filter = values[tag.name].data.data.filter(function (d) {
                        return d.selected;
                    });
                    filter.forEach(function (d) {
                        ctrl.data.push(d);
                    });
                });
            });
        };
        ctrl.removeData = function (data) {
            ctrl.data.splice(ctrl.data.indexOf(data), 1);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionReferences', []);
'use strict';

angular.module('qbQuestionReferences').component('qbQuestionReferences', {
    templateUrl: 'app/minified/qb-question-references/qb-question-references.template.html',
    bindings: {
        data: "<",
        view: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", '$window', function ($mdDialog, $scope, $element, $timeout, $window) {
        var ctrl = this;
        ctrl.$onInit = function () {};
        ctrl.isValidUrl = function (url) {
            var result = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if (result == null) {
                return false;
            }
            return true;
        };
        ctrl.addReference = function () {
            ctrl.data.push({
                name: "",
                url: "",
                edit: true
            });
        };
        ctrl.edit = function (reference) {
            reference.edit = true;
        };
        ctrl.isEdit = function (reference) {
            return reference.edit;
        };
        ctrl.delete = function (reference) {
            var i = _.findIndex(ctrl.data, {
                $$hashKey: reference.$$hashKey
            });
            ctrl.data.splice(i, 1);
        };
        ctrl.saveEditedReference = function (reference, form) {
            reference.edit = false;
        };
        ctrl.openReference = function (reference) {
            if (reference.url) if (!reference.url.match("http")) {
                reference.url = 'http://' + reference.url;
            }
            $window.open(reference.url, '_blank');
        };
        var setValidity = function setValidity(form, field) {
            form[field].$setValidity("required", false);
            form[field].$touched = true;
        };
    }]
});
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbQuestionReviewView', []);
'use strict';

angular.module('qbQuestionReviewView').controller('questionReviewViewController', ["$scope", "$mdDialog", "$mdToast", "Comment", "Question", "State", "Notifier", function ($scope, $mdDialog, $mdToast, commentService, questionService, stateService, notifier) {
    var ctrl = this;

    ctrl.save = function () {
        if (!ctrl.questions) {
            ctrl.saveQuestion(ctrl.question);
        } else {
            ctrl.questions.forEach(function (question) {
                ctrl.saveQuestion(question);
            });
        }
    };
    ctrl.saveQuestion = function (question) {
        if (!_.isEmpty(question.comment)) {
            ctrl.comment = {
                ownerId: question.id,
                comment: question.comment,
                category: 'Question'
            };
            commentService.addComment(ctrl.comment);
        }
        questionService.questionEdit(question).then(function (response) {
            if (_.isEqual(response.data.status, 'success')) {
                notifier.notify('load-assignment-details', {});
                notifier.notify('load-questions-inprogress', {});
                notifier.notify('load-questions-published', {});
                notifier.notify('load-questions-retired', {});
                ctrl.close();
                $mdToast.show($mdToast.simple().textContent("Question updated Successfully!").parent(document.body).hideDelay(1000).position('top right'));
            }
        });
    };

    ctrl.close = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
}]);
'use strict';

// Define the  module

angular.module('qbTopics', ['ngRoute', 'qbTopicSections']);
'use strict';

angular.module('qbTopics').component('qbTopics', {
    templateUrl: 'app/minified/qb-topics/qb-topics.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$routeParams", "$location", function ($mdDialog, $scope, $element, $timeout, $route, $routeParams, $location) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.setDefaults();
            ctrl.getTopics();
        };
        ctrl.getTopics = function () {
            ctrl.topics = [{
                id: "T00890",
                topic: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                questions: 3,
                banks: 1,
                users: 1
            }, {
                id: "T00890",
                topic: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                questions: 3,
                banks: 1,
                users: 1
            }, {
                id: "T00890",
                topic: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                questions: 3,
                banks: 1,
                users: 1
            }];
        };
        ctrl.setDefaults = function () {
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };

            ctrl.options = {
                rowSelection: false,
                multiSelect: false,
                autoSelect: false,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
        };
        ctrl.loadTopic = function (section, topic) {
            $location.url('/topic/:' + section + '/:' + topic.id);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbTopicSections', ['qbTopicQuestions', 'qbTopicBanks', 'qbTopicUsers']);
'use strict';

angular.module('qbTopicSections').component('qbTopicSections', {
    templateUrl: 'app/minified/qb-topic-sections/qb-topic-sections.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$routeParams", "$location", "$route", function ($mdDialog, $scope, $element, $timeout, $routeParams, $location, $route) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.setDefaults();
            ctrl.getTopics();
            ctrl.selectedIndex = 0;
            ctrl.id = $route.current.params.id.substring(1);
            if ($route.current.params.section === ":banks") ctrl.selectedIndex = 1;else if ($route.current.params.section === ":users") ctrl.selectedIndex = 2;
        };
        ctrl.getTopics = function () {
            ctrl.topics = [{
                id: "T00890",
                topic: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                questions: 3,
                banks: 1,
                users: 1
            }, {
                id: "T00890",
                topic: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                questions: 3,
                banks: 1,
                users: 1
            }, {
                id: "T00890",
                topic: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                questions: 3,
                banks: 1,
                users: 1
            }];
        };
        ctrl.setDefaults = function () {
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };

            ctrl.options = {
                rowSelection: false,
                multiSelect: false,
                autoSelect: false,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true,
                tabSelect: $route.current.params.section
            };
        };
        ctrl.loadTopic = function (section) {
            $location.url('/topic/' + section + '/' + $route.current.params.id);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbTopicQuestions', []);
'use strict';

angular.module('qbTopicQuestions').component('qbTopicQuestions', {
    templateUrl: 'app/minified/qb-topic-questions/qb-topic-questions.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.setDefaults();
            ctrl.getQuestions();
        };
        ctrl.getQuestions = function () {
            ctrl.data = {
                id: "T00890",
                description: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                questions: [{
                    id: "Q00890",
                    stem: "Which of the following is prescribed for a patient diagnosed with surgically",
                    status: "Working",
                    modified: "10/10/16"
                }, {
                    id: "Q00891",
                    stem: "The removal of entire breast, pectoralis major and minor muscles and neck lymph",
                    status: "Working",
                    modified: "10/10/16"
                }, {
                    id: "Q00892",
                    stem: "In staging and grading neoplasm TNM system is used. TNM stands for:",
                    status: "Working",
                    modified: "10/10/16"
                }]
            };
        };
        ctrl.setDefaults = function () {
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };

            ctrl.options = {
                rowSelection: false,
                multiSelect: false,
                autoSelect: false,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionRevision', ['material.components.expansionPanels', 'qbQuestionRevisionView', 'qbSidenavButton', 'qbQuestionRevisionViewDialog']);
'use strict';

angular.module('qbQuestionRevision').component('qbQuestionRevision', {
    templateUrl: 'app/minified/qb-question-revision/qb-question-revision.template.html',
    bindings: {
        question: "<",
        dialog: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$mdExpansionPanel", "$location", "$routeParams", "Util", "Question", "Version", "State", function ($mdDialog, $scope, $element, $timeout, $mdExpansionPanel, $location, $routeParams, util, questionService, versionService, stateService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.query = {
                owner: ctrl.question.id,
                page: 1,
                size: 25
            };
            ctrl.revisions = [];
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getVersionList();
        };
        ctrl.viewRevision = function (revision, index, event) {
            var versionNo = ctrl.getVersionNumber(index);
            $mdDialog.hide();
            var ob = {
                templateUrl: 'app/minified/qb-question-revision-view-dialog/qb-question-revision-view-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionRevisionViewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    revision: {
                        id: revision.id
                    },
                    version: {
                        version: versionNo
                    }
                },
                skipHide: true
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            ctrl.getVersionList();
        };
        ctrl.getVersionList = function () {
            versionService.versionList(ctrl.query).then(function (response) {
                ctrl.revisions = response.data.data;
                ctrl.total = response.data.count;
                ctrl.revisions.forEach(function (revision, key) {
                    revision.date = JSON.parse(revision.data).lastModificationDate;
                    revision.by = JSON.parse(revision.data).modifiedBy.name;
                    revision.byEmail = JSON.parse(revision.data).modifiedBy.email;
                });
            });
        };
        ctrl.getVersionNumber = function (index) {
            return index === 0 && ctrl.query.page === 1 ? 'CURRENT' : 'V' + (ctrl.total - (ctrl.query.size * (ctrl.query.page - 1) + index));
        };
        ctrl.cancel = function () {
            $mdDialog.cancel();
            stateService.fetchHistory().pop();
            var ob = _.last(stateService.fetchHistory());
            if (ob) {
                $mdDialog.show(ob);
            }
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionRevisionDialog', ['qbQuestionRevision']);
'use strict';

angular.module('qbQuestionRevisionDialog').controller('qbQuestionRevisionDialogController', ["$scope", "$mdDialog", "$mdToast", "State", function ($scope, $mdDialog, $mdToast, stateService) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
}]);
'use strict';

// Define the `qbQuestionRevisionView` module

angular.module('qbQuestionRevisionView', ['qbQuestionRevisionAnswerkey', 'qbQuestionRevisionDisplayText', 'qbQuestionDisplayImage', 'ui.tinymce']);
'use strict';

angular.module('qbQuestionRevisionView').controller('qbQuestionRevisionViewController', ["$mdDialog", "$scope", "$element", "$timeout", "$routeParams", "$location", "$mdToast", "Util", "Version", "Question", "Notifier", "State", function ($mdDialog, $scope, $element, $timeout, $routeParams, $location, $mdToast, util, versionService, questionService, notifier, stateService) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.versionId = ctrl.revision.id;
        versionService.versionGet(ctrl.versionId).then(function (response) {
            ctrl.revision = response.data.data;
            ctrl.question = JSON.parse(ctrl.revision.data);
            ctrl.mainSection = ctrl.getMainSection();
            getCategory();
            splitSections();
        });
        ctrl.tinyMceOptions = util.tinyMceOptions;
    };
    ctrl.clearRevisionView = function () {
        $mdDialog.hide();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.isMainSection = function (section) {
        if (section.category == "singleResponse") {
            return true;
        } else if (section.category == "multipleResponse") {
            return true;
        } else if (section.category == "shortText") {
            return true;
        } else if (section.category == "longText") {
            return true;
        }
        return false;
    };

    ctrl.getMainSection = function () {
        var section = undefined;
        ctrl.question.sections.forEach(function (s) {
            if (ctrl.isMainSection(s)) {
                section = s;
            }
        });
        return section;
    };

    ctrl.restore = function (event) {
        questionService.questionEdit(ctrl.question).then(function (response) {
            notifier.notify('load-restored-question', {});
            notifier.notify('load-questions-inprogress', {});
            notifier.notify('load-questions-published', {});
            notifier.notify('load-questions-retired', {});
            $mdToast.show($mdToast.simple().textContent('This version has been restored').parent(document.body).hideDelay(3000).position('top right'));
            $mdDialog.hide();
            if (stateService.getStateFor("revision-from").state == "question-edit") {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionEditDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        question: ctrl.question
                    }
                });
            } else if (stateService.getStateFor("revision-from").state == "question-preview") {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionPreviewDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        question: {
                            id: ctrl.question.id
                        },
                        state: "Published",
                        readOnly: true
                    }
                });
            }
        });
    };

    ctrl.showAnswer = function () {
        ctrl.showAnswerKey = !ctrl.showAnswerKey;
    };

    ctrl.hideAnswer = function () {
        ctrl.showAnswerKey = !ctrl.showAnswerKey;
    };
    ctrl.goBack = function () {
        if ($routeParams.goto) {
            $location.url($routeParams.goto);
        } else {
            util.back();
        }
    };
    /*-------- private functions ---------*/
    var getCategory = function getCategory() {
        ctrl.question.sections.forEach(function (section) {
            if (section.category === "multipleResponse") ctrl.category = "Multiple Choice";else if (section.category === "singleResponse") ctrl.category = "Single Response";else if (section.category === "shortText") ctrl.category = "Short Answer";else if (section.category === "longText") ctrl.category = "Essay";
        });
    };
    var splitSections = function splitSections() {
        ctrl.media = ctrl.question.sections.filter(function (section) {
            return section['category'] === 'image' || section['category'] === 'video';
        }).map(function (item) {
            return item;
        });
        ctrl.noMedia = ctrl.question.sections.filter(function (section) {
            return section['category'] !== 'image' && section['category'] !== 'video';
        }).map(function (item) {
            return item;
        });
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbQuestionRevisionViewDialog', []);
'use strict';

angular.module('qbQuestionRevisionViewDialog').controller('qbQuestionRevisionViewDialogController', ["$scope", "$mdDialog", "$mdToast", "$routeParams", "$location", "Util", "Version", "Question", "Notifier", "State", "User", "QB_QUESTION", function ($scope, $mdDialog, $mdToast, $routeParams, $location, util, versionService, questionService, notifier, stateService, userService, questionConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.question = {};
        ctrl.versionId = ctrl.revision.id;
        versionService.versionGet(ctrl.versionId).then(function (response) {
            ctrl.revision = response.data.data;
            ctrl.question = JSON.parse(ctrl.revision.data);
            ctrl.mainSection = ctrl.getMainSection();
            getCategory();
            splitSections();
        });
        ctrl.tinyMceOptions = util.tinyMceOptions;
    };
    ctrl.clearRevisionView = function () {
        $mdDialog.hide();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.isMainSection = function (section) {
        if (section.category == "singleResponse") {
            return true;
        } else if (section.category == "multipleResponse") {
            return true;
        } else if (section.category == "shortText") {
            return true;
        } else if (section.category == "longText") {
            return true;
        }
        return false;
    };

    ctrl.getMainSection = function () {
        var section = undefined;
        ctrl.question.sections.forEach(function (s) {
            if (ctrl.isMainSection(s)) {
                section = s;
            }
        });
        return section;
    };

    ctrl.canRestore = function () {
        return userService.isAuthor() && (ctrl.question.status === questionConstants.DRAFT || ctrl.question.status === questionConstants.DONE) || (userService.isEditor() || userService.isAdmin()) && ctrl.question.status === questionConstants.EDITORIAL;
    };

    ctrl.restore = function (event) {
        questionService.questionEdit(ctrl.question).then(function (response) {
            notifier.notify('load-restored-question', {});
            notifier.notify('load-questions-inprogress', {});
            notifier.notify('load-questions-published', {});
            notifier.notify('load-questions-retired', {});
            $mdToast.show($mdToast.simple().textContent('This version has been restored').parent(document.body).hideDelay(3000).position('top right'));
            $mdDialog.cancel();
            stateService.fetchHistory().pop();
            var ob = _.last(stateService.fetchHistory());
            if (ob) {
                $mdDialog.show(ob);
            }
        });
    };

    ctrl.showAnswer = function () {
        ctrl.showAnswerKey = !ctrl.showAnswerKey;
    };

    ctrl.hideAnswer = function () {
        ctrl.showAnswerKey = !ctrl.showAnswerKey;
    };
    ctrl.goBack = function () {
        if ($routeParams.goto) {
            $location.url($routeParams.goto);
        } else {
            util.back();
        }
    };
    /*-------- private functions ---------*/
    var getCategory = function getCategory() {
        ctrl.question.sections.forEach(function (section) {
            if (section.category === "multipleResponse") ctrl.category = "Multiple Choice";else if (section.category === "singleResponse") ctrl.category = "Single Response";else if (section.category === "shortText") ctrl.category = "Short Answer";else if (section.category === "longText") ctrl.category = "Essay";
        });
    };
    var splitSections = function splitSections() {
        ctrl.media = ctrl.question.sections.filter(function (section) {
            return section['category'] === 'image' || section['category'] === 'video';
        }).map(function (item) {
            return item;
        });
        ctrl.noMedia = ctrl.question.sections.filter(function (section) {
            return section['category'] !== 'image' && section['category'] !== 'video';
        }).map(function (item) {
            return item;
        });
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbTopicBanks', []);
'use strict';

angular.module('qbTopicBanks').component('qbTopicBanks', {
    templateUrl: 'app/minified/qb-topic-banks/qb-topic-banks.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.setDefaults();
            ctrl.getBanks();
        };
        ctrl.getBanks = function () {
            ctrl.data = {
                id: "T00890",
                description: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                banks: [{
                    id: "B00890",
                    title: "Board Review Practice questions 2016",
                    questions: 12,
                    modified: "10/10/16"
                }, {
                    id: "B00891",
                    title: "State Board Practice Exam 2014",
                    questions: 12,
                    modified: "10/10/16"
                }, {
                    id: "B00892",
                    title: "OCN Sample Test Questions",
                    questions: 12,
                    modified: "10/10/16"
                }]
            };
        };
        ctrl.setDefaults = function () {
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };

            ctrl.options = {
                rowSelection: false,
                multiSelect: false,
                autoSelect: false,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbTopicUsers', []);
'use strict';

angular.module('qbTopicUsers').component('qbTopicUsers', {
    templateUrl: 'app/minified/qb-topic-users/qb-topic-users.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.setDefaults();
            ctrl.getUsers();
        };
        ctrl.getUsers = function () {
            ctrl.data = {
                id: "T00890",
                description: "Hematologic Malignancies: Acute myeloid leukemia: Epidemiology",
                users: [{
                    id: "B00890",
                    name: "Kevin Fitzpatrick",
                    profile: "app/resources/images/placeholder-avatar.png",
                    reviewer: "Yes",
                    added: "10/10/16"
                }, {
                    id: "B00890",
                    name: "Nancy Daly",
                    profile: "app/resources/images/placeholder-avatar.png",
                    reviewer: "No",
                    added: "10/10/16"
                }, {
                    id: "B00890",
                    name: "Jamie H. Von Roenn",
                    profile: "app/resources/images/placeholder-avatar.png",
                    reviewer: "Yes",
                    added: "10/10/16"
                }]
            };
        };
        ctrl.setDefaults = function () {
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };

            ctrl.options = {
                rowSelection: false,
                multiSelect: false,
                autoSelect: false,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionEdit', ['qbQuestionDetails', 'qbQuestionTag', 'qbQuestionReferences', 'qbQuestionRevision', 'qbQuestionHistory', 'qbQuestionInformation', 'qbQuestionMore', 'qbValidationDialog']);
'use strict';

angular.module('qbQuestionEdit').component('qbQuestionEdit', {
    templateUrl: 'app/minified/qb-question-edit/qb-question-edit.template.html',
    bindings: {
        question: "<",
        view: "<",
        dialog: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "$routeParams", "$route", "Util", "Question", "User", "Media", "State", "Notifier", "QB_QUESTION", "QB_QUESTION_TYPE", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, $route, util, questionService, userService, mediaService, stateService, notifier, questionConstants, questionTypeConstants) {
        var ctrl = this;
        ctrl.currentUser = userService.getLoggedInUser();
        ctrl.$onInit = function () {
            notifier.subscribe($scope, 'load-restored-question', function (event, data) {
                ctrl.loadQuestion();
            });
            ctrl.loadQuestion();
        };
        ctrl.loadQuestion = function () {
            var load = function load() {
                var k = ctrl.question;
                if (!k.references) {
                    k.references = [];
                }
                if (!k.tags) {
                    k.tags = [];
                }
                if (!k.sections) {
                    k.sections = [{
                        category: "singleResponse",
                        position: 0
                    }];
                }
                k.sections = _.sortBy(k.sections, "position");
                getCategory();
                splitSections();
            };
            questionService.questionGet(ctrl.question.id).then(function (response) {
                angular.merge(ctrl.question, response.data.data);
                load();
            });
            if (ctrl.question.stem) {
                load();
            }
        };

        ctrl.goBack = function () {
            if ($routeParams.goto) {
                $location.url($routeParams.goto);
            } else {
                $location.url('/questions');
            }
        };
        ctrl.showSave = function () {
            if (userService.isAdmin() || userService.isEditor()) {
                return true;
            } else if (ctrl.question && ctrl.question.status != questionConstants.APPROVED) {
                return true;
            }
            return false;
        };
        ctrl.save = function () {
            var currentUser = userService.getLoggedInUser();
            ctrl.question.modifiedBy = {
                name: currentUser.name,
                id: currentUser.id,
                email: currentUser.email
            };
            ctrl.question.sections = ctrl.noMedia.concat(ctrl.media);
            ctrl.question.sections.forEach(function (d, i) {
                d.position = i;
            });
            ctrl.question.sections = _.sortBy(ctrl.question.sections, "position");
            ctrl.question.tags = _.map(ctrl.question.tags, function (t) {
                return {
                    name: t.name,
                    id: t.id,
                    taxonomy: t.taxonomy
                };
            });
            questionService.questionEdit(ctrl.question).then(function () {
                $mdToast.show($mdToast.simple().textContent('Question edited successfully').parent(document.body).hideDelay(1000).position('top right'));
                notifier.notify('load-questions-inprogress', {});
                notifier.notify('load-questions-published', {});
                notifier.notify('load-questions-retired', {});
                notifier.notify('load-assignment-details', {});
                ctrl.cancel();
            });
        };
        ctrl.saveAsDraft = function (ev) {
            ctrl.saveInProgress = true;
            ctrl.question.status = questionConstants.DRAFT;
            ctrl.save();
        };

        ctrl.saveAsFinal = function (event) {
            ctrl.validation = ctrl.checkInvalidFinal(ctrl.question);
            if (ctrl.validation.length > 0) {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-validation-dialog/qb-validation-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbValidationDialog',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        validations: ctrl.validation
                    }
                });
            } else {
                ctrl.question.status = questionConstants.DONE;
                $timeout(function () {
                    ctrl.save();
                }, 1);
            }
        };
        ctrl.updateQuestion = function (event) {
            ctrl.validation = ctrl.checkInvalidFinal(ctrl.question);
            if (ctrl.validation.length > 0) {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-validation-dialog/qb-validation-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbValidationDialog',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        validations: ctrl.validation
                    }
                });
            } else {
                $timeout(function () {
                    ctrl.save();
                }, 1);
            }
        };

        ctrl.addText = function () {
            ctrl.question.sections.push({
                category: "text",
                text: "",
                title: "",
                position: ctrl.question.sections.length
            });
            splitSections();
        };
        ctrl.addImage = function (ev) {
            var section = {
                category: "image",
                position: ctrl.question.sections.length,
                url: "",
                name: ""
            };
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };
            mediaService.mediaList(ctrl.query).then(function (response) {
                var lib = response.data.data;
                var total = response.data.count;
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-question-add-image/qb-question-add-image.template.html',
                    targetEvent: ev,
                    controller: 'questionAddImageController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        section: section,
                        lib: lib,
                        total: total
                    }
                }).then(function () {
                    ctrl.question.sections.push(section);
                    splitSections();
                });
            });
        };
        ctrl.addVideo = function (ev) {
            var section = {
                category: "video",
                position: ctrl.question.sections.length,
                url: "",
                name: ""
            };
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-add-video/qb-question-add-video.template.html',
                targetEvent: ev,
                controller: 'questionAddVideoController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    video: section
                }
            }).then(function () {
                ctrl.question.sections.push(section);
                splitSections();
            });
        };
        ctrl.checkInvalidFinal = function (question) {
            ctrl.showValidation = [];
            if (ctrl.noMedia) {
                ctrl.noMedia.forEach(function (section) {
                    if (section && (section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                        return section;
                    } else if (ctrl.isMainSectionWithChoices(section) && section.choices.length > 1) {
                        var addedChoices = _.filter(section.choices, function (d) {
                            return d.choice.length > 0;
                        });
                        var correctChoiceFilter = _.filter(section.choices, function (d) {
                            return d.correct;
                        });
                        if (question && correctChoiceFilter.length == 0) {
                            ctrl.showValidation.push({
                                name: 'choiceCorrect'
                            });
                        }
                        ;
                        if (addedChoices.length != section.choices.length) {
                            ctrl.showValidation.push({
                                name: 'NoAnswer'
                            });
                        }
                    } else if (ctrl.isMainSectionWithChoices(section) && section.choices.length < 2) {
                        ctrl.showValidation.push({
                            name: 'addChoice'
                        });
                    }
                });
            }
            ;
            if (ctrl.question && ctrl.question.references && ctrl.question.references.length == 0) ctrl.showValidation.push({
                name: 'references'
            });
            if (ctrl.question && _.isEmpty(ctrl.question.rationale)) ctrl.showValidation.push({
                name: 'rationale'
            });
            return ctrl.showValidation;
        };
        /*-------- private functions ---------*/
        var getCategory = function getCategory() {
            ctrl.question.sections.forEach(function (section) {
                if (section.category === questionTypeConstants.MULTIPLECHOICE) ctrl.category = questionTypeConstants.NAME.MULTIPLECHOICE;else if (section.category === questionTypeConstants.SINGLECHOICE) ctrl.category = questionTypeConstants.NAME.SINGLECHOICE;else if (section.category === questionTypeConstants.SHORTANSWER) ctrl.category = questionTypeConstants.NAME.SHORTANSWER;else if (section.category === questionTypeConstants.ESSAY) ctrl.category = questionTypeConstants.NAME.ESSAY;
            });
        };
        var splitSections = function splitSections() {
            ctrl.media = ctrl.question.sections.filter(function (section) {
                return section['category'] === 'image' || section['category'] === 'video';
            }).map(function (item) {
                return item;
            });
            ctrl.noMedia = ctrl.question.sections.filter(function (section) {
                return section['category'] !== 'image' && section['category'] !== 'video';
            }).map(function (item) {
                return item;
            });
        };
        ctrl.checkInValidDraft = function () {
            if (ctrl.saveInProgress) {
                return true;
            }
            if (ctrl.question) {
                return _.isEmpty(ctrl.question.question);
            }
            return false;
        };
        ctrl.checkInValidForFinal = function (question) {
            if (ctrl.checkInValidDraft()) {
                return true;
            }
            if (ctrl.question.sections) {
                var mainSection = _.find(ctrl.question.sections, function (section) {
                    return ctrl.isMainSectionWithChoices(section);
                });
                var nochoiceSection = _.find(ctrl.question.sections, function (section) {
                    return !ctrl.isMainSectionWithChoices(section);
                });
                if (nochoiceSection) {
                    return false;
                }
                if (mainSection && !mainSection.choices) {
                    return true;
                }
                if (mainSection) {
                    var answer = _.find(mainSection.choices, function (choice) {
                        return choice.correct;
                    });
                    if (answer) {
                        return false;
                    }
                }
            }
            return true;
        };
        ctrl.isMainSectionWithChoices = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE)) {
                return true;
            }
            return false;
        };
        ctrl.cancel = function () {
            $mdDialog.cancel();
            stateService.fetchHistory().pop();
            var ob = _.last(stateService.fetchHistory());
            if (ob) {
                $mdDialog.show(ob);
            }
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionEditDialog', ['qbQuestionEdit']);
'use strict';

angular.module('qbQuestionEditDialog').controller('qbQuestionEditDialogController', ["$scope", "$mdDialog", "$mdToast", "State", "User", "QB_QUESTION", function ($scope, $mdDialog, $mdToast, stateService, userService, questionConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.showSave = function () {
        if (userService.isAdmin() || userService.isEditor()) {
            return true;
        } else if (ctrl.question && ctrl.question.status != questionConstants.APPROVED) {
            return true;
        }
        return false;
    };
}]);
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbQuestionAddImage', ['md.data.table', 'ngFileUpload']);
'use strict';

angular.module('qbQuestionAddImage').controller('questionAddImageController', ["$scope", "$mdDialog", "$mdToast", "Media", "Upload", function ($scope, $mdDialog, $mdToast, mediaService, Upload) {
    var ctrl = this;
    ctrl.tabSelected = "Upload";
    ctrl.total = ctrl.total ? ctrl.total : 0;
    $scope.picFile = null;
    ctrl.selected = [];
    ctrl.searchParam = "";

    ctrl.query = {
        order: 'id',
        limit: 25,
        page: 1
    };

    ctrl.filter = {
        caption: ""
    };
    ctrl.insert = function () {
        $mdDialog.cancel();
    };

    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.onSelect = function (tab) {
        ctrl.tabSelected = tab;
        ctrl.searchParam = "";
        var filter = _.debounce(ctrl.doFilter, 500);
        $scope.$watch(function () {
            return ctrl.searchParam;
        }, function (newValue, oldValue, scope) {
            filter();
        });
    };
    ctrl.libSelect = function () {
        if (ctrl.media) {
            ctrl.callback(ctrl.media.scaled.url, { alt: ctrl.media.caption });
        }
        $mdDialog.hide();
    };
    ctrl.logPagination = function (page, limit) {
        ctrl.query.limit = limit;
        ctrl.query.page = page;
        mediaService.mediaList(ctrl.query, ctrl.filter).then(function (response) {
            ctrl.lib = response.data.data;
            ctrl.total = response.data.count;
        });
    };
    ctrl.doFilter = function () {
        ctrl.filter.caption = ctrl.searchParam;
        ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
    };
    ctrl.upload = function (file, caption) {
        $mdDialog.hide();
        $scope.picFile = null;
        caption = caption ? caption : "profileimage";
        file.upload = Upload.upload({
            url: MEDIA_URL + "upload",
            data: {
                file: file,
                caption: caption
            }
        });

        file.upload.then(function (response) {
            ctrl.callback(response.data.data.scaled.url, { alt: response.data.data.caption });
            if (response.data.status == "success") {
                $mdToast.show($mdToast.simple().textContent('Image uploaded successfully').parent(document.body).hideDelay(3000).position('top right'));
            }
        }, function (response) {}, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    ctrl.options = {
        multiSelect: true,
        autoSelect: true,
        boundaryLinks: false,
        decapitate: false,
        limitSelect: true,
        pageSelect: true
    };
}]);
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbQuestionAddVideo', ['md.data.table', 'lfNgMdFileInput']);
'use strict';

angular.module('qbQuestionAddVideo').controller('questionAddVideoController', ["$scope", "$mdDialog", "APP_CONSTANTS", function ($scope, $mdDialog, appConstants) {
    var ctrl = this;

    ctrl.insert = function ($event, form, url) {
        if (ctrl.video.url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = ctrl.video.url.match(regExp);
            if (match && match[2].length === 11) {
                ctrl.video.url = appConstants.YOUTUBE_PREFIX + match[2];
                ctrl.callback(ctrl.video.url);
                $mdDialog.hide();
            } else {
                form.url.$setValidity("pattern", false);
            }
        }
    };

    ctrl.close = function () {
        $mdDialog.cancel();
    };

    ctrl.query = {
        order: 'id',
        limit: 25,
        page: 1
    };

    $scope.$watch('files.length', function (newVal, oldVal) {
        ctrl.uploadFiles = $scope.files;
    });
}]);
'use strict';

// Define the  module

angular.module('qbQuestionAddMultiplechoice', []);
'use strict';

angular.module('qbQuestionAddMultiplechoice').component('qbQuestionAddMultiplechoice', {
    templateUrl: 'app/minified/qb-question-add-multiplechoice/qb-question-add-multiplechoice.template.html',
    bindings: {
        data: '<',
        view: '<'
    },
    controller: ["$scope", "$element", "$timeout", "Util", function ($scope, $element, $timeout, util) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if (ctrl.data.choices) {
                ctrl.data.choices.forEach(function (d) {
                    if (d.correct) ctrl.selectedChoice = d.position;
                });
            } else {
                ctrl.selectedChoice = -1;
                ctrl.data.choices = [{
                    "choice": "",
                    "correct": false,
                    "rationale": "",
                    "position": 0
                }, {
                    "choice": "",
                    "correct": false,
                    "rationale": "",
                    "position": 1
                }];
            }
            ctrl.mce = true;
            ctrl.tinyMceOptions = util.tinyMceOptions;
        };
        ctrl.dragListeners = {
            stop: function stop(e, ui) {
                var height = angular.element(ui.item[0]).height();
                ctrl.mce = false;
                angular.element(ui.item[0]).height(height);
                $timeout(function () {
                    ctrl.mce = true;
                }, 1);
            },
            handle: '.handle',
            axis: "y",
            containment: ".contain",
            scroll: true,
            scrollSensitivity: 100
        };
        ctrl.addChoice = function () {
            ctrl.data.choices.push({
                "choice": "",
                "correct": false,
                "rationale": "",
                "position": ctrl.data.choices.length
            });
        };
        ctrl.delete = function (choice) {
            var i = _.findIndex(ctrl.data.choices, {
                $$hashKey: choice.$$hashKey
            });
            ctrl.data.choices.splice(i, 1);
            if (choice.correct) ctrl.selectedChoice = -1;
            //restructure position
            ctrl.data.choices.forEach(function (d, i) {
                d.position = i;
            });
        };
        ctrl.choiceSelected = function (position) {
            _.chain(ctrl.data.choices).map(function (choice) {
                choice.correct = choice.position === position ? true : false;
                return choice;
            });
        };
    }]
});
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbQuestionDisplayText', []);
'use strict';

angular.module('qbQuestionDisplayText').component('qbQuestionDisplayText', {
    templateUrl: 'app/minified/qb-question-display-text/qb-question-display-text.template.html',
    bindings: {
        onDelete: '&',
        data: '<',
        view: '<'
    },
    controller: ["$scope", "$element", "Util", function ($scope, $element, util) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.tinyMceOptions = util.tinyMceOptions;
        };
        ctrl.delete = function () {
            ctrl.onDelete();
        };
    }]
});
'use strict';

angular.module('qbQuestionDisplayImage', ['qbQuestionImageDialog']);
'use strict';

angular.module('qbQuestionDisplayImage').component('qbQuestionDisplayImage', {
    templateUrl: 'app/minified/qb-question-display-image/qb-question-display-image.template.html',
    bindings: {
        onDelete: '&',
        data: '<',
        disabled: '<',
        view: '<'
    },
    controller: ["$scope", "$element", "$mdDialog", function ($scope, $element, $mdDialog) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if (ctrl.view === 'review') ctrl.disabled = true;
        };
        ctrl.delete = function () {
            ctrl.onDelete();
        };
        ctrl.openImageDialog = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-image-dialog/qb-question-image-dialog.template.html',
                targetEvent: ev,
                controller: 'questionImageDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    img: ctrl.data
                }
            });
        };
    }]
});
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbQuestionInformation', ['md.data.table']);
'use strict';

angular.module('qbQuestionInformation').controller('questionInformationController', ["$scope", "$mdDialog", "$filter", "User", function ($scope, $mdDialog, $filter, userService) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.information = [];
        if (userService.isAdmin() || userService.isEditor() || userService.isReviewer()) ctrl.information.push({
            content: "Status",
            data: ctrl.data.status
        });
        ctrl.information.push({
            content: "Last Modified",
            data: $filter('date')(new Date(ctrl.data.lastModificationDate), 'MM/dd/yyyy').toUpperCase()
        }, {
            content: "Created",
            data: $filter('date')(new Date(ctrl.data.creationDate), 'MM/dd/yyyy').toUpperCase()
        }, {
            content: "owner",
            data: ctrl.data.createdBy.name
        });
        if (ctrl.data.status === 'Approved') {
            ctrl.information.push({
                content: "Published",
                data: $filter('date')(new Date(ctrl.data.lastModificationDate), 'MM/dd/yyyy').toUpperCase()
            });
        }
    };

    ctrl.close = function () {
        $mdDialog.cancel();
    };

    ctrl.query = {
        order: 'id',
        limit: 25,
        page: 1
    };

    ctrl.options = {
        multiSelect: true,
        autoSelect: true,
        boundaryLinks: false,
        decapitate: false,
        limitSelect: true,
        pageSelect: true
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbCriteria', ['qbTopicList', 'qbTypeList', 'qbLevelList', 'qbTableSearchBar']);
'use strict';

angular.module('qbCriteria').controller('criteriaController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.selected = [];
    ctrl.searchParam = {};
    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.set = function () {
        $mdDialog.hide();
    };
    ctrl.isLevel = function (key) {
        if (ctrl.showLevelInCheckbox) {
            return false;
        }
        if (key == "Level") return true;
        return false;
    };
}]);
'use strict';

// Define the  module

angular.module('qbBanks', ['qbBankEditDialog', 'qbQuestionbankFilterDialog']);
'use strict';

angular.module('qbBanks').component('qbBanks', {
    templateUrl: 'app/minified/qb-banks/qb-banks.template.html',
    bindings: {
        questions: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$filter", "$timeout", "$location", "$routeParams", "User", "Bank", "State", "Notifier", function ($mdDialog, $scope, $element, $filter, $timeout, $location, $routeParams, userService, bankService, stateService, notifier) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.query = {
                size: 25,
                page: 1
            };
            ctrl.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };

            ctrl.filter = {
                // statuses: ["inProgress", "done"],
                sortBy: "lastModificationDate",
                order: "",
                customIds: [],
                questionCustomIds: []
            };

            ctrl.sortFields = [{
                field: "Modified date",
                key: "lastModificationDate"
            }, {
                field: "ID",
                key: "customId"
            }, {
                field: "Name",
                key: "name"
            }];
            ctrl.orderFields = [{
                field: "Descending",
                key: "-"
            }, {
                field: "Ascending",
                key: ""
            }];
            ctrl.selected = [];
            notifier.subscribe($scope, 'get-bank-filter', function (event, data) {
                ctrl.getFilter(event);
            });
            notifier.subscribe($scope, 'load-banks', function (event, data) {
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            });
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.sortByChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.getDateRange = function (text, startDate, endDate) {
            if (startDate && endDate) return text + " between : " + $filter('date')(new Date(startDate), "MM/dd/yyyy") + " and " + $filter('date')(new Date(endDate), "MM/dd/yyyy");
            if (startDate) return text + " from :  " + $filter('date')(new Date(startDate), "MM/dd/yyyy");
            if (endDate) return text + " till : " + $filter('date')(new Date(endDate), "MM/dd/yyyy");
        };
        ctrl.clearFilter = function () {
            ctrl.filter = {
                // statuses: ["inProgress", "done"],
                sortBy: "lastModificationDate",
                order: "",
                customIds: [],
                questionCustomIds: []
            };
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.showResult = function () {
            if (Object.keys(ctrl.filter).length > 4) {
                return true;
            }
            var flag = ctrl.filter.customIds && _.isEmpty(ctrl.filter.customIds) && ctrl.filter.questionCustomIds && _.isEmpty(ctrl.filter.questionCustomIds);
            return !flag;
        };
        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            var ob = {};
            ob.name = ctrl.filter.title ? ctrl.filter.title : "";
            ob.customIds = ctrl.filter.customIds;
            ob.questionCustomIds = ctrl.filter.questionCustomIds;
            ob.lastModifiedDate = [];
            if (ctrl.filter.lastModificationDateStart) {
                ob.lastModifiedDate.push({
                    op: "gt",
                    value: ctrl.filter.lastModificationDateStart.toISOString()
                });
            }
            if (ctrl.filter.lastModificationDateEnd) {
                ob.lastModifiedDate.push({
                    op: "lt",
                    value: ctrl.filter.lastModificationDateEnd.toISOString()
                });
            }
            ob.creationDate = [];
            if (ctrl.filter.creationDateStart) {
                ob.creationDate.push({
                    op: "gt",
                    value: ctrl.filter.creationDateStart.toISOString()
                });
            }
            if (ctrl.filter.creationDateEnd) {
                ob.creationDate.push({
                    op: "lt",
                    value: ctrl.filter.creationDateEnd.toISOString()
                });
            }
            ob.sortBy = (ctrl.filter.order || [_.first(ctrl.orderFields).key]) + (ctrl.filter.sortBy || [_.first(ctrl.sortFields).key]);
            //ob.statuses = ctrl.filter.statuses;
            if (userService.isAdmin() || userService.isEditor()) {
                // bankService.getBanks(ctrl.query).then(function(response) {
                //     ctrl.banks = response.data.data;
                //     ctrl.total = response.data.count;
                // });
                bankService.searchBanks(ctrl.query, ob).then(function (response) {
                    ctrl.banks = response.data.data;
                    ctrl.total = response.data.count;
                });
            }
        };
        ctrl.loadEditBank = function (bank, event) {
            //                    if (ctrl.questions) {
            $mdDialog.cancel();
            var currentUser = userService.getLoggedInUser();
            var ob = {
                templateUrl: 'app/minified/qb-bank-edit-dialog/qb-bank-edit-dialog.template.html',
                targetEvent: event,
                controller: 'qbBankEditDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    bank: {
                        id: bank.id,
                        createdBy: {
                            name: currentUser.name,
                            avatar: currentUser.avatar,
                            id: currentUser.id
                        },
                        questions: ctrl.questions
                    },
                    questions: ctrl.questions
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
            //                    } else
            //                        $location.url('/banks/details/' + bank.id + "?goto=" + $location.url());
        };

        ctrl.getFilter = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-questionbank-filter-dialog/qb-questionbank-filter-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionbankFilterDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    data: ctrl.filter,
                    fields: ctrl.fields,
                    selected: ctrl.selected
                }
            }).then(function () {
                ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionHistory', ['material.components.expansionPanels']);
'use strict';

angular.module('qbQuestionHistory').component('qbQuestionHistory', {
    templateUrl: 'app/minified/qb-question-history/qb-question-history.template.html',
    bindings: {
        question: "<"
    },
    controller: ["$mdDialog", "$scope", "$routeParams", "$q", "$element", "$timeout", "$location", "$mdExpansionPanel", "Util", "Question", "Log", function ($mdDialog, $scope, $routeParams, $q, $element, $timeout, $location, $mdExpansionPanel, util, questionService, loggingService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.questionId = ctrl.question.id;
            ctrl.query = {
                owner: ctrl.question.id,
                page: 1,
                size: 25
            };
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getLogList();
        };
        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            ctrl.getLogList();
        };
        ctrl.export = function (ev) {};
        ctrl.goBack = function (event) {
            if ($routeParams.goto) {
                $location.url($routeParams.goto);
            } else if (ctrl.questionId) {
                $location.url('/question-edit/' + ctrl.questionId);
            } else {
                util.back();
            }
        };
        ctrl.getLogList = function () {
            var promises = {
                logging: loggingService.getLogs(ctrl.query),
                question: questionService.questionGet(ctrl.question.id)
            };
            $q.all(promises).then(function (values) {
                ctrl.logs = values.logging.data.data;
                ctrl.question = values.question.data.data;
                var created = values.question.data.data.createdBy;
                created.description = "Created";
                created.lastModificationDate = values.question.data.data.creationDate;
                created.modifiedBy = {
                    id: values.question.data.data.createdBy.id,
                    name: values.question.data.data.createdBy.name,
                    email: values.question.data.data.createdBy.email
                };
                var modified = values.question.data.data.modifiedBy;
                modified.description = "Modified";
                modified.lastModificationDate = values.question.data.data.lastModificationDate;
                modified.modifiedBy = {
                    id: values.question.data.data.modifiedBy.id,
                    name: values.question.data.data.modifiedBy.name,
                    email: values.question.data.data.modifiedBy.email
                };
                ctrl.logs.unshift(created, modified);
                ctrl.total = ctrl.logs.length;
            });
        };
        ctrl.cancel = function () {
            $mdDialog.cancel();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionHistoryDialog', ['qbQuestionHistory']);
'use strict';

angular.module('qbQuestionHistoryDialog').controller('qbQuestionHistoryDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", function ($scope, $mdDialog, $mdToast, notifier) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbBanksMore', []);
'use strict';

angular.module('qbBanksMore').component('qbBanksMore', {
    templateUrl: 'app/minified/qb-banks-more/qb-banks-more.template.html',
    bindings: {
        id: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", function ($mdDialog, $scope, $element, $timeout, $location) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.menuItems = [{
                item: 'Revisions',
                action: ctrl.loadRevisions
            }, {
                item: 'Activity History',
                action: ctrl.activityHistory
            }, {
                item: 'Duplicate',
                action: ctrl.duplicate
            }, {
                item: 'Add to assignment',
                action: ctrl.addToAssignment
            }, {
                item: 'Submit to Editoral',
                action: ctrl.submitToEditoral
            }, {
                item: 'Metrics',
                action: ctrl.metrics
            }, {
                item: 'Transfer Ownership',
                action: ctrl.transferOwnership
            }, {
                item: 'Retire',
                action: ctrl.retire
            }];
        };
        ctrl.loadRevisions = function () {
            console.log("loadRevisions");
        };
        ctrl.activityHistory = function () {
            console.log("activityHistory");
        };
        ctrl.duplicate = function () {
            console.log("duplicate");
        };
        ctrl.addToAssignment = function () {
            console.log("addToAssignment");
        };
        ctrl.submitToEditoral = function () {
            console.log("submitToEditoral");
        };
        ctrl.metrics = function () {
            console.log("metrics");
        };
        ctrl.transferOwnership = function () {
            console.log("transferOwnership");
        };
        ctrl.retire = function () {
            console.log("retire");
        };
        ctrl.menuItemClick = function (action) {
            action();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionAddMultipleresponse', []);
'use strict';

angular.module('qbQuestionAddMultipleresponse').component('qbQuestionAddMultipleresponse', {
    templateUrl: 'app/minified/qb-question-add-multipleresponse/qb-question-add-multipleresponse.template.html',
    bindings: {
        data: '<',
        view: '<'
    },
    controller: ["$scope", "$element", "$timeout", "Util", function ($scope, $element, $timeout, util) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if (!ctrl.data.choices) {
                ctrl.data.choices = [{
                    "choice": "",
                    "correct": false,
                    "rationale": "",
                    "position": 0
                }, {
                    "choice": "",
                    "correct": false,
                    "rationale": "",
                    "position": 1
                }];
            }
            ctrl.mce = true;
            ctrl.tinyMceOptions = util.tinyMceOptions;
        };

        ctrl.dragListener = {
            stop: function stop(e, ui) {
                var height = angular.element(ui.item[0]).height();
                ctrl.mce = false;
                angular.element(ui.item[0]).height(height);
                $timeout(function () {
                    ctrl.mce = true;
                }, 1);
            },
            handle: '.handle',
            axis: "y",
            containment: ".qbox",
            scroll: true,
            scrollSensitivity: 100
        };

        ctrl.addChoice = function () {
            ctrl.data.choices.push({
                "choice": "",
                "correct": false,
                "rationale": "",
                "position": ctrl.data.choices.length
            });
        };
        ctrl.delete = function (response) {
            var i = _.findIndex(ctrl.data.choices, {
                $$hashKey: response.$$hashKey
            });
            ctrl.data.choices.splice(i, 1);
        };
        ctrl.responseSelected = function (choice) {
            if (ctrl.view !== 'review') choice.correct = !choice.correct;
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionAddShortanswer', []);
'use strict';

angular.module('qbQuestionAddShortanswer').component('qbQuestionAddShortanswer', {
    templateUrl: 'app/minified/qb-question-add-shortanswer/qb-question-add-shortanswer.template.html',
    bindings: {
        data: '<',
        view: '<'
    },
    controller: ["$scope", "$element", "Util", function ($scope, $element, util) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.data.position = "4";
            ctrl.tinyMceOptions = util.tinyMceOptions;
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionAddEssay', []);
'use strict';

angular.module('qbQuestionAddEssay').component('qbQuestionAddEssay', {
    templateUrl: 'app/minified/qb-question-add-essay/qb-question-add-essay.template.html',
    bindings: {
        data: '<',
        view: '<'
    },
    controller: ["$scope", "$element", "Util", function ($scope, $element, util) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.data.position = "4";
            ctrl.tinyMceOptions = util.tinyMceOptions;
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignees', ['qbUsersSelect']);
'use strict';

angular.module('qbAssignees').component('qbAssignees', {
    templateUrl: 'app/minified/qb-assignees/qb-assignees.template.html',
    bindings: {
        assignment: "=",
        items: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$filter", "User", "Assignment", "QB_USER", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $route, $location, $filter, userService, assignmentService, userConstants, assigneeConstants, assignmentKind) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.searchParam = "";
            ctrl.query = {
                sort: 'id',
                limit: 25,
                page: 1,
                status: userConstants.ACTIVE
            };
            ctrl.allUsers = [];
            ctrl.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
        };
        ctrl.logPagination = function (page, limit, search) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.searchParam = search || "";
            ctrl.addAssignees();
        };
        ctrl.addAssignees = function (event) {
            if (ctrl.assignment.kind === assignmentKind.QUESTION_CREATE || ctrl.assignment.kind === assignmentKind.QUESTION_REVISION) {
                assignmentService.authorUserList(ctrl.query, ctrl.searchParam).then(function (response) {
                    setAssignees(event, response.data);
                });
            } else if (ctrl.assignment.kind === assignmentKind.QUESTION_REVIEW) {
                assignmentService.reviewerUserList(ctrl.query, ctrl.searchParam).then(function (response) {
                    setAssignees(event, response.data);
                });
            } else {
                $mdDialog.show($mdDialog.alert().title("Please select an assignment type").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {});
            }
        };
        ctrl.removeData = function (dataArray, arrayItem) {
            dataArray.splice(dataArray.indexOf(arrayItem), 1);
        };
        var setAssignees = function setAssignees(event, response) {
            ctrl.allUsers = response.data;
            ctrl.count = response.count;
            if (event) initDialog(event);
        };
        var initDialog = function initDialog(event) {
            var selected = angular.copy(ctrl.assignment.assignees ? ctrl.assignment.assignees : []);
            var logPagination = function logPagination() {
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit, ctrl.searchParam);
            };
            $mdDialog.show({
                templateUrl: 'app/minified/qb-users-select/qb-users-select.template.html',
                targetEvent: event,
                controller: 'usersSelectController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    data: ctrl.allUsers,
                    selected: selected,
                    searchParam: ctrl.searchParam,
                    parent: ctrl,
                    logPagination: logPagination
                }
            }).then(function () {
                ctrl.assignment.assignees = selected.map(function (user) {
                    var obj = {};
                    obj.id = user.id;
                    obj.name = user.name;
                    obj.status = assigneeConstants.DRAFT;
                    return obj;
                });
            }).finally(function () {
                ctrl.searchParam = "";
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionAnswerkey', ['qbQuestionAddRationale']);
'use strict';

angular.module('qbQuestionAnswerkey').component('qbQuestionAnswerkey', {
    templateUrl: 'app/minified/qb-question-answerkey/qb-question-answerkey.template.html',
    bindings: {
        data: '<',
        answer: '=',
        referrer: "<",
        question: '<'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", function ($mdDialog, $scope, $element, $timeout, $location) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if (ctrl.data.choices) ctrl.selectedChoice = ctrl.data.choices.findIndex(function (d) {
                return d.correct;
            });else ctrl.selectedChoice = -1;
        };
        ctrl.addRationale = function (event, choice) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-add-rationale/qb-question-add-rationale.template.html',
                targetEvent: event,
                locals: {
                    data: {
                        choice: choice
                    }
                },
                controller: 'qbQuestionAddRationaleController',
                controllerAs: '$ctrl',
                bindToController: true
            });
        };
        ctrl.choiceSelected = function (choice) {
            ctrl.data.choices.forEach(function (d) {
                d.correct = false;
            });
            choice.correct = true;
        };
        ctrl.responseSelected = function (choice) {
            choice.correct = !choice.correct;
        };
        ctrl.loadEditQuestion = function () {
            ctrl.answer = !ctrl.answer;
        };
        ctrl.deleteRationale = function (choice) {
            choice.rationale = "";
        };
    }]
});
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbQuestionAddRationale', []);
'use strict';

angular.module('qbQuestionAddRationale').controller('qbQuestionAddRationaleController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.save = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbTopicList', []);
'use strict';

angular.module('qbTopicList').component('qbTopicList', {
    templateUrl: 'app/minified/qb-topic-list/qb-topic-list.template.html',
    bindings: {
        data: "<",
        filter: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
        ctrl.$onInit = function () {};
    }]
});
'use strict';

// Define the  module

angular.module('qbTypeList', []);
'use strict';

angular.module('qbTypeList').component('qbTypeList', {
    templateUrl: 'app/minified/qb-type-list/qb-type-list.template.html',
    bindings: {
        data: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
    }]
});
'use strict';

// Define the  module

angular.module('qbLevelList', []);
'use strict';

angular.module('qbLevelList').component('qbLevelList', {
    templateUrl: 'app/minified/qb-level-list/qb-level-list.template.html',
    bindings: {
        data: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
        ctrl.$onInit = function () {
            _.chain(ctrl.data).map(function (level) {
                if (level.selected) ctrl.selectedLevel = level.id;
                return level;
            });
        };
        ctrl.levelSelected = function (id) {
            _.chain(ctrl.data).map(function (level) {
                level.selected = level.id === id ? true : false;
                return level;
            });
        };
        ctrl.$onInit();
    }]
});
'use strict';

// Define the `qbLogin` module

angular.module('qbLogin', ['qbForgotPassword']);
'use strict';

angular.module('qbLogin').component('qbLogin', {
    templateUrl: 'app/minified/qb-login/qb-login.template.html',
    controller: ["$scope", "$mdToast", "$location", "$routeParams", "State", "User", "Configuration", function ($scope, $mdToast, $location, $routeParams, stateService, userService, configurationService) {
        var ctrl = this;
        ctrl.user = {};
        ctrl.login = function (form) {
            form.email.$touched = true;
            form.password.$touched = true;
            if (form.$valid) userService.userLogin(ctrl.user).then(function (response) {
                if (response.data.status == 'success') {
                    userService.setLoggedInUser(response.data.data);
                    ctrl.goto();
                    stateService.clearState();
                }
            }, function () {
                ctrl.user.password = '';
            });
        };
        ctrl.goto = function () {
            $location.url('/');
        };
        ctrl.redirectToForgot = function () {
            $location.url('/forgot-password');
        };

        ctrl.getHeaderImage = function () {
            var config = configurationService.getConfig();
            return _.find(config, {
                name: "Header"
            });
        };

        ctrl.FooterText = function () {
            var config = configurationService.getConfig();
            return _.find(config, {
                name: "Footer"
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbBankInfo', []);
'use strict';

angular.module('qbBankInfo').controller('bankInfoController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.set = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

angular.module('core.user', ['ngResource']);
'use strict';

angular.module('core.user').factory('User', ['$q', '$http', '$resource', '$rootScope', function ($q, $http, $resource, $rootScope) {
    var me = {
        emailExists: emailExists,
        userList: userList,
        userCreate: userCreate,
        userGet: userGet,
        userEdit: userEdit,
        userLogin: userLogin,
        userLogout: userLogout,
        setLoggedInUser: setLoggedInUser,
        getLoggedInUser: getLoggedInUser,
        clearLoggedInUser: clearLoggedInUser,
        resetPassword: resetPassword,
        forgotPassword: forgotPassword,
        isAdmin: isAdmin,
        isEditor: isEditor,
        isReviewer: isReviewer,
        isAuthor: isAuthor,
        changePassword: changePassword,
        getLoggedInUserInfo: getLoggedInUserInfo,
        isFirstLogin: isFirstLogin,
        getSSOUserInfo: getSSOUserInfo
    };
    return me;
    function getSSOUserInfo() {
        var deferred = $q.defer();
        jQuery.ajax({
            type: "GET",
            url: SSO_SESSION_CHECK,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            xhrFields: {
                withCredentials: true
            }
        }).then(function (data, textStatus, jqXHR) {
            delete jqXHR.then;
            debugger;
            console.log(data);
            var info = userSSOInfo(data.id);
            info.then(function (data) {
                console.log(data);
            });
            //make call to server for logged in user
            //on success do Notification.getNotificationsInfo();

            deferred.reject(jqXHR);
        }, function (jqXHR) {
            delete jqXHR.then;
            window.location.href = SSO_LOGIN + "?target=" + window.encodeURIComponent(window.location.href);
            deferred.reject(jqXHR);
        });
        return deferred.promise;
    }
    function userSSOInfo(sessionID) {
        return jQuery.ajax({
            type: "GET",
            url: SSO_API + sessionID,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": "fb6087406dc4454b8a93de34fb8fbb7b"
            }
        });
    }
    function userSSOLogout(sessionID) {
        return jQuery.ajax({
            type: "DELETE",
            url: SSO_API + sessionID,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            xhrFields: {
                withCredentials: true
            }
        });
    }

    function getLoggedInUserInfo() {
        if (me.user) {
            return me.user;
        }
        var deferred = $q.defer();
        var usr = getLoggedInUser();
        userGet(usr.id).then(function (r) {
            me.user = r.data.data;
            me.user.jwt = me.user.jwt || getStoredUser().jwt;
            deferred.resolve(me.user);
        }, function () {
            delete me.user;
            deferred.reject();
        });
        return deferred.promise;
    }

    function setLoggedInUser(user) {
        if (user) {
            if (isStorageSupported()) {
                localStorage.setItem("astutech", JSON.stringify({
                    id: user.id,
                    jwt: user.jwt
                }));
            } else {
                $rootScope.user = JSON.stringify(JSON.stringify({
                    id: user.id,
                    jwt: user.jwt
                }));
            }
            me.user = user;
        }
    }

    function getLoggedInUser() {
        var str = undefined;
        if (me.user) {
            return angular.copy(me.user);
        }
        return getStoredUser();
    }

    function getStoredUser() {
        if (isStorageSupported()) {
            return JSON.parse(localStorage.getItem("astutech"));
        } else if ($rootScope.user) {
            return JSON.parse($rootScope.user);
        }
    }

    function isAdmin() {
        var user = me.user;
        if (user) {
            return _.find(user.roles, {
                name: "Admin"
            }) ? true : false;
        }
        return false;
    }

    function isEditor() {
        var user = me.user;
        if (user) {
            return _.find(user.roles, {
                name: "Editor"
            }) ? true : false;
        }
        return false;
    }

    function isReviewer() {
        var user = me.user;
        if (user) {
            return _.find(user.roles, {
                name: "Reviewer"
            }) ? true : false;
        }
        return false;
    }

    function isAuthor() {
        var user = me.user;
        if (user) {
            return _.find(user.roles, {
                name: "Author"
            }) ? true : false;
        }
        return false;
    }

    function clearLoggedInUser() {
        delete me.user;
        if (isStorageSupported()) {
            localStorage.removeItem("astutech");
        } else {
            $rootScope.user = undefined;
        }
        $rootScope.login = $rootScope.loggedIn = false;
    }

    function userGet(id) {
        return $http.get(USER_URL + id);
    }

    function userList(query) {
        return $http({
            method: "GET",
            url: USER_URL,
            params: query
        });
    }

    function userEdit(user) {
        return $http.put(USER_URL, user);
    }

    function userCreate(user) {
        return $http({
            method: 'POST',
            url: USER_URL,
            data: user,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    function userLogin(user) {
        return $http({
            method: 'POST',
            url: USER_URL + 'login',
            data: user,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    function userLogout() {
        return $http({
            method: 'POST',
            url: USER_URL + 'logout',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    function emailExists(query) {
        return $http({
            method: "GET",
            url: USER_URL + "exists",
            params: query
        });
    }

    function resetPassword(user) {
        return $http({
            method: 'PUT',
            url: USER_URL + "reset",
            data: user,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    function forgotPassword(user) {
        return $http({
            method: 'POST',
            url: USER_URL + "forgot-password",
            data: user,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    function isStorageSupported() {
        try {
            localStorage.setItem("support", "");
            localStorage.removeItem("support");
            return true;
        } catch (err) {
            return false;
        }
    }

    function changePassword(change) {
        return $http({
            method: 'POST',
            url: USER_URL + "change-password",
            data: change,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    function isFirstLogin() {
        var user = me.user;
        if (user) {
            if (user.lastLogin) return false;
            return true;
        }
        return false;
    }
    /*
     * Helper function for setting a local session cookie.
     */
    function setSessionCookie(sessionId) {
        console.log("setting session cookie for [" + sessionId + "]");
        document.cookie = "sid=" + sessionId + ";  path=/; domain=" + document.domain;
    }

    /*
     * Helper function for removing a local session cookie.
     */
    function removeSessionCookie() {
        console.log("removing session cookie");
        document.cookie = "sid=;  path=/; domain=" + document.domain + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
}]);
'use strict';

angular.module('core.media', ['ngResource']);
'use strict';

angular.module('core.media').factory('Media', ['$http', '$resource', function ($http, $resource) {
    return {
        mediaList: mediaList,
        mediaGet: mediaGet,
        getExports: getExports,
        getGuide: getGuide,
        guideList: guideList
    };

    function mediaList(params, payload) {
        return $http({
            method: "POST",
            url: MEDIA_URL + "filter",
            data: payload,
            params: params
        });
    };

    function mediaGet(id) {
        return $http.get(MEDIA_URL + id);
    };

    function getExports(id) {
        return $http({
            method: "GET",
            url: MEDIA_ORCHESTRATOR_URL + "exports/question-bank/" + id
        });
    };

    function getGuide(id) {
        return $http.get(EXPORT_URL + id);
    };

    function guideList(params) {
        return $http({
            method: "GET",
            url: EXPORT_URL + "assignment-guide",
            params: params
        });
    };
}]);
'use strict';

angular.module('core.state', ['ngResource']);
'use strict';

angular.module('core.state').factory('State', ['$http', '$resource', function ($http, $resource) {
    var me = this;
    return {
        fetchState: fetchState,
        getStateFor: getStateFor,
        clearState: clearState,
        fetchHistory: fetchHistory,
        clearHistory: clearHistory
    };
    function fetchHistory() {
        me.history = me.history || [];
        return me.history;
    }
    function clearHistory() {
        me.history = [];
    }

    function fetchState() {
        me.state = me.state || {};
        return me.state;
    }
    function getStateFor(key) {
        fetchState()[key] = fetchState()[key] || {};
        return fetchState()[key];
    }
    function clearState() {
        me.state = {};
    }
}]);
'use strict';

// Define the  module

angular.module('qbCriteriaAdd', ['qbCriteria']);
'use strict';

angular.module('qbCriteriaAdd').component('qbCriteriaAdd', {
    templateUrl: 'app/minified/qb-criteria-add/qb-criteria-add.template.html',
    bindings: {
        criteria: "=",
        all: "="
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$filter", "Tag", function ($mdDialog, $scope, $element, $timeout, $route, $location, $filter, tagService) {
        var ctrl = this;
        ctrl.$onInit = function () {};

        ctrl.removeData = function (dataArray, arrayItem) {
            dataArray.splice(dataArray.indexOf(arrayItem), 1);
            _.forEach(ctrl.all[arrayItem.taxonomy].data.data, function (a) {
                if (a.id == arrayItem.id) {
                    a.selected = false;
                }
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionList', []);
'use strict';

angular.module('qbQuestionList').component('qbQuestionList', {
    templateUrl: 'app/minified/qb-question-list/qb-question-list.template.html',
    bindings: {
        data: "<",
        sq: "<",
        referrer: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", function ($mdDialog, $scope, $element, $timeout, $filter) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.selected = {};
        };

        ctrl.onQuestionSelect = function () {
            ctrl.sq.selected = ctrl.selected;
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentReview', ['qbQuestionList']);
'use strict';

angular.module('qbAssignmentReview').controller('assignmentReviewController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.$onInit = function () {
        var filter = _.debounce(ctrl.doFilter, 500);
        $scope.$watch(function () {
            return ctrl.parent.searchParam;
        }, function (newValue, oldValue, scope) {
            filter();
        });
    };
    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.addItems = function () {
        $mdDialog.hide();
    };
    ctrl.doFilter = function () {
        ctrl.parent.logPagination(ctrl.parent.query.page, ctrl.parent.query.limit, ctrl.parent.searchParam);
    };
    ctrl.$onInit();
}]);
'use strict';

angular.module('core.role', ['ngResource']);
'use strict';

angular.module('core.role').factory('Role', ['$http', '$resource', function ($http, $resource) {
    return {
        getList: getList
    };
    function getList() {
        return $http.get(ROLE_URL);
    };
}]);
'use strict';

angular.module('core.tag', ['ngResource']);
'use strict';

angular.module('core.tag').factory('Tag', ['$http', '$resource', function ($http, $resource) {
    return {
        getClass: getClass,
        getTaxonomies: getTaxonomies
    };
    function getClass() {
        return $http.get(TAG_URL + "class/questions");
    };
    function getTaxonomies(parent_id) {
        return $http.get(TAG_URL + "taxonomies/" + parent_id);
    };
}]);
'use strict';

// Define the  module

angular.module('qbLogout', []);
'use strict';

angular.module('qbLogout').component('qbLogout', {
    templateUrl: 'app/minified/qb-logout/qb-logout.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "Role", "$location", "State", "User", function ($mdDialog, $scope, $element, $timeout, roleService, $location, stateService, userService) {
        var ctrl = this;
        ctrl.$onInit = function () {};
        ctrl.logoutPrompt = function (event) {
            var confirm = $mdDialog.confirm().title('Are you sure you want to logout?').ariaLabel('Logout').targetEvent(event).ok('LOGOUT').cancel('CANCEL');

            $mdDialog.show(confirm).then(function () {

                logout();
            });
        };

        function logout() {
            var user = userService.getLoggedInUser();
            userService.userLogout().then(function (d) {
                userService.clearLoggedInUser();
                $location.url('/');
                if (SSO) {
                    userService.userSSOLogout();
                }
            }, function () {
                userService.clearLoggedInUser();
                $location.url('/');
                if (SSO) {
                    userService.userSSOLogout();
                }
            });
        }
    }]
});
'use strict';

// Define the  module

angular.module('qbUsersSelect', []);
'use strict';

angular.module('qbUsersSelect').controller('usersSelectController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.$onInit = function () {
        var filter = _.debounce(ctrl.doFilter, 500);
        $scope.$watch(function () {
            return ctrl.parent.searchParam;
        }, function (newValue, oldValue, scope) {
            filter();
        });
        $scope.$watchCollection("$ctrl.parent.allUsers", function () {
            if (!ctrl.data) {
                return;
            }
            ctrl.parent.allUsers.forEach(function (d) {
                d.selected = false;
            });
            ctrl.selected.forEach(function (item) {
                var selection = _.find(ctrl.parent.allUsers, {
                    id: item.id
                });
                if (selection) selection.selected = true;
            });
        });
    };
    ctrl.changed = function (user) {
        if (user.selected) {
            var selection = _.find(ctrl.selected, {
                id: user.id
            });
            if (!selection) {
                ctrl.selected.push(user);
            }
        } else {
            var selectionIndex = _.findIndex(ctrl.selected, {
                id: user.id
            });
            if (selectionIndex >= 0) {
                ctrl.selected.splice(selectionIndex, 1);
            }
        }
    };
    ctrl.addUsers = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.doFilter = function () {
        ctrl.logPagination();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbAssignments', ['qbAssignmentsAssignedByMe', 'qbAssignmentsDone', 'qbAssignmentsToDo', 'qbAssignmentDetails', 'qbAssignmentsAssignedByOthers', 'qbAssignmentFilterDialog', 'qbAssignmentsSubmitted', 'qbAssignmentsFilterResults']);
'use strict';

angular.module('qbAssignments').component('qbAssignments', {
    templateUrl: 'app/minified/qb-assignments/qb-assignments.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$filter", "$timeout", "$location", "$routeParams", "User", "Notifier", "State", "Assignment", "QB_USER", "QB_USER_ROLES", "QB_ASSIGNEE", "QB_ASSIGNMENT", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $filter, $timeout, $location, $routeParams, userService, notifier, stateService, assignmentService, userConstants, userRoles, assigneeStatus, assignmentConstants, assignmentKind) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.filterEnabled = false;
            ctrl.selectedIndex = _.isNumber(stateService.getStateFor("assignmentTab").index) ? stateService.getStateFor("assignmentTab").index : 0;
            ctrl.showAssignedByMe = userService.isAdmin() || userService.isEditor();
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isEditor = userService.isEditor();
            ctrl.state = "todo";
            ctrl.sortItems = [{
                value: 'customId',
                name: 'Assignment ID'
            }, {
                value: 'name',
                name: 'Title'
            }, {
                value: 'description',
                name: 'Description'
            }, {
                value: 'kind',
                name: 'Assignment Type'
            }, {
                value: 'status',
                name: 'Assignment Status'
            }, {
                value: 'lastModificationDate',
                name: 'Last Modified Date'
            }, {
                value: 'creationDate',
                name: 'Creation Date'
            }, {
                value: 'dueDate',
                name: 'Due Date'
            }, {
                value: 'assignees',
                name: 'Assignees'
            }];

            ctrl.searchFilterFields = { customIds: {
                    field: "ID",
                    key: "customIds",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, name: {
                    field: "Title",
                    key: "name",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, description: {

                    field: "Description",
                    key: "description",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, kind: {
                    field: "Assignment Type",
                    key: "kind",
                    allow: [userRoles.ADMIN, userRoles.EDITOR],
                    visible: isVisible,
                    selected: isSelected
                }, statuses: {
                    field: "Status",
                    key: "statuses",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, lastModifiedDate: {
                    field: "Last Modified",
                    key: "lastModifiedDate",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, creationDate: {
                    field: "Creation Date",
                    key: "creationDate",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, dueDate: {
                    field: "Due Date",
                    key: "dueDate",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, completedDate: {
                    field: "Completed Date",
                    key: "completedDate",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                }, assignees: {
                    field: "Assignees",
                    key: "assignees",
                    allow: [userRoles.ADMIN, userRoles.EDITOR],
                    visible: isVisible,
                    selected: isSelected
                }, assignors: {
                    field: "Assignors",
                    key: "assignors",
                    allow: [userRoles.ADMIN, userRoles.EDITOR],
                    visible: isVisible,
                    selected: isSelected
                }, sortBy: {
                    field: "Sort By",
                    key: "sortBy",
                    allow: [userRoles.ADMIN, userRoles.EDITOR, userRoles.AUTHOR, userRoles.REVIEWER],
                    visible: isVisible,
                    selected: isSelected
                } };
            ctrl.query = {
                user: {
                    sort: 'id',
                    status: userConstants.ACTIVE
                }
            };
            resetFilter();
            ctrl.urlParams = {
                page: 1,
                size: 25
            };
            var assignmentId = $routeParams.id ? $routeParams.id : null;
            if (assignmentId) {
                console.log("calllllllllllllllllllleeeeeeeeeeeeeed");
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: {
                            id: assignmentId
                        },
                        assignmentId: assignmentId,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
            ctrl.sort = {
                order: "-",
                sortByValue: "creationDate",
                orderFields: [{
                    field: "Ascending",
                    key: ""
                }, {
                    field: "Descending",
                    key: "-"
                }]
            };
        };
        ctrl.loadTab = function (tab) {
            $location.url('/assignments/' + tab);
        };
        ctrl.assignedByMe = function () {
            ctrl.state = "assignedByMe";
            stateService.getStateFor("assignmentTab").index = 1;
            notifier.notify('load-assignment-assigned-by-me', {});
        };
        ctrl.assignedByOthers = function () {
            ctrl.state = "assignedByOthers";
            stateService.getStateFor("assignmentTab").index = 2;
            notifier.notify('load-assignment-assigned-by-others', {});
        };
        ctrl.submitted = function () {
            ctrl.state = "submitted";
            if (!(ctrl.isAdmin || ctrl.isEditor)) stateService.getStateFor("assignmentTab").index = 1;
            notifier.notify('load-assignment-submitted', {});
        };
        ctrl.toDo = function () {
            ctrl.state = "todo";
            stateService.getStateFor("assignmentTab").index = 0;
            notifier.notify('load-assignments-to-do', {});
        };
        ctrl.done = function () {
            ctrl.state = "done";
            if (ctrl.isAdmin || ctrl.isEditor) stateService.getStateFor("assignmentTab").index = 3;else {
                stateService.getStateFor("assignmentTab").index = 2;
            }
            notifier.notify('load-assignments-done', {});
        };
        ctrl.refreshTab = function (state) {
            if (state) ctrl.state = state;
            if (ctrl.state === "todo") ctrl.toDo();else if (ctrl.state === "assignedByMe") ctrl.assignedByMe();else if (ctrl.state === "assignedByOthers") ctrl.assignedByOthers();else if (ctrl.state === "done") ctrl.done();else {
                ctrl.submitted();
            }
        };
        ctrl.filterTab = function (event) {
            ctrl.selected = [];
            $mdDialog.show({
                templateUrl: 'app/minified/qb-assignment-filter-dialog/qb-assignment-filter-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentFilterDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    stateObject: ctrl.stateObject,
                    presets: ctrl.presets,
                    assignmentFilter: ctrl.assignmentFilter,
                    filter: ctrl.filter,
                    searchFilterFields: ctrl.searchFilterFields,
                    sort: ctrl.sort
                }
            }).then(function () {});
        };
        ctrl.filter = function () {
            ctrl.assignmentFilter.lastModifiedDate = setDates(ctrl.presets.lastModifiedDate);
            ctrl.assignmentFilter.creationDate = setDates(ctrl.presets.creationDate);
            ctrl.assignmentFilter.dueDate = setDates(ctrl.presets.dueDate);
            ctrl.assignmentFilter.completedDate = setDates(ctrl.presets.completedDate);
            ctrl.assignmentFilter.customIds = _.pluck(ctrl.presets.selectedModels.customIds, "value");
            ctrl.assignmentFilter.assignees = _.pluck(ctrl.presets.selectedModels.assignees, "id");
            ctrl.assignmentFilter.assignors = _.pluck(ctrl.presets.selectedModels.assignors, "id");
            assignmentService.filter(ctrl.urlParams, ctrl.assignmentFilter).then(function (response) {
                ctrl.filterEnabled = true;
                ctrl.count = response.data.count;
                ctrl.assignments = response.data.data;
                ctrl.assignments.forEach(function (assignment) {
                    ctrl.getProgress(assignment);
                    assignment.notDone = 0;
                    assignment.done = 0;
                    if (assignment.status === 'Draft') {} else {
                        assignment.assignees.forEach(function (assignee) {
                            if (assignee.status === assigneeStatus.DRAFT) assignment.notDone++;else if (assignee.status === assigneeStatus.SUBMITTED || assignee.status === assigneeStatus.COMPLETE) assignment.done++;
                        });
                    }
                });
                $mdDialog.cancel();
            });
        };
        ctrl.getDateRange = function (text, startDate, endDate) {
            if (startDate && endDate) return text + " between " + $filter('date')(new Date(startDate), "MM/dd/yyyy") + " and " + $filter('date')(new Date(endDate), "MM/dd/yyyy");
            if (startDate) return text + " from " + $filter('date')(new Date(startDate), "MM/dd/yyyy");
            if (endDate) return text + " till " + $filter('date')(new Date(endDate), "MM/dd/yyyy");
        };
        ctrl.clearFilter = function () {
            resetFilter();
            ctrl.filterEnabled = false;
            ctrl.refreshTab(ctrl.state);
        };
        ctrl.changeFilter = function (event) {
            ctrl.filterTab(event);
        };
        ctrl.sortBy = function (option, event) {
            ctrl.assignmentFilter.sortBy.push(option.value);
            ctrl.filter();
        };

        ctrl.isCompleted = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.isOpen = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.OPEN;else return false;
        };
        ctrl.isDraft = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.DRAFT;else return false;
        };
        ctrl.isSubmitted = function (assignment) {
            if (assignment.assignees) return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.SUBMITTED;
            }) ? true : false;else return false;
        };
        ctrl.getAssignmentStatus = function (assignment) {
            if (assignment) {
                if (ctrl.isSubmitted(assignment)) {
                    return {
                        status: "SUBMITTED",
                        date: ctrl.isSubmitted(assignment).updatedDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status === assignmentConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignment.completionDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status == assignmentConstants.OPEN) {
                    return {
                        status: "DUE",
                        date: assignment.dueDate,
                        cls: "due-date"
                    };
                } else if (assignment.status === assignmentConstants.DRAFT) {
                    return {
                        status: "UNASSIGNED",
                        date: "",
                        cls: "due-date"
                    };
                }
            }
        };

        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE && userService.isAuthor()) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW && userService.isReviewer()) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                    });
                } else if (assignment.kind == assignmentKind.QUESTION_REVISION && userService.isAuthor()) {
                    assignment.total = assignment.done = assignment.items.length;
                }
            }
        };
        ctrl.openAssignmentLabel = function (assignment, open, beginReview, writeMCQ) {
            if ((assignment.kind === assignmentKind.QUESTION_CREATE || assignment.kind === assignmentKind.QUESTION_REVISION) && ctrl.hasAssignee(assignment)) {
                return writeMCQ;
            }
            if (assignment.kind === assignmentKind.QUESTION_REVIEW && ctrl.hasAssignee(assignment)) {
                return beginReview;
            } else {
                //case for admin/editor
                return open;
            }
        };
        ctrl.hasAssignee = function (assignment) {
            return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id;
            }) ? true : false;
        };
        ctrl.loadDetails = function (assignment, event) {
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentCreateDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: assignment,
                        items: assignment.items
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            } else {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignmentId: assignment.id,
                        assignment: assignment,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };
        ctrl.getClass = function (assignment) {
            var status = ctrl.getAssignmentStatus(assignment);
            return ctrl.addColor(assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function (assignment) {
            if (assignment) {
                var data = ctrl.getAssignmentStatus(assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function (assignment) {
            if (ctrl.isKindQuestionedit(assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(assignment)) {
                return "assignment-review";
            }
        };

        var getAssignors = function getAssignors() {
            if (userService.isAdmin() || userService.isEditor()) {
                assignmentService.adminUserList(ctrl.query.user).then(function (response) {
                    ctrl.presets.assignors = _.uniq(_.union(ctrl.presets.assignors, response.data.data), _.property('id'));
                });
                assignmentService.editorUserList(ctrl.query.user).then(function (response) {
                    ctrl.presets.assignors = _.uniq(_.union(ctrl.presets.assignors, response.data.data), _.property('id'));
                });
            }
        };
        var getAssignees = function getAssignees() {
            if (userService.isAdmin() || userService.isEditor()) {
                assignmentService.authorUserList(ctrl.query.user).then(function (response) {
                    ctrl.presets.assignees = _.uniq(_.union(ctrl.presets.assignees, response.data.data), _.property('id'));
                });

                assignmentService.reviewerUserList(ctrl.query.user).then(function (response) {
                    ctrl.presets.assignees = _.uniq(_.union(ctrl.presets.assignees, response.data.data), _.property('id'));
                });
            }
        };
        var setDates = function setDates(model) {
            var result = [];
            if (model.startDate) result.push({
                op: "gte",
                value: model.startDate.toISOString()
            });
            if (model.endDate) result.push({
                op: "lte",
                value: model.endDate.toISOString()
            });
            return result;
        };
        var isVisible = function isVisible(item) {
            return userService.isAdmin() && _.contains(ctrl.searchFilterFields[item].allow, userRoles.ADMIN) || userService.isEditor() && _.contains(ctrl.searchFilterFields[item].allow, userRoles.EDITOR) || userService.isAuthor() && _.contains(ctrl.searchFilterFields[item].allow, userRoles.AUTHOR) || userService.isReviewer() && _.contains(ctrl.searchFilterFields[item].allow, userRoles.REVIEWER);
        };
        var isSelected = function isSelected(item) {
            return !_.isEmpty(ctrl.assignmentFilter[item]);
        };
        var resetFilter = function resetFilter() {
            ctrl.assignmentFilter = {
                customIds: [],
                name: "",
                description: "",
                kind: [],
                statuses: [],
                lastModifiedDate: [],
                creationDate: [],
                dueDate: [],
                completedDate: [],
                assignees: [],
                assignors: []
            };
            ctrl.presets = {
                customIds: [],
                assignees: [],
                assignors: [],
                lastModifiedDate: {},
                creationDate: {},
                dueDate: {},
                completedDate: {},
                selectedModels: {
                    customIds: [],
                    assignees: [],
                    assignors: []
                }
            };
            getAssignors();
            getAssignees();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsToDo', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsToDo').component('qbAssignmentsToDo', {
    templateUrl: 'app/minified/qb-assignments-to-do/qb-assignments-to-do.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "User", "Assignment", "Review", "Notification", "Notifier", "State", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", "QB_ASSIGNMENT", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, $route, userService, assignmentService, reviewService, notificationService, notifier, stateService, assigneeStatus, assignmentKind, assignmentConstants, notificationConstants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            ctrl.query = {
                sort: stateService.getStateFor("todoAssignments").sort || '-creationDate',
                limit: stateService.getStateFor("todoAssignments").limit || 25,
                page: stateService.getStateFor("todoAssignments").page || 1
            };
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getAssignments();
            notifier.subscribe($scope, 'load-assignments-to-do', function (event, data) {
                ctrl.getAssignments();
            });
            ctrl.constants = assignmentKind;
            ctrl.sortByValue = {};
            ctrl.assignmentFilter = {
                customIds: [],
                name: "",
                description: "",
                kind: [],
                statuses: ['Todo'],
                lastModifiedDate: [],
                creationDate: [],
                dueDate: [],
                completedDate: [],
                assignees: [],
                assignors: [],
                sortBy: []
            };
            ctrl.sortItems = [{
                value: 'customId',
                name: 'Assignment ID'
            }, {
                value: 'name',
                name: 'Title'
            }, {
                value: 'description',
                name: 'Description'
            }, {
                value: 'kind',
                name: 'Assignment Type'
            }, {
                value: 'status',
                name: 'Assignment Status'
            }, {
                value: 'lastModificationDate',
                name: 'Last Modified Date'
            }, {
                value: 'creationDate',
                name: 'Creation Date'
            }, {
                value: 'dueDate',
                name: 'Due Date'
            }, {
                value: 'assignees',
                name: 'Assignees'
            }];
            ctrl.sortByValue = 'creationDate';
            ctrl.filter = {
                order: "-"
            };
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: ctrl.filter.order + ctrl.sortByValue,
                limit: limit,
                page: page
            };
            stateService.fetchState().todoAssignments = ctrl.query;
            ctrl.getAssignments();
        };
        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
        ctrl.isCompleted = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.isOpen = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.OPEN;else return false;
        };
        ctrl.isDraft = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.DRAFT;else return false;
        };

        ctrl.isSubmitted = function (assignment) {
            if (assignment.assignees) return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.SUBMITTED;
            }) ? true : false;else return false;
        };

        ctrl.getAssignmentStatus = function (assignment) {
            if (assignment) {
                if (ctrl.isSubmitted(assignment)) {
                    return {
                        status: "SUBMITTED",
                        date: ctrl.isSubmitted(assignment).updatedDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status === assignmentConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignment.completionDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status == assignmentConstants.OPEN) {
                    return {
                        status: "DUE",
                        date: assignment.dueDate,
                        cls: "due-date"
                    };
                } else if (assignment.status === assignmentConstants.DRAFT) {
                    return {
                        status: "UNASSIGNED",
                        date: "",
                        cls: "due-date"
                    };
                }
            }
        };

        ctrl.getAssignments = function () {
            assignmentService.assignmentOwn(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.assignments = response.data.data;
                    ctrl.count = response.data.count;
                    ctrl.assignments.forEach(function (assignment) {
                        ctrl.getProgress(assignment);
                    });
                }
            });
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function (assignment) {
            if (ctrl.isKindQuestionedit(assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(assignment)) {
                return "assignment-review";
            }
        };
        ctrl.loadAssignment = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentCreateDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: assignment,
                        items: assignment.items
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            } else {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignmentId: assignment.id,
                        assignment: assignment,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };
        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
                //assignment.progress = ((assignment.assignees.length - assignment.todo) / (assignment.assignees.length)) * 100;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.items.length = 0;
                    angular.merge(assignment.items, items);
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                    //assignment.progress = (items.length / (assignment.questionsNeededPerAuthor)) * 100;
                    //assignment.todo = assignment.questionsNeededPerAuthor - items.length;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                        //assignment.todo = assignment.items.length - response.data.count;
                        //assignment.progress = (response.data.count / assignment.items.length) * 100;
                    });
                } else {
                    assignment.done = assignment.items.length;
                    assignment.total = assignment.items.length;
                }
            }
        };
        ctrl.openAssignmentLabel = function (assignment, open, beginReview, writeMCQ) {
            if ((assignment.kind === assignmentKind.QUESTION_CREATE || assignment.kind === assignmentKind.QUESTION_REVISION) && ctrl.hasAssignee(assignment)) {
                return writeMCQ;
            }
            if (assignment.kind === assignmentKind.QUESTION_REVIEW && ctrl.hasAssignee(assignment)) {
                return beginReview;
            } else {
                //case for admin/editor
                return open;
            }
        };
        ctrl.hasAssignee = function (assignment) {
            return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id;
            }) ? true : false;
        };
        ctrl.getClass = function (assignment) {
            var status = ctrl.getAssignmentStatus(assignment);
            return ctrl.addColor(assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function (assignment) {
            if (assignment) {
                var data = ctrl.getAssignmentStatus(assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
        ctrl.sortBy = function () {
            //                    ctrl.assignmentFilter.sortBy = [ctrl.sortByValue];
            //                    assignmentService.filter(ctrl.query, ctrl.assignmentFilter).then((response) => {
            //                        if (response.data.status === "success") {
            //                            ctrl.assignments = response.data.data;
            //                            ctrl.count = response.data.count;
            //                            ctrl.assignments.forEach((assignment) => {
            //                                ctrl.getProgress(assignment);
            //                            });
            //                        }
            //                    });
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsAssignedByMe', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsAssignedByMe').component('qbAssignmentsAssignedByMe', {
    templateUrl: 'app/minified/qb-assignments-assigned-by-me/qb-assignments-assigned-by-me.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "User", "Assignment", "Notification", "Notifier", "State", "QB_ASSIGNEE", "QB_ASSIGNMENT", "QB_ASSIGNMENT_KIND", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, $route, userService, assignmentService, notificationService, notifier, stateService, assigneeStatus, assignmentConstants, assignmentKind, notificationConstants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            ctrl.query = {
                sort: stateService.getStateFor("assignedBymeAssignments").sort || '-creationDate',
                limit: stateService.getStateFor("assignedBymeAssignments").limit || 25,
                page: stateService.getStateFor("assignedBymeAssignments").page || 1
            };
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getAssignments();
            notifier.subscribe($scope, 'load-assignment-assigned-by-me', function (event, data) {
                ctrl.getAssignments();
            });
            ctrl.sortByValue = 'creationDate';
            ctrl.assignmentFilter = {
                customIds: [],
                name: "",
                description: "",
                kind: [],
                statuses: ['AssignedByMe', "Draft"],
                lastModifiedDate: [],
                creationDate: [],
                dueDate: [],
                completedDate: [],
                assignees: [],
                assignors: [],
                sortBy: []
            };
            ctrl.sortItems = [{
                value: 'customId',
                name: 'Assignment ID'
            }, {
                value: 'name',
                name: 'Title'
            }, {
                value: 'description',
                name: 'Description'
            }, {
                value: 'kind',
                name: 'Assignment Type'
            }, {
                value: 'status',
                name: 'Assignment Status'
            }, {
                value: 'lastModificationDate',
                name: 'Last Modified Date'
            }, {
                value: 'creationDate',
                name: 'Creation Date'
            }, {
                value: 'dueDate',
                name: 'Due Date'
            }, {
                value: 'assignees',
                name: 'Assignees'
            }];
            ctrl.filter = {
                order: "-"
            };
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: ctrl.filter.order + ctrl.sortByValue,
                limit: limit,
                page: page
            };
            stateService.fetchState().assignedBymeAssignments = ctrl.query;
            ctrl.getAssignments();
        };
        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
        ctrl.getAssignments = function () {
            assignmentService.createdByMe(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
                    setAssignments(response);
                }
            });
        };
        ctrl.isCompleted = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.isOpen = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.OPEN;else return false;
        };
        ctrl.isDraft = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.DRAFT;else return false;
        };
        ctrl.isSubmitted = function (assignment) {
            if (assignment.assignees) return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.SUBMITTED;
            }) ? true : false;else return false;
        };
        ctrl.getAssignmentStatus = function (assignment) {
            if (assignment) {
                if (ctrl.isSubmitted(assignment)) {
                    return {
                        status: "SUBMITTED",
                        date: ctrl.isSubmitted(assignment).updatedDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status === assignmentConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignment.completionDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status == assignmentConstants.OPEN) {
                    return {
                        status: "DUE",
                        date: assignment.dueDate,
                        cls: "due-date"
                    };
                } else if (assignment.status === assignmentConstants.DRAFT) {
                    return {
                        status: "UNASSIGNED",
                        date: "",
                        cls: "due-date"
                    };
                }
            }
        };

        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
                //assignment.progress = ((assignment.assignees.length - assignment.todo) / (assignment.assignees.length)) * 100;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                    //assignment.progress = (items.length / (assignment.questionsNeededPerAuthor)) * 100;
                    //assignment.todo = assignment.questionsNeededPerAuthor - items.length;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                        //assignment.todo = assignment.items.length - response.data.count;
                        //assignment.progress = (response.data.count / assignment.items.length) * 100;
                    });
                }
            }
        };
        ctrl.openAssignmentLabel = function (assignment, open, beginReview, writeMCQ) {
            if ((assignment.kind === assignmentKind.QUESTION_CREATE || assignment.kind === assignmentKind.QUESTION_REVISION) && ctrl.hasAssignee(assignment)) {
                return writeMCQ;
            }
            if (assignment.kind === assignmentKind.QUESTION_REVIEW && ctrl.hasAssignee(assignment)) {
                return beginReview;
            } else {
                //case for admin/editor
                return open;
            }
        };
        ctrl.hasAssignee = function (assignment) {
            return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id;
            }) ? true : false;
        };
        ctrl.loadDetails = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentCreateDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: assignment,
                        items: assignment.items
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            } else {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignmentId: assignment.id,
                        assignment: assignment,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };
        ctrl.getClass = function (assignment) {
            var status = ctrl.getAssignmentStatus(assignment);
            return ctrl.addColor(assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function (assignment) {
            if (assignment) {
                var data = ctrl.getAssignmentStatus(assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function (assignment) {
            if (ctrl.isKindQuestionedit(assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(assignment)) {
                return "assignment-review";
            }
        };
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
        ctrl.sortBy = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
        var setAssignments = function setAssignments(response) {
            ctrl.assignments = response.data.data;
            ctrl.count = response.data.count;
            ctrl.assignments.forEach(function (assignment) {
                ctrl.getProgress(assignment);
                assignment.notDone = 0;
                assignment.done = 0;
                if (assignment.status === 'Draft') {} else {
                    assignment.assignees.forEach(function (assignee) {
                        if (assignee.status === assigneeStatus.DRAFT) assignment.notDone++;else if (assignee.status === assigneeStatus.SUBMITTED || assignee.status === assigneeStatus.COMPLETE) assignment.done++;
                    });
                }
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsSubmitted', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsSubmitted').component('qbAssignmentsSubmitted', {
    templateUrl: 'app/minified/qb-assignments-submitted/qb-assignments-submitted.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "Assignment", "User", "Notification", "Notifier", "State", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", "QB_ASSIGNMENT", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, $route, assignmentService, userService, notificationService, notifier, stateService, assigneeStatus, assignmentKind, assignmentConstants, notificationConstants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            ctrl.query = {
                sort: stateService.getStateFor("submittedAssignments").sort || '-creationDate',
                limit: stateService.getStateFor("submittedAssignments").limit || 25,
                page: stateService.getStateFor("submittedAssignments").page || 1
            };
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getAssignments();
            notifier.subscribe($scope, 'load-assignments-submitted', function (event, data) {
                ctrl.getAssignments();
            });
            ctrl.sortByValue = {};
            ctrl.assignmentFilter = {
                customIds: [],
                name: "",
                description: "",
                kind: [],
                statuses: ['Submitted'],
                lastModifiedDate: [],
                creationDate: [],
                dueDate: [],
                completedDate: [],
                assignees: [],
                assignors: [],
                sortBy: []
            };
            ctrl.sortItems = [{
                value: 'customId',
                name: 'Assignment ID'
            }, {
                value: 'name',
                name: 'Title'
            }, {
                value: 'description',
                name: 'Description'
            }, {
                value: 'kind',
                name: 'Assignment Type'
            }, {
                value: 'status',
                name: 'Assignment Status'
            }, {
                value: 'lastModificationDate',
                name: 'Last Modified Date'
            }, {
                value: 'creationDate',
                name: 'Creation Date'
            }, {
                value: 'dueDate',
                name: 'Due Date'
            }, {
                value: 'assignees',
                name: 'Assignees'
            }];
            ctrl.sortByValue = 'creationDate';
            ctrl.filter = {
                order: "-"
            };
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: ctrl.filter.order + ctrl.sortByValue,
                limit: limit,
                page: page
            };
            stateService.fetchState().submittedAssignments = ctrl.query;
            ctrl.getAssignments();
        };
        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
        ctrl.isCompleted = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.isOpen = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.OPEN;else return false;
        };
        ctrl.isDraft = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.DRAFT;else return false;
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function (assignment) {
            if (ctrl.isKindQuestionedit(assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(assignment)) {
                return "assignment-review";
            }
        };

        ctrl.isSubmitted = function (assignment) {
            if (assignment.assignees) return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.SUBMITTED;
            }) ? true : false;else return false;
        };
        ctrl.getAssignmentStatus = function (assignment) {
            if (assignment) {
                if (ctrl.isSubmitted(assignment)) {
                    return {
                        status: "SUBMITTED",
                        date: ctrl.isSubmitted(assignment).updatedDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status === assignmentConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignment.completionDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status == assignmentConstants.OPEN) {
                    return {
                        status: "DUE",
                        date: assignment.dueDate,
                        cls: "due-date"
                    };
                } else if (assignment.status === assignmentConstants.DRAFT) {
                    return {
                        status: "UNASSIGNED",
                        date: "",
                        cls: "due-date"
                    };
                }
            }
        };
        ctrl.getAssignments = function () {
            assignmentService.assignmentSubmitted(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.assignments = response.data.data;
                    ctrl.count = response.data.count;
                    ctrl.assignments.forEach(function (assignment) {
                        ctrl.getProgress(assignment);
                    });
                }
            });
        };
        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.items.length = 0;
                    angular.merge(assignment.items, items);
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                    });
                }
            }
        };
        ctrl.loadDetails = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            var ob = {
                templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: assignment.id,
                    assignment: assignment,
                    fullAssignment: {}
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.getClass = function (assignment) {
            var status = ctrl.getAssignmentStatus(assignment);
            return ctrl.addColor(assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function (assignment) {
            if (assignment) {
                var data = ctrl.getAssignmentStatus(assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
        ctrl.sortBy = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            //                    ctrl.assignmentFilter.sortBy = [ctrl.sortByValue];
            //                    assignmentService.filter(ctrl.query, ctrl.assignmentFilter).then((response) => {
            //                        if (response.data.status === "success") {
            //                            ctrl.assignments = response.data.data;
            //                            ctrl.count = response.data.count;
            //                            ctrl.assignments.forEach((assignment) => {
            //                                ctrl.getProgress(assignment);
            //                            });
            //                        }
            //                    });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsDone', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsDone').component('qbAssignmentsDone', {
    templateUrl: 'app/minified/qb-assignments-done/qb-assignments-done.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "Assignment", "User", "Notification", "Notifier", "State", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", "QB_ASSIGNMENT", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, $route, assignmentService, userService, notificationService, notifier, stateService, assigneeStatus, assignmentKind, assignmentConstants, notificationConstants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            ctrl.query = {
                sort: stateService.getStateFor("doneAssignments").sort || '-creationDate',
                limit: stateService.getStateFor("doneAssignments").limit || 25,
                page: stateService.getStateFor("doneAssignments").page || 1
            };
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getAssignments();
            notifier.subscribe($scope, 'load-assignments-done', function (event, data) {
                ctrl.getAssignments();
            });
            ctrl.sortByValue = {};
            ctrl.assignmentFilter = {
                customIds: [],
                name: "",
                description: "",
                kind: [],
                statuses: ['Done'],
                lastModifiedDate: [],
                creationDate: [],
                dueDate: [],
                completedDate: [],
                assignees: [],
                assignors: [],
                sortBy: []
            };
            ctrl.sortItems = [{
                value: 'customId',
                name: 'Assignment ID'
            }, {
                value: 'name',
                name: 'Title'
            }, {
                value: 'description',
                name: 'Description'
            }, {
                value: 'kind',
                name: 'Assignment Type'
            }, {
                value: 'status',
                name: 'Assignment Status'
            }, {
                value: 'lastModificationDate',
                name: 'Last Modified Date'
            }, {
                value: 'creationDate',
                name: 'Creation Date'
            }, {
                value: 'dueDate',
                name: 'Due Date'
            }, {
                value: 'assignees',
                name: 'Assignees'
            }];
            ctrl.sortByValue = 'creationDate';
            ctrl.filter = {
                order: "-"
            };
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: ctrl.filter.order + ctrl.sortByValue,
                limit: limit,
                page: page
            };
            stateService.fetchState().doneAssignments = ctrl.query;
            ctrl.getAssignments();
        };
        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
        ctrl.isCompleted = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.isOpen = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.OPEN;else return false;
        };
        ctrl.isDraft = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.DRAFT;else return false;
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function (assignment) {
            if (ctrl.isKindQuestionedit(assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(assignment)) {
                return "assignment-review";
            }
        };
        ctrl.getAssignmentStatus = function (assignment) {
            if (assignment) {
                if (assignment.status === assignmentConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignment.completionDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status == assignmentConstants.OPEN) {
                    return {
                        status: "DUE",
                        date: assignment.dueDate,
                        cls: "due-date"
                    };
                } else if (assignment.status === assignmentConstants.DRAFT) {
                    return {
                        status: "UNASSIGNED",
                        date: "",
                        cls: "due-date"
                    };
                }
            }
        };
        ctrl.getAssignments = function () {
            assignmentService.assignmentCompleted(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.assignments = response.data.data;
                    ctrl.count = response.data.count;
                    ctrl.assignments.forEach(function (assignment) {
                        ctrl.getProgress(assignment);
                    });
                }
            });
        };
        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
                //assignment.progress = ((assignment.assignees.length - assignment.todo) / (assignment.assignees.length)) * 100;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.items.length = 0;
                    angular.merge(assignment.items, items);
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                    //assignment.progress = (items.length / (assignment.questionsNeededPerAuthor)) * 100;
                    //assignment.todo = assignment.questionsNeededPerAuthor - items.length;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                        //assignment.todo = assignment.items.length - response.data.count;
                        //assignment.progress = (response.data.count / assignment.items.length) * 100;
                    });
                }
            }
        };
        ctrl.loadDetails = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            var ob = {
                templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: assignment.id,
                    assignment: assignment,
                    fullAssignment: {}
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.getClass = function (assignment) {
            var status = ctrl.getAssignmentStatus(assignment);
            return ctrl.addColor(assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function (assignment) {
            if (assignment) {
                var data = ctrl.getAssignmentStatus(assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
        ctrl.sortBy = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            //                    ctrl.assignmentFilter.sortBy = [ctrl.sortByValue];
            //                    assignmentService.filter(ctrl.query, ctrl.assignmentFilter).then((response) => {
            //                        if (response.data.status === "success") {
            //                            ctrl.assignments = response.data.data;
            //                            ctrl.count = response.data.count;
            //                            ctrl.assignments.forEach((assignment) => {
            //                                ctrl.getProgress(assignment);
            //                            });
            //                        }
            //                    });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsAssignedByOthers', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsAssignedByOthers').component('qbAssignmentsAssignedByOthers', {
    templateUrl: 'app/minified/qb-assignments-assigned-by-others/qb-assignments-assigned-by-others.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "User", "Assignment", "Notification", "Notifier", "State", "QB_ASSIGNEE", "QB_ASSIGNMENT", "QB_ASSIGNMENT_KIND", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, $route, userService, assignmentService, notificationService, notifier, stateService, assigneeStatus, assignmentConstants, assignmentKind, notificationConstants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            ctrl.query = {
                sort: stateService.getStateFor("assignedByOthersAssignments").sort || '-creationDate',
                limit: stateService.getStateFor("assignedByOthersAssignments").limit || 25,
                page: stateService.getStateFor("assignedByOthersAssignments").page || 1
            };
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getAssignments();
            notifier.subscribe($scope, 'load-assignment-assigned-by-others', function (event, data) {
                ctrl.getAssignments();
            });
            ctrl.assignmentFilter = {
                customIds: [],
                name: "",
                description: "",
                kind: [],
                statuses: ['AssignedByOthers'],
                lastModifiedDate: [],
                creationDate: [],
                dueDate: [],
                completedDate: [],
                assignees: [],
                assignors: [],
                sortBy: []
            };
            ctrl.sortItems = [{
                value: 'customId',
                name: 'Assignment ID'
            }, {
                value: 'name',
                name: 'Title'
            }, {
                value: 'description',
                name: 'Description'
            }, {
                value: 'kind',
                name: 'Assignment Type'
            }, {
                value: 'status',
                name: 'Assignment Status'
            }, {
                value: 'lastModificationDate',
                name: 'Last Modified Date'
            }, {
                value: 'creationDate',
                name: 'Creation Date'
            }, {
                value: 'dueDate',
                name: 'Due Date'
            }, {
                value: 'assignees',
                name: 'Assignees'
            }];
            ctrl.sortByValue = 'creationDate';
            ctrl.filter = {
                order: "-"
            };
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: ctrl.filter.order + ctrl.sortByValue,
                limit: limit,
                page: page
            };
            stateService.fetchState().assignedByOthersAssignments = ctrl.query;
            ctrl.getAssignments();
        };
        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
        ctrl.getAssignments = function () {
            assignmentService.createdByOthers(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
                    setAssignments(response);
                }
            });
        };
        ctrl.isCompleted = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.isOpen = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.OPEN;else return false;
        };
        ctrl.isDraft = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.DRAFT;else return false;
        };
        ctrl.isSubmitted = function (assignment) {
            if (assignment.assignees) return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.SUBMITTED;
            }) ? true : false;else return false;
        };
        ctrl.getAssignmentStatus = function (assignment) {
            if (assignment) {
                if (ctrl.isSubmitted(assignment)) {
                    return {
                        status: "SUBMITTED",
                        date: ctrl.isSubmitted(assignment).updatedDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status === assignmentConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignment.completionDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status == assignmentConstants.OPEN) {
                    return {
                        status: "DUE",
                        date: assignment.dueDate,
                        cls: "due-date"
                    };
                } else if (assignment.status === assignmentConstants.DRAFT) {
                    return {
                        status: "UNASSIGNED",
                        date: "",
                        cls: "due-date"
                    };
                }
            }
        };
        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
                //assignment.progress = ((assignment.assignees.length - assignment.todo) / (assignment.assignees.length)) * 100;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                    //assignment.progress = (items.length / (assignment.questionsNeededPerAuthor)) * 100;
                    //assignment.todo = assignment.questionsNeededPerAuthor - items.length;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                        //assignment.todo = assignment.items.length - response.data.count;
                        //assignment.progress = (response.data.count / assignment.items.length) * 100;
                    });
                }
            }
        };
        ctrl.openAssignmentLabel = function (assignment, open, beginReview, writeMCQ) {
            if ((assignment.kind === assignmentKind.QUESTION_CREATE || assignment.kind === assignmentKind.QUESTION_REVISION) && ctrl.hasAssignee(assignment)) {
                return writeMCQ;
            }
            if (assignment.kind === assignmentKind.QUESTION_REVIEW && ctrl.hasAssignee(assignment)) {
                return beginReview;
            } else {
                //case for admin/editor
                return open;
            }
        };
        ctrl.hasAssignee = function (assignment) {
            return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id;
            }) ? true : false;
        };
        ctrl.loadDetails = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentCreateDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: assignment,
                        items: assignment.items
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            } else {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignmentId: assignment.id,
                        assignment: assignment,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };
        ctrl.getClass = function (assignment) {
            var status = ctrl.getAssignmentStatus(assignment);
            return ctrl.addColor(assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function (assignment) {
            if (assignment) {
                var data = ctrl.getAssignmentStatus(assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function (assignment) {
            if (ctrl.isKindQuestionedit(assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(assignment)) {
                return "assignment-review";
            }
        };
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
        //                ctrl.sortBy = () => {
        //                    ctrl.assignmentFilter.sortBy = [ctrl.sortByValue];
        //                    assignmentService.filter(ctrl.query, ctrl.assignmentFilter).then((response) => {
        //                        if (response.data.status === "success") {
        //                            setAssignments(response)
        //                        }
        //                    });
        //                };
        ctrl.sortBy = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };
        var setAssignments = function setAssignments(response) {
            ctrl.assignments = response.data.data;
            ctrl.count = response.data.count;
            ctrl.assignments.forEach(function (assignment) {
                ctrl.assignments.forEach(function (assignment) {
                    ctrl.getProgress(assignment);
                });
                assignment.notDone = 0;
                assignment.done = 0;
                if (assignment.status === 'Draft') {} else {
                    assignment.assignees.forEach(function (assignee) {
                        if (assignee.status === assigneeStatus.DRAFT) assignment.notDone++;else if (assignee.status === assigneeStatus.SUBMITTED || assignee.status === assigneeStatus.COMPLETE) assignment.done++;
                    });
                }
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentDetails', ['qbAssignmentDetailsTab', 'qbAssignmentMine', 'qbAssignmentHistory', 'qbAssignmentSubmissions', 'qbAssignmentMore']);
'use strict';

angular.module('qbAssignmentDetails').component('qbAssignmentDetails', {
    templateUrl: 'app/minified/qb-assignment-details/qb-assignment-details.template.html',
    bindings: {
        assignmentId: "<",
        assignment: "<",
        fullAssignment: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "Util", "$routeParams", "User", "Assignment", "Notifier", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $location, util, $routeParams, userService, assignmentService, notifier, assigneeStatus, assignmentKind) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.isAuthor = userService.isAuthor();
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isReviewer = userService.isReviewer();
            ctrl.isEditor = userService.isEditor();
            ctrl.showMyAssignment = false;
            ctrl.fullAssignment = ctrl.fullAssignment || {};
            notifier.subscribe($scope, 'load-assignment-details', function (event, data) {
                ctrl.loadAssignment();
            });
            ctrl.loadAssignment();
        };
        ctrl.loadAssignment = function () {
            var load = function load() {
                if (ctrl.assignment.assignees) {
                    if (_.find(ctrl.assignment.assignees, function (a) {
                        return a.id === userService.getLoggedInUser().id;
                    })) {
                        ctrl.showMyAssignment = true;
                    }
                }

                if (ctrl.assignment.kind === assignmentKind.QUESTION_CREATE && ctrl.assignment.assignees && _.find(ctrl.assignment.assignees, function (a) {
                    return a.id === userService.getLoggedInUser().id && a.status === assigneeStatus.DRAFT;
                })) {
                    ctrl.setDummyObject();
                }
            };
            if (ctrl.isAdmin || ctrl.isEditor) {
                assignmentService.getSavedItems(ctrl.assignment.id).then(function (itemResponse) {
                    if (_.isEmpty(Object.keys(ctrl.fullAssignment))) {
                        angular.merge(ctrl.fullAssignment, itemResponse.data.data);
                    } else {
                        ctrl.fullAssignment.items = itemResponse.data.data.items;
                    }
                    ctrl.getProgress(ctrl.fullAssignment);
                    ctrl.assignment.todo = ctrl.fullAssignment.todo;
                    assignmentService.association(ctrl.fullAssignment.items, ctrl.fullAssignment.customId);
                    if (ctrl.fullAssignment.kind == "Review" || ctrl.fullAssignment.kind == assignmentKind.QUESTION_REVISION) {
                        ctrl.fullAssignment.assignees.forEach(function (a) {
                            a.items = a.items || [];
                            angular.merge(a.items, itemResponse.data.data.items);
                        });
                    } else {
                        var grpd = _.chain(ctrl.fullAssignment.items).groupBy(function (n) {
                            return n.createdBy.id;
                        });
                        grpd.forEach(function (n, m) {
                            var k = _.find(ctrl.fullAssignment.assignees, function (f) {
                                return f.id == m;
                            }).items = n;
                        });
                    }
                    if (ctrl.fullAssignment) {
                        ctrl.progress = {
                            done: ctrl.fullAssignment.done,
                            total: ctrl.fullAssignment.total
                        };
                    }
                });
            }
            load();
            assignmentService.getAssignment(ctrl.assignment.id).then(function (response) {
                if (response.data.status === "success") {
                    if (_.isEmpty(Object.keys(ctrl.assignment))) {
                        angular.merge(ctrl.assignment, response.data.data);
                    } else {
                        if (ctrl.assignment.items && response.data.data.items) {
                            ctrl.assignment.items.length = 0;
                            response.data.data.items.forEach(function (item) {
                                ctrl.assignment.items.push(item);
                            });
                        }
                        if (ctrl.assignment.assignees && response.data.data.assignees) {
                            ctrl.assignment.assignees.length = 0;
                            response.data.data.assignees.forEach(function (assignee) {
                                ctrl.assignment.assignees.push(assignee);
                            });
                        }
                    }
                    if (ctrl.assignment.items && ctrl.assignment.kind === assignmentKind.QUESTION_CREATE) {
                        ctrl.assignment.items = _.filter(ctrl.assignment.items, function (item) {
                            return item.createdBy.id === userService.getLoggedInUser().id;
                        });
                    };
                    ctrl.assignment.items = ctrl.assignment.items || [];
                    ctrl.getProgress(ctrl.assignment);
                    load();
                }
            });
        };

        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
                //assignment.progress = ((assignment.assignees.length - assignment.todo) / (assignment.assignees.length)) * 100;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                    //assignment.progress = (items.length / (assignment.questionsNeededPerAuthor)) * 100;
                    //assignment.todo = assignment.questionsNeededPerAuthor - items.length;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                        //assignment.todo = assignment.items.length - response.data.count;
                        //assignment.progress = (response.data.count / assignment.items.length) * 100;
                    });
                } else if (assignment.kind == assignmentKind.QUESTION_REVISION) {
                    assignment.done = assignment.total = assignment.items.length;
                }
            }
        };
        ctrl.setDummyObject = function () {
            ctrl.dummyQuestions = [];
            _.times(ctrl.assignment.questionsNeededPerAuthor - ctrl.assignment.items.length, function () {
                return ctrl.dummyQuestions.push({});
            });
        };
        ctrl.loadTab = function (tab) {
            $location.url('assignment/' + $routeParams.id + '/' + ctrl.tab);
        };
        ctrl.goBack = function (event) {
            if ($routeParams.goto) {
                $location.url($routeParams.goto);
            } else {
                $location.url('/assignments');
            }
        };
        ctrl.cancel = function (event) {
            $mdDialog.cancel();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentDetailsTab', ['qbAaddComment', 'qbDisplayComments', 'qbAssignmentSubmissions']);
'use strict';

angular.module('qbAssignmentDetailsTab').component('qbAssignmentDetailsTab', {
    templateUrl: 'app/minified/qb-assignment-details-tab/qb-assignment-details-tab.template.html',
    bindings: {
        assignment: "<",
        progress: "<",
        dummy: "<",
        show: "<",
        submission: "<",
        assignmentId: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "$routeParams", "Assignment", "User", "Comment", "QB_ASSIGNEE", "QB_ASSIGNMENT", "QB_ASSIGNMENT_KIND", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, assignmentService, userService, commentService, assigneeStatus, assignmentConstants, assignmentKind) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.query = {
            sort: 'id',
            limit: 25,
            page: 1
        };
        ctrl.$onInit = function () {
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isReviewer = userService.isReviewer();
            ctrl.isEditor = userService.isEditor();
            ctrl.isAuthor = userService.isAuthor();
            ctrl.constants = assignmentKind;
        };
        ctrl.getAssignmentStatus = function () {
            if (ctrl.isAdmin || ctrl.isEditor) {
                if (ctrl.assignment) {
                    if (ctrl.assignment.status === assignmentConstants.COMPLETE) {
                        return { status: "COMPLETED", date: ctrl.assignment.completionDate, cls: "completion-date" };
                    } else {
                        return { status: "DUE", date: ctrl.assignment.dueDate, cls: "due-date" };
                    }
                }
            } else if (ctrl.assignment.assignees) {
                var completed = _.find(ctrl.assignment.assignees, function (a) {
                    return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.COMPLETE;
                });
                if (completed) {
                    return { status: "COMPLETED", date: completed.updatedDate, cls: "completion-date" };
                } else {
                    var submitted = _.find(ctrl.assignment.assignees, function (a) {
                        return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.SUBMITTED;
                    });
                    if (submitted) {
                        return { status: "SUBMITTED", date: submitted.updatedDate, cls: "completion-date" };
                    } else {
                        return { status: "DUE", date: ctrl.assignment.dueDate, cls: "completion-date" };
                    }
                }
            }
        };
        ctrl.loadDetails = function (id) {
            $location.url('/assignment/' + ctrl.assignment.id + "/details");
        };
        ctrl.isKindReview = function () {
            if (ctrl.assignment) return ctrl.assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function () {
            if (ctrl.assignment) return ctrl.assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.getClass = function () {
            var status = ctrl.getAssignmentStatus(ctrl.assignment);
            return ctrl.addColor(ctrl.assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function () {
            if (ctrl.assignment) {
                var data = ctrl.getAssignmentStatus(ctrl.assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
    }]
});
'use strict';

// Define the `qbResetPassword` module

angular.module('qbResetPassword', ['ngMessages']);
'use strict';

angular.module('qbResetPassword').component('qbResetPassword', {
    templateUrl: 'app/minified/qb-reset-password/qb-reset-password.template.html',
    controller: ["$scope", "$mdToast", "$location", "$routeParams", "$mdDialog", "User", "Configuration", function ($scope, $mdToast, $location, $routeParams, $mdDialog, userService, configurationService) {
        var ctrl = this;
        ctrl.user = {};
        ctrl.$onInit = function () {
            ctrl.user.activationKey = $routeParams.aid;
        };

        ctrl.submit = function (event) {
            if (!_.isEqual(ctrl.user.password, ctrl.confirmPassword)) {
                ctrl.noMatch = true;
            } else {
                userService.resetPassword(ctrl.user).then(function (response) {
                    if (response.data.status === "success") {
                        $mdDialog.show($mdDialog.alert().title('Your password has been reset successfully').ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
                            $location.url('/login');
                        });
                    } else {
                        $mdToast.show($mdToast.simple().textContent(response.data.message).parent(document.body).hideDelay(3000).position('top left'));
                    }
                });
            }
        };

        ctrl.getHeaderImage = function () {
            var config = configurationService.getConfig();
            return _.find(config, {
                name: "Header"
            });
        };

        ctrl.FooterText = function () {
            var config = configurationService.getConfig();
            return _.find(config, {
                name: "Footer"
            });
        };
    }]
});
'use strict';

// Define the `qbResetPassword` module

angular.module('qbForgotPassword', ['ngMessages']);
'use strict';

angular.module('qbForgotPassword').component('qbForgotPassword', {
    templateUrl: 'app/minified/qb-forgot-password/qb-forgot-password.template.html',
    controller: ["$scope", "$mdToast", "$location", "$mdDialog", "User", "Configuration", function ($scope, $mdToast, $location, $mdDialog, userService, configurationService) {
        var ctrl = this;
        ctrl.user = {};
        ctrl.userEmailCheck = function (form, email) {
            ctrl.notExist = false;
            if (!email) return;
            userService.emailExists({
                email: email
            }).then(function (response) {
                ctrl.notExist = true;
                if (response.data.data.value) {
                    ctrl.notExist = false;
                }
            });
        };
        ctrl.submit = function (event) {
            userService.forgotPassword(ctrl.user).then(function (response) {
                if (response.data.status === "success") {
                    $mdDialog.show($mdDialog.alert().title('New password has been sent to your email').ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
                        $location.url('/login');
                    });
                } else {
                    $mdToast.show($mdToast.simple().textContent(response.data.message).parent(document.body).hideDelay(3000).position('top left'));
                }
            });
        };

        ctrl.redirectToLogin = function () {
            $location.url('/login');
        };

        ctrl.getHeaderImage = function () {
            var config = configurationService.getConfig();
            return _.find(config, {
                name: "Header"
            });
        };

        ctrl.FooterText = function () {
            var config = configurationService.getConfig();
            return _.find(config, {
                name: "Footer"
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentMine', ['qbDialogQn', 'qbAssignmentTurnIn', 'qbQuestionEditDialog', 'qbQuestionPreviewDialog', 'qbQuestionCreateDialog']);
'use strict';

angular.module('qbAssignmentMine').component('qbAssignmentMine', {
    templateUrl: 'app/minified/qb-assignment-mine/qb-assignment-mine.template.html',
    bindings: {
        assignment: "<",
        dummy: "<",
        items: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "$routeParams", "$filter", "User", "Assignment", "Question", "Comment", "Media", "Review", "State", "Notifier", "QB_QUESTION", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, $filter, userService, assignmentService, questionService, commentService, mediaService, reviewService, stateService, notifier, questionConstants, assigneeConstants, assignmentKind) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.currentDate = new Date();
            ctrl.query = {
                sort: 'id',
                limit: 25,
                page: 1
            };
            resetActions();
            ctrl.filter = {
                status: questionConstants.DONE,
                stem: ""
            };
            ctrl.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.selected = false;
            ctrl.constants = assignmentKind;
            getDoneQuestions();
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isEditor = userService.isEditor();
        };
        ctrl.$onChanges = function () {
            resetActions();
        };
        ctrl.loadDetails = function (id) {
            $location.url('/assignment/:' + id + "/details");
        };

        ctrl.attachQuestion = function (event) {
            ctrl.itemsSelected = [];
            ctrl.searchParam = "";
            if (ctrl.isComplete()) {
                return; //add should not work if completed.
            }
            ctrl.questionDiff = _.difference(_.pluck(ctrl.allQuestions, "id"), _.pluck(ctrl.assignment.items, "id")).map(function (diff) {
                return _.find(ctrl.allQuestions, function (q) {
                    return diff == q.id;
                });
            });

            ctrl.selectedQuestion = {};
            if (_.isEmpty(ctrl.questionDiff)) {
                $mdDialog.show($mdDialog.alert().title("No more questions available!").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {});
            } else {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-dialog-question/qb-dialog-question.template.html',
                    targetEvent: event,
                    controller: 'dialogQnController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        reference: "assignment-mine",
                        questionsNeededPerAuthor: ctrl.assignment.questionsNeededPerAuthor,
                        selectedQuestion: ctrl.selectedQuestion,
                        itemsSelected: ctrl.itemsSelected,
                        searchParam: ctrl.searchParam,
                        parent: ctrl,
                        count: ctrl.count
                    }
                }).then(function () {
                    if (ctrl.selectedQuestion.selected) {
                        ctrl.assignment.items.push(ctrl.selectedQuestion.selected);
                    }
                    ctrl.setDummyObject();
                    ctrl.save(event);
                }).finally(function () {
                    ctrl.searchParam = "";
                });
            }
        };
        ctrl.turnIn = function (event) {
            if (!ctrl.actions.submit.inProgress) {
                ctrl.actions.submit.inProgress = true;
                addItems(event, triggerTurnIn);
            }
        };
        ctrl.canOpen = function (question) {
            if (userService.isEditor() || userService.isAdmin()) {
                return true;
            } else if (ctrl.isOwner(question) && (question.status === questionConstants.DONE || question.status === questionConstants.DRAFT) && ctrl.isDraft()) {
                return true;
            } else if (ctrl.isOwner(question) && ctrl.assignment.kind === assignmentKind.QUESTION_REVISION && ctrl.isDraft()) return true;
            return false;
        };
        ctrl.canRemove = function (question) {
            if (userService.isEditor() || userService.isAdmin()) {
                return true;
            } else if (ctrl.isOwner(question) && (question.status === questionConstants.DONE || question.status === questionConstants.DRAFT) && ctrl.isDraft()) {
                return true;
            }
            return false;
        };
        ctrl.isOwner = function (question) {
            return question.createdBy.id == userService.getLoggedInUser().id;
        };
        ctrl.save = function (event) {
            addItems(event, addItemsSuccess);
        };
        ctrl.setDummyObject = function () {
            ctrl.dummy = [];
            if (ctrl.assignment.items.length === 0) {
                for (var i = 0; i < ctrl.assignment.questionsNeededPerAuthor; i++) {
                    ctrl.dummy.push({});
                }
            } else if (ctrl.assignment.items.length < ctrl.assignment.questionsNeededPerAuthor) {
                for (var i = 0; i < ctrl.assignment.questionsNeededPerAuthor - ctrl.assignment.items.length; i++) {
                    ctrl.dummy.push({});
                }
            }
            resetActions();
        };
        ctrl.removeData = function (event, dataArray, arrayItem) {
            dataArray.splice(dataArray.indexOf(arrayItem), 1);
            ctrl.setDummyObject();
            ctrl.save(event);
        };
        ctrl.isComplete = function () {
            if (ctrl.assignment.assignees) return _.find(ctrl.assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && (a.status == assigneeConstants.COMPLETE || a.status == assigneeConstants.SUBMITTED);
            }) ? true : false;else return false;
        };
        ctrl.isSubmitted = function () {
            if (ctrl.assignment.assignees) return _.find(ctrl.assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeConstants.SUBMITTED;
            }) ? true : false;else return false;
        };
        ctrl.isDraft = function () {
            if (ctrl.assignment.assignees) return _.find(ctrl.assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeConstants.DRAFT;
            }) ? true : false;else return false;
        };
        ctrl.recall = function () {
            if (ctrl.actions.recall.inProgress) {
                return;
            }
            ctrl.actions.recall.inProgress = true;
            assignmentService.returnAssignment(ctrl.assignment.id, userService.getLoggedInUser().id).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    notifier.notify('load-assignment-details', {});
                    notifier.notify('load-assignments-to-do', {});
                    notifier.notify('load-assignments-submitted', {});
                    $mdToast.show($mdToast.simple().textContent("Assignment Recalled Successfully!").parent(document.body).hideDelay(3000).position('top right')).then(function () {
                        notifier.notify('load-notifications', {});
                        ctrl.actions.recall.inProgress = false;
                    });
                } else {
                    ctrl.actions.recall.inProgress = false;
                }
            });
        };
        ctrl.logPagination = function (page, limit, search) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.filter.stem = search || "";
            getDoneQuestions();
        };
        ctrl.addColor = function (dueDate) {
            if (dueDate) {
                if (new Date(dueDate) < ctrl.currentDate) return "due-date-expired";else return "";
            }
            return "";
        };
        ctrl.isValid = function () {
            var draft = _.find(ctrl.assignment.items, function (d) {
                return d.status == questionConstants.DRAFT;
            });
            if (draft) return false;else return true;
        };
        var addItems = function addItems(event, callback) {
            ctrl.items = {
                items: _.map(ctrl.assignment.items, function (item) {
                    return {
                        id: item.id,
                        customId: item.customId
                    };
                })
            };
            assignmentService.saveItems(ctrl.assignment.id, ctrl.items).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    ctrl.turnInItems = response.data.data.items;
                    callback(event);
                }
            });
        };
        var addItemsSuccess = function addItemsSuccess(event) {
            $mdToast.show($mdToast.simple().textContent("Assignment updated successfully").parent(document.body).hideDelay(3000).position('top right'));
        };

        var triggerTurnIn = function triggerTurnIn(event) {
            if (!ctrl.isValid()) {
                $mdDialog.show($mdDialog.alert({
                    skipHide: true
                }).title('Please save draft questions as final before submitting').ariaLabel('alert').targetEvent(event).ok('OK'));
                return;
            }
            var process = function process(locals) {
                var currentUser = userService.getLoggedInUser();
                ctrl.assignmentTurnInItems = _.filter(ctrl.turnInItems, function (d) {
                    return d.createdBy.id == currentUser.id;
                });
                ctrl.assignmentDraftItems = _.filter(ctrl.turnInItems, function (d) {
                    return d.status == questionConstants.DRAFT;
                });
                locals.items = ctrl.assignmentTurnInItems, locals.draftItems = ctrl.assignmentDraftItems;
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-assignment-turn-in/qb-assignment-turn-in.template.html',
                    targetEvent: event,
                    controller: 'assignmentTurnInController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: locals,
                    skipHide: true
                }).then(function () {
                    assignmentService.turnIn(ctrl.assignment.id).then(function (turnInResponse) {
                        if (_.isEqual(turnInResponse.data.status, 'success')) {
                            if (ctrl.assignment.kind === assignmentKind.QUESTION_CREATE) {
                                notifier.notify('load-assignment-details', {});
                                notifier.notify('load-assignments-to-do', {});
                                notifier.notify('load-assignments-submitted', {});
                                $mdToast.show($mdToast.simple().textContent("Assignment Submitted Successfully!").parent(document.body).hideDelay(3000).position('top right')).then(function () {
                                    ctrl.actions.submit.inProgress = false;
                                    notifier.notify('load-notifications', {});
                                });
                            } else {
                                ctrl.actions.submit.inProgress = false;
                                notifier.notify('load-assignment-details', {});
                                notifier.notify('load-assignments-to-do', {});
                                notifier.notify('load-assignments-submitted', {});
                            }
                        } else {
                            ctrl.actions.submit.inProgress = false;
                        }
                        //nothing for question review
                    });
                    if (!_.isEmpty(ctrl.assignment.comment)) {
                        ctrl.comment = {
                            ownerId: ctrl.assignment.id,
                            comment: ctrl.assignment.comment,
                            category: 'Assignment'
                        };
                        commentService.addComment(ctrl.comment).then(function (response) {
                            notifier.notify('load-assignment-comments', {});
                        });
                    }
                }, function () {
                    ctrl.actions.submit.inProgress = false;
                });
            };
            var locals = {
                assignment: ctrl.assignment
            };
            if (ctrl.assignment.kind === assignmentKind.QUESTION_REVIEW) {
                var itemIds = _.pluck(ctrl.assignment.items, "id");
                reviewService.getMyReviews(itemIds).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        ctrl.reviews = _.chain(response.data.data).groupBy("ownerId").value();
                        locals.reviews = ctrl.reviews;
                        process(locals);
                    }
                });
            } else {
                process(locals);
            }
        };
        var getDoneQuestions = function getDoneQuestions() {
            assignmentService.questionsInDone((ctrl.query, ctrl.filter)).then(function (response) {
                ctrl.allQuestions = response.data.data;
                ctrl.count = response.data.count;
                ctrl.questionDiff = _.difference(_.pluck(ctrl.allQuestions, "id"), _.pluck(ctrl.assignment.items, "id")).map(function (diff) {
                    return _.find(ctrl.allQuestions, function (question) {
                        return diff === question.id;
                    });
                });
            });
        };
        ctrl.createQuestion = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-create-dialog/qb-question-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    assignment: ctrl.assignment
                }
            }).finally(function () {
                assignment: ctrl.assignment;
            }).then(function () {});
        };
        ctrl.openGuide = function (ev) {
            mediaService.getGuide(ctrl.assignment.reviewGuideId).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.guide = response.data.data;
                    var href = ctrl.guide.url;
                    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                        var downloadFrame = document.createElement("iframe");
                        downloadFrame.setAttribute('src', href);
                        downloadFrame.setAttribute('style', "display:none");
                        document.body.appendChild(downloadFrame);
                        window.open(downloadFrame, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
                        window.focus();
                    } else {
                        var anchor = $('<a>');
                        anchor.attr('id', 'file_download');
                        if ($('#file_download').length > 0) {
                            var anchor = $('#file_download');
                        }
                        anchor.attr('href', href);
                        anchor.attr('target', '_blank');
                        anchor.css('display', 'none');
                        anchor.attr('download', ctrl.guide.name);
                        $(document.body).append(anchor);
                        anchor[0].click();
                        anchor[0].remove();
                    }
                }
            });
        };
        ctrl.openQuestion = function (event, question) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionEditDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    question: question
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.previewQuestion = function (event, question) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: {
                        id: question.id
                    }
                },
                skipHide: true
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        var resetActions = function resetActions() {
            if (!ctrl.actions) ctrl.actions = {
                submit: {
                    visible: false,
                    inProgress: false
                },
                recall: {
                    visible: false,
                    inProgress: false
                }
            };
            ctrl.actions.submit.visible = _.isEmpty(ctrl.dummy);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbDialogQn', ['qbQuestionList']);
'use strict';

angular.module('qbDialogQn').controller('dialogQnController', ["$scope", "$mdDialog", "$filter", function ($scope, $mdDialog, $filter) {
    var ctrl = this;
    ctrl.$onInit = function () {
        var filter = _.debounce(ctrl.doFilter, 500);
        $scope.$watch(function () {
            return ctrl.searchParam;
        }, function (newValue, oldValue, scope) {
            filter();
        });
    };
    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.add = function () {
        $mdDialog.hide();
    };
    ctrl.addQns = function (event) {
        $mdDialog.hide();
    };
    ctrl.doFilter = function () {
        ctrl.parent.logPagination(ctrl.parent.query.page, ctrl.parent.query.limit, ctrl.searchParam);
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentTurnIn', []);
'use strict';

angular.module('qbAssignmentTurnIn').controller('assignmentTurnInController', ["$scope", "$mdDialog", "$location", "User", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", "QB_ASSIGNMENT", function ($scope, $mdDialog, $location, userService, assigneeStatus, assignmentKind, assignmentConstants) {
    var ctrl = this;
    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.turnIn = function (event) {
        $mdDialog.hide();
    };
    ctrl.canSubmit = function () {
        ctrl.assignment.items = ctrl.assignment.items || [];
        if (ctrl.assignment.kind == assignmentKind.QUESTION_CREATE) {
            if (ctrl.assignment.items.length < ctrl.assignment.questionsNeededPerAuthor) {
                return true;
            }
            return false;
        } else if (ctrl.assignment.kind == assignmentKind.QUESTION_REVIEW) {
            ctrl.reviewedQuestions = _.size(ctrl.reviews);
            if (_.size(ctrl.reviews) < ctrl.assignment.items.length) {
                return true;
            }
            return false;
        }
    };
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentHistory', ['material.components.expansionPanels', 'qbAssignmentMore']);
'use strict';

angular.module('qbAssignmentHistory').component('qbAssignmentHistory', {
    templateUrl: 'app/minified/qb-assignment-history/qb-assignment-history.template.html',
    bindings: {
        id: "<"
    },
    controller: ["$mdDialog", "$scope", "$routeParams", "$q", "$element", "$timeout", "$location", "$mdExpansionPanel", "Util", "Assignment", "Log", function ($mdDialog, $scope, $routeParams, $q, $element, $timeout, $location, $mdExpansionPanel, util, assignmentService, loggingService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.assignmentId = ctrl.id;
            ctrl.query = {
                owner: ctrl.assignmentId,
                page: 1,
                size: 25
            };
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.getLogList();
            assignmentService.getAssignment(ctrl.assignmentId).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.assignment = response.data.data;
                }
            });
        };

        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            ctrl.getLogList();
        };
        ctrl.export = function (ev) {};
        ctrl.close = function (ev) {
            $mdDialog.cancel();
        };
        ctrl.getLogList = function () {
            var promises = {
                logging: loggingService.getLogs(ctrl.query),
                assignment: assignmentService.getAssignment(ctrl.assignmentId)
            };
            $q.all(promises).then(function (values) {
                ctrl.logs = values.logging.data.data;
                var created = values.assignment.data.data.createdBy;
                created.description = "Created";
                created.lastModificationDate = values.assignment.data.data.creationDate;
                created.modifiedBy = {
                    id: values.assignment.data.data.createdBy.id,
                    name: values.assignment.data.data.createdBy.name,
                    email: values.assignment.data.data.createdBy.email
                };
                var modified = values.assignment.data.data.modifiedBy;
                modified.description = "Modified";
                modified.lastModificationDate = values.assignment.data.data.lastModificationDate;
                modified.modifiedBy = {
                    id: values.assignment.data.data.modifiedBy.id,
                    name: values.assignment.data.data.modifiedBy.name,
                    email: values.assignment.data.data.modifiedBy.email
                };
                ctrl.logs.unshift(created, modified);
                ctrl.total = ctrl.logs.length;
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentSubmissions', ['qbAssignmenReturnAssignment', 'qbAssignmentCompleteConfirm', 'qbQuestionShowReview']);
'use strict';

angular.module('qbAssignmentSubmissions').component('qbAssignmentSubmissions', {
    templateUrl: 'app/minified/qb-assignment-submissions/qb-assignment-submissions.template.html',
    bindings: {
        assignment: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", '$routeParams', "Assignment", "Comment", "User", "Question", "Notifier", "State", "QB_ASSIGNEE", "Review", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNMENT_KIND", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, assignmentService, commentService, userService, questionService, notifier, stateService, assigneeConstants, reviewService, questionConstants, assignmentConstants, assignmentKindContants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            notifier.subscribe($scope, 'load-assignment-details', function (event, data) {
                if (ctrl.isSubmissionOpen()) ctrl.loadSubmissionDetails(undefined, ctrl.getSelectedAssignee());
            });
        };
        ctrl.clearAssigneeSelection = function () {
            ctrl.assignment.assignees.forEach(function (assignee) {
                delete assignee.selected;
            });
        };
        ctrl.doAssignmentAction = function (event) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-assignment-complete-confirm/qb-assignment-complete-confirm.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCompleteConfirmController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    items: ctrl.assignment.items,
                    assignment: ctrl.assignment,
                    assignmentId: ctrl.assignment.id
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.completeAssignment = function (event) {
            ctrl.clearAssigneeSelection();
            if (ctrl.assignment.kind === assignmentKindContants.QUESTION_CREATE || ctrl.assignment.kind === assignmentKindContants.QUESTION_REVISION) {
                assignmentService.completeAssignment(ctrl.assignment.id).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        ctrl.assignment.status = assignmentConstants.COMPLETE;
                        _.chain(ctrl.assignment.assignees).filter(function (d) {
                            return d.status != assigneeConstants.COMPLETE;
                        }).forEach(function (a) {
                            if (a.items) {
                                a.items.forEach(function (item) {
                                    item.status = questionConstants.EDITORIAL;
                                });
                            }
                            a.status = assigneeConstants.COMPLETE;
                        });
                        $mdToast.show($mdToast.simple().textContent("Assignment completed!").parent(document.body).hideDelay(3000).position('top right'));
                        notifier.notify('load-notifications', {});
                        notifier.notify('load-assignments-to-do', {});
                        notifier.notify('load-assignment-assigned-by-me', {});
                        notifier.notify('load-assignment-assigned-by-others', {});
                        notifier.notify('load-assignments-done', {});
                        notifier.notify('load-assignments-submitted', {});
                        ctrl.doAssignmentAction(event);
                    }
                });
            } else if (ctrl.assignment.kind === assignmentKindContants.QUESTION_REVIEW) {
                assignmentService.completeAssignment(ctrl.assignment.id).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        $mdToast.show($mdToast.simple().textContent("Assignment completed!").parent(document.body).hideDelay(3000).position('top right'));
                        ctrl.doAssignmentAction(event);
                    }
                });
            }
        };
        ctrl.loadSubmissionDetails = function (ev, assignee) {
            ctrl.clearAssigneeSelection();
            assignee.selected = true;
            var itemIds = _.pluck(ctrl.assignment.items, "id");
            reviewService.getReviews(itemIds, assignee.id).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    ctrl.reviews = _.chain(response.data.data).groupBy("ownerId").value();
                }
            });
        };
        ctrl.getMyReview = function (questionId) {
            if (ctrl.reviews && ctrl.reviews[questionId]) {
                return _.last(ctrl.reviews[questionId]).status;
            }
            return "";
        };
        ctrl.returnAssignment = function (ev, assignee) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-assignment-return-assignment/qb-assignment-return-assignment.template.html',
                targetEvent: ev,
                controller: 'qbReturnAssignmentController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    assignment: ctrl.assignment
                }
            }).then(function () {
                assignmentService.returnAssignment(ctrl.assignment.id, assignee.id).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        $mdToast.show($mdToast.simple().textContent("Assignment Returned Successfully!").parent(document.body).hideDelay(3000).position('top right'));
                        assignee.status = assigneeConstants.DRAFT;
                        notifier.notify('load-assignment-details', {});
                        notifier.notify('load-assignments-to-do', {});
                        notifier.notify('load-assignment-assigned-by-me', {});
                        notifier.notify('load-assignment-assigned-by-others', {});
                        notifier.notify('load-assignments-done', {});
                        notifier.notify('load-assignments-submitted', {});
                    }
                });
                if (!_.isEmpty(ctrl.assignment.comment)) {
                    ctrl.comment = {
                        ownerId: ctrl.assignment.id,
                        comment: ctrl.assignment.comment,
                        category: 'Assignment'
                    };
                    commentService.addComment(ctrl.comment).then(function (response) {
                        notifier.notify('load-assignment-comments', {});
                    });
                }
            });
        };

        ctrl.completeForAssignee = function (ev, assignee) {
            assignee.selected = true;
            if (ctrl.assignment.kind === assignmentKindContants.QUESTION_CREATE || ctrl.assignment.kind === assignmentKindContants.QUESTION_REVISION) {
                assignmentService.completeForAssignee(ctrl.assignment.id, assignee.id).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        $mdDialog.cancel();
                        assignee.status = 'Complete';
                        $mdToast.show($mdToast.simple().textContent("Assignment Marked Complete Successfully!").parent(document.body).hideDelay(3000).position('top right'));
                        notifier.notify('load-notifications', {});
                        notifier.notify('load-assignments-to-do', {});
                        notifier.notify('load-assignment-assigned-by-me', {});
                        notifier.notify('load-assignment-assigned-by-others', {});
                        notifier.notify('load-assignments-done', {});
                        notifier.notify('load-assignments-submitted', {});
                        //making all assignment to editorial as assignment for assignee is marked complete.
                        assignee.items = assignee.items || [];
                        assignee.items.forEach(function (item) {
                            item.status = questionConstants.EDITORIAL;
                        });
                        var ob = {
                            templateUrl: 'app/minified/qb-assignment-complete-confirm/qb-assignment-complete-confirm.template.html',
                            targetEvent: ev,
                            controller: 'qbAssignmentCompleteConfirmController',
                            controllerAs: '$ctrl',
                            bindToController: true,
                            skipHide: true,
                            locals: {
                                items: assignee.items,
                                assignment: ctrl.assignment,
                                assignmentId: ctrl.assignment.id
                            }
                        };
                        stateService.fetchHistory().push(ob);
                        $mdDialog.show(ob);
                    }
                });
            } else if (ctrl.assignment.kind === assignmentKindContants.QUESTION_REVIEW) {
                assignmentService.completeForAssignee(ctrl.assignment.id, assignee.id).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        assignee.status = 'Complete';
                        $mdToast.show($mdToast.simple().textContent("Assignment Marked Complete Successfully!").parent(document.body).hideDelay(3000).position('top right'));
                        notifier.notify('load-assignments-to-do', {});
                        notifier.notify('load-assignment-assigned-by-me', {});
                        notifier.notify('load-assignment-assigned-by-others', {});
                        notifier.notify('load-assignments-done', {});
                    }
                });
            }
        };

        ctrl.updateAssignment = function (callback, event) {
            assignmentService.completeAssignment(ctrl.assignment.id).then(function (response) {
                $mdDialog.hide();
                if (_.isEqual(response.data.status, 'success')) {
                    callback(response.data, event);
                }
            });
        };

        ctrl.loadPreview = function (event, question) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    question: question
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };

        ctrl.isCompleted = function (status) {
            if (status) return status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.getAssigneeStatus = function (assignee) {
            if (assignee) {
                if (assignee.status == assigneeConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignee.updatedDate
                    };
                } else if (assignee.status == assigneeConstants.SUBMITTED) {
                    return {
                        status: "SUBMITTED",
                        date: assignee.updatedDate
                    };
                } else if (assignee.status == assigneeConstants.DRAFT && ctrl.assignment.kind === assignmentKindContants.QUESTION_CREATE && assignee.items) {
                    return {
                        status: "UPDATED",
                        date: assignee.updatedDate
                    };
                }
            }
        };

        ctrl.canApprove = function () {
            if (userService.isAdmin() || userService.isEditor()) return true;else return false;
        };

        ctrl.showThisReview = function (ev, question) {
            if (ctrl.reviews && ctrl.reviews[question.id]) {
                ctrl.thisQuestion = _.last(ctrl.reviews[question.id]);
            }
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-show-review/qb-question-show-review.template.html',
                targetEvent: ev,
                controller: 'questionShowReviewController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    question: ctrl.thisQuestion
                }
            });
        };

        ctrl.addColor = function (dueDate) {
            if (dueDate) {
                if (new Date(dueDate) < ctrl.currentDate) return "due-date-expired";else return "";
            }
            return "";
        };
        ctrl.cancelAssignment = function () {
            ctrl.clearAssigneeSelection();
        };
        ctrl.showAssignmentComplete = function () {
            if (ctrl.assignment.kind === assignmentKindContants.QUESTION_REVIEW) {
                return ctrl.canApprove() && !ctrl.isCompleted(ctrl.assignment.status) && !ctrl.isSubmissionOpen();
            }
            return ctrl.canApprove() && !ctrl.isCompleted(ctrl.assignment.status) && !ctrl.isSubmissionOpen();
        };
        ctrl.showAssignmentAction = function () {
            return ctrl.canApprove() && ctrl.isCompleted(ctrl.assignment.status) && !ctrl.isSubmissionOpen();
        };
        ctrl.getSelectedAssignee = function () {
            return _.find(ctrl.assignment.assignees, {
                selected: true
            });
        };
        ctrl.isSubmissionOpen = function () {
            return ctrl.getSelectedAssignee() ? true : false;
        };
        ctrl.isReviewAssignment = function () {
            return ctrl.assignment.kind == assignmentKindContants.QUESTION_REVIEW;
        };
    }]
});
'use strict';

// Define the `qbAssignmenReturnAssignment` module

angular.module('qbAssignmenReturnAssignment', []);
'use strict';

angular.module('qbAssignmenReturnAssignment').controller('qbReturnAssignmentController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.return = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbSidenav', ['qbBankCreate', 'angular-md5', 'qbChangePassword', 'qbUserGuide']);
'use strict';

angular.module('qbSidenav').component('qbSidenav', {
    templateUrl: 'app/minified/qb-sidenav/qb-sidenav.template.html',
    controller: ["$rootScope", "$window", "$mdSidenav", "$mdDialog", "$scope", "$element", "$timeout", "$location", "User", "Assignment", "Configuration", function ($rootScope, $window, $mdSidenav, $mdDialog, $scope, $element, $timeout, $location, userService, assignmentService, configurationService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.isAdmin = userService.isAdmin;
            ctrl.isEditor = userService.isEditor;
            ctrl.isAuthor = userService.isAuthor;
            setMenuHeight();
            if (userService.isFirstLogin() && !$rootScope.loggedIn) {
                $rootScope.loggedIn = true;
                ctrl.showUserGuide();
            }
        };
        ctrl.getLoggedInUser = function () {
            var u = userService.getLoggedInUser();
            if (u) {
                return {
                    id: u.id,
                    name: u.name,
                    email: u.email
                };
            }
        };
        ctrl.$onChanges = function () {};
        ctrl.$doCheck = function () {
            setMenuHeight();
        };
        ctrl.$onDestroy = function () {};
        ctrl.editProfile = function () {
            $location.url('/users-edit/' + userService.getLoggedInUser().id);
        };
        ctrl.changePassword = function () {
            $location.url('/change-password/');
        };
        ctrl.createQuestion = function () {
            $location.url('/question-create');
        };
        ctrl.loadQuestions = function () {
            $location.url('/questions');
        };
        ctrl.goto = function (relativeUrl, selected) {
            $location.url(relativeUrl);
            ctrl.selected = selected;
            if ($window.innerWidth < 1280) {
                $mdSidenav('left').toggle();
            }
        };
        ctrl.showUserGuide = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-user-guide/qb-user-guide.template.html',
                targetEvent: event,
                controller: 'userGuideController',
                controllerAs: '$ctrl',
                bindToController: true,
                clickOutsideToClose: true,
                escapeToClose: true
            }).then(function () {}).finally(function () {});
        };
        ctrl.getDefaultAvatarImage = function () {
            var config = configurationService.getConfig();
            var object = _.find(config, {
                name: "DefaultAvatar"
            });
            return object ? object.value : "";
        };
        var setMenuHeight = function setMenuHeight() {
            ctrl.menuHeight = angular.element('md-sidenav').height() - angular.element('md-sidenav md-toolbar').height() - angular.element('#userProfile').height() - 15;
        };
        ctrl.logoutPrompt = function (event) {
            var confirm = $mdDialog.confirm().title('Are you sure you want to logout?').ariaLabel('Logout').targetEvent(event).ok('LOGOUT').cancel('CANCEL');

            $mdDialog.show(confirm).then(function () {
                logout();
            });
        };

        function logout() {
            var user = userService.getLoggedInUser();
            userService.userLogout().then(function (d) {
                userService.clearLoggedInUser();
                $location.url('/');
            }, function () {
                userService.clearLoggedInUser();
                $location.url('/');
            });
        }
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentReviewmine', ['qbQuestionReviewView', 'qbQuestionShowReview', 'qbQuestionReviewDialog', 'qbQuestionPreviewDialog']);
'use strict';

angular.module('qbAssignmentReviewmine').component('qbAssignmentReviewmine', {
    templateUrl: 'app/minified/qb-assignment-reviewmine/qb-assignment-reviewmine.template.html',
    bindings: {
        assignment: '<'
    },
    controller: ["$mdDialog", "$scope", "$q", "$element", "$timeout", "$location", "$routeParams", "User", "State", "QB_ASSIGNEE", "Review", "Media", function ($mdDialog, $scope, $q, $element, $timeout, $location, $routeParams, userService, stateService, assigneeConstants, reviewService, mediaService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            fetchAll();
        };

        function fetchAll() {
            var promises = {
                reviews: reviewService.getMyReviews(_.pluck(ctrl.assignment.items, "id")),
                questionnaire: reviewService.getMyQuestionnaire()
            };
            $q.all(promises).then(function (values) {
                if (_.isEqual(values.reviews.data.status, 'success')) {
                    ctrl.reviews = _.chain(values.reviews.data.data).groupBy("ownerId").value();
                }
                if (_.isEqual(values.questionnaire.data.status, 'success')) {
                    ctrl.questionnaire = values.questionnaire.data.data;
                }
            });
        }
        ctrl.showQuestion = function (ev, question) {
            var promises = {
                reviews: reviewService.getMyReviews([question.id]),
                questionnaire: reviewService.getMyQuestionnaire()
            };
            $q.all(promises).then(function (values) {
                var review = _.last(values.reviews.data.data);
                if (!review) {
                    review = {
                        comment: "",
                        ownerId: question.id,
                        category: 'Question',
                        questionnaire: values.questionnaire.data.data
                    };
                } else if (!review.questionnaire) {
                    review.questionnaire = values.questionnaire.data.data;
                }
                $mdDialog.cancel();
                var ob = {
                    templateUrl: 'app/minified/qb-question-review-dialog/qb-question-review-dialog.template.html',
                    targetEvent: ev,
                    controller: 'qbQuestionReviewDialog',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        question: question,
                        review: review,
                        readOnly: false
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            });
        };

        ctrl.isComplete = function () {
            if (ctrl.assignment.assignees) {
                return _.find(ctrl.assignment.assignees, function (a) {
                    return a.id === userService.getLoggedInUser().id && a.status == assigneeConstants.COMPLETE;
                }) ? true : false;
            } else return false;
        };

        ctrl.isSubmitted = function () {
            if (ctrl.assignment.assignees) {
                return _.find(ctrl.assignment.assignees, function (a) {
                    return a.id === userService.getLoggedInUser().id && a.status == assigneeConstants.SUBMITTED;
                }) ? true : false;
            } else return false;
        };

        ctrl.getMyReview = function (questionId) {
            if (ctrl.reviews && ctrl.reviews[questionId]) {
                return _.last(ctrl.reviews[questionId]) ? "DONE" : "TO-DO";
            }
            return "TO-DO";
        };

        ctrl.showThisReview = function (ev, question) {
            var review = _.last(ctrl.reviews[question.id]);
            if (!review.questionnaire) {
                review.questionnaire = values.questionnaire.data.data;
            }
            review.questionnaire.forEach(function (a) {
                a.response = a.response && a.response == "true" ? 'YES' : 'NO';
            });
            $mdDialog.show({
                templateUrl: 'app/minified/qb-add-review-comment/qb-add-review-comment.template.html',
                targetEvent: ev,
                controller: 'qbAddReviewComment',
                controllerAs: '$ctrl',
                bindToController: true,
                preserveScope: true,
                skipHide: true,
                locals: {
                    readOnly: true,
                    review: review
                }
            });
        };

        ctrl.previewQuestion = function (event, question) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question
                },
                skipHide: true
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };

        ctrl.viewGuide = function () {
            mediaService.getGuide(ctrl.assignment.reviewGuideId).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.guide = response.data.data;
                    var href = ctrl.guide.url;
                    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                        var downloadFrame = document.createElement("iframe");
                        downloadFrame.setAttribute('src', href);
                        downloadFrame.setAttribute('style', "display:none");
                        document.body.appendChild(downloadFrame);
                        window.open(downloadFrame, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
                        window.focus();
                    } else {
                        var anchor = $('<a>');
                        anchor.attr('id', 'file_download');
                        if ($('#file_download').length > 0) {
                            var anchor = $('#file_download');
                        }
                        anchor.attr('href', href);
                        anchor.attr('target', '_blank');
                        anchor.css('display', 'none');
                        anchor.attr('download', ctrl.guide.name);
                        $(document.body).append(anchor);
                        anchor[0].click();
                        anchor[0].remove();
                    }
                }
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbTableSearchBar', []);
'use strict';

angular.module('qbTableSearchBar').component('qbTableSearchBar', {
    templateUrl: 'app/minified/qb-table-search-bar/qb-table-search-bar.template.html',
    bindings: {
        selected: "<",
        data: "=",
        tag: "<"
    },
    controller: ["$filter", "$mdDialog", "$scope", "$element", "$timeout", "$mdToast", "$location", function ($filter, $mdDialog, $scope, $element, $timeout, $mdToast, $location) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.search = true;
        };
        ctrl.filterUser = function () {
            ctrl.search = true;
        };
        ctrl.clearSearch = function () {
            ctrl.search = true;
            ctrl.data = "";
        };
    }]
});
'use strict';

angular.module('core.version', ['ngResource']);
'use strict';

angular.module('core.version').factory('Version', ['$http', '$resource', function ($http, $resource) {
    return {
        versionList: versionList,
        versionGet: versionGet
    };

    function versionList(query) {
        return $http({
            method: "GET",
            url: VERSION_URL,
            params: query
        });
    };

    function versionGet(id) {
        return $http.get(VERSION_URL + id);
    }
}]);
'use strict';

// Define the  module

angular.module('qbQuestionRevisionAnswerkey', []);
'use strict';

angular.module('qbQuestionRevisionAnswerkey').component('qbQuestionRevisionAnswerkey', {
    templateUrl: 'app/minified/qb-question-revision-answerkey/qb-question-revision-answerkey.template.html',
    bindings: {
        data: '<',
        question: '<'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", function ($mdDialog, $scope, $element, $timeout, $location) {
        var ctrl = this;
        ctrl.$onInit = function () {
            $scope.$watch(function () {
                return ctrl.data;
            }, function (newValue, oldValue, scope) {
                if (ctrl.data && ctrl.data.choices) {
                    ctrl.selectedChoice = ctrl.data.choices.findIndex(function (d) {
                        return d.correct;
                    });
                } else ctrl.selectedChoice = -1;
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserProfileCreate', ['ngMessages', 'ngFileUpload', 'qbQuestionAddImage']);
'use strict';

angular.module('qbUserProfileCreate').component('qbUserProfileCreate', {
    templateUrl: 'app/minified/qb-user-profile-create/qb-user-profile-create.template.html',
    controller: ["$scope", "$mdDialog", "$mdToast", "$location", "$routeParams", "User", "Role", "QB_USER", "Question", "Assignment", "Bank", "QB_QUESTION", function ($scope, $mdDialog, $mdToast, $location, $routeParams, userService, roleService, userConstants, questionService, assignmentService, bankService, questionConstants) {
        var ctrl = this;
        ctrl.user = {};
        ctrl.$onInit = function () {
            ctrl.count = {
                questions: 0,
                banks: 0,
                assignments: 0
            };
            ctrl.createInProgress = false;
            ctrl.userId = $routeParams.id ? $routeParams.id : null;
            ctrl.isEdit = ctrl.userId != null ? true : false;
            roleService.getList().then(function (response) {
                ctrl.allRoles = response.data.data;
                if (ctrl.userId == null) {
                    ctrl.roles = ctrl.allRoles;
                } else {
                    userService.userGet(ctrl.userId).then(function (response) {
                        ctrl.user = response.data.data;
                        ctrl.email = ctrl.user.email;
                        ctrl.roles = ctrl.allRoles.map(function (d) {
                            if (_.find(ctrl.user.roles, {
                                name: d.name
                            })) {
                                return {
                                    id: d.id,
                                    name: d.name,
                                    selected: true
                                };
                            } else {
                                return {
                                    id: d.id,
                                    name: d.name,
                                    selected: false
                                };
                            }
                        });
                        ctrl.user.roles = ctrl.roles.filter(function (d) {
                            return d.selected;
                        });
                        ctrl.isAuthor = _.filter(ctrl.user.roles, function (role) {
                            return role.name.match(new RegExp('Author'));
                        }).length > 0;
                        if (!ctrl.isAuthor) bankService.getAllBanks({}).then(function (response) {
                            if (response.data.status === "success") ctrl.count.banks = response.data.count;
                        });
                    });
                }
            });

            questionService.getAllQuestions({}).then(function (response) {
                if (response.data.status === "success") ctrl.count.questions = response.data.count;
            });
            assignmentService.getAllAssignments({}).then(function (response) {
                if (response.data.status === "success") ctrl.count.assignments = response.data.count;
            });
        };

        ctrl.user.alreadyTaken = false;
        ctrl.readonly = false;
        ctrl.selectedtopic = null;
        ctrl.searchText = null;
        ctrl.querySearch = querySearch;
        ctrl.user.selectedtopics = [];

        function querySearch(query) {
            ctrl.topics = [{
                name: 'physics'
            }, {
                name: 'chemistry'
            }, {
                name: 'biology'
            }, {
                name: 'history'
            }];
            var results = query ? ctrl.topics.filter(createFilterFor(query)) : [];
            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(topic) {
                return topic.name.indexOf(lowercaseQuery) === 0;
            };
        }
        ctrl.getLoggedInUser = function () {
            var u = userService.getLoggedInUser();
            if (u) {
                return {
                    id: u.id,
                    name: u.name,
                    email: u.email
                };
            }
        };

        ctrl.cancel = function () {
            $location.url('/users');
        };
        ctrl.isAdmin = function () {
            return userService.isAdmin();
        };
        ctrl.userEmailCheck = function (email, form) {
            ctrl.user.alreadyTaken = false;
            if (!email) return;
            if (ctrl.isEdit && ctrl.email == ctrl.user.email) return;
            userService.emailExists({
                email: email
            }).then(function (response) {
                if (response.data.data.value) {
                    ctrl.user.alreadyTaken = true;
                }
            });
        };
        ctrl.validate = function (form) {
            if (form) return form.$invalid || ctrl.user.alreadyTaken || ctrl.createInProgress;
        };
        ctrl.create = function () {
            ctrl.createInProgress = true;
            ctrl.user.roles = ctrl.user.roles.map(function (d) {
                return {
                    id: d.id,
                    name: d.name
                };
            });
            ctrl.user.status = userConstants.ACTIVE;
            ctrl.user.creationDate = new Date();
            var logUser = userService.getLoggedInUser();
            ctrl.user.createdBy = {
                id: logUser.id,
                name: logUser.name,
                avatar: logUser.avatar
            };
            userService.userCreate(ctrl.user).then(function (response) {
                if (response.data.status == "success") {
                    $location.url('/users');
                    ctrl.createInProgress = false;
                    $mdToast.show($mdToast.simple().textContent('User created successfully').parent(document.body).hideDelay(3000).position('top right'));
                }
            }, function () {
                ctrl.createInProgress = false;
            });
        };

        ctrl.edit = function () {
            ctrl.user.roles = ctrl.user.roles.map(function (d) {
                return {
                    id: d.id,
                    name: d.name
                };
            });
            ctrl.user.status = userConstants.ACTIVE;
            ctrl.user.creationDate = new Date();
            var logUser = userService.getLoggedInUser();
            ctrl.user.createdBy = {
                id: logUser.id,
                name: logUser.name,
                avatar: logUser.avatar
            };

            userService.userEdit(ctrl.user).then(function (response) {
                if (response.data.status == "success") {
                    ctrl.email = response.data.data.email;
                    $location.url('/users');
                    $mdToast.show($mdToast.simple().textContent('User updated successfully').parent(document.body).hideDelay(3000).position('top right'));
                }
            });
        };
        ctrl.invalidRole = function () {};
        ctrl.goto = function (relativeUrl) {
            $location.url(relativeUrl);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbSidenavButton', []);
'use strict';

angular.module('qbSidenavButton').component('qbSidenavButton', {
    templateUrl: 'app/minified/qb-sidenav-button/qb-sidenav-button.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$mdSidenav", function ($mdDialog, $scope, $element, $timeout, $mdSidenav) {
        var ctrl = this;
        ctrl.$onInit = function () {};
        ctrl.toggleSideNav = function (navID) {
            if ($mdSidenav(navID).isOpen()) {
                $mdSidenav(navID).close();
            } else {
                $mdSidenav(navID).open();
            }
        };
    }]
});
'use strict';

// Define the `qbQuestionRevisionDisplayText` module

angular.module('qbQuestionRevisionDisplayText', []);
'use strict';

angular.module('qbQuestionRevisionDisplayText').component('qbQuestionRevisionDisplayText', {
    templateUrl: 'app/minified/qb-question-revision-display-text/qb-question-revision-display-text.template.html',
    bindings: {
        onDelete: '&',
        data: '<'
    },
    controller: ["$scope", "$element", function ($scope, $element) {
        var ctrl = this;
    }]
});
'use strict';

// Define the `qbQuestionPreview` module

angular.module('qbQuestionPreview', ['qbQuestionRevisionDisplayText', 'qbQuestionDisplayImage', 'qbQuestionRevisionDialog', 'qbQuestionMore']);
'use strict';

angular.module('qbQuestionPreview').component('qbQuestionPreview', {
    templateUrl: 'app/minified/qb-question-preview/qb-question-preview.template.html',
    bindings: {
        question: "<",
        state: "<",
        disable: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$routeParams", "$location", "Util", "Question", "Review", "User", "Notifier", "Comment", "State", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", "QB_QUESTION", function ($mdDialog, $mdToast, $scope, $element, $timeout, $routeParams, $location, util, questionService, reviewService, userService, notifier, commentService, stateService, questionTypeConstants, assignmentKindConstants, questionStatusConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.reference = ctrl.question.ref;
            notifier.subscribe($scope, 'load-restored-question', function (event, data) {
                ctrl.loadQuestion();
            });
            ctrl.loadQuestion();
        };
        ctrl.loadQuestion = function () {
            questionService.questionGet(ctrl.question.id).then(function (response) {
                angular.merge(ctrl.question, response.data.data);
                getCategory();
                splitSections();
            });
            getCategory();
            splitSections();
        };
        /*-------- private functions ---------*/
        var getCategory = function getCategory() {
            if (ctrl.question.sections) {
                ctrl.question.sections.forEach(function (section) {
                    if (section.category === questionTypeConstants.MULTIPLECHOICE) ctrl.category = questionTypeConstants.NAME.MULTIPLECHOICE;else if (section.category === questionTypeConstants.SINGLECHOICE) ctrl.category = questionTypeConstants.NAME.SINGLECHOICE;else if (section.category === questionTypeConstants.SHORTANSWER) ctrl.category = questionTypeConstants.NAME.SHORTANSWER;else if (section.category === questionTypeConstants.ESSAY) ctrl.category = questionTypeConstants.NAME.ESSAY;
                });
            }
        };
        var splitSections = function splitSections() {
            if (ctrl.question.sections) {
                ctrl.media = ctrl.question.sections.filter(function (section) {
                    return section['category'] === 'image' || section['category'] === 'video';
                }).map(function (item) {
                    return item;
                });
                ctrl.noMedia = ctrl.question.sections.filter(function (section) {
                    return section['category'] !== 'image' && section['category'] !== 'video';
                }).map(function (item) {
                    return item;
                });
            }
        };
        ctrl.cancel = function () {
            $mdDialog.cancel();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionPreviewDialog', ['qbQuestionPreview']);
'use strict';

angular.module('qbQuestionPreviewDialog').controller('qbQuestionPreviewDialogController', ["$scope", "$mdDialog", "$mdToast", "State", function ($scope, $mdDialog, $mdToast, stateService) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionMore', ['qbQuestionRevisionDialog', 'qbQuestionHistoryDialog', 'qbViewSubmissionReviews', 'qbQuestionAddToQuestionBankDialog']);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

angular.module('qbQuestionMore').component('qbQuestionMore', {
    templateUrl: 'app/minified/qb-question-more/qb-question-more.template.html',
    bindings: {
        question: "<",
        section: "@"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", 'User', "Question", "State", "Review", "Comment", "Notifier", "QB_ASSIGNMENT_KIND", "QB_QUESTION", "QB_USER_ROLES", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, userService, questionService, stateService, reviewService, commentService, notifier, assignmentKindConstants, questionStatusConstants, userRolesConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            var moreItems = {
                edit: {
                    item: 'Edit',
                    action: ctrl.editQuestion
                },
                information: {
                    item: 'Information',
                    action: ctrl.showQuestionInformation
                },
                revisions: {
                    item: 'Revisions',
                    action: ctrl.viewRevisions
                },
                activityHistory: {
                    item: 'Activity History',
                    action: ctrl.showHistory
                },
                publish: {
                    item: 'Publish',
                    action: ctrl.publish
                },
                reject: {
                    item: 'Reject',
                    action: ctrl.reject
                },
                reviewAssignment: {
                    item: 'Add to Review Assignment',
                    action: ctrl.addToReviewAssignment
                },
                reviewerComments: {
                    item: 'Reviewer Comments',
                    action: ctrl.viewReviews
                },
                editAssignment: {
                    item: 'Add to Edit Assignment',
                    action: ctrl.requestRevisions
                },
                unpublish: {
                    item: 'Unpublish',
                    action: ctrl.unPublish
                },
                retire: {
                    item: 'Retire',
                    action: ctrl.retire
                },
                questionBank: {
                    item: 'Add to Question Bank',
                    action: ctrl.addToQuestionBank
                }
            };
            ctrl.menuItems = moreItems;

            questionService.questionGet(ctrl.question.id).then(function (response) {
                var _questionStatusConsta3, _questionStatusConsta4, _questionStatusConsta5, _questionStatusConsta6, _questionStatusConsta7, _questionStatusConsta8, _angular$merge;

                angular.merge(ctrl.question, response.data.data);
                ctrl.menuItems = [];
                var previleges = angular.merge(getMenuArrayTemplate(), (_angular$merge = {}, _defineProperty(_angular$merge, questionStatusConstants.DRAFT, _defineProperty({}, userRolesConstants.AUTHOR, setDraftOrDonePrevilege(moreItems))), _defineProperty(_angular$merge, questionStatusConstants.DONE, _defineProperty({}, userRolesConstants.AUTHOR, setDraftOrDonePrevilege(moreItems))), _defineProperty(_angular$merge, questionStatusConstants.SUBMITTED, (_questionStatusConsta3 = {}, _defineProperty(_questionStatusConsta3, userRolesConstants.EDITOR, [moreItems.information, moreItems.revisions, moreItems.activityHistory]), _defineProperty(_questionStatusConsta3, userRolesConstants.ADMIN, [moreItems.information, moreItems.revisions, moreItems.activityHistory]), _questionStatusConsta3)), _defineProperty(_angular$merge, questionStatusConstants.EDITORIAL, (_questionStatusConsta4 = {}, _defineProperty(_questionStatusConsta4, userRolesConstants.EDITOR, getEditorialAllPrevilege(moreItems)), _defineProperty(_questionStatusConsta4, userRolesConstants.ADMIN, getEditorialAllPrevilege(moreItems)), _questionStatusConsta4)), _defineProperty(_angular$merge, questionStatusConstants.INREVIEW, (_questionStatusConsta5 = {}, _defineProperty(_questionStatusConsta5, userRolesConstants.EDITOR, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments]), _defineProperty(_questionStatusConsta5, userRolesConstants.ADMIN, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments]), _defineProperty(_questionStatusConsta5, userRolesConstants.REVIEWER, [moreItems.review]), _questionStatusConsta5)), _defineProperty(_angular$merge, questionStatusConstants.APPROVED, (_questionStatusConsta6 = {}, _defineProperty(_questionStatusConsta6, userRolesConstants.EDITOR, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments, moreItems.unpublish, moreItems.retire, moreItems.questionBank]), _defineProperty(_questionStatusConsta6, userRolesConstants.ADMIN, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments, moreItems.unpublish, moreItems.retire, moreItems.questionBank]), _questionStatusConsta6)), _defineProperty(_angular$merge, questionStatusConstants.REJECTED, (_questionStatusConsta7 = {}, _defineProperty(_questionStatusConsta7, userRolesConstants.EDITOR, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments, moreItems.unpublish]), _defineProperty(_questionStatusConsta7, userRolesConstants.ADMIN, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments, moreItems.unpublish]), _questionStatusConsta7)), _defineProperty(_angular$merge, questionStatusConstants.ARCHIVED, (_questionStatusConsta8 = {}, _defineProperty(_questionStatusConsta8, userRolesConstants.EDITOR, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments, moreItems.publish]), _defineProperty(_questionStatusConsta8, userRolesConstants.ADMIN, [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.reviewerComments, moreItems.publish]), _questionStatusConsta8)), _angular$merge));
                if (userService.isAuthor()) ctrl.menuItems = angular.merge(ctrl.menuItems, previleges[ctrl.question.status][userRolesConstants.AUTHOR]);
                if (userService.isReviewer()) ctrl.menuItems = angular.merge(ctrl.menuItems, previleges[ctrl.question.status][userRolesConstants.REVIEWER]);
                if (userService.isEditor()) ctrl.menuItems = angular.merge(ctrl.menuItems, previleges[ctrl.question.status][userRolesConstants.EDITOR]);
                if (userService.isAdmin()) ctrl.menuItems = angular.merge(ctrl.menuItems, previleges[ctrl.question.status][userRolesConstants.ADMIN]);
            });
        };
        ctrl.viewRevisions = function (event) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-revision-dialog/qb-question-revision-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionRevisionDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: ctrl.question
                },
                skipHide: true
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.showHistory = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-history-dialog/qb-question-history-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionHistoryDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: ctrl.question
                },
                skipHide: true
            });
        };
        ctrl.showQuestionInformation = function (ev, item) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-information/qb-question-information.template.html',
                targetEvent: ev,
                locals: {
                    data: ctrl.question
                },
                controller: 'questionInformationController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true
            });
        };
        ctrl.viewReviews = function (ev, item) {
            reviewService.getReviewsFor([ctrl.question.id]).then(function (response) {
                if (response.data.status === "success") {
                    var reviews = [];
                    _.chain(response.data.data).groupBy(function (a) {
                        return a.createdBy.id;
                    }).forEach(function (a) {
                        reviews.push(_.last(a));
                    });
                    reviews.forEach(function (review) {
                        if (review.questionnaire) {
                            review.questionnaire.forEach(function (a) {
                                a.response = a.response && a.response == "true" ? 'YES' : 'NO';
                            });
                        }
                    });
                    $mdDialog.cancel();
                    var ob = {
                        templateUrl: 'app/minified/qb-view-submission-reviews/qb-view-submission-reviews.template.html',
                        targetEvent: ev,
                        controller: 'qbViewSubmissionReviews',
                        controllerAs: '$ctrl',
                        bindToController: true,
                        preserveScope: true,
                        skipHide: true,
                        locals: {
                            readOnly: true,
                            reviews: reviews,
                            question: ctrl.question
                        }
                    };
                    stateService.fetchHistory().push(ob);
                    $mdDialog.show(ob);
                }
            });
        };
        ctrl.editQuestion = function (event, item) {
            $mdDialog.cancel(); //QB-469
            $timeout(function () {
                var ob = {
                    templateUrl: 'app/minified/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionEditDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        question: ctrl.question
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }, 100);
        };
        ctrl.requestRevisions = function (ev, item) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: ev,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    assignment: {
                        assignees: [],
                        items: [ctrl.question],
                        kind: assignmentKindConstants.QUESTION_REVISION
                    }
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.publish = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.APPROVED);
        };
        ctrl.reject = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.REJECTED);
        };
        ctrl.unPublish = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.EDITORIAL);
        };
        ctrl.retire = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.ARCHIVED);
        };
        ctrl.openReview = function (ev, item, status) {
            ctrl.question.status = status;
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-review-view/qb-question-review-view.template.html',
                targetEvent: ev,
                controller: 'questionReviewViewController',
                controllerAs: '$ctrl',
                bindToController: true,
                preserveScope: true,
                skipHide: true,
                locals: {
                    question: ctrl.question,
                    status: item
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.addToReviewAssignment = function (event, item) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignment: {
                        assignees: [],
                        kind: assignmentKindConstants.QUESTION_REVIEW,
                        items: [ctrl.question]
                    }
                },
                skipHide: true
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.menuItemClick = function (option, event) {
            option.action(event, option.item);
        };
        ctrl.cancel = function () {
            $mdDialog.cancel();
        };
        ctrl.addToQuestionBank = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-add-to-question-bank-dialog/qb-question-add-to-question-bank-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionAddToQuestionBankDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    questions: [ctrl.question]
                }
            });
        };
        var getMenuArrayTemplate = function getMenuArrayTemplate() {
            var previlege = {};
            angular.forEach(questionStatusConstants, function (status, index) {
                var roles = {};
                angular.forEach(userRolesConstants, function (role, index) {
                    roles[role] = [];
                });
                previlege[status] = roles;
            });
            return previlege;
        };
        var getEditorialAllPrevilege = function getEditorialAllPrevilege(moreItems) {
            if (ctrl.section === 'edit-question') return [moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.publish, moreItems.reject, moreItems.reviewAssignment, moreItems.reviewerComments, moreItems.editAssignment];else return [moreItems.edit, moreItems.information, moreItems.revisions, moreItems.activityHistory, moreItems.publish, moreItems.reject, moreItems.reviewAssignment, moreItems.reviewerComments, moreItems.editAssignment];
        };

        var isOwner = function isOwner() {
            return ctrl.question.createdBy.id === userService.getLoggedInUser().id;
        };
        var setDraftOrDonePrevilege = function setDraftOrDonePrevilege(moreItems) {
            if (ctrl.section === 'edit-question') return [moreItems.revisions];else if (!isOwner()) return [];else return [moreItems.edit, moreItems.revisions];
        };
    }]
});
'use strict';

// Define the `qbQuestionImageDialog` module

angular.module('qbQuestionImageDialog', []);
'use strict';

angular.module('qbQuestionImageDialog').controller('questionImageDialogController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the `qbAaddComment` module

angular.module('qbAaddComment', []);
'use strict';

angular.module('qbAaddComment').controller('qbAddCommentController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.save = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the `qbDisplayComments` module

angular.module('qbDisplayComments', []);
'use strict';

angular.module('qbDisplayComments').component('qbDisplayComments', {
    templateUrl: 'app/minified/qb-display-comments/qb-display-comments.template.html',
    bindings: {
        assignment: "<",
        status: "<",
        assignmentId: "<"
    },
    controller: ["$scope", "$mdDialog", "$mdToast", "$routeParams", "$element", "Comment", "Notifier", "QB_ASSIGNMENT", "QB_ASSIGNMENT_KIND", function ($scope, $mdDialog, $mdToast, $routeParams, $element, commentService, notifier, assignmentConstants, assignmentKindConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.constants = {
                assignmentKind: assignmentKindConstants
            };
            ctrl.getMyComments();
            notifier.subscribe($scope, 'load-assignment-comments', function (event, data) {
                ctrl.getMyComments();
            });
        };
        ctrl.getMyComments = function () {
            commentService.getComments(ctrl.assignment.id).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    var parents = _.chain(response.data.data).filter({
                        category: "Assignment"
                    }).map(function (p) {
                        p.elements = [p.id];
                        p.child = [];
                        return p;
                    }).value();
                    _.chain(response.data.data).filter({
                        category: "Comment"
                    }).each(function (c) {
                        var parent = _.find(parents, function (p) {
                            return p.elements.indexOf(c.ownerId) >= 0;
                        });

                        if (parent) {
                            parent.child.push(c);
                            parent.elements.push(c.id);
                        }
                    });
                    // response.data.data.forEach((d) => {
                    //     if (d.category == "Assignment")
                    //         d.class = 'main-comment';
                    //     else if (d.category == "Comment")
                    //         d.class = 'child-comment';
                    // })
                    ctrl.comments = parents;
                }
            });
        };
        ctrl.addComment = function (ev) {
            ctrl.comment = {
                ownerId: ctrl.assignment.id,
                category: 'Assignment'
            };
            $mdDialog.show({
                templateUrl: 'app/minified/qb-add-comment/qb-add-comment.template.html',
                targetEvent: ev,
                controller: 'qbAddCommentController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    comment: ctrl.comment
                }
            }).then(function () {
                if (!_.isEmpty(ctrl.comment.comment)) {
                    commentService.addComment(ctrl.comment).then(function (response) {
                        if (_.isEqual(response.data.status, 'success')) {
                            notifier.notify('load-assignment-comments', {});
                            $mdToast.show($mdToast.simple().textContent("Comment Added Successfully!").parent(document.body).hideDelay(3000).position('top right')).then(function () {
                                ctrl.getMyComments();
                            });
                        }
                    });
                }
            });
        };
        ctrl.addReply = function (ev, comment) {
            ctrl.comment = {
                ownerId: comment.id,
                category: 'Comment'
            };
            $mdDialog.show({
                templateUrl: 'app/minified/qb-add-comment/qb-add-comment.template.html',
                targetEvent: ev,
                controller: 'qbAddCommentController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    comment: ctrl.comment
                }
            }).then(function () {
                if (!_.isEmpty(ctrl.comment.comment)) {
                    commentService.addComment(ctrl.comment).then(function (response) {
                        if (_.isEqual(response.data.status, 'success')) {
                            notifier.notify('load-assignment-comments', {});
                            $mdToast.show($mdToast.simple().textContent("Reply Added Successfully!").parent(document.body).hideDelay(3000).position('top right')).then(function () {
                                ctrl.getMyComments();
                            });
                        }
                    });
                }
            });
        };
        ctrl.showComment = function () {
            if (!ctrl.assignment) {
                return false;
            }
            if (ctrl.assignment.kind === ctrl.constants.assignmentKind.QUESTION_CREATE) return ctrl.assignment.questionsNeededPerAuthor - ctrl.assignment.items.length > 0;
            return !ctrl.status || ctrl.status == assignmentConstants.COMPLETE;
        };
    }]
});
'use strict';

// Define the `qbQuestionShowReview` module

angular.module('qbQuestionShowReview', []);
'use strict';

angular.module('qbQuestionShowReview').controller('questionShowReviewController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentCompleteConfirm', ['qbAssignmentCreateDialog', 'qbAssignmentConfirmCreatedDialog', 'qbQuestionActionVerificationDialog']);
'use strict';

angular.module('qbAssignmentCompleteConfirm').controller('qbAssignmentCompleteConfirmController', ["$scope", "$mdDialog", "$mdToast", "$location", "$filter", "Question", "User", "State", "Assignment", "Notifier", "QB_ASSIGNEE", "QB_QUESTION", "QB_ASSIGNMENT_KIND", "QB_QUESTION_TYPE", "QB_ASSIGNMENT", function ($scope, $mdDialog, $mdToast, $location, $filter, questionService, userService, stateService, assignmentService, notifier, assigneeConstants, questionConstants, assignmentKindConstants, questionTypeConstants, assignmentConstants) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
        ctrl.reopenAssignmentDialog();
    };
    ctrl.reopenAssignmentDialog = function (data) {
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.getItemAssignment = function (item) {
        if ((item.status != questionConstants.APPROVED || item.status != questionConstants.REJECTED) && item.linkedAssignment) {
            if (ctrl.assignment.customId == item.linkedAssignment.customId) {
                return "";
            }
            item.selected = false;
            return "IN ASSIGNMENT " + $filter('numberFixedLen')(item.linkedAssignment.customId, 5);
        }
        return "";
    };
    ctrl.checkInAssignment = function (item) {
        if ((item.status != questionConstants.APPROVED || item.status != questionConstants.REJECTED) && item.linkedAssignment) {
            if (ctrl.assignment.customId == item.linkedAssignment.customId) {
                return false;
            }
            return true;
        }
        return false;
    };
    ctrl.publish = function (event) {
        var selected = _.where(ctrl.items, {
            selected: true
        });
        questionService.approve(_.pluck(selected, 'id')).then(function (response) {
            if (_.isEqual(response.data.status, 'success')) {
                $mdDialog.cancel();
                response.data.data.forEach(function (i) {
                    var item = _.find(ctrl.assignment.items, function (d) {
                        return d.customId == i.customId;
                    });
                    if (item) {
                        item.status = i.status;
                    }
                });
                notifier.notify('load-assignment-details', {});
                notifier.notify('load-questions-inprogress', {});
                notifier.notify('load-questions-published', {});
                notifier.notify('load-questions-retired', {});
                var ob = {
                    templateUrl: 'app/minified/qb-question-action-verification-dialog/qb-question-action-verification-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionActionVerificationDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        questions: selected,
                        action: "Published",
                        assignment: ctrl.assignment
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        });
    };
    ctrl.reject = function (event) {
        var selected = _.where(ctrl.items, {
            selected: true
        });
        $mdDialog.cancel();
        questionService.disapprove(_.pluck(selected, 'id')).then(function (response) {
            if (_.isEqual(response.data.status, 'success')) {
                response.data.data.forEach(function (i) {
                    var item = _.find(ctrl.assignment.items, function (d) {
                        return d.customId == i.customId;
                    });
                    if (item) {
                        item.status = i.status;
                    }
                });
                notifier.notify('load-assignment-details', {});
                notifier.notify('load-questions-inprogress', {});
                notifier.notify('load-questions-published', {});
                notifier.notify('load-questions-retired', {});
                var ob = {
                    templateUrl: 'app/minified/qb-question-action-verification-dialog/qb-question-action-verification-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionActionVerificationDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        questions: selected,
                        action: "Rejected",
                        assignment: ctrl.assignment
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        });
    };
    ctrl.addToEditAssignment = function (event) {
        makeAssignment(assignmentKindConstants.QUESTION_REVISION, event);
    };
    ctrl.addToReviewAssignment = function (event) {
        makeAssignment(assignmentKindConstants.QUESTION_REVIEW, event);
    };
    ctrl.menuItemClick = function (option, event) {
        option.action(event, option.item);
    };
    ctrl.menuItems = [];
    ctrl.openMenu = function ($mdOpenMenu, event) {
        var selected = _.filter(ctrl.items, function (q) {
            return q.selected;
        });
        if (_.isEmpty(selected)) {
            return;
        }
        var menuItems = [{
            item: 'Publish',
            action: ctrl.publish
        }, {
            item: 'Reject',
            action: ctrl.reject
        }, {
            item: 'Add To Edit Assignment',
            action: ctrl.addToEditAssignment
        }, {
            item: 'Add To Review Assignment',
            action: ctrl.addToReviewAssignment
        }];
        var menus = [];
        selected.forEach(function (s) {
            if (s.status == questionConstants.APPROVED) {
                menus.push([menuItems[1]]);
            } else if (s.status == questionConstants.REJECTED || s.status == questionConstants.ARCHIVED) {
                menus.push([menuItems[0], menuItems[2], menuItems[3]]);
            } else {
                menus.push([menuItems[0], menuItems[1], menuItems[2], menuItems[3]]);
            }
        });
        ctrl.menuItems = _.intersection.apply(_, menus);
        $mdOpenMenu(event);
    };
    var makeAssignment = function makeAssignment(kind, event) {
        var selected = _.where(ctrl.items, {
            selected: true
        });
        var assignment = {};
        assignment.assignees = [];
        assignment.dueDate = new Date();
        assignment.name = "Assignment for " + _.pluck(selected, "customId").join(" ,");
        assignment.description = "Assignment for " + _.pluck(selected, "customId").join(" ,");
        assignment.kind = kind;
        assignment.status = assignmentConstants.DRAFT;
        var currentUser = userService.getLoggedInUser();
        assignment.createdBy = {
            name: currentUser.name,
            id: currentUser.id
        };
        assignment.modifiedBy = {
            name: currentUser.name,
            id: currentUser.id
        };
        assignment.creationDate = new Date();
        assignment.lastModificationDate = new Date();
        assignment.items = _.map(selected, function (d) {
            return {
                id: d.id,
                customId: d.customId
            };
        });
        assignment.questionsNeededPerAuthor = assignment.items.length;
        if (kind == assignmentKindConstants.QUESTION_REVISION) {
            assignment.questionType = questionTypeConstants.MULTIPLECHOICE;
        }
        assignmentService.createAssignment(assignment).then(function (response) {
            if (response.data.status === 'success') {
                selected.forEach(function (d) {
                    if (kind == assignmentKindConstants.QUESTION_REVISION) d.status = questionConstants.DRAFT;else if (kind == assignmentKindConstants.QUESTION_REVIEW) d.status = questionConstants.INREVIEW;
                });
                assignmentService.association(selected, ctrl.assignment.customId);
                var assignment1 = response.data.data;
                assignment1.items.length = 0;
                assignment1.items = angular.copy(selected);
                $mdDialog.cancel();
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-confirm-created-dialog/qb-assignment-confirm-created-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentConfirmCreatedDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        assignment: assignment1
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        });
    };
    ctrl.openAssignment = function (item) {
        var open = function open(assignment) {
            $mdDialog.cancel();
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentCreateDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: assignment,
                        items: assignment.items
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            } else {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignmentId: assignment.id,
                        assignment: assignment,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };
        if ((item.status != questionConstants.APPROVED || item.status != questionConstants.REJECTED) && item.linkedAssignment.customId) {
            assignmentService.getAssignment(item.linkedAssignment.id).then(function (response) {
                open(response.data.data);
            });
        }
    };
    ctrl.loadPreview = function (event, question) {
        $mdDialog.cancel();
        var ob = {
            templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
            targetEvent: event,
            controller: 'qbQuestionPreviewDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                question: question
            }
        };
        stateService.fetchHistory().push(ob);
        $mdDialog.show(ob);
    };
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentMore', ['qbAssignmentHistoryDialog']);
'use strict';

angular.module('qbAssignmentMore').component('qbAssignmentMore', {
    templateUrl: 'app/minified/qb-assignment-more/qb-assignment-more.template.html',
    bindings: {
        id: "<",
        assignment: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", function ($mdDialog, $scope, $element, $timeout, $location) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.menuItems = [{
                item: 'History',
                action: ctrl.loadHistory
            }
            // , {
            //     item: 'Duplicate',
            //     action: ctrl.duplicate
            // }, {
            //     item: 'Transfer Ownership',
            //     action: ctrl.transferOwnership
            // }, {
            //     item: 'Unassign',
            //     action: ctrl.unAssign
            // }
            ];
        };
        ctrl.loadHistory = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-assignment-history-dialog/qb-assignment-history-dialog.template.html',
                targetEvent: ev,
                controller: 'qbAssignmentHistoryDialog',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    assignmentId: ctrl.id,
                    assignment: ctrl.assignment
                }
            });
        };
        ctrl.duplicate = function () {
            console.log("duplicate");
        };
        ctrl.transferOwnership = function () {
            console.log("transferOwnership");
        };
        ctrl.unAssign = function () {
            console.log("unAssign");
        };
        ctrl.menuItemClick = function (action, event) {
            action(event);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbBankDetails', ['material.components.expansionPanels', 'qbCriteriaAdd', 'qbBankInfo', 'qbBankDialogQuestion', 'qbBanksMore', 'qbQuestionPreviewDialog']);
'use strict';

angular.module('qbBankDetails').component('qbBankDetails', {
    templateUrl: 'app/minified/qb-bank-details/qb-bank-details.template.html',
    bindings: {
        bank: "=",
        questions: "="
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$routeParams", "$q", "$mdToast", '$mdExpansionPanel', "$filter", "$location", "Bank", "User", "Question", "Tag", "QB_QUESTION", function ($mdDialog, $scope, $element, $timeout, $routeParams, $q, $mdToast, $mdExpansionPanel, $filter, $location, bankService, userService, questionService, tagService, questionConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 140;
            ctrl.bank = {
                questions: []
            };
            ctrl.EMPTY_CRITERIA = "This question bank currently has no set criteria.";
            ctrl.questions = [];
            ctrl.allCriteria = {};
            ctrl.criteria = {};
            ctrl.typeData = {};
            ctrl.typeData.data = [{
                name: "SingleResponse",
                taxonomy: "Type",
                id: 1
            }, {
                name: "MultipleResponse",
                taxonomy: "Type",
                id: 2
            }, {
                name: "ShortText",
                taxonomy: "Type",
                id: 3
            }, {
                name: "LongText",
                taxonomy: "Type",
                id: 4
            }];
            tagService.getClass().then(function (response) {
                ctrl.tags = response.data.data;
                var promises = {};
                ctrl.tags.forEach(function (tag) {
                    promises[tag.name] = tagService.getTaxonomies(tag.id);
                });
                ctrl.tags.push({
                    name: "Type",
                    type: "tag"
                });
                $q.all(promises).then(function (values) {
                    ctrl.allCriteria = values;
                    ctrl.allCriteria.Type = {
                        data: ctrl.typeData
                    };
                });
            });
            ctrl.itemsSelected = [];
            ctrl.searchParam = "";
            ctrl.query = {
                sort: 'id',
                limit: 25,
                page: 1
            };
            ctrl.filter = {
                stem: "",
                customId: "",
                statuses: [questionConstants.DRAFT, questionConstants.SUBMITTED, questionConstants.EDITORIAL, questionConstants.INREVIEW, questionConstants.DONE]
            };
            if ($routeParams.id !== undefined) {
                bankService.getBank($routeParams.id).then(function (response) {
                    if (response.data.status === "success") {
                        ctrl.bank = response.data.data;
                        ctrl.questions = ctrl.bank.questions || [];
                        ctrl.info = {
                            status: "",
                            published: "",
                            lastModified: ctrl.bank.lastModificationDate,
                            created: ctrl.bank.creationDate,
                            owner: {
                                profile: "app/resources/images/placeholder-avatar.png",
                                id: ""
                            }
                        };
                    }
                });
            }
        };
        ctrl.ifEmpty = function (object) {
            return Object.keys(object).length === 0 && object.constructor === Object;
        };
        ctrl.addQuestion = function (event) {
            getQuestions();
            var selected = angular.copy(ctrl.questions ? ctrl.questions : []);
            $mdDialog.show({
                templateUrl: 'app/minified/qb-bank-dialog-question/qb-bank-dialog-question.template.html',
                targetEvent: event,
                controller: 'qbBankDialogQuestion',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    parent: ctrl,
                    selected: selected
                }
            }).then(function () {
                ctrl.questions = selected.map(function (d) {
                    return {
                        id: d.id,
                        stem: d.stem,
                        customId: d.customId
                    };
                });
            });
        };
        ctrl.preview = function (questionId, event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: {
                        id: questionId
                    }
                },
                skipHide: true
            });
        };
        ctrl.removeData = function (dataArray, arrayItem) {
            dataArray.splice(dataArray.indexOf(arrayItem), 1);
        };
        ctrl.setCriteria = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-criteria/qb-criteria.template.html',
                targetEvent: event,
                controller: 'criteriaController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    data: ctrl.allCriteria,
                    hideType: false
                }
            }).then(function () {}).finally(function () {
                $mdExpansionPanel('criteria').expand();
                getQuestions();
            });
        };
        ctrl.logPagination = function (page, limit, search) {
            if (page !== ctrl.query.page || limit !== ctrl.query.limit || ctrl.filter.stem !== search || ctrl.filter.customId !== search) {
                ctrl.query.limit = limit;
                ctrl.query.page = page;
                ctrl.filter.stem = search || "";
                ctrl.filter.customId = search || "";
                getQuestions();
            }
        };

        var getQuestions = function getQuestions() {
            ctrl.criteria = {};
            ctrl.tags.forEach(function (tag) {
                ctrl.criteria[tag.name] = $filter('filter')(ctrl.allCriteria[tag.name].data.data, {
                    selected: true
                });
                ctrl.filter[tag.name.toLowerCase()] = _.pluck(ctrl.criteria[tag.name], "name");
            });
            questionService.questionList(ctrl.query, ctrl.filter).then(function (response) {
                ctrl.allQuestions = response.data.data;
                ctrl.count = response.data.count;
            });
        };
        ctrl.hasElements = function () {
            if (!ctrl.tags) {
                return false;
            }
            var flag = false;
            ctrl.tags.forEach(function (tag) {
                if (ctrl.criteria[tag.name]) flag = flag || ctrl.criteria[tag.name].length > 0;
            });
            return flag;
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbBankCreate', ['material.components.expansionPanels', 'qbCriteriaAdd', 'qbBankInfo', 'qbDialogQn', 'qbBanksMore']);
'use strict';

angular.module('qbBankCreate').component('qbBankCreate', {
    templateUrl: 'app/minified/qb-bank-create/qb-bank-create.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$routeParams", "$mdToast", '$mdExpansionPanel', "$filter", "$location", "Bank", "User", "Question", "QB_QUESTION", function ($mdDialog, $scope, $element, $timeout, $routeParams, $mdToast, $mdExpansionPanel, $filter, $location, bankService, userService, questionService, questionConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.bank = new Object();
            ctrl.selectedQuestions = [];
            ctrl.type = "screen";
        };
        ctrl.checkInValid = function () {
            return _.isEmpty(ctrl.bank.name) || _.isEmpty(ctrl.bank.description);
        };
        ctrl.saveBank = function (event) {
            var currentUser = userService.getLoggedInUser();
            ctrl.bank.createdBy = {
                name: currentUser.name,
                avatar: currentUser.avatar,
                id: currentUser.id
            };
            ctrl.bank.questions = _.map(ctrl.selectedQuestions, function (value, key) {
                return _.pick(value, 'id');
            });
            bankService.save(ctrl.bank).then(function (response) {
                ctrl.questionDiff = response.data.data;
                if (response.data.status == "success") {
                    $mdToast.show($mdToast.simple().textContent('Question Bank created successfully').parent(document.body).hideDelay(3000).position('top right'));
                    $location.url('/banks');
                }
            });
        };
        ctrl.onSuccess = function () {
            $location.url('/banks');
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbBankEdit', ['qbBankCreateForm', 'qbBankExport']);
'use strict';

angular.module('qbBankEdit').controller('qbBankEditController', ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "$routeParams", "Util", "User", "Bank", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, util, userService, bankService) {
    var ctrl = this;
    ctrl.$onInit = function () {
        if (ctrl.bank.id) {
            ctrl.bankId = ctrl.bank.id;
        } else if ($routeParams.id !== undefined) {
            ctrl.bankId = $routeParams.id;
        }
        ctrl.bank = ctrl.bank || new Object();
        ctrl.selectedQuestions = ctrl.questions || new Array();
    };
    ctrl.saveBank = function (event) {
        var currentUser = userService.getLoggedInUser();
        ctrl.bank.createdBy = {
            name: currentUser.name,
            avatar: currentUser.avatar,
            id: currentUser.id
        };
        ctrl.bank.questions = _.map(ctrl.selectedQuestions, function (value, key) {
            return _.pick(value, 'id');
        });
        bankService.update(ctrl.bank).then(function (response) {
            ctrl.questionDiff = response.data.data;
            if (response.data.status == "success") {
                $mdToast.show($mdToast.simple().textContent('Question Bank updated successfully').parent(document.body).hideDelay(3000).position('top right'));
                $mdDialog.hide();
            }
        });
    };
    ctrl.goBack = function () {
        if ($routeParams.goto) {
            $location.url($routeParams.goto);
        } else {
            $location.url('/banks');
        }
    };
    ctrl.cancel = function () {
        $mdDialog.hide();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbBankExport', []);
'use strict';

angular.module('qbBankExport').component('qbBankExport', {
    templateUrl: 'app/minified/qb-bank-export/qb-bank-export.template.html',
    bindings: {
        bank: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", '$routeParams', 'Media', 'Bank', function ($mdDialog, $scope, $element, $timeout, $routeParams, mediaService, bankService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.getExports();
        };
        ctrl.export = function () {
            bankService.exportBank(ctrl.bank.id).then(function (response) {
                if (response.data.status === "success") {
                    var href = JSON.parse(response.data.data.value).data.url;
                    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                        var downloadFrame = document.createElement("iframe");
                        downloadFrame.setAttribute('src', href);
                        downloadFrame.setAttribute('style', "display:none");
                        document.body.appendChild(downloadFrame);
                        window.open(downloadFrame, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
                        window.focus();
                    } else {
                        var anchor = $('<a>');
                        anchor.attr('id', 'file_download');
                        if ($('#file_download').length > 0) {
                            var anchor = $('#file_download');
                        }
                        anchor.attr('href', href);
                        anchor.attr('target', '_blank');
                        anchor.css('display', 'none');
                        anchor.attr('download', "href");
                        $(document.body).append(anchor);
                        anchor[0].click();
                        anchor[0].remove();
                    }
                    ctrl.getExports();
                }
            });
        };

        ctrl.exportToCSV = function () {
            bankService.exportBankToCSV(ctrl.bank.id).then(function (response) {
                if (response.data.status === "success") {
                    var href = response.data.data.url;
                    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                        var downloadFrame = document.createElement("iframe");
                        downloadFrame.setAttribute('src', href);
                        downloadFrame.setAttribute('style', "display:none");
                        document.body.appendChild(downloadFrame);
                        window.open(downloadFrame, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
                        window.focus();
                    } else {
                        var anchor = $('<a>');
                        anchor.attr('id', 'file_download');
                        if ($('#file_download').length > 0) {
                            var anchor = $('#file_download');
                        }
                        anchor.attr('href', href);
                        anchor.attr('target', '_blank');
                        anchor.css('display', 'none');
                        anchor.attr('download', "href");
                        $(document.body).append(anchor);
                        anchor[0].click();
                        anchor[0].remove();
                    }
                    ctrl.getExports();
                }
            });
        };

        ctrl.getExports = function () {
            mediaService.getExports(ctrl.bank.id).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.exports = response.data.data;
                }
            });
        };

        ctrl.getExportType = function (url) {
            return url.substr(url.length - 3).toUpperCase();
        };
    }]
});
'use strict';

angular.module('qbQuestionDisplayVideo', ['ngSanitize']);
'use strict';

angular.module('qbQuestionDisplayVideo').component('qbQuestionDisplayVideo', {
    templateUrl: 'app/minified/qb-question-display-video/qb-question-display-video.template.html',
    bindings: {
        onDelete: '&',
        data: '<',
        disabled: '<',
        view: '<'
    },
    controller: ["$scope", "$element", "$mdDialog", "$sce", function ($scope, $element, $mdDialog, $sce) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if (ctrl.view === 'review') ctrl.disabled = 'disabled';
        };
        ctrl.trustSrc = function (url) {
            return $sce.trustAsResourceUrl(url);
        };
        ctrl.delete = function () {
            ctrl.onDelete();
        };
        ctrl.openImageDialog = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-image-dialog/qb-question-image-dialog.template.html',
                targetEvent: ev,
                controller: 'questionImageDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    img: ctrl.data
                }
            });
        };
    }]
});
'use strict';

// Define the `qbChangePassword` module

angular.module('qbChangePassword', ['ngMessages']);
'use strict';

angular.module('qbChangePassword').component('qbChangePassword', {
    templateUrl: 'app/minified/qb-change-password/qb-change-password.template.html',
    controller: ["$scope", "$mdToast", "$location", "$routeParams", "$mdDialog", "User", function ($scope, $mdToast, $location, $routeParams, $mdDialog, userService) {
        var ctrl = this;
        ctrl.change = {};
        ctrl.invalidPassword = false;
        ctrl.$onInit = function () {};

        ctrl.submit = function (event) {
            if (!_.isEqual(ctrl.change.newPassword, ctrl.confirmPassword)) {
                ctrl.noMatch = true;
            } else {
                userService.changePassword(ctrl.change).then(function (response) {
                    if (response.data.status === "success") {
                        $mdDialog.show($mdDialog.alert().title('Your password has been changed successfully').ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
                            $location.url('/assignments');
                        });
                    }
                }, function (response) {
                    ctrl.invalidPassword = true;
                });
            }
        };

        ctrl.hideValidation = function () {
            ctrl.invalidPassword = false;
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbBankDialogQuestion', ['qbQuestionCheckboxList', 'qbTableSearchBar']);
'use strict';

angular.module('qbBankDialogQuestion').controller('qbBankDialogQuestion', ["$scope", "$mdDialog", "$filter", "QB_QUESTION", "User", "Question", function ($scope, $mdDialog, $filter, questionConstants, userService, questionService) {
    var ctrl = this;
    ctrl.$onInit = function () {
        var filter = _.debounce(ctrl.doFilter, 500);
        $scope.$watch(function () {
            return ctrl.parent.searchParam;
        }, function (newValue, oldValue, scope) {
            filter();
        });
    };
    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.add = function () {
        $mdDialog.hide();
    };
    ctrl.addQns = function (event) {
        $mdDialog.hide();
    };
    ctrl.doFilter = function () {
        ctrl.parent.logPagination(ctrl.parent.query.page, ctrl.parent.query.limit);
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbQuestionCheckboxList', []);
'use strict';

angular.module('qbQuestionCheckboxList').component('qbQuestionCheckboxList', {
    templateUrl: 'app/minified/qb-question-checkbox-list/qb-question-checkbox-list.template.html',
    bindings: {
        data: "<",
        selected: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", function ($mdDialog, $scope, $element, $timeout, $filter) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 140;
            $scope.$watch(function () {
                return ctrl.data;
            }, function () {
                if (!ctrl.data) {
                    return;
                }
                ctrl.data.forEach(function (d) {
                    d.selected = false;
                });
                ctrl.selected.forEach(function (item) {
                    var selection = _.find(ctrl.data, {
                        id: item.id
                    });
                    if (selection) selection.selected = true;
                });
            });
        };
        ctrl.changed = function (question) {
            if (question.selected) {
                var selection = _.find(ctrl.selected, {
                    id: question.id
                });
                if (!selection) {
                    ctrl.selected.push(question);
                }
            } else {
                var selectionIndex = _.findIndex(ctrl.selected, {
                    id: question.id
                });
                if (selectionIndex >= 0) {
                    ctrl.selected.splice(selectionIndex, 1);
                }
            }
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };
    }]
});
'use strict';

angular.module('core.filter', ['ngResource']);
'use strict';

angular.module('core.filter').filter('htmlFilter', function () {
    return function (input) {
        if (input) {
            return input.replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]*|&lsquo[;]/g, '').split(/<[^>]*>/g).join(" ");
        } else {
            return "";
        }
    };
}).filter('numberFixedLen', function () {
    return function (numText, len) {
        len = 0;
        if (numText) {
            var re = /(\d+)/g;
            var text = numText.split(numText.match(re))[0];
            var num = parseInt(numText.match(re), 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return numText;
            }
            num = '' + num;
            while (num.length < len) {
                num = '0' + num;
            }
            return text + num;
        } else return;
    };
}).filter('inverseNumberFixedLen', function () {
    return function (numText) {
        if (numText) {
            var re = /(\d+)/g;
            var text = numText.split(numText.match(re))[0];
            var num = parseInt(numText.match(re), 10);
            if (isNaN(num)) {
                return numText;
            }
            return text + num;
        } else return;
    };
}).filter('timeAgo', function () {
    //raw: wheter you want in a format of "5 minutes ago", or "5 minutes"
    return function (time, local, raw) {
        raw = true;
        local = Date.now();

        if (angular.isDate(time)) {
            time = time.getTime();
        } else if (typeof time === "string") {
            time = new Date(time).getTime();
        }
        var offset = (local - time) / 1000,
            span = [],
            MINUTE = 60,
            HOUR = 3600,
            DAY = 86400,
            WEEK = 604800,
            MONTH = 2629744,
            YEAR = 31556926,
            DECADE = 315569260;

        if (offset <= MINUTE) span = ['', raw ? 'now' : 'less than a minute'];else if (offset < MINUTE * 60) span = [Math.floor(Math.abs(offset / MINUTE)), 'min'];else if (offset < HOUR * 24) span = [Math.floor(Math.abs(offset / HOUR)), 'hr'];else if (offset < DAY * 7) span = [Math.floor(Math.abs(offset / DAY)), 'day'];else if (offset < WEEK * 52) span = [Math.floor(Math.abs(offset / WEEK)), 'week'];else if (offset < YEAR * 10) span = [Math.floor(Math.abs(offset / YEAR)), 'year'];else if (offset < DECADE * 100) span = [Math.floor(Math.abs(offset / DECADE)), 'decade'];else span = ['', 'a long time'];

        span[1] += span[0] === 0 || span[0] > 1 ? 's' : '';
        span = span.join(' ');

        return offset <= MINUTE ? span : span + ' ago';
    };
}).filter('notificationFormatter', function ($filter) {
    return function (text, matcher) {
        if (text.match(matcher) && text.match(matcher).index === 0) {
            var array = text.match(/\S+/gi);
            array[1] = $filter('numberFixedLen')(array[1], 4);
            text = array.join(" ");
        }
        return text;
    };
});
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbAddPdf', ['md.data.table', 'ngFileUpload']);
'use strict';

angular.module('qbAddPdf').controller('qbAddPdfController', ["$scope", "$mdDialog", "$mdToast", "Util", "Media", "Upload", function ($scope, $mdDialog, $mdToast, util, mediaService, Upload) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    $scope.pdfFile = null;
    ctrl.isLoading = false;

    ctrl.query = {
        size: 25,
        page: 1
    };

    ctrl.options = {
        multiSelect: true,
        autoSelect: true,
        boundaryLinks: false,
        decapitate: false,
        limitSelect: true,
        pageSelect: true
    };

    ctrl.insert = function () {
        $mdDialog.cancel();
    };

    ctrl.close = function () {
        $mdDialog.cancel();
    };

    ctrl.onSelect = function (tab) {
        ctrl.tabSelected = tab;
        if (tab == 'Library') ctrl.logPagination(ctrl.query.page, ctrl.query.size);
    };

    ctrl.upload = function (file) {
        $scope.pdfFile = null;
        file.upload = Upload.upload({
            url: EXPORT_URL + "upload-guide",
            data: {
                file: file
            }
        });
        ctrl.isLoading = true;
        file.upload.then(function (response) {
            if (response.data.status == "success") {
                ctrl.pdfFile.data = response.data.data;
                ctrl.isLoading = false;
                $mdDialog.hide();
            }
        }, function (response) {}, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    ctrl.libSelect = function () {
        ctrl.pdfFile.data = ctrl.media;
        $mdDialog.hide();
    };
    ctrl.logPagination = function (page, size) {
        ctrl.query.size = size;
        ctrl.query.page = page;
        mediaService.guideList(ctrl.query).then(function (response) {
            ctrl.lib = response.data.data;
            ctrl.total = response.data.count;
        });
    };
    ctrl.$onInit();
}]);
'use strict';

angular.module('core.notification', ['ngResource']);
'use strict';

angular.module('core.notification').factory('Notification', ['$q', '$http', '$resource', 'User', function ($q, $http, $resource, userService) {
    var me = {
        loadNotifications: loadNotifications,
        getNotificationsInfo: getNotificationsInfo,
        getNotifications: getNotifications,
        updateNotification: updateNotification
    };
    return me;

    function getNotifications() {
        return me.notifications;
    };

    function loadNotifications() {
        return $http.get(NOTIFICATION_URL);
    };

    function getNotificationsInfo() {
        var defer = $q.defer();
        loadNotifications().then(function (response) {
            me.notifications = response.data.data;
            defer.resolve(response);
        }, function () {
            defer.resolve(response);
        }); //not a show stopper so resolving on failure
        return defer.promise;
    };

    function updateNotification(notification) {
        return $http.put(NOTIFICATION_URL, notification);
    }
}]);
'use strict';

// Define the  module

angular.module('qbNotificationBar', ['qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbNotificationBar').component('qbNotificationBar', {
    templateUrl: 'app/minified/qb-notification-bar/qb-notification-bar.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "Notification", "User", "State", "Notifier", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, notificationService, userService, stateService, notifier, notificationConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.notifications = notificationService.getNotifications();
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isEditor = userService.isEditor();
            notifier.subscribe($scope, 'load-notifications', function (event, data) {
                ctrl.notifications = notificationService.getNotificationsInfo().then(function () {
                    ctrl.notifications = notificationService.getNotifications();
                });
            });
            notifier.subscribe($scope, 'update-notification', function (event, data) {
                ctrl.updateNotification(data);
            });
        };
        ctrl.openNotificationMenu = function ($mdOpenMenu, ev) {
            ctrl.originatorEv = ev;
            $mdOpenMenu(ev);
        };
        ctrl.updateNotification = function (data) {
            var notification = _.find(ctrl.notifications, {
                navigationId: data.navigationId
            });
            if (notification) {
                notification.status = "seen";
                notificationService.updateNotification(notification).then(function (response) {
                    if (response.data.status === "success") {
                        notificationService.getNotificationsInfo().then(function (response) {
                            if (response.data.status === "success") {
                                notifier.notify('load-notifications', {});
                            }
                        });
                    }
                });
            }
        };
        ctrl.viewNotification = function (notification, event) {
            notifier.notify('update-notification', {
                navigationId: notification.navigationId
            });
            if (notification.notificationType == notificationConstants.NOTIFICATION_TYPE.ASSIGNMENT) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: {
                            id: notification.navigationId
                        },
                        assignmentId: notification.navigationId,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserGuide', []);
'use strict';

angular.module('qbUserGuide').controller('userGuideController', ["$scope", "$mdDialog", "$filter", "APP_CONSTANTS", function ($scope, $mdDialog, $filter, appConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.carouselData = [{
            src: "",
            page: 1,
            view: '<div><h2>Welcome to the Question Bank System</h2><br><br><p>The Question Bank System facilitates the authoring and review of questions for assessments in educational activities. </p></div>'
        }, {
            src: appConstants.CAROUSEL_IMG_PREFIX + 'step_1.png',
            page: 2,
            view: '<h3>Step 1 of x Review your Assignment List</h3><br>' + '<p>You will be assigned tasks to author questions for our educational programs. Each task will show you the number of Questions requested with some brief Instructions.</p><br>' + '<p>All you have to do is open the assignment and create the requested number of Questions by the due date.</p>'
        }, {
            src: appConstants.CAROUSEL_IMG_PREFIX + 'step_2.png',
            page: 3,
            view: '<h3>Step 2 of x Open Your Assignment</h3><br>' + '<p>Once you open the assignment, there will be as many Create Question place holders as you are tasked to author.</p><br>' + '<p>Simply click the Create Question buttonto open the question form.</p><br>' + '<p>When you are done authoring all requested questions, submit the assignment and you are done!</p>'
        }, {
            src: appConstants.CAROUSEL_IMG_PREFIX + 'step_3.png',
            page: 4,
            view: '<h3>Step 3 of x Write the Questions</h3><br>' + '<p>The question form is easy to follow with the on screen Instructions.</p><br>' + '<p>When you are done, save the question as Final.  If you would like to take a break before done, save the question as draft.</p>'
        }];
    };
    ctrl.close = function () {
        $mdDialog.cancel();
    };
    ctrl.add = function () {
        $mdDialog.hide();
    };
    ctrl.addQns = function (event) {
        $mdDialog.hide();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbUserGuideCarousel', []);
'use strict';

angular.module('qbUserGuideCarousel').component('qbUserGuideCarousel', {
    templateUrl: 'app/minified/qb-user-guide-carousel/qb-user-guide-carousel.template.html',
    controller: ["$scope", function ($scope) {
        var ctrl = this;
        ctrl.$onInit = function () {};
    }]
});
'use strict';

// Define the `qbValidationDialog` module

angular.module('qbValidationDialog', []);
'use strict';

angular.module('qbValidationDialog').controller('qbValidationDialog', ["$scope", "$mdDialog", "$mdToast", function ($scope, $mdDialog, $mdToast) {
    var ctrl = this;
    ctrl.close = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentCreate', ['qbAssignmentCreateForm', 'qbAssignees', 'qbCriteriaAdd', 'qbAssignmentReview', 'qbLogout', 'qbAssignments', 'ngMessages', 'qbAddPdf']);
'use strict';

angular.module('qbAssignmentCreate').component('qbAssignmentCreate', {
    templateUrl: 'app/minified/qb-assignment-create/qb-assignment-create.template.html',
    bindings: {
        items: "<",
        assignment: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "$filter", "$routeParams", "Question", "User", "Assignment", "Media", "State", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, $filter, $routeParams, questionService, userService, assignmentService, mediaService, stateService, questionConstants, assignmentConstants, assigneeConstants, questionTypeConstants, assignmentKindConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.assignment = ctrl.assignment || {
                assignees: [],
                items: []
            };
            ctrl.constants = assignmentKindConstants;
            ctrl.items = ctrl.assignment.items || [];
            ctrl.formControl = {
                reviewItems: false,
                assignees: false,
                revisionItems: false
            };
            ctrl.items = ctrl.assignment.items || [];
        };
        ctrl.onSuccess = function () {
            stateService.getStateFor("assignmentTab").index = 1;
            $location.path("/assignments/");
        };
        ctrl.onCancel = function () {
            $location.url('/assignments');
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentCreateForm', ['qbAssignees', 'qbCriteriaAdd', 'qbAssignmentReview', 'qbLogout', 'qbAssignments', 'ngMessages', 'qbAddPdf']);
'use strict';

angular.module('qbAssignmentCreateForm').component('qbAssignmentCreateForm', {
    templateUrl: 'app/minified/qb-assignment-create-form/qb-assignment-create-form.template.html',
    bindings: {
        assignment: "=",
        formName: "<",
        items: "=",
        formControl: "<",
        assignmentId: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "$filter", "$routeParams", "Question", "User", "Assignment", "Media", "State", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, $filter, $routeParams, questionService, userService, assignmentService, mediaService, stateService, questionConstants, assignmentConstants, assigneeConstants, questionTypeConstants, assignmentKindConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {

            ctrl.STEM_MIN_LENGTH = 140;
            ctrl.selected = [];
            ctrl.showAddGuide = true;
            ctrl.searchParam = "";

            ctrl.assignment.questionsNeededPerAuthor = 1;
            ctrl.constants = assignmentKindConstants;
            if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVIEW || ctrl.assignment.kind === ctrl.constants.QUESTION_REVISION) {
                ctrl.assignment.questionsNeededPerAuthor = 0;
            }
            if (ctrl.assignment.items && ctrl.assignment.items.length > 0) ctrl.disableType = true;
            ctrl.query = {
                sort: '-lastModificationDate',
                limit: 25,
                page: 1
            };

            ctrl.filter = {
                status: questionConstants.DRAFT,
                stem: ""
            };
            ctrl.allQuestions = [];
            ctrl.EMPTY_CRITERIA = "This question bank currently has no set criteria.";
            ctrl.set = false;
            ctrl.questionTypes = [{
                name: questionTypeConstants.NAME.SINGLECHOICE,
                value: questionTypeConstants.SINGLECHOICE
            }, {
                name: questionTypeConstants.NAME.MULTIPLECHOICE,
                value: questionTypeConstants.MULTIPLECHOICE
            }, {
                name: questionTypeConstants.NAME.SHORTANSWER,
                value: questionTypeConstants.SHORTANSWER
            }, {
                name: questionTypeConstants.NAME.ESSAY,
                value: questionTypeConstants.ESSAY
            }];
            if (ctrl.assignmentId) {
                assignmentService.getAssignment(ctrl.assignmentId).then(function (response) {
                    if (response.data.status === "success") {
                        ctrl.assignment = response.data.data;
                        setAssignment(response.data.data);
                    }
                });
            }
            ctrl.questions = {};
            ctrl.criteria = {
                levels: [],
                topics: [],
                types: []
            };
            ctrl.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.minDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
            ctrl.maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
            ctrl.assignment.dueDate = new Date();
            setAssignment(ctrl.assignment);
        };
        ctrl.loadAnswer = function () {
            $location.url('/banks/question/preview/' + $route.current.params.questionId + '/:answer');
        };
        ctrl.addReviewItems = function (event) {
            var selected = angular.copy(ctrl.items ? ctrl.items : []);
            ctrl.reference = "create-assignment";
            $mdDialog.show({
                templateUrl: 'app/minified/qb-assignment-review/qb-assignment-review.template.html',
                targetEvent: event,
                locals: {
                    allQuestions: ctrl.allQuestions,
                    reference: "create-assignment",
                    parent: ctrl,
                    selected: selected
                },
                controller: 'assignmentReviewController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true
            }).then(function () {
                ctrl.items = selected;
            }).finally(function () {
                ctrl.searchParam = "";
            });
        };
        ctrl.preview = function (question, event) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.removeData = function (dataArray, arrayItem) {
            dataArray.splice(dataArray.indexOf(arrayItem), 1);
            ctrl.allQuestions.forEach(function (d) {
                if (arrayItem.id == d.id) d.selected = false;
            });
        };

        ctrl.updateKind = function () {
            if (ctrl.assignment.kind === ctrl.constants.QUESTION_CREATE) {
                ctrl.assignment.assignees = [];
            } else if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVIEW || ctrl.assignment.kind === ctrl.constants.QUESTION_REVISION) {
                ctrl.assignment.assignees = [];
                ctrl.assignment.items = [];
                ctrl.assignment.questionsNeededPerAuthor = 0;
                if (ctrl.allQuestions.length === 0) {
                    if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVIEW) getQuestionsInEditorial();else if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVISION) getRevisionQuestionsList();
                }
            }
        };

        ctrl.logPagination = function (page, limit, search) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.filter.stem = search || "";
            if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVIEW) {
                getQuestionsInEditorial();
            } else if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVISION) getRevisionQuestionsList(search);
        };

        ctrl.addGuide = function (ev) {
            ctrl.pdfFile = {};
            $mdDialog.show({
                templateUrl: 'app/minified/qb-add-pdf/qb-add-pdf.template.html',
                targetEvent: ev,
                controller: 'qbAddPdfController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    pdfFile: ctrl.pdfFile
                }
            }).then(function () {
                ctrl.assignment.reviewGuideId = ctrl.pdfFile.data.id;
                $mdToast.show($mdToast.simple().textContent('File uploaded successfully').parent(document.body).hideDelay(3000).position('top right'));
                ctrl.showAddGuide = false;
            });
        };

        ctrl.removeGuide = function (ev) {
            ctrl.assignment.reviewGuideId = '';
            ctrl.showAddGuide = true;
        };

        //--------- private functions ------------------
        var getQuestionsInEditorial = function getQuestionsInEditorial() {
            ctrl.query.stem = ctrl.filter.stem;
            ctrl.query.status = ctrl.filter.status;
            assignmentService.questionsInEditorial(ctrl.query).then(function (response) {
                ctrl.assignment.kind = "Review";
                ctrl.allQuestions = response.data.data;
                ctrl.reviewQuestioncount = response.data.count;
                ctrl.allQuestions.forEach(function (question) {
                    ctrl.items = ctrl.items || [];
                    ctrl.items.forEach(function (item) {
                        if (item.id == question.id) question.selected = true;
                    });
                });
            });
        };

        var getRevisionQuestionsList = function getRevisionQuestionsList(search) {
            ctrl.filter.stem = search || "";
            ctrl.filter.statuses = [questionConstants.EDITORIAL, questionConstants.REJECTED];
            questionService.questionList(ctrl.query, ctrl.filter).then(function (response) {
                ctrl.assignment.kind = ctrl.constants.QUESTION_REVISION;
                ctrl.allQuestions = response.data.data;
                ctrl.reviewQuestioncount = response.data.count;
                ctrl.allQuestions.forEach(function (question) {
                    ctrl.items = ctrl.items || [];
                    ctrl.items.forEach(function (item) {
                        if (item.id == question.id) question.selected = true;
                    });
                });
            });
        };

        var setAssignment = function setAssignment(assignment) {
            ctrl.items = ctrl.assignment.items || [];
            ctrl.assignment.assignees = ctrl.assignment.assignees || [];
            ctrl.assignment.dueDate = new Date(ctrl.assignment.dueDate);
            if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVIEW) {
                getQuestionsInEditorial();
            } else if (ctrl.assignment.kind === ctrl.constants.QUESTION_REVISION) {
                getRevisionQuestionsList();
            }
            if (ctrl.assignment.reviewGuideId) {
                ctrl.pdfFile = {};
                mediaService.getGuide(ctrl.assignment.reviewGuideId).then(function (response) {
                    if (response.data.status === "success") {
                        ctrl.pdfFile.data = response.data.data;
                    }
                });
            }
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKindConstants.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKindConstants.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKindConstants.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function () {
            if (ctrl.isKindQuestionedit(ctrl.assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(ctrl.assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(ctrl.assignment)) {
                return "assignment-review";
            }
        };
    }]
});
'use strict';

// Define the `qbAddReviewComment` module

angular.module('qbAddReviewComment', ['qbQuestionReviewCommentsSwitchlist']);
'use strict';

angular.module('qbAddReviewComment').controller('qbAddReviewComment', ["$scope", "$mdDialog", "Review", "State", function ($scope, $mdDialog, reviewService, stateService) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.submitReview = function (event) {
        if (_.filter(ctrl.review.questionnaire, function (question) {
            return question.response === "NO";
        }).length > 0 && !ctrl.review.comment) {
            $mdDialog.show($mdDialog.alert({
                skipHide: true
            }).title("Please add additional comment").ariaLabel('alert').targetEvent(event).ok('OK'));
        } else {
            ctrl.review.questionnaire.forEach(function (a) {
                a.response = a.response === 'YES' ? "true" : "false";
            });
            reviewService.addReview(ctrl.review).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.cancel();
                }
            });
            $mdDialog.hide();
        }
    };
    ctrl.continueReview = function () {
        ctrl.review.questionnaire.forEach(function (a) {
            a.response = a.response === 'YES' ? "true" : "false";
        });
        ctrl.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionReviewDialog', ['ngMdIcons', 'qbQuestionReviewView', 'qbSidenavButton', 'qbAddReviewComment']);
'use strict';

angular.module('qbQuestionReviewDialog').controller('qbQuestionReviewDialog', ["$mdDialog", "$mdToast", "$scope", "$timeout", "$routeParams", "$location", "Util", "Question", "Review", "Comment", "User", "Notifier", "State", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $mdToast, $scope, $timeout, $routeParams, $location, util, questionService, reviewService, commentService, userService, notifier, stateService, questionTypeConstants, assignmentKindConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.isAdmin = userService.isAdmin();
        ctrl.isEditor = userService.isEditor();
        ctrl.canSeeEditAssignment = ctrl.isAdmin || ctrl.isEditor;
        var load = function load() {
            getCategory();
            splitSections();
        };
        commentService.getComments(ctrl.question.id).then(function (response) {
            ctrl.question.comment = _.last(response.data.data) ? _.last(response.data.data).comment : "";
        });
        questionService.questionGet(ctrl.question.id).then(function (response) {
            angular.merge(ctrl.question, response.data.data);
            load();
        });
        if (ctrl.question && ctrl.question.stem) {
            load();
        }
    };

    ctrl.openQuestionEdit = function () {
        var location = "/question-edit/" + $routeParams.id;
        if ($routeParams.goto) {
            location += "?goto=" + $routeParams.goto;
        }
        $location.url(location);
    };
    ctrl.isMainSection = function (section) {
        if (section.category == "singleResponse") {
            return true;
        } else if (section.category == "multipleResponse") {
            return true;
        } else if (section.category == "shortText") {
            return true;
        } else if (section.category == "longText") {
            return true;
        }
        return false;
    };
    ctrl.goBack = _.once(function () {
        if ($routeParams.goto) {
            $location.url($routeParams.goto);
        } else {
            util.back();
        }
    });

    /*-------- private functions ---------*/
    var getCategory = function getCategory() {
        ctrl.question.sections.forEach(function (section) {
            if (section.category === questionTypeConstants.MULTIPLECHOICE) ctrl.category = questionTypeConstants.NAME.MULTIPLECHOICE;else if (section.category === questionTypeConstants.SINGLECHOICE) ctrl.category = questionTypeConstants.NAME.SINGLECHOICE;else if (section.category === questionTypeConstants.SHORTANSWER) ctrl.category = questionTypeConstants.NAME.SHORTANSWER;else if (section.category === questionTypeConstants.ESSAY) ctrl.category = questionTypeConstants.NAME.ESSAY;
        });
    };
    var splitSections = function splitSections() {
        ctrl.media = ctrl.question.sections.filter(function (section) {
            return section['category'] === 'image' || section['category'] === 'video';
        }).map(function (item) {
            return item;
        });
        ctrl.noMedia = ctrl.question.sections.filter(function (section) {
            return section['category'] !== 'image' && section['category'] !== 'video';
        }).map(function (item) {
            return item;
        });
    };
    ctrl.addReviewComments = function (ev) {
        ctrl.review.questionnaire.forEach(function (a) {
            a.response = a.response && a.response == "true" ? 'YES' : 'NO';
        });
        $mdDialog.cancel();
        var ob = {
            templateUrl: 'app/minified/qb-add-review-comment/qb-add-review-comment.template.html',
            targetEvent: ev,
            controller: 'qbAddReviewComment',
            controllerAs: '$ctrl',
            bindToController: true,
            preserveScope: true,
            skipHide: true,
            locals: {
                review: ctrl.review,
                readOnly: ctrl.readOnly
            }
        };
        stateService.fetchHistory().push(ob);
        $mdDialog.show(ob);
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the `qbViewSubmissionReviews` module

angular.module('qbViewSubmissionReviews', ['qbQuestionReviewCommentsSwitchlist', 'qbQuestionReviewView']);
'use strict';

angular.module('qbViewSubmissionReviews').controller('qbViewSubmissionReviews', ["$scope", "$mdDialog", "$mdToast", "Review", "User", "Question", "Comment", "Notifier", "State", "QB_ASSIGNMENT_KIND", function ($scope, $mdDialog, $mdToast, reviewService, userService, questionService, commentService, notifier, stateService, assignmentKindConstants) {
    var ctrl = this;
    commentService.getComments(ctrl.question.id).then(function (response) {
        ctrl.question.comment = _.last(response.data.data) ? _.last(response.data.data).comment : "";
    });
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.submitReview = function () {
        ctrl.reviewStatus.state = "submit";
        $mdDialog.hide();
    };
    ctrl.returnToQuestion = function () {
        ctrl.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionReviewCommentsSwitchlist', []);
'use strict';

angular.module('qbQuestionReviewCommentsSwitchlist').component('qbQuestionReviewCommentsSwitchlist', {
    templateUrl: 'app/minified/qb-question-review-comments-switchlist/qb-question-review-comments-switchlist.template.html',
    bindings: {
        data: "<",
        view: "<",
        disable: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", function ($mdDialog, $scope, $element, $timeout, $filter) {
        var ctrl = this;
        ctrl.$onInit = function () {};
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentHistoryDialog', ['qbAssignmentHistory']);
'use strict';

angular.module('qbAssignmentHistoryDialog').controller('qbAssignmentHistoryDialog', ["$scope", "$mdDialog", "$mdToast", "Notifier", function ($scope, $mdDialog, $mdToast, notifier) {
    var ctrl = this;
    ctrl.close = function () {
        $mdDialog.hide();
    };
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentDetailsDialog', ['qbAssignmentDetails']);
'use strict';

angular.module('qbAssignmentDetailsDialog').controller('qbAssignmentDetailsDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", "Assignment", "User", "State", function ($scope, $mdDialog, $mdToast, notifier, assignmentService, userService, stateService) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.hide();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.$onInit = function () {
        ctrl.isAdmin = userService.isAdmin();
        ctrl.isEditor = userService.isEditor();
        if (ctrl.assignment.id) {
            assignmentService.getAssignment(ctrl.assignment.id).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.assignment = response.data.data;
                }
            });
        }
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbQuestionCreateDialog', ['qbQuestionCreateHeader', 'qbQuestionCreateForm']);
'use strict';

angular.module('qbQuestionCreateDialog').controller('qbQuestionCreateDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", function ($scope, $mdDialog, $mdToast, notifier) {
    var ctrl = this;
}]);
'use strict';

// Define the  module

angular.module('qbQuestionCreateHeader', ['qbQuestionDetails', 'qbQuestionTag', 'qbQuestionReferences', 'qbQuestionRevision', 'qbQuestionHistory', 'qbQuestionInformation', 'qbValidationDialog', 'ngMessages']);
'use strict';

angular.module('qbQuestionCreateHeader').component('qbQuestionCreateHeader', {
    templateUrl: 'app/minified/qb-question-create-header/qb-question-create-header.template.html',
    bindings: {
        assignment: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$mdToast", "$routeParams", "Util", "Question", "User", "Media", "Assignment", "QB_QUESTION", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $location, $mdToast, $routeParams, util, questionService, userService, mediaService, assignmentService, questionConstants, questionTypeConstants) {
        var ctrl = this;
        ctrl.question = {};
        ctrl.$onInit = function () {};
        ctrl.cancel = function () {
            $mdDialog.hide();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionCreateForm', ['qbQuestionDetails', 'qbQuestionTag', 'qbQuestionReferences', 'qbQuestionRevision', 'qbQuestionHistory', 'qbQuestionInformation', 'qbValidationDialog', 'ngMessages']);
'use strict';

angular.module('qbQuestionCreateForm').component('qbQuestionCreateForm', {
    templateUrl: 'app/minified/qb-question-create-form/qb-question-create-form.template.html',
    bindings: {
        assignment: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$mdToast", "$routeParams", "Util", "Notifier", "Question", "User", "Media", "Assignment", "QB_QUESTION", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $location, $mdToast, $routeParams, util, notifier, questionService, userService, mediaService, assignmentService, questionConstants, questionTypeConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.question = {
                stem: "",
                customId: "",
                rationale: "",
                references: [],
                tags: []
            };
            if (ctrl.assignment) {
                ctrl.assignmentId = ctrl.assignment.id;
                getAssignment();
            } else {
                ctrl.media = [];
                ctrl.noMedia = [{
                    category: questionTypeConstants.SINGLECHOICE,
                    position: 0
                }];
            }
        };
        $scope.$watch('files.length', function (newVal, oldVal) {
            ctrl.uploadFiles = $scope.files;
        });
        ctrl.importQuestions = function () {};
        ctrl.save = function () {
            var currentUser = userService.getLoggedInUser();
            ctrl.question.createdBy = {
                name: currentUser.name,
                id: currentUser.id,
                email: currentUser.email
            };
            ctrl.question.modifiedBy = {
                name: currentUser.name,
                email: currentUser.email,
                id: currentUser.id
            };
            ctrl.question.sections = ctrl.noMedia.concat(ctrl.media);
            ctrl.question.sections.forEach(function (d, i) {
                d.position = i;
            });
            ctrl.question.sections = _.sortBy(ctrl.question.sections, "position");
            ctrl.question.tags = _.map(ctrl.question.tags, function (t) {
                return {
                    name: t.name,
                    id: t.id,
                    taxonomy: t.taxonomy
                };
            });
            questionService.questionCreate(ctrl.question).then(function (d) {
                if (ctrl.assignment) {
                    ctrl.saveToAssignment(d.data.data);
                } else {
                    $location.path("/questions");
                    $mdDialog.cancel();
                }
                $mdToast.show($mdToast.simple().textContent('Question created successfully').parent(document.body).hideDelay(3000).position('top right'));
            }, function () {
                ctrl.saveInProgress = false;
            });
        };
        ctrl.saveToAssignment = function (question) {
            var items = _.map(ctrl.assignment.items, function (item) {
                return {
                    id: item.id,
                    customId: item.customId
                };
            });
            items.push({
                id: question.id,
                customId: question.customId
            });
            assignmentService.saveItems(ctrl.assignment.id, {
                items: items
            }).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    notifier.notify('load-assignment-details', {});
                    $mdDialog.hide();
                }
            });
        };
        ctrl.showQuestionInformation = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-information/qb-question-information.template.html',
                targetEvent: ev,
                controller: 'questionInformationController',
                controllerAs: 'infoCtrl',
                bindToController: true
            });
        };
        ctrl.isMainSectionWithChoices = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE)) {
                return true;
            }
            return false;
        };
        ctrl.addText = function () {
            ctrl.question.sections.push({
                category: "text",
                text: "",
                title: "",
                position: ctrl.question.sections.length
            });
            splitSections();
        };
        ctrl.addImage = function (ev) {
            var section = {
                category: "image",
                position: ctrl.question.sections.length,
                url: "",
                name: ""
            };
            ctrl.query = {
                order: 'id',
                limit: 25,
                page: 1
            };
            mediaService.mediaList(ctrl.query).then(function (response) {
                var lib = response.data.data;
                var total = response.data.count;
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-question-add-image/qb-question-add-image.template.html',
                    targetEvent: ev,
                    controller: 'questionAddImageController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        section: section,
                        lib: lib,
                        total: total
                    }
                }).then(function () {
                    ctrl.question.sections.push(section);
                    splitSections();
                });
            });
        };
        ctrl.addVideo = function (ev) {
            var section = {
                category: "video",
                position: ctrl.question.sections.length,
                url: "",
                name: ""
            };
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-add-video/qb-question-add-video.template.html',
                targetEvent: ev,
                controller: 'questionAddVideoController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    video: section
                }
            }).then(function () {
                ctrl.question.sections.push(section);
                splitSections();
            });
        };
        ctrl.goBack = function () {
            if ($routeParams.goto) {
                $location.url($routeParams.goto);
            } else if (ctrl.assignmentId) {
                $mdDialog.hide();
            } else {
                util.back();
            }
        };
        ctrl.checkInValidDraft = function () {
            if (ctrl.saveInProgress) {
                return true;
            }
            return _.isEmpty(ctrl.question.question);
        };
        ctrl.checkInvalidFinal = function (question) {
            ctrl.showValidation = [];
            if (ctrl.noMedia) {
                ctrl.noMedia.forEach(function (section) {
                    if (section && (section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                        return section;
                    } else if (ctrl.isMainSectionWithChoices(section) && section.choices.length > 1) {
                        var addedChoices = _.filter(section.choices, function (d) {
                            return d.choice.length > 0;
                        });
                        var correctChoiceFilter = _.filter(section.choices, function (d) {
                            return d.correct;
                        });
                        if (question && correctChoiceFilter.length == 0) {
                            ctrl.showValidation.push({
                                name: 'choiceCorrect'
                            });
                        }
                        if (addedChoices.length != section.choices.length) {
                            ctrl.showValidation.push({
                                name: 'NoAnswer'
                            });
                        }
                    } else if (ctrl.isMainSectionWithChoices(section) && section.choices.length < 2) {
                        ctrl.showValidation.push({
                            name: 'addChoice'
                        });
                    }
                });
            }
            if (ctrl.question && ctrl.question.references && ctrl.question.references.length == 0) ctrl.showValidation.push({
                name: 'references'
            });
            if (ctrl.question && _.isEmpty(ctrl.question.rationale)) ctrl.showValidation.push({
                name: 'rationale'
            });
            return ctrl.showValidation;
        };
        ctrl.saveDraft = function () {
            ctrl.saveInProgress = true;
            if (ctrl.question.status !== questionConstants.EDITORIAL) ctrl.question.status = questionConstants.DRAFT;
            $timeout(function () {
                ctrl.save();
            }, 1);
        };
        ctrl.saveAsFinal = function (event) {
            ctrl.validation = ctrl.checkInvalidFinal(ctrl.question);
            if (ctrl.validation.length > 0) {
                $mdDialog.show({
                    templateUrl: 'app/minified/qb-validation-dialog/qb-validation-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbValidationDialog',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        validations: ctrl.validation
                    }
                });
            } else {
                if (ctrl.question.status !== questionConstants.EDITORIAL) ctrl.question.status = questionConstants.DONE;
                $timeout(function () {
                    ctrl.save();
                }, 1);
            }
        };
        /*-------- private functions ---------*/
        var getCategory = function getCategory() {
            if (ctrl.assignment.questionType === questionTypeConstants.MULTIPLECHOICE) ctrl.category = questionTypeConstants.NAME.MULTIPLECHOICE;else if (ctrl.assignment.questionType === questionTypeConstants.SINGLECHOICE) ctrl.category = questionTypeConstants.NAME.SINGLECHOICE;else if (ctrl.assignment.questionType === questionTypeConstants.SHORTANSWER) ctrl.category = questionTypeConstants.NAME.SHORTANSWER;else if (ctrl.assignment.questionType === questionTypeConstants.ESSAY) ctrl.category = questionTypeConstants.NAME.ESSAY;
        };
        var splitSections = function splitSections() {
            ctrl.media = ctrl.question.sections.filter(function (section) {
                return section['category'] === 'image' || section['category'] === 'video';
            }).map(function (item) {
                return item;
            });
            ctrl.noMedia = ctrl.question.sections.filter(function (section) {
                return section['category'] !== 'image' && section['category'] !== 'video';
            }).map(function (item) {
                return item;
            });
        };
        var getAssignment = function getAssignment() {
            assignmentService.getAssignment(ctrl.assignmentId).then(function (a) {
                ctrl.assignment = a.data.data;
                if (ctrl.assignment.questionType) {
                    ctrl.question.sections = [{
                        category: ctrl.assignment.questionType,
                        position: 0
                    }];
                    getCategory();
                    splitSections();
                }
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbReports', ['qbQuestionTag', 'qbTableSearchBar']);
'use strict';

angular.module('qbReports').component('qbReports', {
    templateUrl: 'app/minified/qb-reports/qb-reports.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$q", "$timeout", "$route", "$location", "$mdToast", "$filter", "$routeParams", "Question", "User", "Assignment", "Media", "Tag", "Report", "Bank", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $q, $timeout, $route, $location, $mdToast, $filter, $routeParams, questionService, userService, assignmentService, mediaService, tagService, reportService, bankService, questionConstants, assignmentConstants, assigneeConstants, questionTypeConstants, assignmentKindConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.selected = [];
            ctrl.tagSearch = {
                name: ''
            };
            ctrl.report = {
                tags: []
            };
            ctrl.topic = {
                topics: [],
                searchParam: ""
            };
            ctrl.statuses = [{
                status: "Done"
            }, {
                status: "Draft"
            }, {
                status: "Submitted"
            }, {
                status: "Editorial"
            }, {
                status: "InReview"
            }, {
                status: "Approved"
            }, {
                status: "Archived"
            }, {
                status: "Unassigned to a bank"
            }, {
                status: "Rejected"
            }];
            ctrl.fetchTopics();
        };

        ctrl.readonly = false;
        ctrl.selectedBank = null;
        ctrl.searchText = null;
        ctrl.querySearch = querySearch;
        ctrl.selectedQuestionIds = [];
        ctrl.selectedQuestion = null;
        ctrl.query = null;
        ctrl.questionCustomSearch = questionCustomSearch;
        ctrl.selectedBankIds = [];

        function querySearch(query) {
            var defer = $q.defer();
            bankService.searchByCustomId(query).then(function (response) {
                var results = $filter('orderBy')(response.data.data, 'value');
                defer.resolve(results);
            });
            return defer.promise;
        }

        function questionCustomSearch(query) {
            var defer = $q.defer();
            questionService.searchQuestionByCustomId(query).then(function (response) {
                var results = $filter('orderBy')(response.data.data, 'value');
                defer.resolve(results);
            });
            return defer.promise;
        }

        ctrl.fetchTopics = function () {
            tagService.getClass().then(function (response) {
                var topic_id = _.find(response.data.data, {
                    name: "Topic"
                }).id;
                tagService.getTaxonomies(topic_id).then(function (res) {
                    ctrl.topic.topics = res.data.data;
                });
            });
        };
        ctrl.generateReport = function () {
            var report = angular.copy(ctrl.report);
            report.bankCustomId = $filter('inverseNumberFixedLen')(_.pluck(ctrl.selectedBankIds, 'value')[0]);
            report.customId = $filter('inverseNumberFixedLen')(_.pluck(ctrl.selectedQuestionIds, 'value')[0]);
            report.statuses = [];
            report.tags = [];
            report.timesUsed = [];
            if (ctrl.selectedStatuses) {
                ctrl.selectedStatuses.forEach(function (d) {
                    if (d.status == 'Unassigned to a bank') {
                        report.timesUsed.push({ "op": "eq", "value": 0 });
                    } else {
                        report.statuses.push(d.status);
                    }
                });
            }
            ;
            ctrl.topic.topics.forEach(function (topic) {
                if (topic.selected) report.tags.push(topic.name);
            });
            if (_.isNumber(ctrl.timesUsed)) {
                report.timesUsed.push({ "op": "eq", "value": parseInt(ctrl.timesUsed, 10) });
            }

            reportService.generateReport(report).then(function (response) {
                if (response.data.status === "success") {
                    var href = response.data.data.url;
                    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                        var downloadFrame = document.createElement("iframe");
                        downloadFrame.setAttribute('src', href);
                        downloadFrame.setAttribute('style', "display:none");
                        document.body.appendChild(downloadFrame);
                        window.open(downloadFrame, 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
                        window.focus();
                    } else {
                        var anchor = $('<a>');
                        anchor.attr('id', 'file_download');
                        if ($('#file_download').length > 0) {
                            var anchor = $('#file_download');
                        }
                        anchor.attr('href', href);
                        anchor.attr('target', '_blank');
                        anchor.css('display', 'none');
                        anchor.attr('download', response.data.data.id);
                        $(document.body).append(anchor);
                        anchor[0].click();
                        anchor[0].remove();
                    }
                }
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentCreateHeader', []);
'use strict';

angular.module('qbAssignmentCreateHeader').component('qbAssignmentCreateHeader', {
    templateUrl: 'app/minified/qb-assignment-create-header/qb-assignment-create-header.template.html',
    bindings: {
        items: "=",
        assignmentId: "=",
        assignment: "=",
        formControl: "=",
        formName: "<",
        onSuccess: "&",
        onCancel: "&"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "$filter", "$routeParams", "Question", "User", "Assignment", "Media", "State", "Notifier", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, $filter, $routeParams, questionService, userService, assignmentService, mediaService, stateService, notifier, questionConstants, assignmentConstants, assigneeConstants, questionTypeConstants, assignmentKindConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.constants = assignmentKindConstants;
            ctrl.items = ctrl.assignment.items || [];
        };
        ctrl.assign = function (form) {
            if (setAssignValidity(ctrl.formName) && ctrl.formName.$valid && !ctrl.inProgress) {
                ctrl.inProgress = true;
                ctrl.assignment.status = assignmentConstants.OPEN;
                ctrl.assignment.assignees.forEach(function (assigneeData) {
                    assigneeData.status = assigneeConstants.DRAFT;
                });
                ctrl.addAssignment(ctrl.assignSuccess);
            }
        };
        ctrl.saveDraft = function (form) {
            setDraftValidity(form);
            if (ctrl.formName.$valid) {
                ctrl.assignment.status = assignmentConstants.DRAFT;
                if (ctrl.assignment.kind !== assignmentKindConstants.QUESTION_REVISION) delete ctrl.assignment.items;
                ctrl.addAssignment(ctrl.saveSuccess);
            }
        };
        ctrl.assignSuccess = function (response) {
            createSuccess('Assignment assigned successfully');
            notifier.notify('load-assignments-to-do', {});
            notifier.notify('load-assignment-assigned-by-me', {});
            notifier.notify('load-assignment-assigned-by-others', {});
            notifier.notify('load-assignments-done', {});
            ctrl.inProgress = false;
        };
        ctrl.saveSuccess = function (response) {
            if (_.isEqual(ctrl.assignment.kind, ctrl.constants.QUESTION_REVIEW)) {
                assignmentService.saveItems(response.data.id, {
                    items: _.map(ctrl.items, function (item) {
                        return {
                            id: item.id,
                            customId: item.customId
                        };
                    })
                }).then(function (itemsResponse) {
                    if (_.isEqual(itemsResponse.data.status, 'success')) {
                        createSuccess('Assignment created successfully');
                    }
                });
            } else {
                createSuccess('Assignment created successfully');
            }
            ctrl.cancel();
        };
        ctrl.addAssignment = function (callback) {
            ctrl.assignmentQuestions = [];
            var currentUser = userService.getLoggedInUser();
            ctrl.assignment.createdBy = {
                name: currentUser.name,
                id: currentUser.id
            };
            ctrl.assignment.modifiedBy = {
                name: currentUser.name,
                id: currentUser.id
            };
            if (ctrl.assignment.kind !== ctrl.constants.QUESTION_CREATE) {
                ctrl.assignment.items = ctrl.items;
            }
            ctrl.assignment.creationDate = ctrl.assignment.creationDate || new Date();
            ctrl.assignment.lastModificationDate = new Date();
            var assignment = angular.copy(ctrl.assignment);
            assignment.items = _.map(ctrl.assignment.items, function (d) {
                return {
                    id: d.id,
                    customId: d.customId
                };
            });
            if (ctrl.assignment.id !== undefined) {
                assignmentService.updateAssignment(assignment).then(function (response) {
                    if (response.data.status === 'success') {
                        callback(response.data);
                    }
                });
            } else {
                assignmentService.createAssignment(assignment).then(function (response) {
                    if (response.data.status === 'success') {
                        callback(response.data);
                    }
                });
            }
        };
        ctrl.cancel = function () {
            if (ctrl.formName.$name === "assignmentDialogForm") {
                $mdDialog.hide();
                stateService.fetchHistory().pop();
                var ob = _.last(stateService.fetchHistory());
                if (ob) {
                    $mdDialog.show(ob);
                }
            } else {
                $location.url('/assignments');
            }
        };
        var createSuccess = function createSuccess(message) {
            $mdToast.show($mdToast.simple().textContent(message).parent(document.body).hideDelay(3000).position('top right'));
            notifier.notify('load-questions-inprogress', {});
            notifier.notify('load-questions-published', {});
            notifier.notify('load-questions-retired', {});
            ctrl.onSuccess();
        };
        var setDraftValidity = function setDraftValidity() {
            ctrl.formName.name.$touched = ctrl.formName.description.$touched = ctrl.formName.dueDate.$touched = true;

            if (ctrl.assignment.kind === assignmentKindConstants.QUESTION_CREATE) {
                ctrl.formName.questionType.$touched = ctrl.formName.questionsNeededPerAuthor.$touched = true;
            }
            if (ctrl.assignment.kind) ctrl.formName.kind.$setValidity('required', true);else ctrl.formName.kind.$touched = true;
        };
        var setAssignValidity = function setAssignValidity(form) {
            setDraftValidity(form);
            if (ctrl.assignment.kind === assignmentKindConstants.QUESTION_REVIEW && ctrl.items.length === 0) {
                ctrl.formControl.reviewItems = true;
                return false;
            }
            if (ctrl.assignment.kind === assignmentKindConstants.QUESTION_REVISION && ctrl.items.length === 0) {
                ctrl.formControl.revisionItems = true;
                return false;
            }

            if ((ctrl.assignment.kind === assignmentKindConstants.QUESTION_REVIEW || ctrl.assignment.kind === assignmentKindConstants.QUESTION_REVISION) && ctrl.items.length > 0) ctrl.formName.kind.$setValidity('required', true);
            if (ctrl.assignment.assignees.length === 0) {
                ctrl.formControl.assignees = true;
                return false;
            }
            return true;
        };
    }]
});
'use strict';

// Define the `qbAaddComment` module

angular.module('qbAssignmentCreateDialog', ['qbAssignmentCreateHeader', 'qbAssignmentCreateForm']);
'use strict';

angular.module('qbAssignmentCreateDialog').controller('qbAssignmentCreateDialogController', ["$scope", "$mdDialog", "State", "QB_ASSIGNMENT_KIND", "QB_ASSIGNEE", function ($scope, $mdDialog, stateService, assignmentKindConstants, assigneeConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.assignment = ctrl.assignment || {
            assignees: [],
            items: []
        };
        ctrl.constants = assignmentKindConstants;
        if (ctrl.assignment.kind === assignmentKindConstants.QUESTION_REVISION) ctrl.assignment.items.forEach(function (item) {
            var assignee = _.find(ctrl.assignment.assignees, {
                id: item.createdBy.id
            });
            if (!assignee) {
                ctrl.assignment.assignees = ctrl.assignment.assignees || [];
                ctrl.assignment.assignees.push({
                    id: item.createdBy.id,
                    name: item.createdBy.name,
                    status: assigneeConstants.DRAFT
                });
            }
        });
        ctrl.items = ctrl.assignment.items || [];
        ctrl.formControl = {
            reviewItems: false,
            assignees: false,
            revisionItems: false
        };
        ctrl.items = ctrl.assignment.items || [];
    };
    ctrl.onSuccess = function () {
        ctrl.onCancel();
    };
    ctrl.onCancel = function () {
        $mdDialog.hide();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbQuestionFilterDialog', ['qbCriteria', 'qbCriteriaAdd', 'qbSelectStatesDialog', 'qbSelectFieldsDialog', 'qbUsersSelect']);
'use strict';

angular.module('qbQuestionFilterDialog').controller('qbQuestionFilterDialogController', ["$scope", "$mdDialog", "$mdToast", "$q", "$filter", "Notifier", "Tag", "Assignment", "Question", "User", "QB_USER", "QB_QUESTION", function ($scope, $mdDialog, $mdToast, $q, $filter, notifier, tagService, assignmentService, questionService, userService, userConstants, questionConstants) {
    var ctrl = this;
    ctrl.allUsers = {};
    ctrl.selectedQuestionIds = [];
    ctrl.isAdmin = userService.isAdmin();
    ctrl.isEditor = userService.isEditor();
    ctrl.isAuthor = userService.isAuthor();
    ctrl.inProgress = { tag: false, user: false };
    ctrl.sortFields = [{
        field: "Modified date",
        key: "lastModificationDate"
    }, {
        field: "ID",
        key: "customId"
    }, {
        field: "Stem",
        key: "stem"
    }];
    if (userService.isAdmin() || userService.isEditor()) {
        ctrl.sortFields.push({
            field: "Status",
            key: "status"
        }, {
            field: "Review Count",
            key: "reviewCount"
        });
    }
    ctrl.orderFields = [{
        field: "Ascending",
        key: ""
    }, {
        field: "Descending",
        key: "-"
    }];
    if (ctrl.data.customIds) {
        ctrl.data.customIds.forEach(function (d) {
            var obj = {};
            obj.value = $filter('numberFixedLen')(d, 5);
            ctrl.selectedQuestionIds.push(obj);
        });
    };
    var makeTagCriteria = function makeTagCriteria() {
        if (ctrl.data.allCriteria) {
            ctrl.criteria = {};
            _.each(ctrl.data.allCriteria, function (value, key) {
                ctrl.criteria[key] = _.filter(value.data.data, {
                    selected: true
                });
            });
        }
    };
    makeTagCriteria();
    ctrl.selectedQuestion;

    ctrl.query = {
        sort: 'id',
        limit: 25,
        page: 1,
        status: userConstants.ACTIVE
    };

    ctrl.questionCustomSearch = function (query) {
        var defer = $q.defer();
        questionService.searchQuestionByCustomId(query).then(function (response) {
            var results = $filter('orderBy')(response.data.data, 'value');
            defer.resolve(results);
        });
        return defer.promise;
    };

    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.reset = function () {
        Object.keys(ctrl.data).forEach(function (prop) {
            delete ctrl.data[prop];
        });
        ctrl.criteria = {};
        ctrl.data.statuses = ctrl.resetStates();
        ctrl.data.sortBy = "lastModificationDate";
        ctrl.data.order = "";
        ctrl.selectedQuestionIds = [];
    };
    ctrl.filter = function () {
        ctrl.data.customIds = [];
        ctrl.selectedQuestionIds.forEach(function (item) {
            ctrl.data.customIds.push($filter('inverseNumberFixedLen')(item.value));
        });
        //ctrl.search.reviewers = _.pluck(ctrl.search.reviewers, "name");
        $mdDialog.hide();
    };

    /*
    ctrl.selectFields = function() {
        var allFields = angular.copy(ctrl.fields);
        $mdDialog.show({
            templateUrl: 'app/minified/qb-select-fields-dialog/qb-select-fields-dialog.template.html',
            targetEvent: event,
            controller: 'qbSelectFieldsDialog',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                fields: ctrl.fields,
                allFields: allFields
            }
        }).then(function() {
            angular.merge(ctrl.fields, allFields);
        });
    };*/
    ctrl.loadTags = function (cb) {
        ctrl.typeData = {};
        ctrl.typeData.data = [{
            name: "SingleChoice",
            taxonomy: "Kind",
            selected: true,
            id: 1
        }, {
            name: "MultipleChoice",
            taxonomy: "Kind",
            selected: true,
            id: 2
        }, {
            name: "ShortText",
            taxonomy: "Kind",
            selected: true,
            id: 3
        }, {
            name: "LongText",
            taxonomy: "Kind",
            selected: true,
            id: 4
        }];
        tagService.getClass().then(function (response) {
            ctrl.tags = response.data.data;
            var promises = {};
            ctrl.tags.forEach(function (tag) {
                promises[tag.name] = tagService.getTaxonomies(tag.id);
            });
            ctrl.tags.push({
                name: "Kind",
                type: "tag"
            });
            $q.all(promises).then(function (values) {
                ctrl.tags.forEach(function (tag) {
                    if (ctrl.data) {
                        var subTags = _.filter(ctrl.data, function (d) {
                            if (d.taxonomy) {
                                return d.taxonomy == tag.name;
                            }
                        });
                        if (subTags) {
                            values[tag.name].data.data.forEach(function (d) {
                                if (_.find(subTags, {
                                    name: d.name
                                })) {
                                    d.selected = true;
                                } else {
                                    d.selected = false;
                                }
                            });
                        }
                    }
                    ctrl.data.allCriteria = values;
                    ctrl.data.allCriteria.Kind = {
                        data: ctrl.typeData
                    };
                });
                cb();
            });
        });
    };
    ctrl.isTagsEmpty = function () {
        if (!ctrl.criteria) {
            return true;
        }
        return false;
    };
    ctrl.isAuthorsEmpty = function () {
        if (!ctrl.data.authors) {
            return true;
        }
        return ctrl.data.authors.length <= 0;
    };
    ctrl.isReviewersEmpty = function () {
        if (!ctrl.data.reviewers) {
            return true;
        }
        return ctrl.data.reviewers.length <= 0;
    };
    ctrl.selectTags = function (event) {
        var showMe = function showMe() {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-criteria/qb-criteria.template.html',
                targetEvent: event,
                controller: 'criteriaController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    data: ctrl.data.allCriteria,
                    hideType: false,
                    showLevelInCheckbox: true
                }
            }).then(function () {
                makeTagCriteria();
            }).finally(function () {
                ctrl.inProgress.tag = false;
            });
        };
        if (ctrl.data.allCriteria) {
            if (!ctrl.inProgress.tag) {
                ctrl.inProgress.tag = true;
                showMe();
            }
        } else {
            ctrl.loadTags(showMe);
        }
    };

    ctrl.removeData = function (dataArray, arrayItem) {
        dataArray.splice(dataArray.indexOf(arrayItem), 1);
    };
    /*
    ctrl.unSelectField = function(fields, field) {
        var selected = _.filter(fields, function(a) {
            return a.selected === true
        });
        if (selected.length <= 1) {
            $mdDialog.show(
                $mdDialog.alert({
                    skipHide: true
                })
                .title("Please select atleast one field")
                .ariaLabel('alert')
                .targetEvent(event)
                .ok('OK'));
            return;
        } else {
            field.selected = false;
        }
    };*/
    ctrl.selectUsers = function (event, userType) {
        if (ctrl.inProgress.user) {
            return;
        }
        ctrl.inProgress.user = true;
        var logPagination = function logPagination() {
            var cb = function cb(data) {
                ctrl.allUsers = data;
            };
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit, ctrl.searchParam, userType, cb);
        };
        var callMe = function callMe(data) {
            var selected = [];
            if (userType == 'Author') {
                selected = ctrl.data.authors || [];
            } else if (userType == 'Reviewer') {
                selected = ctrl.data.reviewers || [];
            }
            var searchParam = "";
            ctrl.allUsers = data;
            $mdDialog.show({
                templateUrl: 'app/minified/qb-users-select/qb-users-select.template.html',
                targetEvent: event,
                controller: 'usersSelectController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    data: ctrl.allUsers,
                    selected: selected,
                    searchParam: searchParam,
                    parent: ctrl,
                    logPagination: logPagination
                }
            }).then(function () {
                if (userType == 'Author') {
                    ctrl.data.authors = selected.map(function (user) {
                        var obj = {};
                        obj.id = user.id;
                        obj.name = user.name;
                        return obj;
                    });
                } else if (userType == 'Reviewer') {
                    ctrl.data.reviewers = selected.map(function (user) {
                        var obj = {};
                        obj.id = user.id;
                        obj.name = user.name;
                        return obj;
                    });
                }
            }).finally(function () {
                searchParam = "";
                ctrl.inProgress.user = false;
            });
        };
        ctrl.loadUsers(userType, callMe);
    };
    ctrl.logPagination = function (page, limit, search, type, callMe) {
        ctrl.query.limit = limit;
        ctrl.query.page = page;
        ctrl.searchParam = search || "";
        ctrl.loadUsers(type, callMe);
    };
    ctrl.loadUsers = function (type, callMe) {
        if (type == 'Author') {
            assignmentService.authorUserList(ctrl.query, ctrl.searchParam).then(function (response) {
                callMe(response.data.data);
                ctrl.count = response.data.count;
            });
        } else if (type == 'Reviewer') {
            assignmentService.reviewerUserList(ctrl.query, ctrl.searchParam).then(function (response) {
                callMe(response.data.data);
                ctrl.count = response.data.count;
            });
        }
    };
}]);
'use strict';

// Define the  module

angular.module('qbSelectStatesDialog', []);
'use strict';

angular.module('qbSelectStatesDialog').controller('qbSelectStatesDialog', ["$scope", "$mdDialog", "QB_QUESTION", function ($scope, $mdDialog, questionConstants) {
    var ctrl = this;
    ctrl.addStates = function () {
        ctrl.states.length = 0;
        ctrl.allStates.forEach(function (state) {
            if (state.selected) ctrl.states.push(state.name);
        });
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbSelectFieldsDialog', []);
'use strict';

angular.module('qbSelectFieldsDialog').controller('qbSelectFieldsDialog', ["$scope", "$mdDialog", "QB_QUESTION", function ($scope, $mdDialog, questionConstants) {
    var ctrl = this;
    ctrl.addFields = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentFilterDialog', ['qbCriteria', 'qbCriteriaAdd', 'qbSelectStatesDialog', 'qbSelectFieldsDialog']);
'use strict';

angular.module('qbAssignmentFilterDialog').controller('qbAssignmentFilterDialogController', ["$scope", "$mdDialog", "$mdToast", "$q", "$filter", "Notifier", "Tag", "User", "Assignment", "QB_ASSIGNMENT_KIND", function ($scope, $mdDialog, $mdToast, $q, $filter, notifier, tagService, userService, assignmentService, assignmentKindConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.constants = {
            assignmentKind: assignmentKindConstants
        };
        ctrl.today = new Date();
        ctrl.chips = {
            customIds: {
                selectedItem: null,
                searchText: null
            },
            assignors: {
                selectedItem: null,
                searchText: null
            },
            assignees: {
                selectedItem: null,
                searchText: null
            }
        };
        ctrl.role = {
            admin: userService.isAdmin(),
            author: userService.isAuthor(),
            editor: userService.isEditor(),
            reviewer: userService.isReviewer()
        };
    };
    ctrl.sortBy = function () {
        ctrl.assignmentFilter.sortBy = [ctrl.sort.order + ctrl.sort.sortByValue];
    };

    ctrl.transformChip = function (chip) {
        if (angular.isObject(chip)) {
            return chip;
        }
        return { name: chip, type: 'new' };
    };

    ctrl.onAddChip = function (chip, ab, cd) {};

    ctrl.querySearch = function (searchText, array) {
        return array.filter(function (object) {
            if (object.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) return object;
        }) || [];
    };

    ctrl.assignmentSearch = function (searchText, array) {
        var urlParams = {
            query: searchText,
            page: 1,
            size: 30
        };
        var defer = $q.defer();
        assignmentService.searchCustomId(urlParams).then(function (response) {
            var results = response.data.data;
            defer.resolve(results);
        });
        return defer.promise;
    };

    ctrl.cancel = function () {
        $mdDialog.hide();
    };

    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentConfirmCreatedDialog', []);
'use strict';

angular.module('qbAssignmentConfirmCreatedDialog').controller('qbAssignmentConfirmCreatedDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", "State", "QB_ASSIGNMENT", function ($scope, $mdDialog, $mdToast, notifier, stateService, assignmentConstants) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.openAssignment = function (assignment) {
        $mdDialog.cancel();
        if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) {
            var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignment: assignment,
                    items: assignment.items
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        } else {
            var ob = {
                templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: assignment.id,
                    assignment: assignment,
                    fullAssignment: {}
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        }
    };
    ctrl.loadPreview = function (event, question) {
        $mdDialog.cancel();
        var ob = {
            templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
            targetEvent: event,
            controller: 'qbQuestionPreviewDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                question: question
            }
        };
        stateService.fetchHistory().push(ob);
        $mdDialog.show(ob);
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionActionVerificationDialog', []);
'use strict';

angular.module('qbQuestionActionVerificationDialog').controller('qbQuestionActionVerificationDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", "State", function ($scope, $mdDialog, $mdToast, notifier, stateService) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.loadPreview = function (event, question) {
        $mdDialog.cancel();
        var ob = {
            templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
            targetEvent: event,
            controller: 'qbQuestionPreviewDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                question: question,
                state: "Published",
                readOnly: true,
                dialog: {
                    parent: ctrl,
                    referrer: "preview-question"
                }
            }
        };
        stateService.fetchHistory().push(ob);
        $mdDialog.show(ob);
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionAddToQuestionBankDialog', ['qbBankCreateDialog', 'qbBanksDialog']);
'use strict';

angular.module('qbQuestionAddToQuestionBankDialog').controller('qbQuestionAddToQuestionBankDialogController', ["$scope", "$mdDialog", "$mdToast", "$routeParams", "$location", "Util", "Version", "Question", "Notifier", "State", "User", "QB_QUESTION", function ($scope, $mdDialog, $mdToast, $routeParams, $location, util, versionService, questionService, notifier, stateService, userService, questionConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    ctrl.cancel = function () {
        $mdDialog.cancel();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.createNewBank = function (event) {
        $mdDialog.cancel();
        var currentUser = userService.getLoggedInUser();
        var ob = {
            templateUrl: 'app/minified/qb-bank-create-dialog/qb-bank-create-dialog.template.html',
            targetEvent: event,
            controller: 'qbBankCreateDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                bank: {
                    createdBy: {
                        name: currentUser.name,
                        avatar: currentUser.avatar,
                        id: currentUser.id
                    },
                    questions: ctrl.questions
                },
                questions: ctrl.questions
            }
        };
        stateService.fetchHistory().push(ob);
        $mdDialog.show(ob);
    };
    ctrl.addToExistingBank = function (event) {
        $mdDialog.cancel();
        var currentUser = userService.getLoggedInUser();
        var ob = {
            templateUrl: 'app/minified/qb-banks-dialog/qb-banks-dialog.template.html',
            targetEvent: event,
            controller: 'qbBanksDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                bank: {
                    createdBy: {
                        name: currentUser.name,
                        avatar: currentUser.avatar,
                        id: currentUser.id
                    },
                    questions: ctrl.questions
                },
                questions: ctrl.questions
            }
        };
        stateService.fetchHistory().push(ob);
        $mdDialog.show(ob);
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the `qbAaddComment` module

angular.module('qbBankCreateDialog', ['qbBankCreateHeader', 'qbBankCreateForm']);
'use strict';

angular.module('qbBankCreateDialog').controller('qbBankCreateDialogController', ["$scope", "$mdDialog", "State", "QB_ASSIGNMENT_KIND", "QB_ASSIGNEE", function ($scope, $mdDialog, stateService, assignmentKindConstants, assigneeConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    ctrl.onSuccess = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.onCancel = function () {
        $mdDialog.hide();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbBankCreateForm', ['material.components.expansionPanels', 'qbCriteriaAdd', 'qbBankInfo', 'qbBankDialogQuestion', 'qbBanksMore', 'qbQuestionPreviewDialog']);
'use strict';

angular.module('qbBankCreateForm').component('qbBankCreateForm', {
    templateUrl: 'app/minified/qb-bank-create-form/qb-bank-create-form.template.html',
    bindings: {
        bank: "=",
        questions: "=",
        formName: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$routeParams", "$q", "$mdToast", '$mdExpansionPanel', "$filter", "$location", "Bank", "User", "Question", "Tag", "QB_QUESTION", function ($mdDialog, $scope, $element, $timeout, $routeParams, $q, $mdToast, $mdExpansionPanel, $filter, $location, bankService, userService, questionService, tagService, questionConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 140;
            ctrl.bank = ctrl.bank || {
                questions: []
            };
            ctrl.EMPTY_CRITERIA = "This question bank currently has no set criteria.";
            ctrl.questions = ctrl.questions || [];
            ctrl.allCriteria = {};
            ctrl.criteria = {};
            ctrl.typeData = {};
            ctrl.typeData.data = [{
                name: "SingleResponse",
                taxonomy: "Type",
                id: 1
            }, {
                name: "MultipleResponse",
                taxonomy: "Type",
                id: 2
            }, {
                name: "ShortText",
                taxonomy: "Type",
                id: 3
            }, {
                name: "LongText",
                taxonomy: "Type",
                id: 4
            }];
            tagService.getClass().then(function (response) {
                ctrl.tags = response.data.data;
                var promises = {};
                ctrl.tags.forEach(function (tag) {
                    promises[tag.name] = tagService.getTaxonomies(tag.id);
                });
                ctrl.tags.push({
                    name: "Type",
                    type: "tag"
                });
                $q.all(promises).then(function (values) {
                    ctrl.allCriteria = values;
                    ctrl.allCriteria.Type = {
                        data: ctrl.typeData
                    };
                });
            });
            ctrl.itemsSelected = [];
            ctrl.searchParam = "";
            ctrl.query = {
                sort: 'id',
                limit: 25,
                page: 1
            };
            ctrl.filter = {
                stem: "",
                customId: "",
                statuses: [questionConstants.APPROVED]
            };
            if (ctrl.bank.id !== undefined) {
                bankService.getBank(ctrl.bank.id).then(function (response) {
                    if (response.data.status === "success") {
                        ctrl.bank = response.data.data;
                        ctrl.questions = _.uniq(_.union(ctrl.questions, ctrl.bank.questions), _.property('id')) || ctrl.bank.questions;
                        ctrl.info = {
                            status: "",
                            published: "",
                            lastModified: ctrl.bank.lastModificationDate,
                            created: ctrl.bank.creationDate,
                            owner: {
                                profile: "app/resources/images/placeholder-avatar.png",
                                id: ""
                            }
                        };
                    }
                });
            }
        };
        ctrl.ifEmpty = function (object) {
            return Object.keys(object).length === 0 && object.constructor === Object;
        };
        ctrl.addQuestion = function (event) {
            getQuestions();
            var selected = angular.copy(ctrl.questions ? ctrl.questions : []);
            $mdDialog.show({
                templateUrl: 'app/minified/qb-bank-dialog-question/qb-bank-dialog-question.template.html',
                targetEvent: event,
                controller: 'qbBankDialogQuestion',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    parent: ctrl,
                    selected: selected
                }
            }).then(function () {
                ctrl.questions = selected.map(function (d) {
                    return {
                        id: d.id,
                        stem: d.stem,
                        customId: d.customId
                    };
                });
            });
        };
        ctrl.preview = function (questionId, event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: {
                        id: questionId
                    }
                },
                skipHide: true
            });
        };
        ctrl.removeData = function (dataArray, arrayItem) {
            dataArray.splice(dataArray.indexOf(arrayItem), 1);
        };
        ctrl.setCriteria = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-criteria/qb-criteria.template.html',
                targetEvent: event,
                controller: 'criteriaController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    data: ctrl.allCriteria,
                    hideType: false
                }
            }).then(function () {}).finally(function () {
                $mdExpansionPanel('criteria').expand();
                getQuestions();
            });
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.filter.stem = ctrl.searchParam || "";
            ctrl.filter.customId = ctrl.searchParam || "";
            ctrl.filter.question = ctrl.searchParam || "";
            getQuestions();
        };

        var getQuestions = function getQuestions() {
            ctrl.criteria = {};
            ctrl.tags.forEach(function (tag) {
                if (ctrl.allCriteria[tag.name]) {
                    ctrl.criteria[tag.name] = $filter('filter')(ctrl.allCriteria[tag.name].data.data, {
                        selected: true
                    });
                    ctrl.filter[tag.name.toLowerCase()] = _.pluck(ctrl.criteria[tag.name], "name");
                }
            });
            questionService.filterOrQuestionList(ctrl.query, ctrl.filter).then(function (response) {
                ctrl.allQuestions = response.data.data;
                ctrl.count = response.data.count;
            });
        };
        ctrl.hasElements = function () {
            if (!ctrl.tags) {
                return false;
            }
            var flag = false;
            ctrl.tags.forEach(function (tag) {
                if (ctrl.criteria[tag.name]) flag = flag || ctrl.criteria[tag.name].length > 0;
            });
            return flag;
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbBankCreateHeader', []);
'use strict';

angular.module('qbBankCreateHeader').component('qbBankCreateHeader', {
    templateUrl: 'app/minified/qb-bank-create-header/qb-bank-create-header.template.html',
    bindings: {
        bank: "=",
        questions: "=",
        onSuccess: "&",
        formName: "<",
        type: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "$filter", "$routeParams", "Question", "User", "Assignment", "Media", "State", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_QUESTION_TYPE", "Bank", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, $filter, $routeParams, questionService, userService, assignmentService, mediaService, stateService, questionConstants, assignmentConstants, assigneeConstants, questionTypeConstants, bankService) {
        var ctrl = this;
        ctrl.$onInit = function () {};
        ctrl.cancel = function () {
            $mdDialog.cancel();
            stateService.fetchHistory().pop();
            var ob = _.last(stateService.fetchHistory());
            if (ob) {
                $mdDialog.show(ob);
            }
        };
        ctrl.saveBank = function (event) {
            var currentUser = userService.getLoggedInUser();
            ctrl.bank.createdBy = {
                name: currentUser.name,
                avatar: currentUser.avatar,
                id: currentUser.id
            };
            ctrl.bank.questions = _.map(ctrl.questions, function (value, key) {
                return _.pick(value, 'id');
            });
            if (ctrl.formName.$valid) {
                if (ctrl.bank.id) bankService.update(ctrl.bank).then(function (response) {
                    ctrl.questionDiff = response.data.data;
                    if (response.data.status == "success") {
                        $mdToast.show($mdToast.simple().textContent('Question Bank updated successfully').parent(document.body).hideDelay(3000).position('top right'));
                        ctrl.onSuccess();
                        //                                $location.url('/banks');
                    }
                });else bankService.save(ctrl.bank).then(function (response) {
                    ctrl.questionDiff = response.data.data;
                    if (response.data.status == "success") {
                        $mdToast.show($mdToast.simple().textContent('Question Bank created successfully').parent(document.body).hideDelay(3000).position('top right'));
                        ctrl.onSuccess();
                        //                                $location.url('/banks');
                    }
                });
            } else {
                ctrl.formName.description.$setTouched();
                ctrl.formName.name.$setTouched();
            }
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbBanksScreen', ['qbBanks', 'qbBankEdit']);
'use strict';

angular.module('qbBanksScreen').component('qbBanksScreen', {
    templateUrl: 'app/minified/qb-banks-screen/qb-banks-screen.template.html',
    bindings: {
        questions: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$routeParams", "User", "Bank", "Notifier", function ($mdDialog, $scope, $element, $timeout, $location, $routeParams, userService, bankService, notifier) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.query = {
                //                        sort: 'id',
                limit: 25,
                page: 1
            };
            ctrl.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.selected = [];
            ctrl.searchParam = "";
            var filter = _.debounce(ctrl.doFilter, 500);
            $scope.$watch(function () {
                return ctrl.searchParam;
            }, function (newValue, oldValue, scope) {
                filter();
            });
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };

        ctrl.doFilter = function () {
            ctrl.query.name = ctrl.searchParam;
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };

        ctrl.orderBy = function (field) {
            ctrl.query.sort = field;
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };

        ctrl.logPagination = function (page, limit) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.query.sort = "-lastModificationDate";
            if (userService.isAdmin() || userService.isEditor()) {
                bankService.getBanks(ctrl.query).then(function (response) {
                    ctrl.banks = response.data.data;
                    ctrl.total = response.data.count;
                });
            }
        };
        ctrl.loadEditBank = function (bank) {
            $location.url('/banks/details/' + bank.id + "?goto=" + $location.url());
        };
        ctrl.getFilter = function (event) {
            notifier.notify('get-bank-filter', { event: event });
        };
    }]
});
'use strict';

// Define the `qbAaddComment` module

angular.module('qbBanksDialog', ['qbBanks', 'qbBankCreateForm', 'qbBankEdit']);
'use strict';

angular.module('qbBanksDialog').controller('qbBanksDialogController', ["$scope", "$mdDialog", "State", function ($scope, $mdDialog, stateService) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    ctrl.onSuccess = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the `qbAaddComment` module

angular.module('qbBankEditDialog', ['qbBankCreateForm', 'qbBankExport']);
'use strict';

angular.module('qbBankEditDialog').controller('qbBankEditDialogController', ["$scope", "$mdDialog", "$mdToast", "$location", "$routeParams", "Bank", "User", "State", "Notifier", "QB_ASSIGNMENT_KIND", "QB_ASSIGNEE", function ($scope, $mdDialog, $mdToast, $location, $routeParams, bankService, userService, stateService, notifier, assignmentKindConstants, assigneeConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        if (ctrl.bank.id) {
            ctrl.bankId = ctrl.bank.id;
        } else if ($routeParams.id !== undefined) {
            ctrl.bankId = $routeParams.id;
        }
        ctrl.bank = ctrl.bank || new Object();
        ctrl.selectedQuestions = ctrl.questions || new Array();
    };
    ctrl.saveBank = function (event) {
        var currentUser = userService.getLoggedInUser();
        ctrl.bank.createdBy = {
            name: currentUser.name,
            avatar: currentUser.avatar,
            id: currentUser.id
        };
        ctrl.bank.questions = _.map(ctrl.selectedQuestions, function (value, key) {
            return _.pick(value, 'id');
        });
        bankService.update(ctrl.bank).then(function (response) {
            ctrl.questionDiff = response.data.data;
            if (response.data.status == "success") {
                $mdToast.show($mdToast.simple().textContent('Question Bank updated successfully').parent(document.body).hideDelay(3000).position('top right'));
                stateService.fetchHistory().pop();
                ctrl.cancel();
                notifier.notify('load-banks', {});
            }
        });
    };
    ctrl.goBack = function () {
        if ($routeParams.goto) {
            $location.url($routeParams.goto);
        } else {
            $location.url('/banks');
        }
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
        stateService.fetchHistory().pop();
        var ob = _.last(stateService.fetchHistory());
        if (ob) {
            $mdDialog.show(ob);
        }
    };
    ctrl.onSuccess = function () {
        $mdDialog.hide();
    };
    ctrl.onCancel = function () {
        $mdDialog.hide();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbQuestionbankFilterDialog', ['qbCriteria', 'qbCriteriaAdd', 'qbSelectStatesDialog', 'qbSelectFieldsDialog', 'qbUsersSelect']);
'use strict';

angular.module('qbQuestionbankFilterDialog').controller('qbQuestionbankFilterDialogController', ["$scope", "$mdDialog", "$mdToast", "$q", "$filter", "Notifier", "Tag", "Assignment", "Question", "User", "Bank", "QB_USER", "QB_QUESTION", function ($scope, $mdDialog, $mdToast, $q, $filter, notifier, tagService, assignmentService, questionService, userService, bankService, userConstants, questionConstants) {
    var ctrl = this;
    ctrl.selectedBankIds = [];
    ctrl.selectedQuestionIds = [];
    //cyril check this
    if (ctrl.data.customIds) {
        ctrl.data.customIds.forEach(function (d) {
            var obj = {};
            obj.value = $filter('numberFixedLen')(d, 5);
            ctrl.selectedBankIds.push(obj);
        });
    };
    if (ctrl.data.questionCustomIds) {
        ctrl.data.questionCustomIds.forEach(function (d) {
            var obj = {};
            obj.value = $filter('numberFixedLen')(d, 5);
            ctrl.selectedQuestionIds.push(obj);
        });
    };
    ctrl.selectedBank;
    ctrl.selectedQuestion;
    ctrl.sortFields = [{
        field: "Modified date",
        key: "lastModificationDate"
    }, {
        field: "ID",
        key: "customId"
    }, {
        field: "Name",
        key: "name"
    }];
    ctrl.orderFields = [{
        field: "Ascending",
        key: ""
    }, {
        field: "Descending",
        key: "-"
    }];

    ctrl.bankCustomSearch = function (query) {
        var defer = $q.defer();
        bankService.searchByCustomId(query).then(function (response) {
            var results = response.data.data;
            defer.resolve(results);
        });
        return defer.promise;
    };

    ctrl.questionCustomSearch = function (query) {
        var defer = $q.defer();
        questionService.searchQuestionByCustomId(query).then(function (response) {
            var results = $filter('orderBy')(response.data.data, 'value');
            defer.resolve(results);
        });
        return defer.promise;
    };

    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.reset = function () {
        Object.keys(ctrl.data).forEach(function (prop) {
            delete ctrl.data[prop];
        });
        ctrl.data.customIds = [];
        ctrl.data.questionCustomIds = [];
        ctrl.data.sortBy = "lastModificationDate";
        ctrl.data.order = "";
        ctrl.selectedBankIds = [];
        ctrl.selectedQuestionIds = [];
    };
    ctrl.filter = function () {
        ctrl.data.customIds = [];
        ctrl.selectedBankIds.forEach(function (item) {
            ctrl.data.customIds.push($filter('inverseNumberFixedLen')(item.value));
        });
        ctrl.data.questionCustomIds = [];
        ctrl.selectedQuestionIds.forEach(function (item) {
            ctrl.data.questionCustomIds.push($filter('inverseNumberFixedLen')(item.value));
        });
        $mdDialog.hide();
    };

    ctrl.selectStates = function (event) {
        ctrl.data.statuses = ctrl.data.statuses || [];
        var allStates = [{
            name: "inProgress",
            selected: _.contains(ctrl.data.statuses, "inProgress")
        }, {
            name: "done",
            selected: _.contains(ctrl.data.statuses, "done")
        }];
        $mdDialog.show({
            templateUrl: 'app/minified/qb-select-states-dialog/qb-select-states-dialog.template.html',
            targetEvent: event,
            controller: 'qbSelectStatesDialog',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                states: ctrl.data.statuses,
                allStates: allStates
            }
        });
    };

    ctrl.isStateEmpty = function () {
        if (!ctrl.data.statuses) {
            return true;
        }
        return ctrl.data.statuses.length <= 0;
    };

    ctrl.removeData = function (dataArray, arrayItem) {
        dataArray.splice(dataArray.indexOf(arrayItem), 1);
    };
}]);
'use strict';

// Define the `qbQuestionTable` module

angular.module('qbQuestionTableFilter', ['md.data.table', 'qbQuestionImport', 'qbQuestionCreate', 'qbQuestionEdit', 'qbTableSearchBar', 'qbQuestionEditDialog', 'qbAssignmentCreateDialog', 'qbQuestionFilterDialog']);
'use strict';

angular.module('qbQuestionTableFilter').component('qbQuestionTableFilter', {
    templateUrl: 'app/minified/qb-question-table-filter/qb-question-table-filter.template.html',
    bindings: {
        filter: "<",
        resetStates: "&",
        show: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$filter", "$location", "$route", "$routeParams", "Util", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $filter, $location, $route, $routeParams, util, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants, questionTypeConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 10;
            ctrl.fields = [{
                field: "ID",
                key: "customId",
                selected: true,
                allow: ["Admin", "Author", "Editor"],
                make: ctrl.makeCustomID,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Stem",
                key: "stem",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Question",
                key: "question",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeStemAndQuestion,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Created Date",
                key: "creationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Modified Date",
                key: "lastModificationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefaultDate,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Topics",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeTopics,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Level",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: false,
                make: ctrl.makeLevel,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Status",
                key: "status",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Review Count",
                key: "reviewCount",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "TimesUsed",
                key: "timesUsed",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Kind",
                key: "questionType",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeQuestionType,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Author",
                key: "author",
                allow: ["Admin", "Editor"],
                selected: false,
                make: ctrl.makeAuthor,
                makeClass: ctrl.makeDefaultClass
            }];
            ctrl.sortFields = [{
                field: "Modified date",
                key: "lastModificationDate"
            }, {
                field: "ID",
                key: "customId"
            }, {
                field: "Stem",
                key: "stem"
            }];
            ctrl.orderFields = [{
                field: "Ascending",
                key: ""
            }, {
                field: "Descending",
                key: "-"
            }];
            if (userService.isAdmin() || userService.isEditor()) {
                ctrl.sortFields.push({
                    field: "Status",
                    key: "status"
                }, {
                    field: "Review Count",
                    key: "reviewCount"
                });
            }
            ctrl.query = {
                size: 25,
                page: 1
            };
            ctrl.canSeeEditAssignment = userService.isAdmin() || userService.isEditor();
            ctrl.previlege = util.getQuestionPrevileges;
            notifier.subscribe($scope, 'load-questions-filter', function (event, data) {
                ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            });
        };

        ctrl.isStatusesEmpty = function () {
            return _.find(ctrl.filter.statuses, function (a) {
                return a.selected;
            }) ? false : true;
        };

        ctrl.makeCustomID = function (question, field) {
            return $filter("numberFixedLen")(question.customId, 5);
        };
        ctrl.makeDefault = function (data, field) {
            return data[field.key];
        };
        ctrl.makeDefaultDate = function (data, field) {
            return $filter('date')(new Date(data[field.key]), 'MM/dd/yyyy').toUpperCase();
        };

        ctrl.makeDefaultClass = function (data, field) {
            return "";
        };
        ctrl.makeStemAndQuestion = function (data, field) {
            return $filter("htmlFilter")(data[field.key]);
        };
        ctrl.makeAuthor = function (question, field) {
            if (question.createdBy) {
                return question.createdBy.name;
            }
        };
        ctrl.allowField = function (field) {
            if (_(field.allow).difference(_.pluck(userService.getLoggedInUser().roles, 'name')).length === field.allow.length) {
                return false;
            }
            return true;
        };
        ctrl.makeTopics = function (data, field) {
            if (data.tags) {
                var topics = data.tags.filter(function (d) {
                    return d.taxonomy == "Topic";
                });
                return data.topics = topics.map(function (elem) {
                    return elem.name;
                }).join(", ");
            }
        };
        ctrl.makeLevel = function (data, field) {
            if (data.tags) {
                return data.level = data.tags.find(function (d) {
                    return d.taxonomy == "Level";
                }).name;
            }
        };
        ctrl.makeQuestionType = function (question, field) {
            if (question.sections) {
                var mainSection = question.sections.find(function (s) {
                    return ctrl.isMainSection(s);
                });
                if (mainSection) {
                    return mainSection.category;
                }
            }
        };

        ctrl.isMainSection = function (section) {
            if (section && (section.category === questionTypeConstants.SINGLECHOICE || section.category === questionTypeConstants.MULTIPLECHOICE || section.category === questionTypeConstants.SHORTANSWER || section.category === questionTypeConstants.ESSAY)) {
                return true;
            }
            return false;
        };

        ctrl.getFilter = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-filter-dialog/qb-question-filter-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionFilterDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    data: ctrl.filter,
                    fields: ctrl.fields,
                    selected: ctrl.selected,
                    resetStates: ctrl.resetStates
                }
            }).then(function () {
                ctrl.logPagination(ctrl.query.page, ctrl.query.size);
            });
        };

        ctrl.getDateRange = function (text, startDate, endDate) {
            if (startDate && endDate) return text + " between : " + $filter('date')(new Date(startDate), "MM/dd/yyyy") + " and " + $filter('date')(new Date(endDate), "MM/dd/yyyy");
            if (startDate) return text + " from :  " + $filter('date')(new Date(startDate), "MM/dd/yyyy");
            if (endDate) return text + " till : " + $filter('date')(new Date(endDate), "MM/dd/yyyy");
        };
        ctrl.getTimeUsedRange = function (less, more) {
            if (less && more) return "Times used between : " + less + " and " + more;
            if (less) return "Times used more than or equal to " + less;
            if (more) return "Times used less than or equal to " + more;
        };
        ctrl.getReviewCountRange = function (less, more) {
            if (less && more) return "Review count between : " + less + " and " + more;
            if (less) return "Review count more than or equal to " + less;
            if (more) return "Review count less than or equal to " + more;
        };
        ctrl.clearFilter = function () {
            Object.keys(ctrl.filter).forEach(function (prop) {
                delete ctrl.filter[prop];
            });
            console.log("helllo");
            ctrl.filter.statuses = ctrl.resetStates();
            ctrl.filter.order = "";
            ctrl.show.filter = false;
        };
        ctrl.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            boundaryLinks: false,
            decapitate: false,
            limitSelect: true,
            pageSelect: true
        };

        ctrl.selected = [];

        ctrl.logPagination = function (page, size) {
            ctrl.query.size = size;
            ctrl.query.page = page;
            stateService.fetchState().inProgress = ctrl.query;
            stateService.fetchState().inProgress.stem = ctrl.filter.stem;
            var ob = {};
            ob.question = ctrl.filter.question ? ctrl.filter.question : "";
            ob.stem = ob.question;
            ob.customIds = ctrl.filter.customIds;
            ob.kind = ctrl.filter.kind;
            ob.level = ctrl.filter.level;
            ob.topic = ctrl.filter.topic;
            ob.lastModifiedDate = [];
            if (ctrl.filter.lastModificationDateStart) {
                ob.lastModifiedDate.push({
                    op: "gt",
                    value: ctrl.filter.lastModificationDateStart.toISOString()
                });
            }
            if (ctrl.filter.lastModificationDateEnd) {
                ob.lastModifiedDate.push({
                    op: "lt",
                    value: ctrl.filter.lastModificationDateEnd.toISOString()
                });
            }
            ob.creationDate = [];
            if (ctrl.filter.creationDateStart) {
                ob.creationDate.push({
                    op: "gte",
                    value: ctrl.filter.creationDateStart.toISOString()
                });
            }
            if (ctrl.filter.creationDateEnd) {
                ob.creationDate.push({
                    op: "lte",
                    value: ctrl.filter.creationDateEnd.toISOString()
                });
            }
            ob.completedDate = [];
            if (ctrl.filter.completedDateStart) {
                ob.completedDate.push({
                    op: "gte",
                    value: ctrl.filter.completedDateStart.toISOString()
                });
            }
            if (ctrl.filter.completedDateEnd) {
                ob.completedDate.push({
                    op: "lte",
                    value: ctrl.filter.completedDateEnd.toISOString()
                });
            }
            ob.statuses = _.chain(ctrl.filter.statuses).filter(function (s) {
                return s.selected;
            }).pluck("name").value();

            if (ctrl.filter.authors) {
                ob.authors = _.pluck(ctrl.filter.authors, "id");
            };
            ob.timesUsed = [];
            if (_.isNumber(ctrl.filter.lessTimesUsed)) {
                ob.timesUsed.push({
                    op: "gte",
                    value: ctrl.filter.lessTimesUsed
                });
            };
            if (_.isNumber(ctrl.filter.moreTimesUsed)) {
                ob.timesUsed.push({
                    op: "lte",
                    value: ctrl.filter.moreTimesUsed
                });
            };
            ob.reviewCount = [];
            if (_.isNumber(ctrl.filter.lessReviewCount)) {
                ob.reviewCount.push({
                    op: "gte",
                    value: ctrl.filter.lessReviewCount
                });
            };
            if (_.isNumber(ctrl.filter.moreReviewCount)) {
                ob.reviewCount.push({
                    op: "lte",
                    value: ctrl.filter.moreReviewCount
                });
            };
            ctrl.displayText = {};
            if (ctrl.filter.allCriteria) {
                _.each(ctrl.filter.allCriteria, function (value, key) {
                    var a = _.chain(value.data.data).filter({
                        selected: true
                    }).value();
                    if (!_.isEmpty(a)) {
                        ob[key.toLowerCase()] = _.pluck(a, "name");
                        ctrl.displayText[key] = _.pluck(a, "name");
                    } else {
                        delete ob[key.toLowerCase()];
                    }
                });
            }

            ob.sortBy = (ctrl.filter.order || [_.first(ctrl.orderFields).key]) + (ctrl.filter.sortBy || [_.first(ctrl.sortFields).key]);
            questionService.searchQuestions(ctrl.query, ob).then(function (response) {
                ctrl.questionData = response.data.data;
                ctrl.total = response.data.count;
            });
        };

        ctrl.showResult = function () {
            if (Object.keys(ctrl.filter).length > 4) {
                return true;
            }
            var flag = ctrl.isStatusesEmpty() && ctrl.filter.customIds && _.isEmpty(ctrl.filter.customIds);
            return !flag;
        };
        ctrl.importQuestions = function (event, task) {
            if (task == "import") {
                $location.url('/question-import');
            }
            if (task == "create") {
                $location.url('/question-create');
            }
        };

        ctrl.loadEditQuestion = function (question, event) {
            var ob = {
                templateUrl: 'app/minified/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question,
                    state: "Inprogress",
                    readOnly: true
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.showMore = function (question, event) {
            question.moreShown = true;
            event.stopPropagation();
        };
        ctrl.showLess = function (question, event) {
            question.moreShown = false;
            event.stopPropagation();
        };
        ctrl.hasMore = function (question) {
            if (question && question.stem.concat(question.question).replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(' ').trim().split(/\s+/).length > ctrl.wordLimit()) {
                return true;
            } else {
                return false;
            }
        };
        ctrl.wordLimit = function (question) {
            if (question && question.moreShown) {
                return question.stem.concat(question.question).length;
            } else {
                return ctrl.STEM_MIN_LENGTH;
            }
        };

        ctrl.menuItemClick = function (event, task) {
            ctrl.validQuestions = _.filter(ctrl.selected, function (question) {
                if (question.status === questionConstants.EDITORIAL) return question;
            });
            if (ctrl.selected.length > 0) {
                if (ctrl.validQuestions.length === 0) {
                    util.mdAlert(event, "Only Editorial Questions can be added");
                } else if (ctrl.validQuestions.length < ctrl.selected.length) {
                    util.mdAlert(event, "Only Editorial Questions can be added", task.action);
                } else {
                    task.action(event);
                }
            } else util.mdAlert(event, "Please select question(s).");
        };

        ctrl.sortChanged = function () {
            ctrl.logPagination(ctrl.query.page, ctrl.query.size);
        };

        ctrl.resetStates = function () {
            var allStates = [{
                name: questionConstants.DONE,
                selected: false
            }, {
                name: questionConstants.DRAFT,
                selected: false
            }, {
                name: questionConstants.SUBMITTED,
                selected: false
            }, {
                name: questionConstants.EDITORIAL,
                selected: false
            }, {
                name: questionConstants.INREVIEW,
                selected: false
            }, {
                name: questionConstants.APPROVED,
                selected: false
            }];

            return angular.copy(allStates);
        };

        var createRevisionAssignment = function createRevisionAssignment(event) {
            if (ctrl.validQuestions.length > 0) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentCreateDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        items: ctrl.validQuestions,
                        assignment: {
                            assignees: [],
                            items: ctrl.validQuestions,
                            kind: assignmentKindConstants.QUESTION_REVISION
                        }
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };

        var createReviewAssignment = function createReviewAssignment(event) {
            var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: ctrl.validQuestions,
                    assignment: {
                        assignees: [],
                        kind: assignmentKindConstants.QUESTION_REVIEW,
                        items: ctrl.validQuestions
                    }
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsFilterResults', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsFilterResults').component('qbAssignmentsFilterResults', {
    templateUrl: 'app/minified/qb-assignments-filter-results/qb-assignments-filter-results.template.html',
    bindings: {
        assignments: "<",
        query: "<",
        filter: "&",
        assignmentFilter: "=",
        count: "<",
        sort: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$routeParams", "User", "Notification", "Notifier", "State", "Assignment", "QB_USER", "QB_ASSIGNMENT_KIND", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, $routeParams, userService, notificationService, notifier, stateService, assignmentService, userConstants, assignmentKind, assignmentConstants, assigneeStatus, notificationConstants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            ctrl.options = {
                multiSelect: true,
                autoSelect: true,
                boundaryLinks: false,
                decapitate: false,
                limitSelect: true,
                pageSelect: true
            };
            ctrl.constants = assignmentKind;

            ctrl.sortItems = [{
                value: 'customId',
                name: 'Assignment ID'
            }, {
                value: 'name',
                name: 'Title'
            }, {
                value: 'description',
                name: 'Description'
            }, {
                value: 'kind',
                name: 'Assignment Type'
            }, {
                value: 'status',
                name: 'Assignment Status'
            }, {
                value: 'lastModificationDate',
                name: 'Last Modified Date'
            }, {
                value: 'creationDate',
                name: 'Creation Date'
            }, {
                value: 'dueDate',
                name: 'Due Date'
            }, {
                value: 'assignees',
                name: 'Assignees'
            }];
            ctrl.logPagination(1, 25);
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query.page = page;
            ctrl.query.size = limit;
            ctrl.query.sort = ctrl.sort.order + ctrl.sort.sortByValue;
            ctrl.assignmentFilter.sortBy = [ctrl.query.sort];
            ctrl.filter();
        };
        ctrl.isCompleted = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.COMPLETE;else return false;
        };
        ctrl.isOpen = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.OPEN;else return false;
        };
        ctrl.isDraft = function (assignment) {
            if (assignment) return assignment.status === assignmentConstants.DRAFT;else return false;
        };

        ctrl.isSubmitted = function (assignment) {
            if (assignment.assignees) return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeStatus.SUBMITTED;
            }) ? true : false;else return false;
        };

        ctrl.getAssignmentStatus = function (assignment) {
            if (assignment) {
                if (ctrl.isSubmitted(assignment)) {
                    return {
                        status: "SUBMITTED",
                        date: ctrl.isSubmitted(assignment).updatedDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status === assignmentConstants.COMPLETE) {
                    return {
                        status: "COMPLETED",
                        date: assignment.completionDate,
                        cls: "completion-date"
                    };
                } else if (assignment.status == assignmentConstants.OPEN) {
                    return {
                        status: "DUE",
                        date: assignment.dueDate,
                        cls: "due-date"
                    };
                } else if (assignment.status === assignmentConstants.DRAFT) {
                    return {
                        status: "UNASSIGNED",
                        date: "",
                        cls: "due-date"
                    };
                }
            }
        };

        ctrl.getAssignments = function () {
            assignmentService.assignmentOwn(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.assignments = response.data.data;
                    ctrl.count = response.data.count;
                    ctrl.assignments.forEach(function (assignment) {
                        ctrl.getProgress(assignment);
                    });
                }
            });
        };
        ctrl.isKindReview = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVIEW;else return false;
        };
        ctrl.isKindQuestioncreate = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_CREATE;else return false;
        };
        ctrl.isKindQuestionedit = function (assignment) {
            if (assignment) return assignment.kind === assignmentKind.QUESTION_REVISION;else return false;
        };
        ctrl.getKindClass = function (assignment) {
            if (ctrl.isKindQuestionedit(assignment)) {
                return "assignment-edit";
            } else if (ctrl.isKindQuestioncreate(assignment)) {
                return "assignment-create";
            } else if (ctrl.isKindReview(assignment)) {
                return "assignment-review";
            }
        };
        ctrl.loadAssignment = function (assignment, event) {
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentCreateDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignment: assignment,
                        items: assignment.items
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            } else {
                var ob = {
                    templateUrl: 'app/minified/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignmentId: assignment.id,
                        assignment: assignment,
                        fullAssignment: {}
                    }
                };
                stateService.fetchHistory().push(ob);
                $mdDialog.show(ob);
            }
        };
        ctrl.getProgress = function (assignment) {
            assignment.items = assignment.items || [];
            assignment.assignees = assignment.assignees || [];
            if (userService.isAdmin() || userService.isEditor()) {
                assignment.todo = _.filter(assignment.assignees, function (assignee) {
                    return assignee.status === assigneeStatus.DRAFT;
                }).length;
                assignment.done = assignment.assignees.length - assignment.todo;
                assignment.total = assignment.assignees.length;
                //assignment.progress = ((assignment.assignees.length - assignment.todo) / (assignment.assignees.length)) * 100;
            } else {
                if (assignment.kind == assignmentKind.QUESTION_CREATE) {
                    var items = _.filter(assignment.items, function (item) {
                        return item.createdBy.id === userService.getLoggedInUser().id;
                    });
                    assignment.items.length = 0;
                    angular.merge(assignment.items, items);
                    assignment.done = items.length;
                    assignment.total = assignment.questionsNeededPerAuthor;
                    //assignment.progress = (items.length / (assignment.questionsNeededPerAuthor)) * 100;
                    //assignment.todo = assignment.questionsNeededPerAuthor - items.length;
                } else if (assignment.kind == assignmentKind.QUESTION_REVIEW) {
                    assignmentService.getAssignmentReviews(assignment.id).then(function (response) {
                        assignment.done = response.data.count;
                        assignment.total = assignment.items.length;
                        //assignment.todo = assignment.items.length - response.data.count;
                        //assignment.progress = (response.data.count / assignment.items.length) * 100;
                    });
                } else {
                    assignment.done = assignment.items.length;
                    assignment.total = assignment.items.length;
                }
            }
        };
        ctrl.openAssignmentLabel = function (assignment, open, beginReview, writeMCQ) {
            if ((assignment.kind === assignmentKind.QUESTION_CREATE || assignment.kind === assignmentKind.QUESTION_REVISION) && ctrl.hasAssignee(assignment)) {
                return writeMCQ;
            }
            if (assignment.kind === assignmentKind.QUESTION_REVIEW && ctrl.hasAssignee(assignment)) {
                return beginReview;
            } else {
                //case for admin/editor
                return open;
            }
        };
        ctrl.hasAssignee = function (assignment) {
            return _.find(assignment.assignees, function (a) {
                return a.id === userService.getLoggedInUser().id;
            }) ? true : false;
        };
        ctrl.getClass = function (assignment) {
            var status = ctrl.getAssignmentStatus(assignment);
            return ctrl.addColor(assignment) + " " + (status ? status.cls : "");
        };
        ctrl.addColor = function (assignment) {
            if (assignment) {
                var data = ctrl.getAssignmentStatus(assignment);
                if (data && data.status == "DUE") {
                    if (new Date(data.date) < ctrl.currentDate) return "due-date-expired";
                }
            }
            return "";
        };
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
        ctrl.sortBy = function () {
            ctrl.assignmentFilter.sortBy = [ctrl.sort.order + ctrl.sort.sortByValue];
            ctrl.filter();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionManageQuestions', ['qbQuestionRevisionDialog', 'qbQuestionHistoryDialog', 'qbViewSubmissionReviews', 'qbQuestionAddToQuestionBankDialog']);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

angular.module('qbQuestionManageQuestions').component('qbQuestionManageQuestions', {
    templateUrl: 'app/minified/qb-question-manage-questions/qb-question-manage-questions.template.html',
    bindings: {
        questions: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "Util", 'User', "Question", "State", "Review", "Comment", "Notifier", "QB_ASSIGNMENT_KIND", "QB_QUESTION", "QB_USER_ROLES", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, util, userService, questionService, stateService, reviewService, commentService, notifier, assignmentKindConstants, questionStatusConstants, userRolesConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            var _questionStatusConsta, _questionStatusConsta2, _questionStatusConsta3, _questionStatusConsta4, _angular$merge;

            var moreItems = {
                publish: {
                    item: 'Publish',
                    action: ctrl.publish
                },
                reject: {
                    item: 'Reject',
                    action: ctrl.reject
                },
                reviewAssignment: {
                    item: 'Add to Review Assignment',
                    action: ctrl.addToReviewAssignment
                },
                editAssignment: {
                    item: 'Add to Edit Assignment',
                    action: createRevisionAssignment
                },
                unpublish: {
                    item: 'Unpublish',
                    action: ctrl.unPublish
                },
                retire: {
                    item: 'Retire',
                    action: ctrl.retire
                },
                questionBank: {
                    item: 'Add to Question Bank',
                    action: ctrl.addToQuestionBank
                }
            };
            ctrl.menuItems = moreItems;

            ctrl.menuItems = [];
            ctrl.previleges = angular.merge(getMenuArrayTemplate(), (_angular$merge = {}, _defineProperty(_angular$merge, questionStatusConstants.EDITORIAL, (_questionStatusConsta = {}, _defineProperty(_questionStatusConsta, userRolesConstants.EDITOR, [moreItems.publish, moreItems.reject, moreItems.reviewAssignment, moreItems.editAssignment]), _defineProperty(_questionStatusConsta, userRolesConstants.ADMIN, [moreItems.publish, moreItems.reject, moreItems.reviewAssignment, moreItems.editAssignment]), _questionStatusConsta)), _defineProperty(_angular$merge, questionStatusConstants.APPROVED, (_questionStatusConsta2 = {}, _defineProperty(_questionStatusConsta2, userRolesConstants.EDITOR, [moreItems.unpublish, moreItems.retire, moreItems.questionBank]), _defineProperty(_questionStatusConsta2, userRolesConstants.ADMIN, [moreItems.unpublish, moreItems.retire, moreItems.questionBank]), _questionStatusConsta2)), _defineProperty(_angular$merge, questionStatusConstants.REJECTED, (_questionStatusConsta3 = {}, _defineProperty(_questionStatusConsta3, userRolesConstants.EDITOR, [moreItems.unpublish]), _defineProperty(_questionStatusConsta3, userRolesConstants.ADMIN, [moreItems.unpublish]), _questionStatusConsta3)), _defineProperty(_angular$merge, questionStatusConstants.ARCHIVED, (_questionStatusConsta4 = {}, _defineProperty(_questionStatusConsta4, userRolesConstants.EDITOR, [moreItems.publish]), _defineProperty(_questionStatusConsta4, userRolesConstants.ADMIN, [moreItems.publish]), _questionStatusConsta4)), _angular$merge));
        };

        ctrl.populateMenu = function ($mdOpenMenu, event) {
            if (ctrl.questions.length > 0) {
                ctrl.menuItems = [];
                ctrl.questions.forEach(function (question) {
                    var items = [];
                    if (userService.isAuthor()) items.push(ctrl.previleges[question.status][userRolesConstants.AUTHOR]);
                    if (userService.isReviewer()) items.push(ctrl.previleges[question.status][userRolesConstants.REVIEWER]);
                    if (userService.isEditor()) items.push(ctrl.previleges[question.status][userRolesConstants.EDITOR]);
                    if (userService.isAdmin()) items.push(ctrl.previleges[question.status][userRolesConstants.ADMIN]);
                    ctrl.menuItems.push(_.uniq(_.flatten(_.map(items, _.values)), function (item, key, a) {
                        return item.item;
                    }));
                });
                ctrl.menuItems = _.intersection.apply(_, ctrl.menuItems);
                if (ctrl.menuItems.length > 0) $mdOpenMenu(event);else util.mdAlert(event, "No actions available for selected question(s).");
            } else {
                util.mdAlert(event, "Please select question(s).");
            }
        };

        ctrl.viewReviews = function (ev, item) {
            reviewService.getReviewsFor([ctrl.question.id]).then(function (response) {
                if (response.data.status === "success") {
                    var reviews = [];
                    _.chain(response.data.data).groupBy(function (a) {
                        return a.createdBy.id;
                    }).forEach(function (a) {
                        reviews.push(_.last(a));
                    });
                    reviews.forEach(function (review) {
                        if (review.questionnaire) {
                            review.questionnaire.forEach(function (a) {
                                a.response = a.response && a.response == "true" ? 'YES' : 'NO';
                            });
                        }
                    });
                    $mdDialog.cancel();
                    var ob = {
                        templateUrl: 'app/minified/qb-view-submission-reviews/qb-view-submission-reviews.template.html',
                        targetEvent: ev,
                        controller: 'qbViewSubmissionReviews',
                        controllerAs: '$ctrl',
                        bindToController: true,
                        preserveScope: true,
                        skipHide: true,
                        locals: {
                            readOnly: true,
                            reviews: reviews,
                            question: ctrl.question
                        }
                    };
                    stateService.fetchHistory().push(ob);
                    $mdDialog.show(ob);
                }
            });
        };

        ctrl.publish = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.APPROVED);
        };
        ctrl.reject = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.REJECTED);
        };
        ctrl.unPublish = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.EDITORIAL);
        };
        ctrl.retire = function (ev, item) {
            ctrl.openReview(ev, item, questionStatusConstants.ARCHIVED);
        };
        ctrl.openReview = function (ev, item, status) {
            var questions = angular.copy(ctrl.questions);
            questions.forEach(function (question) {
                question.status = status;
            });
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-question-review-view/qb-question-review-view.template.html',
                targetEvent: ev,
                controller: 'questionReviewViewController',
                controllerAs: '$ctrl',
                bindToController: true,
                preserveScope: true,
                skipHide: true,
                locals: {
                    questions: questions,
                    status: item
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.addToReviewAssignment = function (event, item) {
            $mdDialog.cancel();
            var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignment: {
                        assignees: [],
                        kind: assignmentKindConstants.QUESTION_REVIEW,
                        items: ctrl.questions
                    }
                },
                skipHide: true
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
        ctrl.menuItemClick = function (option, event) {
            option.action(event, option.item);
        };
        ctrl.cancel = function () {
            $mdDialog.cancel();
        };
        ctrl.addToQuestionBank = function (event) {
            $mdDialog.show({
                templateUrl: 'app/minified/qb-question-add-to-question-bank-dialog/qb-question-add-to-question-bank-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionAddToQuestionBankDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    questions: ctrl.questions
                }
            });
        };
        var getMenuArrayTemplate = function getMenuArrayTemplate() {
            var previlege = {};
            angular.forEach(questionStatusConstants, function (status, index) {
                var roles = {};
                angular.forEach(userRolesConstants, function (role, index) {
                    roles[role] = [];
                });
                previlege[status] = roles;
            });
            return previlege;
        };
        var createRevisionAssignment = function createRevisionAssignment(event) {
            var ob = {
                templateUrl: 'app/minified/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: ctrl.questions,
                    assignment: {
                        assignees: [],
                        items: ctrl.questions,
                        kind: assignmentKindConstants.QUESTION_REVISION
                    }
                }
            };
            stateService.fetchHistory().push(ob);
            $mdDialog.show(ob);
        };
    }]
});
"use strict";

var QUESTION_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/questions/";
var USER_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/users/";
var ROLE_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/roles/";
var TAG_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/tags/";
var VERSION_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/versions/";
var MEDIA_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/medias/";
var ASSIGNMENT_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/assignments/";
var ASSIGNMENT_ORCHESTRATOR_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/orchestrator-assignments/";
var COMMENT_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/comments/";
var REVIEW_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/reviews/";
var BANK_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/orchestrator-questionbanks/";
var COMMENT_ORCHESTRATOR_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/orchestrator-comments/";
var LOGGING_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/orchestrator-logentries/";
var MEDIA_ORCHESTRATOR_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/orchestrator-medias/";
var QUESTION_ORCHESTRATOR_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/orchestrator-questions/";
var CONFIGURATION_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/configurations/";
var EXPORT_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/exports/";
var NOTIFICATION_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/notifications/";
var REPORT_URL = "http://questionbank-qc.astutetech.com:8081/api/v1.0/reports/";
var SSO_SESSION_CHECK = "https://asco.oktapreview.com/api/v1/sessions/me";
var SSO_LOGIN = "https://asco-sso-dev.azurewebsites.net/login";
var SSO_API = "https://ascowsdev.azure-api.net/sso/session/";