"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/observable/fromPromise');
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.tasks = [{ "id": 1, "description": "reading angular 2", "done": false, user_id: 1 },
            { "id": 2, "description": "making angular 1 demo", "done": true, user_id: 1 },
            { "id": 3, "description": "making POC on angular 2", "done": false, user_id: 2 }];
    }
    TaskService.prototype.getAll = function () {
        var _this = this;
        var p = new Promise(function (resolve) {
            return setTimeout(function () { return resolve(_this.tasks); }, 500);
        });
        return Observable_1.Observable.fromPromise(p).map(function (responseData) {
            return responseData;
        });
    };
    TaskService.prototype.get = function (id) {
        var _this = this;
        var p = new Promise(function (resolve) {
            return setTimeout(function () {
                var task = _this.tasks.find(function (d) { return d.id == id; });
                console.log(task);
                resolve(task);
            }, 100);
        });
        return Observable_1.Observable.fromPromise(p).map(function (responseData) {
            return responseData;
        });
    };
    TaskService.prototype.add = function (task) {
        var _this = this;
        var p = new Promise(function (resolve) {
            return setTimeout(function () {
                task.id = _this.tasks.length + 1;
                _this.tasks.push(task);
                resolve(task);
            }, 100);
        });
        return Observable_1.Observable.fromPromise(p).map(function (responseData) {
            return responseData;
        });
    };
    TaskService.prototype.getHTML = function () {
        var p = new Promise(function (resolve) {
            return setTimeout(function () {
                var html = "<div><todo-create></todo-create></div>";
                resolve(html);
            }, 5000);
        });
        return Observable_1.Observable.fromPromise(p).map(function (responseData) {
            return responseData;
        });
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task-service.js.map