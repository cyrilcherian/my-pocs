import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from '../todo-list/type2/todo-list.component';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { TodoCreateComponent } from '../todo-create/todo-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo-list', pathMatch: 'full' },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'todo-edit/:id', component: TodoEditComponent },
  { path: 'todo-create', component: TodoCreateComponent }
];

export const RoutingModule = RouterModule.forRoot(routes, { useHash: true });
