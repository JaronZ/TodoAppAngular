import { Component, input, output } from '@angular/core';
import { TodoItemInfo } from '../todo-item-info';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  imports: [
    RouterLink
  ],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  info = input.required<TodoItemInfo>();
  delete = output<void | Promise<void>>();
}
