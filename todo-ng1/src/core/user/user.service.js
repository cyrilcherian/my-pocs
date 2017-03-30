'use strict';

angular.
    module('core.user').
    factory('User', ['$http', '$resource',
        function () {
            return ({
                get: get,
                getAll: getAll,
                add: add
            });
            var users = [{ "id": 1, "name": "Cyril" },
            { "id": 2, "name": "Sreeragh" },
            { "id": 3, "name": "Tia" }];
            function getAll() {
                let p = new Promise((resolve) =>
                    setTimeout(() => resolve(this.users), 100)
                )
                return p;
            }
            function get(id) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        let user = this.users.find((d) => { return d.id == id });
                        resolve(user)
                    }, 100)
                )
                return p;
            }
            function add(user) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        user.id = this.users.length + 1;
                        this.users.push(user);
                        resolve(user)
                    }, 500)
                )
                return p;
            }

        }
    ]);
