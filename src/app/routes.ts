import { TodoListComponent } from './todo-list/todo-list.component';

export let routes = [
  { path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: 'active', component: TodoListComponent, data: { status: 'active' } },
  { path: 'completed', component: TodoListComponent, data: { status: 'completed' } }
];
