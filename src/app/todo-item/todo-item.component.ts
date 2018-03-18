import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding, OnInit, HostListener } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';

import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('todoAnimation', [
      transition('void => fadeIn', [
        style({ height: 0 }),
        animate('0.2s ease-in', style({ height: '*' }))
      ]),
      transition('* => fadeOut', [
        animate('0.2s 0.1s ease-out', style({ opacity: 0, transform: 'translateX(100%)' }))
      ]),
    ])
  ]
})
export class TodoItemComponent implements OnInit {

  @Input() todo: TodoModel;

  @Output() itemModified = new EventEmitter();

  @Output() itemRemoved = new EventEmitter();

  public editing = false;

  @HostBinding('@todoAnimation') state;

  @HostListener('@todoAnimation.done', ['$event']) onAnimationDone($event: AnimationEvent) {
    if ($event.toState === 'fadeOut') {
      this.itemRemoved.next(this.todo.id);
    }
  }

  ngOnInit() {
    this.state = 'fadeIn';
  }

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
    this.state = 'fadeOut';
  }

  public update() {
    this.itemModified.next(this.todo);
  }

}
