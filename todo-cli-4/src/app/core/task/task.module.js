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
var core_1 = require('@angular/core');
var task_service_1 = require('./task-service');
var http_1 = require('@angular/http');
var TaskModule = (function () {
    function TaskModule() {
    }
    TaskModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [http_1.HttpModule],
            providers: [task_service_1.TaskService]
        }), 
        __metadata('design:paramtypes', [])
    ], TaskModule);
    return TaskModule;
}());
exports.TaskModule = TaskModule;
//# sourceMappingURL=task.module.js.map