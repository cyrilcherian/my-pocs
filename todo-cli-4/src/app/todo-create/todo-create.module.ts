import {TodoCreateComponent} from "./todo-create.component";
import {
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';

@NgModule({
    declarations: [TodoCreateComponent],
    imports: [BrowserModule, ReactiveFormsModule, FormsModule],
    exports: [TodoCreateComponent]
})
export class TodoCreateModule {}
