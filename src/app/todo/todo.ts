import { Component, inject } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';
import { TodoService } from '../todo-service';
import { TodoItemInfo } from '../todo-item-info';

@Component({
  selector: 'app-todo',
  imports: [TodoItem],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  todoItems: TodoItemInfo[] = [];
  todoService: TodoService = inject(TodoService);

  constructor() {
    this.todoItems = this.todoService.getAllTodos();
  }
}
