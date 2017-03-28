import {TaskService} from "../core/task/task-service";
import {UserService} from "../core/user/user-service";
import {Router} from "@angular/router";

export class TodoListBase{
  tasks: Array<any>;
  users: Array<any> = [];
  selected: any;
  constructor(public taskService: TaskService, public userService: UserService, public router: Router) { }

  create() {
      this.router.navigate(['/todo-create']);
  }
  userSelected() {
      this.taskService.getAll().subscribe(data => {
        let tasks = data as Array<any>;
        if (this.selected.id == 0) {
          this.tasks = tasks;
          return;
        }
        this.tasks = tasks.filter((task) => {
          return task.user_id == this.selected.id;
        });
      });
  }
}
