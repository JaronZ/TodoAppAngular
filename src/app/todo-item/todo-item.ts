import { Component, input } from '@angular/core';
import { TodoItemInfo } from '../todo-item-info';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  info = input.required<TodoItemInfo>();
}
