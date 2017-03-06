import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoCreateModule } from './todo-create/todo-create.module';
import { TodoEditModule } from './todo-edit/todo-edit.module';
import { TodoListModule } from './todo-list/type2/todo-list.module';
import { CoreModule } from "./core/core.module";
import { RoutingModule } from './routes/routes.type2';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    RoutingModule,
    TodoEditModule,
    TodoCreateModule,
    TodoListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModuleB { }
