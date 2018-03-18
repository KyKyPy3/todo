import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators/map';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

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
    private _todoService: TodoService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    combineLatest(
      this._route.params.pipe(map(params => params.status)),
      this._todoService.todos
    ).subscribe(([status, todos]) => {
      this.currentStatus = status || '';
      this.todos = todos;
    });
  }

  public getRemainingCount(): number {
    return this.todos.filter((todo: TodoModel) => {
      return todo.completed === false;
    }).length;
  }

  public hasCompleted(): boolean {
    return this.todos.filter((todo: TodoModel) => {
      return todo.completed === true;
    }).length !== 0;
  }

  public removeCompleted(): void {
    this._todoService.removeCompleted();
  }

}
