import {Service} from '@angular/core';
import {APITodoItemInfo, TodoItemInfo} from './todo-item-info';
import {TodoService} from './todo-service';

@Service()
export class TodoHttpService implements TodoService {
  url = "http://localhost:3000/tasks";

  async getAllTodos(): Promise<TodoItemInfo[]> {
    const data = await fetch(this.url);
    return ((await data.json()) ?? []).map(this.transformTaskFromAPI);
  }

  async getTodo(id: string): Promise<TodoItemInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const taskJson = await data.json();
    return taskJson ? this.transformTaskFromAPI(taskJson) : undefined;
  }

  async submitTodo(todoItemInfo: TodoItemInfo) {
    await fetch(`${this.url}`, {
      method: 'POST',
      body: JSON.stringify(this.transformTaskToAPI(todoItemInfo)),
    });
  }

  async deleteTodo(id: string): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    });
  }

  async editTodo(todoItemInfo: TodoItemInfo): Promise<void> {
    await fetch(`${this.url}/${todoItemInfo.id}`, {
      method: 'PUT',
      body: JSON.stringify(this.transformTaskToAPI(todoItemInfo)),
    });
  }

  private transformTaskFromAPI(task: APITodoItemInfo): TodoItemInfo {
    return {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      description: task.description,
    };
  }

  private transformTaskToAPI(task: TodoItemInfo): APITodoItemInfo {
    return {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate ? task.dueDate.toISOString() : undefined,
      description: task.description,
    };
  }
}
