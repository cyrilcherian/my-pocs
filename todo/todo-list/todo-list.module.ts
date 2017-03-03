import {ToDoList} from "./todo-list";
import {TodoInjectModule} from "../todo-inject/todo-inject.module";
import {
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ToDoList],
    imports: [BrowserModule, FormsModule, TodoInjectModule],
    exports: [ToDoList]
})
export class TodoListModule { }
