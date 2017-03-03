/**
 * A basic hello-world Angular 2 app
 */
import {
    Component,
    Input,
    Output,
    OnInit,
    OnDestroy,
    NgModule,
    Compiler,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {TaskService} from "../core/task/task-service";
import {UserService} from "../core/user/user-service";
import { ActivatedRoute, Router } from '@angular/router';
import { TodoCreateModule } from "../todo-create/todo-create.module";

@Component({
    selector: 'todo-inject',
    templateUrl: "todo-inject/todo-inject.html"
})
export class ToDoInject implements OnInit, OnDestroy {
    theHtmlString = "";
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
    constructor(private compiler: Compiler, private router: Router, private taskService: TaskService, private userService: UserService, private route: ActivatedRoute) {
        this.theHtmlString = "<p>cyril</p>";
        taskService.getHTML().subscribe(data => {
            console.log(data);
            this.theHtmlString = data as string;
            this.addComponent(this.theHtmlString);
        });
    }
    private addComponent(template: string) {
        @Component({ template: template })
        class TemplateComponent { }

        @NgModule({
            declarations: [TemplateComponent],
            imports: [TodoCreateModule]
        })
        class TemplateModule { }

        const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        const factory = mod.componentFactories.find((comp) => {
              console.log(comp.componentType, TemplateComponent);
              return comp.componentType === TemplateComponent
            }
        );

        this.container.createComponent(factory);
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
}
