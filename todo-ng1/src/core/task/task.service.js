'use strict';

angular.
    module('core.task').
    factory('Task', ['$http',
        function ($http, $resource) {
            var tasks = [{ "id": 1, "description": "reading angular 2", "done": false, user_id: 1 },
            { "id": 2, "description": "making angular 1 demo", "done": true, user_id: 1 },
            { "id": 3, "description": "making POC on angular 2", "done": false, user_id: 2 }];
            return ({
                get: get,
                getAll: getAll,
                add: add,
                getHTML: getHTML
            });
            function getAll() {
                let p = new Promise((resolve) =>
                    setTimeout(() => resolve(tasks), 100)
                )
                return p;
            }
            function get(id) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        let task = tasks.find((d) => { return d.id == id });
                        console.log(task)
                        resolve(task)
                    }, 100)
                )
                return p;
            }
            function add(task) {
                let p = new Promise((resolve) =>
                    setTimeout(() => {
                        task.id = tasks.length + 1;
                        tasks.push(task);
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
