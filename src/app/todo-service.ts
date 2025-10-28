import { Injectable } from '@angular/core';
import {APITodoItemInfo, TodoItemInfo} from './todo-item-info';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = "http://localhost:3000/tasks";

  async getAllTodos(): Promise<TodoItemInfo[]> {
    const data = await fetch(this.url);
    return ((await data.json()) ?? []).map(this.transformTaskFromAPI);
  }

  async getTodoById(id: number): Promise<TodoItemInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const taskJson = await data.json();
    return taskJson ? this.transformTaskFromAPI(taskJson) : undefined;
  }

  async submitTodo(todoItemInfo: TodoItemInfo) {
    todoItemInfo.id = await this.getLastId() + 1;
    await fetch(`${this.url}`, {
      method: 'POST',
      body: JSON.stringify(this.transformTaskToAPI(todoItemInfo)),
    });
  }

  async deleteTodo(id: number): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    });
  }

  private async getLastId(): Promise<number> {
    const data = await fetch(`${this.url}?_sort=-id&_limit=1`);
    const taskJson = await data.json();
    return taskJson[0] ? taskJson[0].id : -1;
  }

  private transformTaskFromAPI(task: APITodoItemInfo): TodoItemInfo {
    return {
      id: Number(task.id),
      name: task.name,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      description: task.description,
    };
  }

  private transformTaskToAPI(task: TodoItemInfo): APITodoItemInfo {
    return {
      id: String(task.id),
      name: task.name,
      dueDate: task.dueDate ? task.dueDate.toISOString() : undefined,
      description: task.description,
    };
  }
}
