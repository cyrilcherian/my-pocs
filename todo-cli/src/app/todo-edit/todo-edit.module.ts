import {TodoEditComponent} from "./todo-edit.component";
import {
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';

@NgModule({
    declarations: [TodoEditComponent],
    imports: [ BrowserModule, ReactiveFormsModule, FormsModule],
    exports: [TodoEditComponent]
})
export class TodoEditModule {}
