import { Component } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';
import { TodoItemInfo } from '../todo-item-info';

@Component({
  selector: 'app-todo',
  imports: [TodoItem],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  info: TodoItemInfo = {
    id: 1,
    name: "Homework",
    date: new Date()
  };
}
