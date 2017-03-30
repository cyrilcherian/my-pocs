'use strict';

angular.
    module('core.bank').
    factory('Bank', ['$http', '$resource',
        function ($http, $resource) {
            return ({
                get: get,
                getAll: getAll,
                add: add,
                getHTML: getHTML
            });
            var tasks = [{ "id": 1, "description": "reading angular 2", "done": false, user_id: 1 },
            { "id": 2, "description": "making angular 1 demo", "done": true, user_id: 1 },
            { "id": 3, "description": "making POC on angular 2", "done": false, user_id: 2 }];
            function getAll() {
                let p = new Promise((resolve) =>
                    setTimeout(() => resolve(this.tasks), 100)
                )
                return p;
            }
            function get(id) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        let task = this.tasks.find((d) => { return d.id == id });
                        console.log(task)
                        resolve(task)
                    }, 100)
                )
                return p;
            }
            function add(task) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        task.id = this.tasks.length + 1;
                        this.tasks.push(task);
                        resolve(task)
                    }, 100)
                )
                return p;
            }
            function getHTML() {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        let html = "<div><todo-create></todo-create></div>";
                        resolve(html)
                    }, 5000)
                )
                return p;
            }
        }
    ]);
