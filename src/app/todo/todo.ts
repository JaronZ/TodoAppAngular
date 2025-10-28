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
  items: TodoItemInfo[] = [
    {
      id: 1,
      name: "Buy groceries",
      dueDate: new Date('2024-07-01'),
    },
    {
      id: 2,
      name: "Walk the dog",
      dueDate: new Date('2024-07-02'),
    }
  ];
}
