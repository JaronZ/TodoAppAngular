import {Component, inject, signal, WritableSignal} from '@angular/core';
import { TodoItem } from '../todo-item/todo-item';
import { TodoItemInfo } from '../todo-item-info';
import { RouterLink } from '@angular/router';
import {TODO_SERVICE} from '../token';

@Component({
  selector: 'app-todo',
  imports: [TodoItem, RouterLink],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  todoItems: WritableSignal<TodoItemInfo[]> = signal([]);
  todoService = inject(TODO_SERVICE);

  constructor() {
    this.todoService.getAllTodos().then((tasks) => {
      this.todoItems.update(() => tasks);
    });
  }

  async deleteTodo(id: string) {
    await this.todoService.deleteTodo(id);
    this.todoItems.update(todos => todos.filter((item) => item.id !== id));
  }
}
