import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators/map';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { TodoService } from './../todo.service';
import { TodoModel } from './../todo.model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private todos: TodoModel[] = [];

  constructor(
    private _todoService: TodoService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    combineLatest(
      this._route.params.pipe(map(params => params.status)),
      this._todoService.todos
    ).subscribe(([status, todos]) => {
      if (status === 'completed') {
        this.todos = todos.filter((todo: TodoModel) => {
          return todo.completed === true;
        });
      } else if (status === 'active') {
        this.todos = todos.filter((todo: TodoModel) => {
          return todo.completed === false;
        });
      } else {
        this.todos = todos;
      }
    });
  }

  public hasCompleted(): boolean {
    const completed = this.todos.filter((todo: TodoModel) => {
      return todo.completed === true;
    });

    return completed.length !== 0;
  }

  public setAllTo(completed: any): void {
    this._todoService.setCompletedToAll(completed.checked);
  }

  public remove(id: string): void {
    this._todoService.remove(id);
  }

  public update(todo: TodoModel): void {
    this._todoService.update(todo);
  }

  public trackById(index, item): number {
    return item.id;
  }

}
