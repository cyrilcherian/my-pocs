import {ToDoInject} from "./todo-inject";
import {TodoCreateModule} from "../todo-create/todo-create.module";
import {
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';

@NgModule({
    declarations: [ToDoInject],
    imports: [ BrowserModule, TodoCreateModule],
    exports: [ToDoInject]
})
export class TodoInjectModule {}
