import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';

import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('todoAnimation', [
      transition('void => *', [
        style({ height: 0 }),
        animate('0.3s ease-in', style({ height: '*' }))
      ]),
      transition('* => void', [
        animate('0.3s ease-out', style({ transform: 'scale(0)' }))
      ]),
    ])
  ]
})
export class TodoItemComponent {

  @Input() todo: TodoModel;

  @Output() itemModified = new EventEmitter();

  @Output() itemRemoved = new EventEmitter();

  public editing = false;

  @HostBinding('@todoAnimation') true;

  public edit() {
    this.editing = true;
  }

  public cancelEditing() {
    this.editing = false;
  }

  public stopEditing(editedTitle) {
    if (this.editing) {
      this.editing = false;
      this.todo.setTitle(editedTitle.value);
      if (this.todo.title.length === 0) {
        this.remove();
      } else {
        this.update();
      }
    }
  }

  public toggleCompletion() {
    this.todo.completed = !this.todo.completed;
    this.update();
  }

  public remove() {
    this.itemRemoved.next(this.todo.id);
  }

  public update() {
    this.itemModified.next(this.todo);
  }

}
