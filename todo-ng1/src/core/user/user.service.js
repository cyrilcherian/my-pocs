'use strict';

angular.
    module('core.user').
    factory('User', ['$http', '$timeout',
        function ($http, $timeout) {
            var users = [{ "id": 1, "name": "Cyril" },
            { "id": 2, "name": "Sreeragh" },
            { "id": 3, "name": "Tia" }];
            return ({
                get: get,
                getAll: getAll,
                add: add,
                getTest: getTest
            });

            function getTest() {
                $http({
                    method: 'GET',
                    url: 'http://10.4.3.236:8183/order/customer/1/product/2?amount=100'
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
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
