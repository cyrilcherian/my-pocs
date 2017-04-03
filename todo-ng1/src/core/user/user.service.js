'use strict';

angular.
    module('core.user').
    factory('User', ['$http','$timeout',
        function ($http, $timeout) {
            var users = [{ "id": 1, "name": "Cyril" },
            { "id": 2, "name": "Sreeragh" },
            { "id": 3, "name": "Tia" }];
            return ({
                get: get,
                getAll: getAll,
                add: add
            });
            

            function getAll() {
                let p = new Promise((resolve) =>
                    $timeout(() => resolve(users), 1000)
                )
                return p;
            }
            function get(id) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        let user = users.find((d) => { return d.id == id });
                        resolve(user)
                    }, 100)
                )
                return p;
            }
            function add(user) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        user.id = users.length + 1;
                        users.push(user);
                        resolve(user)
                    }, 500)
                )
                return p;
            }

        }
    ]);
