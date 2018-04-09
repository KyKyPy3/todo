import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { query, useAnimation, transition, style, trigger, animate, animateChild } from '@angular/animations';

import { map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { TodoService } from './../todo.service';
import { TodoModel } from './../todo.model';
import { enterAnimation, leaveAnimation} from './todo.animations';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('todoList', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ]),
    trigger('todoItem', [
      transition(':enter', [
        useAnimation(enterAnimation)
      ]),
      transition(':leave', [
        useAnimation(leaveAnimation)
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {

  public loaded = false;

  public percentageValue = 0;

  public disableAnimation = false;

  private todos: TodoModel[] = [];

  private _lastStatus: string;

  constructor(
    private _todoService: TodoService,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    combineLatest(
      this._route.params.pipe(map(params => params.status)),
      this._todoService.todos
    )
    .subscribe(([status, todos]) => {
      if (this._lastStatus !== status) {
        this.loaded = false;
        this.percentageValue = 0;
      } else {
        if (this._lastStatus !== status) {
          this.disableAnimation = true;
        }

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

        if (this._lastStatus !== status) {
          setTimeout(() => {
            this.disableAnimation = false;
          }, 0);
        }
      }

      const interval = setInterval(() => {
        if (this.percentageValue >= 100) {
          this.loaded = true;
          clearInterval(interval);

          if (this._lastStatus !== status || !status) {
            this.disableAnimation = true;
          }

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

          if (this._lastStatus !== status || !status) {
            setTimeout(() => {
              this.disableAnimation = false;
            }, 0);
          }

          this._lastStatus = status;
        } else {
          this.percentageValue = this.percentageValue + 20;
        }
      }, 777);
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
