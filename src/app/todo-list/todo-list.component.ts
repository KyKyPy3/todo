import { TodoModel } from './../todo.model';
import { Component, OnInit } from '@angular/core';

import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todos: TodoModel[] = [];

  constructor(
    private _todoService: TodoService
  ) { }

  ngOnInit() {
    this._todoService.todos.subscribe((todos: TodoModel[]) => {
      this.todos = todos;
    });
  }

  public allCompleted(): boolean {
    const notCompleted = this.todos.filter((todo: TodoModel) => {
      return todo.completed === false;
    });

    return notCompleted.length === 0;
  }

  public setAllTo(completed: any): void {
    this._todoService.setCompletedToAll(completed.checked);
  }

}
