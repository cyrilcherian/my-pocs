'use strict';

// Define the `QuestionBank app` module

angular.module('qbankApp', ['ngAnimate', 'ngRoute', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'ngMessages', 'ui.tinymce', 'truncate', 'angular-md5', 'jkAngularCarousel', 'core', 'qbQuestion', 'qbBanks', 'qbUserDirectory', 'qbUserProfile', 'qbTopics', 'qbTopicSections', 'qbQuestionImport', 'qbQuestionReview', 'qbLogin', 'qbLogout', 'qbResetPassword', 'qbAssignmentSubmissions', 'qbAssignmentReviewmine', 'qbQuestionPreview', 'qbNotificationBar', 'qbAssignmentCreate', 'qbReports']);
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
    //        $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/questions', {
        template: '<qb-question></qb-question>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/users', {
        template: '<qb-user-directory></qb-user-directory>',
        requireAuth: true,
        allowedRoles: ["Admin"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/reports', {
        template: '<qb-reports></qb-reports>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/users/:tab/:id', {
        template: '<qb-user-profile></qb-user-profile>',
        requireAuth: true,
        allowedRoles: ["Admin"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question-import', {
        template: '<qb-question-import></qb-question-import>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question-edit/:id?', {
        template: '<qb-question-edit></qb-question-edit>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question-create/assignments/:assignmentId', {
        template: '<qb-question-create></qb-question-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question/create', {
        template: '<qb-question-create></qb-question-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question-review/:id?', {
        template: '<qb-question-review></qb-question-review>',
        requireAuth: true,
        allowedRoles: ["Admin", "Reviewer", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question-history/:id', {
        template: '<qb-question-history></qb-question-history>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question-revision/:id', {
        template: '<qb-question-revision></qb-question-revision>',
        requireAuth: true,
        allowedRoles: ["Admin", "Author", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/question-revision/question-revision-view/:versionId', {
        template: '<qb-question-revision-view></qb-question-revision-view>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/topics', {
        template: '<qb-topics></qb-topics>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/topic/:section/:id', {
        template: '<qb-topic-sections></qb-topic-sections>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/banks/', {
        template: '<qb-banks></qb-banks>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/banks/create/', {
        template: '<qb-bank-create></qb-bank-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/banks/details/:id', {
        template: '<qb-bank-edit></qb-bank-edit>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/assignments/create/:id?', {
        template: '<qb-assignment-create></qb-assignment-create>',
        requireAuth: true,
        allowedRoles: ["Admin", "Editor"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/assignments/', {
        template: '<qb-assignments></qb-assignments>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/assignment/:id/:tab/', {
        template: '<qb-assignment-details></qb-assignment-details>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/login', {
        template: '<qb-login></qb-login>',
        requireAuth: false,
        resolve: {
            m: function m(Configuration) {
                return Configuration.getConfigInfo();
            }
        }
    }).when('/reset-password/:aid', {
        template: '<qb-reset-password></qb-reset-password>',
        requireAuth: false,
        resolve: {
            m: function m(Configuration) {
                return Configuration.getConfigInfo();
            }
        }
    }).when('/change-password/', {
        template: '<qb-change-password></qb-change-password>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/forgot-password/', {
        template: '<qb-forgot-password></qb-forgot-password>',
        requireAuth: false,
        resolve: {
            m: function m(Configuration) {
                return Configuration.getConfigInfo();
            }
        }
    }).when('/assignment-history/:id', {
        template: '<qb-assignment-history></qb-assignment-history>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/assignment-reviewmine', {
        template: '<qb-assignment-reviewmine></qb-assignment-reviewmine>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/users-create/', {
        template: '<qb-user-profile-create></qb-user-profile-create>',
        requireAuth: true,
        allowedRoles: ["Admin"],
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/users-edit/:id', {
        template: '<qb-user-profile-create></qb-user-profile-create>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/:ref/question/preview/:id', {
        template: '<qb-question-preview></qb-question-preview>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).when('/user-guide', {
        template: '<qb-user-guide></qb-user-guide>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            }
        }
    }).when('/assignments/revision/create/:id?', {
        template: '<qb-assignment-revision-create></qb-assignment-revision-create>',
        requireAuth: true,
        resolve: {
            m: function m(User) {
                return User.getLoggedInUserInfo();
            },
            n: function n(Notification) {
                return Notification.getNotificationsInfo();
            }
        }
    }).otherwise('/assignments');
}]).factory('httpRequestInterceptor', ["$q", "$rootScope", "$location", "$injector", function ($q, $rootScope, $location, $injector) {
    return {
        request: function request(config) {
            var userService = $injector.get("User");
            if (userService.getLoggedInUser()) {
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
    "ARCHIVED": "Archived"
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

angular.module('core.assignment-orchestrator').factory('Assignment', ['$http', '$resource', function ($http, $resource) {
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
        createdByOthers: createdByOthers
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

    function allUserList(params) {
        return $http({
            method: "POST",
            url: ASSIGNMENT_ORCHESTRATOR_URL + "user-filter",
            params: params,
            data: {
                "roles": []
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
        searchQuestionByCustomId: searchQuestionByCustomId
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
}]);
'use strict';

angular.module('core.util', ['ngResource']);
'use strict';

angular.module('core.util').factory('Util', ['$http', '$resource', '$window', '$routeParams', '$location', function ($http, $resource, $window, $routeParams, $location) {
    return {
        back: back,
        tinyMceOptions: getTinyMceOptions(),
        pagination: getPaginationOptions()
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
            file_picker_types: 'image',
            browser_spellcheck: true,
            menubar: false,
            toolbar: 'undo redo | bold italic',
            plugins: "autoresize spellchecker paste",
            automatic_uploads: false,
            image_dimensions: false,
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
            url: REPORT_URL + "export",
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
        searchByCustomId: searchByCustomId
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
    function getBank(id) {
        return $http.get(BANK_URL + id);
    }
    function exportBank(id) {
        return $http({
            method: "GET",
            url: BANK_URL + "getxml/" + id
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

angular.module('qbQuestionTableInprogress', ['md.data.table', 'qbQuestionImport', 'qbQuestionCreate', 'qbQuestionEdit', 'qbTableSearchBar', 'qbQuestionEditDialog', 'qbAssignmentCreateDialog', 'qbQuestionFilterDialog']);
'use strict';

angular.module('qbQuestionTableInprogress').component('qbQuestionTableInprogress', {
    templateUrl: 'app/js/qb-question-table-inprogress/qb-question-table-inprogress.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "$routeParams", "$filter", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $location, $route, $routeParams, $filter, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.STEM_MIN_LENGTH = 10;
            ctrl.topics = [];
            ctrl.levels = [];
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
                make: ctrl.makeStem,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Question",
                key: "question",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Created Date",
                key: "creationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Modified Date",
                key: "lastModificationDate",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Topics",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Level",
                key: "",
                allow: ["Admin", "Author", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }, {
                field: "Status",
                key: "status",
                allow: ["Admin", "Editor"],
                selected: true,
                make: ctrl.makeDefault,
                makeClass: ctrl.makeDefaultClass
            }];
            ctrl.query = {
                sort: stateService.getStateFor("inProgress").sort || '-lastModificationDate',
                limit: stateService.getStateFor("inProgress").limit || 25,
                page: stateService.getStateFor("inProgress").page || 1
            };

            ctrl.filter = {
                stem: stateService.getStateFor("inProgress").stem || "",
                statuses: [questionConstants.DRAFT, questionConstants.SUBMITTED, questionConstants.EDITORIAL, questionConstants.INREVIEW, questionConstants.DONE]
            };

            ctrl.categories = [{
                name: 'Single Response',
                category: 'singleResponse',
                selected: true
            }, {
                name: 'Multiple Response',
                category: 'multipleResponse',
                selected: true
            }, {
                name: 'Short Answer',
                category: 'shortText',
                selected: true
            }, {
                name: 'Essay',
                category: 'longText',
                selected: true
            }];

            tagService.getClass().then(function (response) {
                var topic_id = _.find(response.data.data, {
                    name: "Topic"
                }).id;
                var level_id = _.find(response.data.data, {
                    name: "Level"
                }).id;
                tagService.getTaxonomies(topic_id).then(function (res) {
                    res.data.data.forEach(function (d) {
                        d.selected = true;
                        ctrl.topics.push(d);
                    });
                    tagService.getTaxonomies(level_id).then(function (res) {
                        res.data.data.forEach(function (d) {
                            d.selected = true;
                            ctrl.levels.push(d);
                        });
                    });
                });
            });
            ctrl.searchParam = stateService.getStateFor("inProgress").stem || "";
            var filter = _.debounce(ctrl.doFilter, 500);
            $scope.$watch(function () {
                return ctrl.searchParam;
            }, function (newValue, oldValue, scope) {
                if (newValue != oldValue) filter();
            });
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            notifier.subscribe($scope, 'load-questions-inprogress', function (event, data) {
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            });
            ctrl.canSeeEditAssignment = userService.isAdmin() || userService.isEditor();
        };
        ctrl.makeCustomID = function (question) {
            return $filter("numberFixedLen")(question.customId, 5);
        };
        ctrl.makeDefault = function (data, field) {
            return data[field.key];
        };
        ctrl.allowField = function (field) {};
        ctrl.makeDefaultClass = function (data, field) {
            return "";
        };
        ctrl.makeStem = function (data, field) {
            return $filter("htmlFilter")(data.stem);
        };
        ctrl.doFilter = function () {
            ctrl.filter.stem = ctrl.searchParam;
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
        };
        ctrl.getFilter = function () {
            ctrl.selected = [];
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-filter-dialog/qb-question-filter-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionFilterDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    data: ctrl.filter,
                    fields: ctrl.fields,
                    selected: ctrl.selected
                }
            }).then(function () {
                console.log("selected fields", ctrl.selected);
            });
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

        ctrl.logPagination = function (page, limit) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.query.sort = '-lastModificationDate';
            stateService.fetchState().inProgress = ctrl.query;
            stateService.fetchState().inProgress.stem = ctrl.filter.stem;
            if (userService.isAdmin() || userService.isEditor()) {
                questionService.questionList(ctrl.query, ctrl.filter).then(function (response) {
                    ctrl.questionData = response.data.data;
                    ctrl.total = response.data.count;
                    //document.getElementById('stem').innerHTML.replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*</g, '').split(/<[^>]*>/g).join(" ");
                });
            } else {
                questionService.questionOwnList(ctrl.query, ctrl.filter).then(function (response) {
                    ctrl.questionData = response.data.data;
                    ctrl.total = response.data.count;
                });
            }
        };

        ctrl.questionTasks = [{
            toDo: 'Add to Assignment'
        }, {
            toDo: 'Admin Add Topic'
        }, {
            toDo: 'Admin Retire'
        }, {
            toDo: 'Admin Unpublish'
        }, {
            toDo: 'Admin Transfer Owner'
        }];

        ctrl.importQuestions = function (event, task) {
            if (task == "import") {
                $location.url('/question-import');
            }
            if (task == "create") {
                $location.url('/question-create');
            }
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
            if (!ctrl.canSeeEditAssignment) {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionEditDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        question: question,
                        dialog: {
                            parent: ctrl,
                            referrer: "edit-question"
                        }
                    }
                });
            } else {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionPreviewDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        question: {
                            id: question.id
                        },
                        state: "Inprogress",
                        readOnly: true
                    }
                });
            };
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
        ctrl.createRevisionAssignment = function (event) {
            if (ctrl.selected.length > 0) $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: ctrl.selected,
                    assignment: {
                        assignees: [],
                        items: ctrl.selected,
                        kind: assignmentKindConstants.QUESTION_REVISION
                    }
                }
            }).then(function () {}).finally(function () {});else $mdDialog.show($mdDialog.alert().title("Please select question(s) to revise").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {});
        };
    }]
});
'use strict';

angular.module('qbQuestionTableInpublished', ['md.data.table', 'qbQuestionImport', 'qbQuestionCreate', 'qbQuestionEdit', 'qbTableSearchBar', 'qbQuestionEditDialog', 'qbQuestionPreviewDialog']);
'use strict';

angular.module('qbQuestionTableInpublished').component('qbQuestionTableInpublished', {
    templateUrl: 'app/js/qb-question-table-inpublished/qb-question-table-inpublished.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "$routeParams", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $location, $route, $routeParams, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants) {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.query = {
                sort: stateService.getStateFor("inPublished").sort || '-lastModificationDate',
                limit: stateService.getStateFor("inPublished").limit || 25,
                page: stateService.getStateFor("inPublished").page || 1
            };

            ctrl.filter = {
                stem: stateService.getStateFor("inPublished").stem || "",
                statuses: [questionConstants.APPROVED]
            };
            ctrl.STEM_MIN_LENGTH = 10;
            ctrl.topics = [];
            ctrl.levels = [];
            ctrl.categories = [{
                name: 'Single Response',
                category: 'singleResponse',
                selected: true
            }, {
                name: 'Multiple Response',
                category: 'multipleResponse',
                selected: true
            }, {
                name: 'Short Answer',
                category: 'shortText',
                selected: true
            }, {
                name: 'Essay',
                category: 'longText',
                selected: true
            }];

            tagService.getClass().then(function (response) {
                var topic_id = _.find(response.data.data, {
                    name: "Topic"
                }).id;
                var level_id = _.find(response.data.data, {
                    name: "Level"
                }).id;
                tagService.getTaxonomies(topic_id).then(function (res) {
                    res.data.data.forEach(function (d) {
                        d.selected = true;
                        ctrl.topics.push(d);
                    });
                    tagService.getTaxonomies(level_id).then(function (res) {
                        res.data.data.forEach(function (d) {
                            d.selected = true;
                            ctrl.levels.push(d);
                        });
                    });
                });
            });
            ctrl.searchParam = stateService.getStateFor("inPublished").stem || "";
            var filter = _.debounce(ctrl.doFilter, 500);
            $scope.$watch(function () {
                return ctrl.searchParam;
            }, function (newValue, oldValue, scope) {
                if (newValue != oldValue) filter();
            });
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            notifier.subscribe($scope, 'load-questions-published', function (event, data) {
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            });
            ctrl.canSeeEditAssignment = userService.isAdmin() || userService.isEditor();
        };

        ctrl.doFilter = function () {
            ctrl.filter.stem = ctrl.searchParam;
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

        ctrl.logPagination = function (page, limit) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.query.sort = '-lastModificationDate';
            stateService.fetchState().inPublished = ctrl.query;
            stateService.fetchState().inPublished.stem = ctrl.filter.stem;
            if (userService.isAdmin() || userService.isEditor()) {
                questionService.questionList(ctrl.query, ctrl.filter).then(function (response) {
                    ctrl.questionData = response.data.data;
                    ctrl.total = response.data.count;
                });
            } else {
                questionService.questionOwnList(ctrl.query, ctrl.filter).then(function (response) {
                    ctrl.questionData = response.data.data;
                    ctrl.total = response.data.count;
                });
            }
        };

        ctrl.questionTasks = [{
            toDo: 'Add to Assignment'
        }, {
            toDo: 'Admin Add Topic'
        }, {
            toDo: 'Admin Retire'
        }, {
            toDo: 'Admin Unpublish'
        }, {
            toDo: 'Admin Transfer Owner'
        }];

        ctrl.filterQuestion = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-filter-questions/qb-question-filter-questions.template.html',
                targetEvent: ev,
                locals: {
                    data: ctrl.query,
                    topics: ctrl.topics,
                    levels: ctrl.levels,
                    categories: ctrl.categories,
                    filter: ctrl.filter
                },
                controller: 'filterQuestionController',
                controllerAs: 'filterQuestionCtrl',
                bindToController: true
            }).then(function () {
                ctrl.filter.topics = _.filter(me.topics, function (d) {
                    return !d.selected;
                }).map(function (d) {
                    return d.name;
                });
                ctrl.filter.levels = _.filter(me.levels, function (d) {
                    return !d.selected;
                }).map(function (d) {
                    return d.name;
                });
                ctrl.filter.categories = _.filter(ctrl.categories, function (d) {
                    return !d.selected;
                }).map(function (d) {
                    return d.category;
                });
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
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
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: {
                        id: question.id
                    },
                    state: "Published",
                    readOnly: true
                }
            });
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
        ctrl.createRevisionAssignment = function (event) {
            if (ctrl.selected.length > 0) $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: ctrl.selected,
                    assignment: {
                        assignees: [],
                        items: ctrl.selected,
                        kind: assignmentKindConstants.QUESTION_REVISION
                    }
                }
            }).then(function () {}).finally(function () {});else $mdDialog.show($mdDialog.alert().title("Please select question(s) to revise").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {});
        };
    }]
});
'use strict';

angular.module('qbQuestionTableInretired', ['md.data.table', 'qbQuestionImport', 'qbQuestionCreate', 'qbQuestionEdit', 'qbTableSearchBar', 'qbQuestionEditDialog']);
'use strict';

angular.module('qbQuestionTableInretired').component('qbQuestionTableInretired', {
    templateUrl: 'app/js/qb-question-table-inretired/qb-question-table-inretired.template.html',
    bindings: {
        type: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$route", "$routeParams", "Question", "Tag", "User", "Notifier", "State", "QB_QUESTION", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $location, $route, $routeParams, questionService, tagService, userService, notifier, stateService, questionConstants, assignmentKindConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.query = {
                sort: stateService.getStateFor("inRetired").sort || '-lastModificationDate',
                limit: stateService.getStateFor("inRetired").limit || 25,
                page: stateService.getStateFor("inRetired").page || 1
            };

            ctrl.filter = {
                stem: stateService.getStateFor("inRetired").stem || "",
                statuses: [questionConstants.ARCHIVED]
            };
            ctrl.STEM_MIN_LENGTH = 10;
            ctrl.topics = [];
            ctrl.levels = [];
            ctrl.categories = [{
                name: 'Single Response',
                category: 'singleResponse',
                selected: true
            }, {
                name: 'Multiple Response',
                category: 'multipleResponse',
                selected: true
            }, {
                name: 'Short Answer',
                category: 'shortText',
                selected: true
            }, {
                name: 'Essay',
                category: 'longText',
                selected: true
            }];

            tagService.getClass().then(function (response) {
                var topic_id = _.find(response.data.data, {
                    name: "Topic"
                }).id;
                var level_id = _.find(response.data.data, {
                    name: "Level"
                }).id;
                tagService.getTaxonomies(topic_id).then(function (res) {
                    res.data.data.forEach(function (d) {
                        d.selected = true;
                        ctrl.topics.push(d);
                    });
                    tagService.getTaxonomies(level_id).then(function (res) {
                        res.data.data.forEach(function (d) {
                            d.selected = true;
                            ctrl.levels.push(d);
                        });
                    });
                });
            });
            ctrl.searchParam = stateService.getStateFor("inRetired").stem || "";
            var filter = _.debounce(ctrl.doFilter, 500);
            $scope.$watch(function () {
                return ctrl.searchParam;
            }, function (newValue, oldValue, scope) {
                if (newValue != oldValue) filter();
            });
            ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            notifier.subscribe($scope, 'load-questions-retired', function (event, data) {
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
            });
            ctrl.canSeeEditAssignment = userService.isAdmin() || userService.isEditor();
        };

        ctrl.doFilter = function () {
            ctrl.filter.stem = ctrl.searchParam;
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

        ctrl.logPagination = function (page, limit) {
            ctrl.query.limit = limit;
            ctrl.query.page = page;
            ctrl.query.sort = '-lastModificationDate';
            stateService.fetchState().inRetired = ctrl.query;
            stateService.fetchState().inRetired.stem = ctrl.filter.stem;
            if (userService.isAdmin() || userService.isEditor()) {
                questionService.questionList(ctrl.query, ctrl.filter).then(function (response) {
                    ctrl.questionData = response.data.data;
                    ctrl.total = response.data.count;
                });
            } else {
                questionService.questionOwnList(ctrl.query, ctrl.filter).then(function (response) {
                    ctrl.questionData = response.data.data;
                    ctrl.total = response.data.count;
                });
            }
        };

        ctrl.questionTasks = [{
            toDo: 'Add to Assignment'
        }, {
            toDo: 'Admin Add Topic'
        }, {
            toDo: 'Admin Retire'
        }, {
            toDo: 'Admin Unpublish'
        }, {
            toDo: 'Admin Transfer Owner'
        }];

        ctrl.filterQuestion = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-filter-questions/qb-question-filter-questions.template.html',
                targetEvent: ev,
                locals: {
                    data: ctrl.query,
                    topics: ctrl.topics,
                    levels: ctrl.levels,
                    categories: ctrl.categories,
                    filter: ctrl.filter
                },
                controller: 'filterQuestionController',
                controllerAs: 'filterQuestionCtrl',
                bindToController: true
            }).then(function () {
                ctrl.filter.topics = _.filter(ctrl.topics, function (d) {
                    return !d.selected;
                }).map(function (d) {
                    return d.name;
                });
                ctrl.filter.levels = _.filter(ctrl.levels, function (d) {
                    return !d.selected;
                }).map(function (d) {
                    return d.name;
                });
                ctrl.filter.categories = _.filter(ctrl.categories, function (d) {
                    return !d.selected;
                }).map(function (d) {
                    return d.category;
                });
                ctrl.logPagination(ctrl.query.page, ctrl.query.limit);
                //do pagination
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
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionEditDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question,
                    dialog: {
                        parent: ctrl,
                        referrer: "edit-question"
                    }
                }
            });
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
        ctrl.createRevisionAssignment = function (event) {
            if (ctrl.selected.length > 0) $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: ctrl.selected,
                    assignment: {
                        assignees: [],
                        items: ctrl.selected,
                        kind: assignmentKindConstants.QUESTION_REVISION
                    }
                }
            }).then(function () {}).finally(function () {});else $mdDialog.show($mdDialog.alert().title("Please select question(s) to revise").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {});
        };
    }]
});
'use strict';

// Define the `qbQuestion` module

angular.module('qbQuestion', ['qbQuestionTab']);
'use strict';

angular.module('qbQuestion').component('qbQuestion', {
    templateUrl: 'app/js/qb-question/qb-question.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", function ($mdDialog, $scope, $element, $timeout) {
        var ctrl = this;
    }]
});
'use strict';

// Define the `qbQuestionTab` module

angular.module('qbQuestionTab', ['qbQuestionTableInprogress', 'qbQuestionTableInpublished', 'qbQuestionTableInretired']);
'use strict';

angular.module('qbQuestionTab').component('qbQuestionTab', {
    templateUrl: 'app/js/qb-question-tab/qb-question-tab.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "Notifier", "State", function ($mdDialog, $scope, $element, $timeout, notifier, stateService) {
        var ctrl = this;
        ctrl.selected = _.isNumber(stateService.getStateFor("questionTab").index) ? stateService.getStateFor("questionTab").index : 0;

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
    }]
});
'use strict';

// Define the  module

angular.module('qbUserDirectory', ['qbUserActiveTable', 'qbUserInactiveTable', 'qbSidenav']);
'use strict';

angular.module('qbUserDirectory').component('qbUserDirectory', {
    templateUrl: 'app/js/qb-user-directory/qb-user-directory.template.html',
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
    templateUrl: 'app/js/qb-user-active-table/qb-user-active-table.template.html',
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
    templateUrl: 'app/js/qb-user-inactive-table/qb-user-inactive-table.template.html',
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

angular.module('qbUsersMenu', ['qbUserDirectoryFilterUser', 'qbUserProfileCreate']);
'use strict';

angular.module('qbUsersMenu').component('qbUsersMenu', {
    templateUrl: 'app/js/qb-user-directory-menu/qb-user-directory-menu.template.html',
    bindings: {
        title: '@'
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "Role", "User", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, roleService, userService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.levels = [{
                id: "0001",
                name: "Very Easy",
                selected: false
            }, {
                id: "0001",
                name: "Easy",
                selected: false
            }, {
                id: "0001",
                name: "Average",
                selected: false
            }, {
                id: "0001",
                name: "Difficult",
                selected: false
            }, {
                id: "0001",
                name: "Very Difficult",
                selected: false
            }];
            ctrl.topics = [{
                id: "T0001",
                name: "Hematologic Malignancies",
                selected: false
            }, {
                id: "T0001",
                name: "Acute myeloid leukemia: Epidemiology",
                selected: false
            }, {
                id: "T0001",
                name: "Acute myeloid leukemia: Diagnosis",
                selected: false
            }, {
                id: "T0001",
                name: "Myelodyplasia: Epidemiology",
                selected: false
            }, {
                id: "T0001",
                name: "Chronic Myeloid Leukemia: Epidemiology",
                selected: false
            }, {
                id: "T0001",
                name: "Myeloproliferative neoplasms: Epidemiology",
                selected: false
            }, {
                id: "T0001",
                name: "Hematologic Malignancies",
                selected: false
            }, {
                id: "T0001",
                description: "Acute myeloid leukemia: Epidemiology",
                selected: false
            }, {
                id: "T0001",
                name: "Acute myeloid leukemia: Diagnosis",
                selected: false
            }, {
                id: "T0001",
                description: "Myelodyplasia: Epidemiology",
                selected: false
            }, {
                id: "T0001",
                name: "Chronic Myeloid Leukemia: Epidemiology",
                selected: false
            }, {
                id: "T0001",
                name: "Myeloproliferative neoplasms: Epidemiology",
                selected: false
            }];
            ctrl.types = [{
                id: "0001",
                name: "Multiple Choice",
                selected: false
            }, {
                id: "0001",
                name: "Multiple Response",
                selected: false
            }, {
                id: "0001",
                name: "Short Answer",
                selected: false
            }, {
                id: "0001",
                name: "Essay",
                selected: false
            }, {
                id: "0001",
                name: "Linear Scale",
                selected: false
            }];
            ctrl.keywords = [];
        };
        ctrl.openFilterDialog = function (event) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-user-directory-filter-user/qb-user-directory-filter-user.template.html',
                targetEvent: event,
                controller: 'userDirectoryFilterUserController',
                controllerAs: 'userDirectoryFilterUserCtrl',
                bindToController: true,
                locals: {
                    levels: ctrl.levels,
                    topics: ctrl.topics,
                    types: ctrl.types,
                    keywords: ctrl.keywords
                }
            });
        };
        ctrl.createUser = function (event) {
            $location.url('/users-create/');
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbUserDirectoryFilterUser', ['qbTopicList', 'qbTypeList', 'qbLevelList']);
'use strict';

angular.module('qbUserDirectoryFilterUser').controller('userDirectoryFilterUserController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.filter = function () {
        ctrl.keywords = ctrl.keywordString.split(",");
        $mdDialog.cancel();
    };

    ctrl.close = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbUserProfile', ['qbUserProfileDetails', 'material.components.expansionPanels']);
'use strict';

angular.module('qbUserProfile').component('qbUserProfile', {
    templateUrl: 'app/js/qb-user-profile/qb-user-profile.template.html',
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
    templateUrl: 'app/js/qb-user-profile-details/qb-user-profile-details.template.html',
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
    templateUrl: 'app/js/qb-question-import/qb-question-import.template.html',
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
    templateUrl: 'app/js/qb-question-create/qb-question-create.template.html',
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
                templateUrl: 'app/js/qb-question-information/qb-question-information.template.html',
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
                    templateUrl: 'app/js/qb-question-add-image/qb-question-add-image.template.html',
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
                templateUrl: 'app/js/qb-question-add-video/qb-question-add-video.template.html',
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
            ctrl.question.status = questionConstants.DRAFT;
            $timeout(function () {
                ctrl.save();
            }, 1);
        };
        ctrl.saveAsFinal = function (event) {
            ctrl.validation = ctrl.checkInvalidFinal(ctrl.question);
            if (ctrl.validation.length > 0) {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-validation-dialog/qb-validation-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbValidationDialog',
                    controllerAs: '$ctrl',
                    bindToController: true,
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
    templateUrl: 'app/js/qb-question-details/qb-question-details.template.html',
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
                var mainSection = ctrl.data.sections.find(function (s) {
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
    templateUrl: 'app/js/qb-question-tag/qb-question-tag.template.html',
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
                templateUrl: 'app/js/qb-criteria/qb-criteria.template.html',
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
    templateUrl: 'app/js/qb-question-references/qb-question-references.template.html',
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

// Define the  module

angular.module('qbQuestionReview', ['ngMdIcons', 'qbQuestionReviewView', 'qbSidenavButton', 'qbAddReviewComment']);
'use strict';

angular.module('qbQuestionReview').component('qbQuestionReview', {
    templateUrl: 'app/js/qb-question-review/qb-question-review.template.html',
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$routeParams", "$location", "Util", "Question", "Review", "Comment", "User", "QB_QUESTION_TYPE", function ($mdDialog, $mdToast, $scope, $element, $timeout, $routeParams, $location, util, questionService, reviewService, commentService, userService, questionTypeConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.goto = $routeParams.goto;
            questionService.questionGet($routeParams.id).then(function (response) {
                ctrl.question = response.data.data;
                getCategory();
                splitSections();
                var itemIds = [$routeParams.id];
                reviewService.getMyReviews(itemIds).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        var review = _.last(response.data.data);
                        if (review) {
                            ctrl.question.approval = review.status;
                            ctrl.question.comment = review.comment;
                        }
                    }
                });
            });
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isEditor = userService.isEditor();
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
        ctrl.openReview = function (ev, question) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-review-view/qb-question-review-view.template.html',
                targetEvent: ev,
                controller: 'questionReviewViewController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: question
                }
            }).then(function () {
                ctrl.review = {
                    status: question.approval,
                    ownerId: question.id,
                    category: 'Question',
                    comment: question.comment
                };
                reviewService.addReview(ctrl.review).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        if (ctrl.question.approval === "Approved" && (userService.isAdmin() || userService.isEditor())) {
                            questionService.approve([ctrl.question.id]).then(function (response) {
                                if (_.isEqual(response.data.status, 'success')) {
                                    $mdToast.show($mdToast.simple().textContent("Review Added Successfully!").parent(document.body).hideDelay(1000).position('top right')).then(function () {
                                        ctrl.goBack();
                                    });
                                }
                            });
                        } else if (ctrl.question.approval === "Rejected" && (userService.isAdmin() || userService.isEditor())) {
                            questionService.disapprove([ctrl.question.id]).then(function (response) {
                                if (_.isEqual(response.data.status, 'success')) {
                                    $mdToast.show($mdToast.simple().textContent("Review Added Successfully!").parent(document.body).hideDelay(1000).position('top right')).then(function () {
                                        ctrl.goBack();
                                    });
                                }
                            });
                        } else {
                            if (_.isEqual(response.data.status, 'success')) {
                                $mdToast.show($mdToast.simple().textContent("Review Added Successfully!").parent(document.body).hideDelay(1000).position('top right')).then(function () {
                                    ctrl.goBack();
                                });
                            }
                        }
                    }
                });
            });
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
        ctrl.addReviewComments = function (ev) {
            ctrl.comments = [];
            $mdDialog.show({
                templateUrl: 'app/js/qb-add-review-comment/qb-add-review-comment.template.html',
                targetEvent: ev,
                controller: 'qbAddReviewComment',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: ctrl.question,
                    comments: ctrl.comments
                }
            }).then(function () {});
        };
    }]
});
'use strict';

// Define the `qbQuestionFilterQuestions` module

angular.module('qbQuestionReviewView', []);
'use strict';

angular.module('qbQuestionReviewView').controller('questionReviewViewController', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;

    ctrl.save = function () {
        $mdDialog.hide();
    };

    ctrl.close = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbTopics', ['ngRoute', 'qbTopicSections']);
'use strict';

angular.module('qbTopics').component('qbTopics', {
    templateUrl: 'app/js/qb-topics/qb-topics.template.html',
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
    templateUrl: 'app/js/qb-topic-sections/qb-topic-sections.template.html',
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
    templateUrl: 'app/js/qb-topic-questions/qb-topic-questions.template.html',
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
    templateUrl: 'app/js/qb-question-revision/qb-question-revision.template.html',
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
            $mdDialog.hide({ action: false });
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-revision-view-dialog/qb-question-revision-view-dialog.template.html',
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
            });
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
        ctrl.goBack = function (event) {
            if ($routeParams.goto) {
                $location.url($routeParams.goto);
            } else if ($routeParams.id) {
                $location.url('/question-edit/' + $routeParams.id);
            } else {
                util.back();
            }
        };
        ctrl.cancel = function () {
            $mdDialog.hide();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionRevisionDialog', ['qbQuestionRevision']);
'use strict';

angular.module('qbQuestionRevisionDialog').controller('qbQuestionRevisionDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", function ($scope, $mdDialog, $mdToast, notifier) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.hide();
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
        $mdDialog.show({
            templateUrl: 'app/js/qb-question-revision-dialog/qb-question-revision-dialog.template.html',
            targetEvent: event,
            controller: 'qbQuestionRevisionDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                question: ctrl.question
            },
            skipHide: true
        }).then(function (d) {
            ctrl.handleRevisionClose(d);
        }, function (d) {
            ctrl.handleRevisionClose(d);
        });
    };
    ctrl.handleRevisionClose = function (data) {
        if (!data) {
            if (stateService.getStateFor("revision-from").state == "question-edit") {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
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
                    templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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
                    templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
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
                    templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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

angular.module('qbQuestionRevisionViewDialog').controller('qbQuestionRevisionViewDialogController', ["$scope", "$mdDialog", "$mdToast", "$routeParams", "$location", "Util", "Version", "Question", "Notifier", "State", function ($scope, $mdDialog, $mdToast, $routeParams, $location, util, versionService, questionService, notifier, stateService) {
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
        $mdDialog.show({
            templateUrl: 'app/js/qb-question-revision-dialog/qb-question-revision-dialog.template.html',
            targetEvent: event,
            controller: 'qbQuestionRevisionDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                question: ctrl.question
            },
            skipHide: true
        }).then(function (d) {
            ctrl.handleRevisionClose(d);
        }, function (d) {
            ctrl.handleRevisionClose(d);
        });
    };
    ctrl.handleRevisionClose = function (data) {
        if (!data) {
            if (stateService.getStateFor("revision-from").state == "question-edit") {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
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
                    templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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
                    templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
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
                    templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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

angular.module('qbTopicBanks', []);
'use strict';

angular.module('qbTopicBanks').component('qbTopicBanks', {
    templateUrl: 'app/js/qb-topic-banks/qb-topic-banks.template.html',
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
    templateUrl: 'app/js/qb-topic-users/qb-topic-users.template.html',
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
    templateUrl: 'app/js/qb-question-edit/qb-question-edit.template.html',
    bindings: {
        question: "<",
        view: "<",
        dialog: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "$routeParams", "$route", "Util", "Question", "User", "Media", "Notifier", "QB_QUESTION", "QB_QUESTION_TYPE", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, $route, util, questionService, userService, mediaService, notifier, questionConstants, questionTypeConstants) {
        var ctrl = this;
        ctrl.currentUser = userService.getLoggedInUser();
        ctrl.$onInit = function () {
            notifier.subscribe($scope, 'load-restored-question', function (event, data) {
                ctrl.loadQuestion();
            });
            ctrl.loadQuestion();
        };
        ctrl.loadQuestion = function () {
            questionService.questionGet(ctrl.question.id).then(function (response) {
                ctrl.question = response.data.data;
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
            });
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
                $mdToast.show($mdToast.simple().textContent('Question edited successfully').parent(document.body).hideDelay(1000).position('top right')).then(function () {
                    notifier.notify('load-questions-inprogress', {});
                    notifier.notify('load-questions-published', {});
                    notifier.notify('load-questions-retired', {});
                    ctrl.cancel();
                });
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
                    templateUrl: 'app/js/qb-validation-dialog/qb-validation-dialog.template.html',
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
                    templateUrl: 'app/js/qb-question-add-image/qb-question-add-image.template.html',
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
                templateUrl: 'app/js/qb-question-add-video/qb-question-add-video.template.html',
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
                        };
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
            };
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
                var mainSection = ctrl.question.sections.find(function (section) {
                    return ctrl.isMainSectionWithChoices(section);
                });
                var nochoiceSection = ctrl.question.sections.find(function (section) {
                    return !ctrl.isMainSectionWithChoices(section);
                });
                if (nochoiceSection) {
                    return false;
                }
                if (mainSection && !mainSection.choices) {
                    return true;
                }
                if (mainSection) {
                    var answer = mainSection.choices.find(function (choice) {
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
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionEditDialog', ['qbQuestionEdit']);
'use strict';

angular.module('qbQuestionEditDialog').controller('qbQuestionEditDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", "User", "QB_QUESTION", function ($scope, $mdDialog, $mdToast, notifier, userService, questionConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    ctrl.cancel = function () {
        $mdDialog.cancel();
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
        ctrl.section.name = ctrl.media.name;
        ctrl.section.url = ctrl.media.scaled.url;
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
            ctrl.section.name = response.data.data.name;
            ctrl.section.url = response.data.data.scaled.url;
            ctrl.section.caption = response.data.data.caption;
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
        if (ctrl.video.url !== undefined || ctrl.video.url !== '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = ctrl.video.url.match(regExp);
            if (match && match[2].length === 11) {
                ctrl.video.url = appConstants.YOUTUBE_PREFIX + match[2];
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

    ctrl.options = {
        multiSelect: true,
        autoSelect: true,
        boundaryLinks: false,
        decapitate: false,
        limitSelect: true,
        pageSelect: true
    };

    ctrl.videos = [{
        id: "B00890",
        profile: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
    }, {
        id: "B00890",
        profile: "app/resources/images/placeholder-avatar.png"
    }, {
        id: "B00890",
        profile: "app/resources/images/placeholder-avatar.png"
    }];

    $scope.$watch('files.length', function (newVal, oldVal) {
        ctrl.uploadFiles = $scope.files;
    });
}]);
'use strict';

// Define the  module

angular.module('qbQuestionAddMultiplechoice', []);
'use strict';

angular.module('qbQuestionAddMultiplechoice').component('qbQuestionAddMultiplechoice', {
    templateUrl: 'app/js/qb-question-add-multiplechoice/qb-question-add-multiplechoice.template.html',
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
    templateUrl: 'app/js/qb-question-display-text/qb-question-display-text.template.html',
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
    templateUrl: 'app/js/qb-question-display-image/qb-question-display-image.template.html',
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
                templateUrl: 'app/js/qb-question-image-dialog/qb-question-image-dialog.template.html',
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
}]);
'use strict';

// Define the  module

angular.module('qbBanks', ['qbBankEdit']);
'use strict';

angular.module('qbBanks').component('qbBanks', {
    templateUrl: 'app/js/qb-banks/qb-banks.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$routeParams", "User", "Bank", function ($mdDialog, $scope, $element, $timeout, $location, $routeParams, userService, bankService) {
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
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionHistory', ['material.components.expansionPanels']);
'use strict';

angular.module('qbQuestionHistory').component('qbQuestionHistory', {
    templateUrl: 'app/js/qb-question-history/qb-question-history.template.html',
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
    templateUrl: 'app/js/qb-banks-more/qb-banks-more.template.html',
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
    templateUrl: 'app/js/qb-question-add-multipleresponse/qb-question-add-multipleresponse.template.html',
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
    templateUrl: 'app/js/qb-question-add-shortanswer/qb-question-add-shortanswer.template.html',
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
    templateUrl: 'app/js/qb-question-add-essay/qb-question-add-essay.template.html',
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
    templateUrl: 'app/js/qb-assignees/qb-assignees.template.html',
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
            $mdDialog.show({
                templateUrl: 'app/js/qb-users-select/qb-users-select.template.html',
                targetEvent: event,
                controller: 'usersSelectController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    data: ctrl.allUsers,
                    selected: selected,
                    searchParam: ctrl.searchParam,
                    parent: ctrl
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
    templateUrl: 'app/js/qb-question-answerkey/qb-question-answerkey.template.html',
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
                templateUrl: 'app/js/qb-question-add-rationale/qb-question-add-rationale.template.html',
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
    templateUrl: 'app/js/qb-topic-list/qb-topic-list.template.html',
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
    templateUrl: 'app/js/qb-type-list/qb-type-list.template.html',
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
    templateUrl: 'app/js/qb-level-list/qb-level-list.template.html',
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
    templateUrl: 'app/js/qb-login/qb-login.template.html',
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
        isFirstLogin: isFirstLogin
    };
    return me;

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
        clearState: clearState
    };
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
    templateUrl: 'app/js/qb-criteria-add/qb-criteria-add.template.html',
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
    templateUrl: 'app/js/qb-question-list/qb-question-list.template.html',
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
    templateUrl: 'app/js/qb-logout/qb-logout.template.html',
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
            }, function () {
                userService.clearLoggedInUser();
                $location.url('/');
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
        ctrl.parent.logPagination(ctrl.parent.query.page, ctrl.parent.query.limit, ctrl.parent.searchParam);
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbAssignments', ['qbAssignmentsAssignedByMe', 'qbAssignmentsDone', 'qbAssignmentsToDo', 'qbAssignmentDetails', 'qbAssignmentsAssignedByOthers']);
'use strict';

angular.module('qbAssignments').component('qbAssignments', {
    templateUrl: 'app/js/qb-assignments/qb-assignments.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$routeParams", "User", "Notifier", "State", function ($mdDialog, $scope, $element, $timeout, $location, $routeParams, userService, notifier, stateService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.selectedIndex = _.isNumber(stateService.getStateFor("assignmentTab").index) ? stateService.getStateFor("assignmentTab").index : 0;
            ctrl.showAssignedByMe = userService.isAdmin() || userService.isEditor();
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isEditor = userService.isEditor();
            ctrl.state = "todo";
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
        ctrl.toDo = function () {
            ctrl.state = "todo";
            stateService.getStateFor("assignmentTab").index = 0;
            notifier.notify('load-assignments-to-do', {});
        };
        ctrl.done = function () {
            ctrl.state = "done";
            if (ctrl.isAdmin || ctrl.isEditor) stateService.getStateFor("assignmentTab").index = 3;else {
                stateService.getStateFor("assignmentTab").index = 1;
            }
            notifier.notify('load-assignments-done', {});
        };
        ctrl.refreshTab = function (state) {
            if (state) ctrl.state = state;
            if (ctrl.state === "todo") ctrl.toDo();else if (ctrl.state === "assignedByMe") ctrl.assignedByMe();else if (ctrl.state === "assignedByOthers") ctrl.assignedByOthers();else ctrl.done();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsToDo', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsToDo').component('qbAssignmentsToDo', {
    templateUrl: 'app/js/qb-assignments-to-do/qb-assignments-to-do.template.html',
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
        };
        ctrl.loadDetails = function (id, event) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: id
                }
            }).then(function () {}).finally(function () {});
            //                    $location.url('/assignment/' + id + "/0");
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: '-creationDate',
                limit: limit,
                page: page
            };
            stateService.fetchState().todoAssignments = ctrl.query;
            ctrl.getAssignments();
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
            if (assignment.assignees) return assignment.assignees.find(function (a) {
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
        ctrl.loadAssignment = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            if (_.isEqual(assignment.status, assignmentConstants.OPEN)) $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: assignment.id,
                    assignment: assignment
                }
            }).then(function () {}).finally(function () {});else if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignment: assignment,
                    items: assignment.items
                }
            }).then(function () {}).finally(function () {});
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
                } else {
                    assignment.done = assignment.items.length;
                    assignment.total = assignment.items.length;
                }
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
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsAssignedByMe', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsAssignedByMe').component('qbAssignmentsAssignedByMe', {
    templateUrl: 'app/js/qb-assignments-assigned-by-me/qb-assignments-assigned-by-me.template.html',
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
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: '-creationDate',
                limit: limit,
                page: page
            };
            stateService.fetchState().assignedBymeAssignments = ctrl.query;
            ctrl.getAssignments();
        };
        ctrl.getAssignments = function () {
            assignmentService.createdByMe(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
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
            if (assignment.assignees) return assignment.assignees.find(function (a) {
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
        ctrl.loadDetails = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignment: assignment,
                    items: assignment.items
                }
            }).then(function () {}).finally(function () {});else $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: assignment.id,
                    assignment: assignment
                }
            }).then(function () {}).finally(function () {});
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
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsDone', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsDone').component('qbAssignmentsDone', {
    templateUrl: 'app/js/qb-assignments-done/qb-assignments-done.template.html',
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
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: '-creationDate',
                limit: limit,
                page: page
            };
            stateService.fetchState().doneAssignments = ctrl.query;
            ctrl.getAssignments();
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
            $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: assignment.id,
                    assignment: assignment
                }
            }).then(function () {}).finally(function () {});
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
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentsAssignedByOthers', ['qbAssignmentDetails', 'qbAssignmentDetailsDialog']);
'use strict';

angular.module('qbAssignmentsAssignedByOthers').component('qbAssignmentsAssignedByOthers', {
    templateUrl: 'app/js/qb-assignments-assigned-by-others/qb-assignments-assigned-by-others.template.html',
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
        };
        ctrl.logPagination = function (page, limit) {
            ctrl.query = {
                sort: '-creationDate',
                limit: limit,
                page: page
            };
            stateService.fetchState().assignedByOthersAssignments = ctrl.query;
            ctrl.getAssignments();
        };
        ctrl.getAssignments = function () {
            assignmentService.createdByOthers(ctrl.query).then(function (response) {
                if (response.data.status === "success") {
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
            if (assignment.assignees) return assignment.assignees.find(function (a) {
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
        ctrl.loadDetails = function (assignment, event) {
            if (ctrl.isNew(assignment)) {
                notifier.notify('update-notification', {
                    navigationId: assignment.id
                });
            }
            if (_.isEqual(assignment.status, assignmentConstants.DRAFT)) $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignment: assignment,
                    items: assignment.items
                }
            }).then(function () {}).finally(function () {});else $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentDetailsDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    assignmentId: assignment.id,
                    assignment: assignment
                }
            }).then(function () {}).finally(function () {});
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
        ctrl.isNew = function (assignment) {
            return !_.chain(notificationService.getNotifications()).where({
                action: notificationConstants.ACTION.ASSIGNED,
                navigationId: assignment.id
            }).isEmpty().value();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentDetails', ['qbAssignmentDetailsTab', 'qbAssignmentMine', 'qbAssignmentHistory', 'qbAssignmentSubmissions', 'qbAssignmentMore']);
'use strict';

angular.module('qbAssignmentDetails').component('qbAssignmentDetails', {
    templateUrl: 'app/js/qb-assignment-details/qb-assignment-details.template.html',
    bindings: {
        assignmentId: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "Util", "$routeParams", "User", "Assignment", "Notifier", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $location, util, $routeParams, userService, assignmentService, notifier, assigneeStatus, assignmentKind) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.isAuthor = userService.isAuthor();
            ctrl.isAdmin = userService.isAdmin();
            ctrl.isReviewer = userService.isReviewer();
            ctrl.isEditor = userService.isEditor();
            ctrl.showMyAssignment = false;
            ctrl.assignment = {};
            ctrl.fullAssignment = {};
            //                    ctrl.tab = +$routeParams.tab;
            notifier.subscribe($scope, 'load-assignment-details', function (event, data) {
                ctrl.loadAssignment();
            });
            ctrl.loadAssignment();
        };
        ctrl.loadAssignment = function () {
            assignmentService.getAssignment(ctrl.assignmentId).then(function (response) {
                if (response.data.status === "success") {
                    //                            ctrl.tab = +$routeParams.tab;
                    angular.merge(ctrl.assignment, response.data.data);
                    ctrl.assignment.items = ctrl.assignment.items || [];
                    ctrl.getProgress(ctrl.assignment);
                    if (ctrl.assignment.assignees) {
                        if (ctrl.assignment.assignees.find(function (a) {
                            return a.id === userService.getLoggedInUser().id;
                        })) {
                            ctrl.showMyAssignment = true;
                        }
                    }
                    if (ctrl.isAdmin || ctrl.isEditor) {
                        assignmentService.getSavedItems(ctrl.assignment.id).then(function (itemResponse) {
                            angular.merge(ctrl.fullAssignment, itemResponse.data.data);
                            ctrl.getProgress(ctrl.fullAssignment);
                            ctrl.assignment.todo = ctrl.fullAssignment.todo;
                            //ctrl.assignment.progress = ctrl.fullAssignment.progress;
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
                                    var k = ctrl.fullAssignment.assignees.find(function (f) {
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
                    if (ctrl.assignment.kind === assignmentKind.QUESTION_CREATE && ctrl.assignment.assignees && ctrl.assignment.assignees.find(function (a) {
                        return a.id === userService.getLoggedInUser().id && a.status === assigneeStatus.DRAFT;
                    })) {
                        ctrl.setDummyObject();
                    }
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
    templateUrl: 'app/js/qb-assignment-details-tab/qb-assignment-details-tab.template.html',
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
    templateUrl: 'app/js/qb-reset-password/qb-reset-password.template.html',
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
    templateUrl: 'app/js/qb-forgot-password/qb-forgot-password.template.html',
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

angular.module('qbAssignmentMine', ['qbDialogQn', 'qbAssignmentTurnIn', 'qbQuestionEditDialog', 'qbQuestionPreviewDialog', 'qbQuestionCreateDialog', 'qbCreateQuestionAssignmentsDialog']);
'use strict';

angular.module('qbAssignmentMine').component('qbAssignmentMine', {
    templateUrl: 'app/js/qb-assignment-mine/qb-assignment-mine.template.html',
    bindings: {
        assignment: "<",
        dummy: "<",
        items: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "$routeParams", "$filter", "User", "Assignment", "Question", "Comment", "Media", "Review", "Notifier", "QB_QUESTION", "QB_ASSIGNEE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, $filter, userService, assignmentService, questionService, commentService, mediaService, reviewService, notifier, questionConstants, assigneeConstants, assignmentKind) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.currentDate = new Date();
            ctrl.query = {
                sort: 'id',
                limit: 25,
                page: 1
            };
            ctrl.recallInprogress = false;
            ctrl.submitInprogress = false;
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
                    templateUrl: 'app/js/qb-dialog-question/qb-dialog-question.template.html',
                    targetEvent: event,
                    controller: 'dialogQnController',
                    controllerAs: '$ctrl',
                    bindToController: true,
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
            if (ctrl.submitInprogress) {
                return;
            }
            ctrl.submitInprogress = true;
            addItems(event, triggerTurnIn);
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
        };
        ctrl.removeData = function (event, dataArray, arrayItem) {
            dataArray.splice(dataArray.indexOf(arrayItem), 1);
            ctrl.setDummyObject();
            ctrl.save(event);
        };
        ctrl.isComplete = function () {
            if (ctrl.assignment.assignees) return ctrl.assignment.assignees.find(function (a) {
                return a.id === userService.getLoggedInUser().id && (a.status == assigneeConstants.COMPLETE || a.status == assigneeConstants.SUBMITTED);
            }) ? true : false;else return false;
        };
        ctrl.isSubmitted = function () {
            if (ctrl.assignment.assignees) return ctrl.assignment.assignees.find(function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeConstants.SUBMITTED;
            }) ? true : false;else return false;
        };
        ctrl.isDraft = function () {
            if (ctrl.assignment.assignees) return ctrl.assignment.assignees.find(function (a) {
                return a.id === userService.getLoggedInUser().id && a.status == assigneeConstants.DRAFT;
            }) ? true : false;else return false;
        };
        ctrl.recall = function () {
            if (ctrl.recallInprogress) {
                return;
            }
            ctrl.recallInprogress = true;
            assignmentService.returnAssignment(ctrl.assignment.id, userService.getLoggedInUser().id).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    notifier.notify('load-assignment-details', {});
                    notifier.notify('load-assignments-to-do', {});
                    $mdToast.show($mdToast.simple().textContent("Assignment Recalled Successfully!").parent(document.body).hideDelay(3000).position('top right')).then(function () {
                        notifier.notify('load-notifications', {});
                        ctrl.recallInprogress = false;
                    });
                } else {
                    ctrl.recallInprogress = false;
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
                    templateUrl: 'app/js/qb-assignment-turn-in/qb-assignment-turn-in.template.html',
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
                                $mdToast.show($mdToast.simple().textContent("Assignment Submitted Successfully!").parent(document.body).hideDelay(3000).position('top right')).then(function () {
                                    ctrl.submitInprogress = false;
                                    notifier.notify('load-notifications', {});
                                });
                            } else {
                                ctrl.submitInprogress = false;
                                notifier.notify('load-assignment-details', {});
                            }
                        } else {
                            ctrl.submitInprogress = false;
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
                templateUrl: 'app/js/qb-question-create-dialog/qb-question-create-dialog.template.html',
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
            });
        };
        ctrl.openQuestion = function (ev, question) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
                targetEvent: ev,
                controller: 'qbQuestionEditDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    question: question
                }
            });
        };
        ctrl.previewQuestion = function (event, question) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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
            });
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
    templateUrl: 'app/js/qb-assignment-history/qb-assignment-history.template.html',
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
    templateUrl: 'app/js/qb-assignment-submissions/qb-assignment-submissions.template.html',
    bindings: {
        assignment: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", '$routeParams', "Assignment", "Comment", "User", "Question", "Notifier", "QB_ASSIGNEE", "Review", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNMENT_KIND", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, assignmentService, commentService, userService, questionService, notifier, assigneeConstants, reviewService, questionConstants, assignmentConstants, assignmentKindContants) {
        var ctrl = this;
        ctrl.currentDate = new Date();
        ctrl.$onInit = function () {
            ctrl.showSubmission = false;
            notifier.subscribe($scope, 'load-assignment-details', function (event, data) {
                if (ctrl.assignee) ctrl.loadSubmissionDetails(undefined, ctrl.assignee);
            });
        };
        ctrl.completeAssignment = function (event) {
            if (ctrl.assignment.kind === assignmentKindContants.QUESTION_CREATE || ctrl.assignment.kind === assignmentKindContants.QUESTION_REVISION) {
                assignmentService.completeAssignment(ctrl.assignment.id).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        $mdDialog.show($mdDialog.alert({ skipHide: true }).title("Assignment completed!").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
                            $mdDialog.cancel();
                            notifier.notify('load-notifications', {});
                            notifier.notify('load-assignments-to-do', {});
                            notifier.notify('load-assignment-assigned-by-me', {});
                            notifier.notify('load-assignment-assigned-by-others', {});
                            notifier.notify('load-assignments-done', {});
                        });
                    }
                });
            } else if (ctrl.assignment.kind === assignmentKindContants.QUESTION_REVIEW) {
                ctrl.assignment.inDraftAssignees = _.filter(ctrl.assignment.assignees, function (d) {
                    return d.status != assigneeConstants.SUBMITTED && d.status != assigneeConstants.COMPLETE;
                });
                ctrl.assignment.questionsToMoveIntoEditorial = _.filter(ctrl.assignment.items, function (d) {
                    return d.status == questionConstants.INREVIEW;
                });
                if (ctrl.assignment.questionsToMoveIntoEditorial.length != 0 || ctrl.assignment.inDraftAssignees != 0) {
                    $mdDialog.show({
                        templateUrl: 'app/js/qb-assignment-complete-confirm/qb-assignment-complete-confirm.template.html',
                        targetEvent: event,
                        controller: 'qbAssignmentCompleteConfirmController',
                        controllerAs: '$ctrl',
                        bindToController: true,
                        skipHide: true,
                        locals: {
                            inDraftAssignees: ctrl.assignment.inDraftAssignees,
                            questionsToMoveIntoEditorial: ctrl.assignment.questionsToMoveIntoEditorial
                        }
                    }).then(function () {
                        assignmentService.completeAssignment(ctrl.assignment.id).then(function (response) {
                            if (_.isEqual(response.data.status, 'success')) {
                                $mdDialog.show($mdDialog.alert({ skipHide: true }).title("Assignment completed!").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
                                    $mdDialog.cancel();
                                    notifier.notify('load-assignments-to-do', {});
                                    notifier.notify('load-assignment-assigned-by-me', {});
                                    notifier.notify('load-assignment-assigned-by-others', {});
                                    notifier.notify('load-assignments-done', {});
                                });
                            }
                        });
                    });
                } else if (ctrl.assignment.questionsToMoveIntoEditorial.length == 0 || ctrl.assignment.inDraftAssignees == 0) {
                    assignmentService.completeAssignment(ctrl.assignment.id).then(function (response) {
                        if (_.isEqual(response.data.status, 'success')) {
                            $mdDialog.show($mdDialog.alert({ skipHide: true }).title("Assignment completed!").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
                                notifier.notify('load-assignments-to-do', {});
                                notifier.notify('load-assignment-assigned-by-me', {});
                                notifier.notify('load-assignment-assigned-by-others', {});
                                notifier.notify('load-assignments-done', {});
                            });
                        }
                    });
                }
            }
        };
        //TODO Reshma remove this if not in use
        ctrl.completeAssignmentSuccess = function (response, event) {
            $mdDialog.show($mdDialog.alert({ skipHide: true }).title("Assignment completed!").ariaLabel('alert').targetEvent(event).ok('OK')).then(function () {
                $location.url('/assignments/');
            });
        };
        ctrl.loadSubmissionDetails = function (ev, assignee) {
            ctrl.showSubmission = true;
            ctrl.assignee = assignee;
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
                templateUrl: 'app/js/qb-assignment-return-assignment/qb-assignment-return-assignment.template.html',
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
                        notifier.notify('load-assignment-details', {});
                        notifier.notify('load-assignments-to-do', {});
                        notifier.notify('load-assignment-assigned-by-me', {});
                        notifier.notify('load-assignment-assigned-by-others', {});
                        notifier.notify('load-assignments-done', {});
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
            assignmentService.completeForAssignee(ctrl.assignment.id, assignee.id).then(function (response) {
                if (_.isEqual(response.data.status, 'success')) {
                    ctrl.showSubmission = false;
                    assignee.status = 'Complete';
                    ctrl.assignee = false;
                    notifier.notify('load-assignments-to-do', {});
                    notifier.notify('load-assignment-assigned-by-me', {});
                    notifier.notify('load-assignment-assigned-by-others', {});
                    notifier.notify('load-assignments-done', {});
                    notifier.notify('load-assignment-details', {});
                    $mdToast.show($mdToast.simple({ skipHide: true }).textContent("Assignment Marked Complete Successfully!").parent(document.body).hideDelay(3000).position('top right'));
                }
            });
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
            ctrl.reviewStatus = {};
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionPreviewDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    question: {
                        id: question.id
                    },
                    state: "Published",
                    readOnly: true,
                    dialog: {
                        parent: ctrl,
                        referrer: "preview-question"
                    },
                    reviewStatus: ctrl.reviewStatus
                }
            }).then(function () {
                if (ctrl.reviewStatus.state == "done") {
                    $mdDialog.hide();
                }
                //submit reviews and complete assignment
            });
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

        ctrl.markComplete = function (ev, assignee) {};

        ctrl.showThisReview = function (ev, question) {
            if (ctrl.reviews && ctrl.reviews[question.id]) {
                ctrl.thisQuestion = _.last(ctrl.reviews[question.id]);
            }
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-show-review/qb-question-show-review.template.html',
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
            ctrl.showSubmission = false;
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
    templateUrl: 'app/js/qb-sidenav/qb-sidenav.template.html',
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
                templateUrl: 'app/js/qb-user-guide/qb-user-guide.template.html',
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
    templateUrl: 'app/js/qb-assignment-reviewmine/qb-assignment-reviewmine.template.html',
    bindings: {
        assignment: '<'
    },
    controller: ["$mdDialog", "$scope", "$q", "$element", "$timeout", "$location", "$routeParams", "User", "QB_ASSIGNEE", "Review", "Media", function ($mdDialog, $scope, $q, $element, $timeout, $location, $routeParams, userService, assigneeConstants, reviewService, mediaService) {
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
                $mdDialog.show({
                    templateUrl: 'app/js/qb-question-review-dialog/qb-question-review-dialog.template.html',
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
                }).then(function () {
                    $location.url('/assignments');
                }).finally(function () {
                    fetchAll();
                });
            });
        };

        ctrl.isComplete = function () {
            if (ctrl.assignment.assignees) {
                return ctrl.assignment.assignees.find(function (a) {
                    return a.id === userService.getLoggedInUser().id && a.status == assigneeConstants.COMPLETE;
                }) ? true : false;
            } else return false;
        };

        ctrl.isSubmitted = function () {
            if (ctrl.assignment.assignees) {
                return ctrl.assignment.assignees.find(function (a) {
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
                templateUrl: 'app/js/qb-add-review-comment/qb-add-review-comment.template.html',
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
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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
            });
        };

        ctrl.viewGuide = function () {
            mediaService.getGuide(ctrl.assignment.reviewGuideId).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.guide = response.data.data;
                    var href = ctrl.guide.url;
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
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbTableSearchBar', []);
'use strict';

angular.module('qbTableSearchBar').component('qbTableSearchBar', {
    templateUrl: 'app/js/qb-table-search-bar/qb-table-search-bar.template.html',
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
    templateUrl: 'app/js/qb-question-revision-answerkey/qb-question-revision-answerkey.template.html',
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
    templateUrl: 'app/js/qb-user-profile-create/qb-user-profile-create.template.html',
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
    templateUrl: 'app/js/qb-sidenav-button/qb-sidenav-button.template.html',
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
    templateUrl: 'app/js/qb-question-revision-display-text/qb-question-revision-display-text.template.html',
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
    templateUrl: 'app/js/qb-question-preview/qb-question-preview.template.html',
    bindings: {
        question: "<",
        state: "<",
        disable: "<",
        dialog: "<"
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
                ctrl.question = response.data.data;
                getCategory();
                splitSections();
            });
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
        ctrl.cancel = function () {
            $mdDialog.cancel();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbQuestionPreviewDialog', ['qbQuestionPreview']);
'use strict';

angular.module('qbQuestionPreviewDialog').controller('qbQuestionPreviewDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", function ($scope, $mdDialog, $mdToast, notifier) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionMore', ['qbQuestionRevisionDialog', 'qbQuestionHistoryDialog', 'qbViewSubmissionReviews']);
'use strict';

angular.module('qbQuestionMore').component('qbQuestionMore', {
    templateUrl: 'app/js/qb-question-more/qb-question-more.template.html',
    bindings: {
        id: "<",
        section: "@",
        data: "<",
        dialog: "<",
        addText: "&",
        addImage: "&",
        addVideo: "&",
        from: "<",
        state: "<",
        disable: "<"
    },
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", 'User', "Question", "State", "Review", "Comment", "Notifier", "QB_ASSIGNMENT_KIND", "QB_QUESTION", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, userService, questionService, stateService, reviewService, commentService, notifier, assignmentKindConstants, questionStatusConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            questionService.questionGet(ctrl.id).then(function (response) {
                ctrl.question = response.data.data;
                ctrl.menuItems = [{
                    item: 'Information',
                    action: ctrl.showQuestionInformation
                }, {
                    item: 'Revisions',
                    action: ctrl.viewRevisions
                }];
                if (userService.isAdmin() || userService.isEditor()) {
                    if (ctrl.from == 'edit-dialog') {
                        ctrl.menuItems.push({
                            item: 'Create Question Edit Assignment',
                            action: ctrl.requestRevisions
                        }, {
                            item: 'Activity History',
                            action: ctrl.showHistory
                        });
                    } else if (ctrl.from == 'preview-dialog') {
                        ctrl.menuItems.push({
                            item: 'Activity History',
                            action: ctrl.showHistory
                        }, {
                            item: 'Reviewer Comments',
                            action: ctrl.viewReviews
                        }, {
                            item: 'Edit',
                            action: ctrl.editQuestion
                        }, {
                            item: 'Publish',
                            action: ctrl.openReview
                        }, {
                            item: 'Reject',
                            action: ctrl.openReview
                        }, {
                            item: 'Add to Edit Assignment',
                            action: ctrl.requestRevisions
                        }, {
                            item: 'Unpublish',
                            action: ctrl.openReview
                        }, {
                            item: 'Retire',
                            action: ctrl.openReview
                        });
                        if (ctrl.question && ctrl.question.status === questionStatusConstants.EDITORIAL) {
                            ctrl.menuItems.push({
                                item: 'Add to Review Assignment',
                                action: ctrl.addToReviewAssignment
                            });
                        }
                    }
                };
            });
            ctrl.moreItems = [{
                item: "Add Text",
                action: ctrl.addText
            }, {
                item: "Add Image",
                action: ctrl.addImage
            }, {
                item: "Add Video",
                action: ctrl.addVideo
            }];
        };
        ctrl.handleRevisionClose = function (data, event) {
            if (!data) {
                if (stateService.getStateFor("revision-from").state == "question-edit") {
                    $mdDialog.show({
                        templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
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
                        templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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
            }
        };
        ctrl.viewRevisions = function (event) {
            if (ctrl.from == 'edit-dialog') {
                stateService.getStateFor("revision-from").state = "question-edit";
            } else if (ctrl.from == 'preview-dialog') {
                stateService.getStateFor("revision-from").state = "question-preview";
            }
            ctrl.cancel();
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-revision-dialog/qb-question-revision-dialog.template.html',
                targetEvent: event,
                controller: 'qbQuestionRevisionDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    question: ctrl.question
                },
                skipHide: true
            }).then(function (d) {
                ctrl.handleRevisionClose(d);
            }, function (d) {
                ctrl.handleRevisionClose(d);
            });
        };
        ctrl.showHistory = function (event) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-history-dialog/qb-question-history-dialog.template.html',
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
                templateUrl: 'app/js/qb-question-information/qb-question-information.template.html',
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
                    ctrl.reviews = [];
                    _.chain(response.data.data).groupBy(function (a) {
                        return a.createdBy.id;
                    }).forEach(function (a) {
                        ctrl.reviews.push(_.last(a));
                    });
                    ctrl.reviews.forEach(function (review) {
                        if (review.questionnaire) {
                            review.questionnaire.forEach(function (a) {
                                a.response = a.response && a.response == "true" ? 'YES' : 'NO';
                            });
                        }
                    });
                    $mdDialog.show({
                        templateUrl: 'app/js/qb-view-submission-reviews/qb-view-submission-reviews.template.html',
                        targetEvent: ev,
                        controller: 'qbViewSubmissionReviews',
                        controllerAs: '$ctrl',
                        bindToController: true,
                        preserveScope: true,
                        skipHide: true,
                        locals: {
                            readOnly: ctrl.disable,
                            reviews: ctrl.reviews,
                            question: ctrl.question,
                            state: ctrl.state
                        }
                    });
                }
            });
        };
        ctrl.editQuestion = function (event, item) {
            $mdDialog.cancel(); //QB-469
            $timeout(function () {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbQuestionEditDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        question: ctrl.question
                    }
                });
            }, 100);
        };
        ctrl.requestRevisions = function (ev, item) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: ev,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                skipHide: true,
                locals: {
                    items: [ctrl.question],
                    assignment: {
                        assignees: [],
                        items: [ctrl.question],
                        kind: assignmentKindConstants.QUESTION_REVISION
                    }
                }
            }).then(function () {}).finally(function () {});
        };
        ctrl.openReview = function (ev, item) {
            ctrl.questionStatus = item;
            ctrl.reviewStatus = {};
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-review-view/qb-question-review-view.template.html',
                targetEvent: ev,
                controller: 'questionReviewViewController',
                controllerAs: '$ctrl',
                bindToController: true,
                preserveScope: true,
                skipHide: true,
                locals: {
                    question: ctrl.question,
                    status: ctrl.questionStatus
                }
            }).then(function () {
                if (!_.isEmpty(ctrl.question.comment)) {
                    ctrl.comment = {
                        ownerId: ctrl.question.id,
                        comment: ctrl.question.comment,
                        category: 'Question'
                    };
                    commentService.addComment(ctrl.comment);
                }
                if (ctrl.questionStatus === "Publish" && (userService.isAdmin() || userService.isEditor())) {
                    questionService.approve([ctrl.question.id]).then(function (response) {
                        if (_.isEqual(response.data.status, 'success')) {
                            notifier.notify('load-assignment-details', {});
                            notifier.notify('load-questions-inprogress', {});
                            notifier.notify('load-questions-published', {});
                            notifier.notify('load-questions-retired', {});
                            $mdToast.show($mdToast.simple().textContent("Question Approved!").parent(document.body).hideDelay(1000).position('top right')).then(function () {
                                ctrl.reviewStatus.state == "done";
                                $mdDialog.hide();
                            });
                        }
                    });
                } else if (ctrl.questionStatus === "Reject" && (userService.isAdmin() || userService.isEditor())) {
                    questionService.disapprove([ctrl.question.id]).then(function (response) {
                        if (_.isEqual(response.data.status, 'success')) {
                            notifier.notify('load-assignment-details', {});
                            notifier.notify('load-questions-inprogress', {});
                            notifier.notify('load-questions-published', {});
                            $mdToast.show($mdToast.simple().textContent("Question Rejected!").parent(document.body).hideDelay(1000).position('top right')).then(function () {
                                ctrl.reviewStatus.state == "done";
                                $mdDialog.hide();
                            });
                        }
                    });
                }
            }).finally(function () {});
        };
        ctrl.addToReviewAssignment = function (event, item) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
                targetEvent: event,
                controller: 'qbAssignmentCreateDialogController',
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    items: [ctrl.question],
                    assignment: {
                        assignees: [],
                        kind: assignmentKindConstants.QUESTION_REVIEW,
                        items: [ctrl.question]
                    }
                },
                skipHide: true
            });
        };
        ctrl.menuItemClick = function (option, event) {
            option.action(event, option.item);
        };
        ctrl.cancel = function () {
            $mdDialog.cancel();
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
    templateUrl: 'app/js/qb-display-comments/qb-display-comments.template.html',
    bindings: {
        status: "<",
        assignmentId: "<"
    },
    controller: ["$scope", "$mdDialog", "$mdToast", "$routeParams", "$element", "Comment", "Notifier", "QB_ASSIGNMENT", function ($scope, $mdDialog, $mdToast, $routeParams, $element, commentService, notifier, assignmentConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.getMyComments();
            notifier.subscribe($scope, 'load-assignment-comments', function (event, data) {
                ctrl.getMyComments();
            });
        };
        ctrl.getMyComments = function () {
            commentService.getComments(ctrl.assignmentId).then(function (response) {
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
                ownerId: ctrl.assignmentId,
                category: 'Assignment'
            };
            $mdDialog.show({
                templateUrl: 'app/js/qb-add-comment/qb-add-comment.template.html',
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
                templateUrl: 'app/js/qb-add-comment/qb-add-comment.template.html',
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

angular.module('qbAssignmentCompleteConfirm', []);
'use strict';

angular.module('qbAssignmentCompleteConfirm').controller('qbAssignmentCompleteConfirmController', ["$scope", "$mdDialog", "$location", "QB_ASSIGNEE", "QB_QUESTION", function ($scope, $mdDialog, $location, assigneeConstants, questionConstants) {
    var ctrl = this;
    ctrl.confirmComplete = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
}]);
'use strict';

// Define the  module

angular.module('qbAssignmentMore', ['qbAssignmentHistoryDialog']);
'use strict';

angular.module('qbAssignmentMore').component('qbAssignmentMore', {
    templateUrl: 'app/js/qb-assignment-more/qb-assignment-more.template.html',
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
                templateUrl: 'app/js/qb-assignment-history-dialog/qb-assignment-history-dialog.template.html',
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
    templateUrl: 'app/js/qb-bank-details/qb-bank-details.template.html',
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
                templateUrl: 'app/js/qb-bank-dialog-question/qb-bank-dialog-question.template.html',
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
                templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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
                templateUrl: 'app/js/qb-criteria/qb-criteria.template.html',
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
    templateUrl: 'app/js/qb-bank-create/qb-bank-create.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$routeParams", "$mdToast", '$mdExpansionPanel', "$filter", "$location", "Bank", "User", "Question", "QB_QUESTION", function ($mdDialog, $scope, $element, $timeout, $routeParams, $mdToast, $mdExpansionPanel, $filter, $location, bankService, userService, questionService, questionConstants) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.bank = new Object();
            ctrl.selectedQuestions = [];
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
    }]
});
'use strict';

// Define the  module

angular.module('qbBankEdit', ['qbBankDetails', 'qbBankExport']);
'use strict';

angular.module('qbBankEdit').component('qbBankEdit', {
    templateUrl: 'app/js/qb-bank-edit/qb-bank-edit.template.html',
    controller: ["$mdDialog", "$mdToast", "$scope", "$element", "$timeout", "$location", "$routeParams", "Util", "User", "Bank", function ($mdDialog, $mdToast, $scope, $element, $timeout, $location, $routeParams, util, userService, bankService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            if ($routeParams.id !== undefined) {
                ctrl.bankId = $routeParams.id;
            }
            ctrl.bank = new Object();
            ctrl.selectedQuestions = new Array();
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
                    $location.url('/banks');
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
    }]
});
'use strict';

// Define the  module

angular.module('qbBankExport', []);
'use strict';

angular.module('qbBankExport').component('qbBankExport', {
    templateUrl: 'app/js/qb-bank-export/qb-bank-export.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", '$routeParams', 'Media', 'Bank', function ($mdDialog, $scope, $element, $timeout, $routeParams, mediaService, bankService) {
        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.getExports();
        };
        ctrl.export = function () {
            bankService.exportBank($routeParams.id).then(function (response) {
                if (response.data.status === "success") {
                    var href = JSON.parse(response.data.data.value).data.url;
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
                    ctrl.getExports();
                }
            });
        };

        ctrl.getExports = function () {
            mediaService.getExports($routeParams.id).then(function (response) {
                if (response.data.status === "success") {
                    ctrl.exports = response.data.data;
                }
            });
        };
    }]
});
'use strict';

angular.module('qbQuestionDisplayVideo', ['ngSanitize']);
'use strict';

angular.module('qbQuestionDisplayVideo').component('qbQuestionDisplayVideo', {
    templateUrl: 'app/js/qb-question-display-video/qb-question-display-video.template.html',
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
                templateUrl: 'app/js/qb-question-image-dialog/qb-question-image-dialog.template.html',
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
    templateUrl: 'app/js/qb-change-password/qb-change-password.template.html',
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
        ctrl.parent.logPagination(ctrl.parent.query.page, ctrl.parent.query.limit, ctrl.parent.searchParam);
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbQuestionCheckboxList', []);
'use strict';

angular.module('qbQuestionCheckboxList').component('qbQuestionCheckboxList', {
    templateUrl: 'app/js/qb-question-checkbox-list/qb-question-checkbox-list.template.html',
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
            return input.replace(/^\s*<[^>]*>\s*|\s*<[^>]*>\s*$|>\s*<|&nbsp[;]*|&rsquo[;]/g, '').split(/<[^>]*>/g).join(" ");
        } else {
            return "";
        }
    };
}).filter('numberFixedLen', function () {
    return function (numText, len) {
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
        });
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
    templateUrl: 'app/js/qb-notification-bar/qb-notification-bar.template.html',
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "Notification", "User", "Notifier", "QB_NOTIFICATION", function ($mdDialog, $scope, $element, $timeout, $location, notificationService, userService, notifier, notificationConstants) {
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
                $mdDialog.show({
                    templateUrl: 'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.template.html',
                    targetEvent: event,
                    controller: 'qbAssignmentDetailsDialogController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    locals: {
                        assignmentId: notification.navigationId
                    }
                }).then(function () {}).finally(function () {});
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
    templateUrl: 'app/js/qb-user-guide-carousel/qb-user-guide-carousel.template.html',
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
    templateUrl: 'app/js/qb-assignment-create/qb-assignment-create.template.html',
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
    templateUrl: 'app/js/qb-assignment-create-form/qb-assignment-create-form.template.html',
    bindings: {
        assignment: "=",
        formName: "<",
        items: "=",
        formControl: "<",
        assignmentId: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "$filter", "$routeParams", "Question", "User", "Assignment", "Media", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, $filter, $routeParams, questionService, userService, assignmentService, mediaService, questionConstants, assignmentConstants, assigneeConstants, questionTypeConstants, assignmentKindConstants) {
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
                templateUrl: 'app/js/qb-assignment-review/qb-assignment-review.template.html',
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
        ctrl.preview = function (questionId, event) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.template.html',
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
                templateUrl: 'app/js/qb-add-pdf/qb-add-pdf.template.html',
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
            ctrl.filter.statuses = [questionConstants.DRAFT, questionConstants.SUBMITTED, questionConstants.EDITORIAL, questionConstants.INREVIEW, questionConstants.DONE, questionConstants.APPROVED, questionConstants.ARCHIVED];
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
    }]
});
'use strict';

// Define the `qbAddReviewComment` module

angular.module('qbAddReviewComment', ['qbQuestionReviewCommentsSwitchlist']);
'use strict';

angular.module('qbAddReviewComment').controller('qbAddReviewComment', ["$scope", "$mdDialog", function ($scope, $mdDialog) {
    var ctrl = this;
    ctrl.save = function () {
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.submitReview = function () {
        ctrl.reviewStatus.state = "submit";
        $mdDialog.hide();
    };
    ctrl.continueReview = function () {
        ctrl.reviewStatus.state = "continue";
        $mdDialog.hide();
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionReviewDialog', ['ngMdIcons', 'qbQuestionReviewView', 'qbSidenavButton', 'qbAddReviewComment']);
'use strict';

angular.module('qbQuestionReviewDialog').controller('qbQuestionReviewDialog', ["$mdDialog", "$mdToast", "$scope", "$timeout", "$routeParams", "$location", "Util", "Question", "Review", "Comment", "User", "Notifier", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $mdToast, $scope, $timeout, $routeParams, $location, util, questionService, reviewService, commentService, userService, notifier, questionTypeConstants, assignmentKindConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.isAdmin = userService.isAdmin();
        ctrl.isEditor = userService.isEditor();
        ctrl.canSeeEditAssignment = ctrl.isAdmin || ctrl.isEditor;
    };
    questionService.questionGet(ctrl.question.id).then(function (response) {
        ctrl.question = response.data.data;
        getCategory();
        splitSections();
        commentService.getComments(ctrl.question.id).then(function (response) {
            ctrl.question.comment = _.last(response.data.data) ? _.last(response.data.data).comment : "";
        });
    });

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
    ctrl.openReview = function (ev) {
        $mdDialog.show({
            templateUrl: 'app/js/qb-question-review-view/qb-question-review-view.template.html',
            targetEvent: ev,
            controller: 'questionReviewViewController',
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                question: ctrl.question
            }
        }).then(function () {
            if (!_.isEmpty(ctrl.question.comment)) {
                ctrl.comment = {
                    ownerId: ctrl.question.id,
                    comment: ctrl.question.comment,
                    category: 'Question'
                };
                commentService.addComment(ctrl.comment);
                notifier.notify('load-assignment-comments', {});
            }
            if (ctrl.question.status === "Approved" && (userService.isAdmin() || userService.isEditor())) {
                questionService.approve([ctrl.question.id]).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        notifier.notify('load-assignment-details', {});
                        $mdToast.show($mdToast.simple().textContent("Question Approved!").parent(document.body).hideDelay(1000).position('top right')).then(function () {
                            ctrl.reviewStatus.state == "done";
                            $mdDialog.hide();
                        });
                    }
                });
            } else if (ctrl.question.status === "Draft" && (userService.isAdmin() || userService.isEditor())) {
                questionService.disapprove([ctrl.question.id]).then(function (response) {
                    if (_.isEqual(response.data.status, 'success')) {
                        notifier.notify('load-assignment-details', {});
                        $mdToast.show($mdToast.simple().textContent("Question Rejected!").parent(document.body).hideDelay(1000).position('top right')).then(function () {
                            ctrl.reviewStatus.state == "done";
                            $mdDialog.hide();
                        });
                    }
                });
            }
        });
    };
    ctrl.createRevisionAssignment = function (event) {
        $mdDialog.show({
            templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
            targetEvent: event,
            controller: 'qbAssignmentCreateDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                items: [ctrl.question],
                assignment: {
                    assignees: [],
                    items: [ctrl.question],
                    kind: assignmentKindConstants.QUESTION_REVISION
                }
            }
        }).then(function () {}).finally(function () {});
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
    ctrl.addReviewComments = function (ev) {
        ctrl.reviewStatus = {};
        ctrl.review.questionnaire.forEach(function (a) {
            a.response = a.response && a.response == "true" ? 'YES' : 'NO';
        });
        $mdDialog.show({
            templateUrl: 'app/js/qb-add-review-comment/qb-add-review-comment.template.html',
            targetEvent: ev,
            controller: 'qbAddReviewComment',
            controllerAs: '$ctrl',
            bindToController: true,
            preserveScope: true,
            skipHide: true,
            locals: {
                review: ctrl.review,
                reviewStatus: ctrl.reviewStatus,
                readOnly: ctrl.readOnly
            }
        }).then(function () {
            ctrl.review.questionnaire.forEach(function (a) {
                a.response = a.response === 'YES' ? "true" : "false";
            });
            reviewService.addReview(ctrl.review).then(function (response) {
                if (response.data.status === "success") {
                    if (ctrl.reviewStatus.state == "submit") {
                        $mdDialog.hide();
                    }
                }
            });
        });
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the `qbViewSubmissionReviews` module

angular.module('qbViewSubmissionReviews', ['qbQuestionReviewCommentsSwitchlist', 'qbQuestionReviewView']);
'use strict';

angular.module('qbViewSubmissionReviews').controller('qbViewSubmissionReviews', ["$scope", "$mdDialog", "$mdToast", "Review", "User", "Question", "Comment", "Notifier", "QB_ASSIGNMENT_KIND", function ($scope, $mdDialog, $mdToast, reviewService, userService, questionService, commentService, notifier, assignmentKindConstants) {
    var ctrl = this;
    commentService.getComments(ctrl.question.id).then(function (response) {
        ctrl.question.comment = _.last(response.data.data) ? _.last(response.data.data).comment : "";
    });
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.submitReview = function () {
        ctrl.reviewStatus.state = "submit";
        $mdDialog.hide();
    };
    ctrl.continueReview = function () {
        ctrl.reviewStatus.state = "continue";
        $mdDialog.hide();
    };
    ctrl.returnToQuestion = function () {
        $mdDialog.hide();
    };
    // ctrl.openReview = function(ev) {
    //     $mdDialog.show({
    //         templateUrl: 'app/js/qb-question-review-view/qb-question-review-view.template.html',
    //         targetEvent: ev,
    //         controller: 'questionReviewViewController',
    //         controllerAs: '$ctrl',
    //         bindToController: true,
    //         locals: {
    //             question: ctrl.question,
    //         }
    //     }).then(function() {
    //         if (!_.isEmpty(ctrl.question.comment)) {
    //             ctrl.comment = {
    //                 ownerId: ctrl.question.id,
    //                 comment: ctrl.question.comment,
    //                 category: 'Question'
    //             };
    //             commentService.addComment(ctrl.comment);
    //             notifier.notify('load-assignment-comments', {});
    //         }
    //         if (ctrl.question.status === "Approved" && (userService.isAdmin() || userService.isEditor())) {
    //             questionService.approve([ctrl.question.id]).then((response) => {
    //                 if (_.isEqual(response.data.status, 'success')) {
    //                     notifier.notify('load-assignment-details', {});
    //                     $mdToast.show(
    //                         $mdToast.simple()
    //                         .textContent("Question Approved!")
    //                         .parent(document.body)
    //                         .hideDelay(1000)
    //                         .position('top right')
    //                         ).then(() => {
    //                         ctrl.reviewStatus.state == "done"
    //                         $mdDialog.hide();
    //                     });
    //                 }
    //             });
    //         } else if (ctrl.question.status === "Draft" && (userService.isAdmin() || userService.isEditor())) {
    //             questionService.disapprove([ctrl.question.id]).then((response) => {
    //                 if (_.isEqual(response.data.status, 'success')) {
    //                     notifier.notify('load-assignment-details', {});
    //                     $mdToast.show(
    //                         $mdToast.simple()
    //                         .textContent("Question Rejected!")
    //                         .parent(document.body)
    //                         .hideDelay(1000)
    //                         .position('top right')
    //                         ).then(() => {
    //                         ctrl.reviewStatus.state == "done"
    //                         $mdDialog.hide();
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // };
    ctrl.requestRevisions = function (ev) {
        $mdDialog.show({
            templateUrl: 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.template.html',
            targetEvent: ev,
            controller: 'qbAssignmentCreateDialogController',
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                items: [ctrl.question],
                assignment: {
                    assignees: [],
                    items: [ctrl.question],
                    kind: assignmentKindConstants.QUESTION_REVISION
                }
            }
        }).then(function () {}).finally(function () {});
    };
}]);
'use strict';

// Define the  module

angular.module('qbQuestionReviewCommentsSwitchlist', []);
'use strict';

angular.module('qbQuestionReviewCommentsSwitchlist').component('qbQuestionReviewCommentsSwitchlist', {
    templateUrl: 'app/js/qb-question-review-comments-switchlist/qb-question-review-comments-switchlist.template.html',
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

angular.module('qbAssignmentDetailsDialog').controller('qbAssignmentDetailsDialogController', ["$scope", "$mdDialog", "$mdToast", "Notifier", "Assignment", "User", function ($scope, $mdDialog, $mdToast, notifier, assignmentService, userService) {
    var ctrl = this;
    ctrl.cancel = function () {
        $mdDialog.hide();
    };
    ctrl.$onInit = function () {
        ctrl.isAdmin = userService.isAdmin();
        ctrl.isEditor = userService.isEditor();
        assignmentService.getAssignment(ctrl.assignmentId).then(function (response) {
            if (response.data.status === "success") {
                angular.merge(ctrl.assignment, response.data.data);
            }
        });
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
    templateUrl: 'app/js/qb-question-create-header/qb-question-create-header.template.html',
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
    templateUrl: 'app/js/qb-question-create-form/qb-question-create-form.template.html',
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
                    notifier.notify('load-assignment-details', {});
                    $mdDialog.hide();
                }
            });
        };
        ctrl.showQuestionInformation = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-information/qb-question-information.template.html',
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
                    templateUrl: 'app/js/qb-question-add-image/qb-question-add-image.template.html',
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
                templateUrl: 'app/js/qb-question-add-video/qb-question-add-video.template.html',
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
            ctrl.question.status = questionConstants.DRAFT;
            $timeout(function () {
                ctrl.save();
            }, 1);
        };
        ctrl.saveAsFinal = function (event) {
            ctrl.validation = ctrl.checkInvalidFinal(ctrl.question);
            if (ctrl.validation.length > 0) {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-validation-dialog/qb-validation-dialog.template.html',
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

angular.module('qbCreateQuestionAssignmentsDialog', ['qbQuestionEdit', 'qbQuestionCreateAssignments']);
'use strict';

angular.module('qbCreateQuestionAssignmentsDialog').controller('qbCreateQuestionAssignmentsDialog', ["$scope", "$mdDialog", "$mdToast", "Notifier", function ($scope, $mdDialog, $mdToast, notifier) {
    var ctrl = this;
}]);
'use strict';

// Define the  module

angular.module('qbQuestionCreateAssignments', ['qbQuestionDetails', 'qbQuestionTag', 'qbQuestionReferences', 'qbQuestionRevision', 'qbQuestionHistory', 'qbQuestionInformation', 'qbValidationDialog', 'ngMessages']);
'use strict';

angular.module('qbQuestionCreateAssignments').component('qbQuestionCreateAssignments', {
    templateUrl: 'app/js/qb-question-create-assignments/qb-question-create-assignments.template.html',
    bindings: {
        assignment: "<"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$location", "$mdToast", "$routeParams", "Util", "Question", "User", "Media", "Assignment", "Notifier", "QB_QUESTION", "QB_QUESTION_TYPE", function ($mdDialog, $scope, $element, $timeout, $location, $mdToast, $routeParams, util, questionService, userService, mediaService, assignmentService, notifier, questionConstants, questionTypeConstants) {
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
            ctrl.assignmentId = ctrl.assignment.id;
            if (ctrl.assignmentId) {
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
                    ctrl.cancel();
                }
            });
        };
        ctrl.showQuestionInformation = function (ev) {
            $mdDialog.show({
                templateUrl: 'app/js/qb-question-information/qb-question-information.template.html',
                targetEvent: ev,
                controller: 'questionInformationController',
                controllerAs: 'infoCtrl',
                bindToController: true,
                skipHide: true
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
                    templateUrl: 'app/js/qb-question-add-image/qb-question-add-image.template.html',
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
                templateUrl: 'app/js/qb-question-add-video/qb-question-add-video.template.html',
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
                        };
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
            };
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
            ctrl.question.status = questionConstants.DRAFT;
            $timeout(function () {
                ctrl.save();
            }, 1);
        };
        ctrl.saveAsFinal = function (event) {
            ctrl.validation = ctrl.checkInvalidFinal(ctrl.question);
            if (ctrl.validation.length > 0) {
                $mdDialog.show({
                    templateUrl: 'app/js/qb-validation-dialog/qb-validation-dialog.template.html',
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
        ctrl.cancel = function () {
            $mdDialog.cancel();
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbReports', ['qbQuestionTag', 'qbTableSearchBar']);
'use strict';

angular.module('qbReports').component('qbReports', {
    templateUrl: 'app/js/qb-reports/qb-reports.template.html',
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
                var results = response.data.data;
                defer.resolve(results);
            });
            return defer.promise;
        }

        function questionCustomSearch(query) {
            var defer = $q.defer();
            questionService.searchQuestionByCustomId(query).then(function (response) {
                var results = response.data.data;
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
            report.bankCutomId = $filter('inverseNumberFixedLen')(_.pluck(ctrl.selectedBankIds, 'value')[0]);
            report.customId = $filter('inverseNumberFixedLen')(_.pluck(ctrl.selectedQuestionIds, 'value')[0]);
            report.statuses = [];
            report.tags = [];
            if (ctrl.selectedStatuses) {
                ctrl.selectedStatuses.forEach(function (d) {
                    report.statuses.push(d.status);
                });
            };
            ctrl.topic.topics.forEach(function (topic) {
                if (topic.selected) report.tags.push(topic.name);
            });
            if (parseInt(ctrl.report.timesUsed, 10)) {
                report.timesUsed = parseInt(ctrl.report.timesUsed, 10);
            } else {
                delete report.timesUsed;
            }
            reportService.generateReport(report).then(function (response) {
                if (response.data.status === "success") {
                    var href = response.data.data.url;
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
            });
        };
    }]
});
'use strict';

// Define the  module

angular.module('qbAssignmentCreateHeader', []);
'use strict';

angular.module('qbAssignmentCreateHeader').component('qbAssignmentCreateHeader', {
    templateUrl: 'app/js/qb-assignment-create-header/qb-assignment-create-header.template.html',
    bindings: {
        items: "=",
        assignmentId: "=",
        assignment: "=",
        formControl: "=",
        formName: "<",
        onSuccess: "&",
        onCancel: "&"
    },
    controller: ["$mdDialog", "$scope", "$element", "$timeout", "$route", "$location", "$mdToast", "$filter", "$routeParams", "Question", "User", "Assignment", "Media", "State", "QB_QUESTION", "QB_ASSIGNMENT", "QB_ASSIGNEE", "QB_QUESTION_TYPE", "QB_ASSIGNMENT_KIND", function ($mdDialog, $scope, $element, $timeout, $route, $location, $mdToast, $filter, $routeParams, questionService, userService, assignmentService, mediaService, stateService, questionConstants, assignmentConstants, assigneeConstants, questionTypeConstants, assignmentKindConstants) {
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
            var ids = _.pluck(response.data.items, "id");
            questionService.review(ids).then(function () {
                createSuccess('Assignment assigned successfully');
                ctrl.inProgress = false;
            });
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
            $mdDialog.cancel();
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
            if (ctrl.formName.$name === "assignmentDialogForm") $mdDialog.hide();else {
                $location.url('/assignments');
            }
        };
        var createSuccess = function createSuccess(message) {
            $mdToast.show($mdToast.simple().textContent(message).parent(document.body).hideDelay(3000).position('top right'));
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

angular.module('qbAssignmentCreateDialog').controller('qbAssignmentCreateDialogController', ["$scope", "$mdDialog", "QB_ASSIGNMENT_KIND", "QB_ASSIGNEE", function ($scope, $mdDialog, assignmentKindConstants, assigneeConstants) {
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
        $mdDialog.hide();
    };
    ctrl.onCancel = function () {
        debugger;
        $mdDialog.hide();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbQuestionFilterDialog', ['qbCriteria', 'qbCriteriaAdd', 'qbSelectStatesDialog', 'qbSelectFieldsDialog']);
'use strict';

angular.module('qbQuestionFilterDialog').controller('qbQuestionFilterDialogController', ["$scope", "$mdDialog", "$mdToast", "$q", "$filter", "Notifier", "Tag", "Question", function ($scope, $mdDialog, $mdToast, $q, $filter, notifier, tagService, questionService) {
    var ctrl = this;
    ctrl.search = {};
    ctrl.allCriteria = {};
    ctrl.searchText = null;
    ctrl.selectedQuestionIds = [];
    ctrl.selectedQuestion = null;
    ctrl.query = null;
    ctrl.questionCustomSearch = questionCustomSearch;

    function questionCustomSearch(query) {
        var defer = $q.defer();
        questionService.searchQuestionByCustomId(query).then(function (response) {
            var results = response.data.data;
            defer.resolve(results);
        });
        return defer.promise;
    }

    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.filter = function () {
        ctrl.search.customId = $filter('inverseNumberFixedLen')(_.pluck(ctrl.selectedQuestionIds, 'value')[0]);
        console.log("Search", ctrl.search);
        $mdDialog.hide();
    };
    ctrl.selectStates = function (event) {
        $mdDialog.show({
            templateUrl: 'app/js/qb-select-states-dialog/qb-select-states-dialog.template.html',
            targetEvent: event,
            controller: 'qbSelectStatesDialog',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                search: ctrl.search
            }
        }).then(function () {
            console.log(ctrl.search.selectedStates);
        });
    };
    ctrl.selectFields = function () {
        ctrl.fieldsToFilter = ctrl.fields;
        $mdDialog.show({
            templateUrl: 'app/js/qb-select-fields-dialog/qb-select-fields-dialog.template.html',
            targetEvent: event,
            controller: 'qbSelectFieldsDialog',
            controllerAs: '$ctrl',
            bindToController: true,
            skipHide: true,
            locals: {
                fields: ctrl.fieldsToFilter,
                search: ctrl.search
            }
        }).then(function () {
            console.log(ctrl.search.selectedFields);
        });
    };

    ctrl.selectTags = function (event) {
        tagService.getClass().then(function (response) {
            ctrl.tags = response.data.data;
            var promises = {};
            ctrl.tags.forEach(function (tag) {
                promises[tag.name] = tagService.getTaxonomies(tag.id);
            });
            $q.all(promises).then(function (values) {
                ctrl.allCriteria = values;
                $mdDialog.show({
                    templateUrl: 'app/js/qb-criteria/qb-criteria.template.html',
                    targetEvent: event,
                    controller: 'criteriaController',
                    controllerAs: '$ctrl',
                    bindToController: true,
                    skipHide: true,
                    locals: {
                        data: ctrl.allCriteria,
                        hideType: false
                    }
                }).then(function () {
                    ctrl.criteria = {};
                    ctrl.tags.forEach(function (tag) {
                        ctrl.criteria[tag.name] = $filter('filter')(ctrl.allCriteria[tag.name].data.data, {
                            selected: true
                        });
                        ctrl.search[tag.name.toLowerCase()] = _.pluck(ctrl.criteria[tag.name], "name");
                    });
                });
            });
        });
    };

    ctrl.removeData = function (dataArray, arrayItem) {
        dataArray.splice(dataArray.indexOf(arrayItem), 1);
    };
}]);
'use strict';

// Define the  module

angular.module('qbSelectStatesDialog', []);
'use strict';

angular.module('qbSelectStatesDialog').controller('qbSelectStatesDialog', ["$scope", "$mdDialog", "QB_QUESTION", function ($scope, $mdDialog, questionConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.states = [{
            status: questionConstants.DONE,
            selected: false
        }, {
            status: questionConstants.DRAFT,
            selected: false
        }, {
            status: questionConstants.SUBMITTED,
            selected: false
        }, {
            status: questionConstants.EDITORIAL,
            selected: false
        }, {
            status: questionConstants.INREVIEW,
            selected: false
        }, {
            status: questionConstants.APPROVED,
            selected: false
        }];
    };
    ctrl.addStates = function () {
        ctrl.search.selectedStates = [];
        ctrl.states.forEach(function (state) {
            if (state.selected) ctrl.search.selectedStates.push(state.status);
        });
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.$onInit();
}]);
'use strict';

// Define the  module

angular.module('qbSelectFieldsDialog', []);
'use strict';

angular.module('qbSelectFieldsDialog').controller('qbSelectFieldsDialog', ["$scope", "$mdDialog", "QB_QUESTION", function ($scope, $mdDialog, questionConstants) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    ctrl.addFields = function () {
        ctrl.search.selectedFields = [];
        ctrl.fields.forEach(function (field) {
            if (field.selected) ctrl.search.selectedFields.push(field.field);
        });
        $mdDialog.hide();
    };
    ctrl.cancel = function () {
        $mdDialog.cancel();
    };
    ctrl.$onInit();
}]);
"use strict";

var QUESTION_URL = "http://117.232.72.154:8081/api/v1.0/questions/";
var USER_URL = "http://117.232.72.154:8081/api/v1.0/users/";
var ROLE_URL = "http://117.232.72.154:8081/api/v1.0/roles/";
var TAG_URL = "http://117.232.72.154:8081/api/v1.0/tags/";
var VERSION_URL = "http://117.232.72.154:8081/api/v1.0/versions/";
var MEDIA_URL = "http://117.232.72.154:8081/api/v1.0/medias/";
var ASSIGNMENT_URL = "http://117.232.72.154:8081/api/v1.0/assignments/";
var ASSIGNMENT_ORCHESTRATOR_URL = "http://117.232.72.154:8081/api/v1.0/orchestrator-assignments/";
var COMMENT_URL = "http://117.232.72.154:8081/api/v1.0/comments/";
var REVIEW_URL = "http://117.232.72.154:8081/api/v1.0/reviews/";
var BANK_URL = "http://117.232.72.154:8081/api/v1.0/orchestrator-questionbanks/";
var COMMENT_ORCHESTRATOR_URL = "http://117.232.72.154:8081/api/v1.0/orchestrator-comments/";
var LOGGING_URL = "http://117.232.72.154:8081/api/v1.0/orchestrator-logentries/";
var MEDIA_ORCHESTRATOR_URL = "http://117.232.72.154:8081/api/v1.0/orchestrator-medias/";
var QUESTION_ORCHESTRATOR_URL = "http://117.232.72.154:8081/api/v1.0/orchestrator-questions/";
var CONFIGURATION_URL = "http://117.232.72.154:8081/api/v1.0/configurations/";
var EXPORT_URL = "http://117.232.72.154:8081/api/v1.0/exports/";
var NOTIFICATION_URL = "http://117.232.72.154:8081/api/v1.0/notifications/";
var REPORT_URL = "http://117.232.72.154:8081/api/v1.0/reports/";