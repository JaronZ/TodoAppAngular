import { Injectable } from '@angular/core';
import { TodoItemInfo } from './todo-item-info';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoItems: TodoItemInfo[] = [
    {
      id: 1,
      name: "Buy groceries",
      dueDate: new Date('2024-07-01'),
      description: "Milk, Bread, Eggs"
    },
    {
      id: 2,
      name: "Walk the dog",
      dueDate: new Date('2024-07-02'),
    }
  ];

  getAllTodos(): TodoItemInfo[] {
    return this.todoItems;
  }

  getTodoById(id: number): TodoItemInfo | undefined {
    return this.todoItems.find(item => item.id === id);
  }
}
