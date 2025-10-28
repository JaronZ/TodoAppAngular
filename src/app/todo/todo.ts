import { Component } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo',
  imports: [TodoItem],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  date = new Date();
}
