import { Injectable } from '@angular/core';
import { TodoItemInfo } from './todo-item-info';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = "http://localhost:3000/tasks";

  async getAllTodos(): Promise<TodoItemInfo[]> {
    const data = await fetch(this.url);
    return ((await data.json()) ?? []).map(this.transformTask);
  }

  async getTodoById(id: number): Promise<TodoItemInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const taskJson = await data.json();
    return taskJson[0] ? this.transformTask(taskJson[0]) : undefined;
  }

  submitTodo(todoItemInfo: TodoItemInfo) {
    console.log(todoItemInfo);
  }

  private transformTask(task: any): TodoItemInfo {
    return {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      description: task.description,
    };
  }
}
