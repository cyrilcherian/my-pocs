/**
 * A basic hello-world Angular 2 app
 */
import {
    Component,
    Input,
    Output,
    OnInit
} from '@angular/core';
import {TaskService} from "../../core/task/task-service";
import {UserService} from "../../core/user/user-service";
import {Router} from "@angular/router";
import {TodoListBase} from "../todo-list.base"

@Component({
    selector: 'todo-list',
    templateUrl: "todo-list.component.html",
    styleUrls: [ 'todo-list.component.css']
})
export class TodoListComponent extends TodoListBase implements OnInit {
    tasks: Array<any>;
    users: Array<any>;
    selected: any;
    value: any;

    constructor(public taskService: TaskService, public userService: UserService, public router: Router) {
      super(taskService, userService, router);
    }
    ngOnInit() {
        this.taskService.getAll().subscribe(data => {
          this.tasks = data as Array<any>
          this.value = this.tasks[0];
          console.log(this.value)
        });
        this.userService.getAll().subscribe(data => {
            this.users = data as Array<any>;
            this.users = JSON.parse(JSON.stringify(this.users));
            let all = { "id": 0, "name": "All" };
            this.users.unshift(all);
            this.selected = all;
        });
    }
    edit() {
        console.log("Bingooooo");
        this.router.navigate(['/todo-edit', this.value.id]);
    }
}
