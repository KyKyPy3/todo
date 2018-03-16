import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: TodoModel;

  constructor() { }

  ngOnInit() {
  }

}
