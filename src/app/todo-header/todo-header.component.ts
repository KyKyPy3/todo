import { Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoHeaderComponent {

  @ViewChild('newTodo') public newTodoEl: ElementRef;

  constructor(
    private _todoService: TodoService
  ) { }

  public addTodo(title: string): void {
    this._todoService.add(title);
    this.newTodoEl.nativeElement.value = '';
  }

}
