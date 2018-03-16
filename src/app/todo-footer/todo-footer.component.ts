import { Component, OnInit } from '@angular/core';

import { TodoModel } from './../todo.model';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  public todos: TodoModel[] = [];

  public currentStatus: any;

  constructor(
    private _todoService: TodoService
  ) { }

  ngOnInit() {
    this._todoService.todos.subscribe((todos: TodoModel[]) => {
      this.todos = todos;
    });
  }

  public getRemainingCount(): number {
    const remainingTodos = this.todos.filter((todo: TodoModel) => {
      return todo.completed === false;
    });

    return remainingTodos.length;
  }

  public hasCompleted(): boolean {
    const remainingTodos = this.todos.filter((todo: TodoModel) => {
      return todo.completed === false;
    });

    return remainingTodos.length === 0;
  }

  public removeCompleted(): void {

  }

}
