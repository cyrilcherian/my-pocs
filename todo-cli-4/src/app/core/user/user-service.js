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
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.users = [{ "id": 1, "name": "Cyril" },
            { "id": 2, "name": "Sreeragh" },
            { "id": 3, "name": "Tia" }];
    }
    UserService.prototype.getAll = function () {
        var _this = this;
        var p = new Promise(function (resolve) {
            return setTimeout(function () { return resolve(_this.users); }, 500);
        });
        return Observable_1.Observable.fromPromise(p).map(function (responseData) {
            return responseData;
        });
    };
    UserService.prototype.get = function (id) {
        var _this = this;
        var p = new Promise(function (resolve) {
            return setTimeout(function () {
                var user = _this.users.find(function (d) { return d.id == id; });
                resolve(user);
            }, 500);
        });
        return Observable_1.Observable.fromPromise(p).map(function (responseData) {
            return responseData;
        });
    };
    UserService.prototype.add = function (user) {
        var _this = this;
        var p = new Promise(function (resolve) {
            return setTimeout(function () {
                user.id = _this.users.length + 1;
                _this.users.push(user);
                resolve(user);
            }, 500);
        });
        return Observable_1.Observable.fromPromise(p).map(function (responseData) {
            return responseData;
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map