import {APITodoItemInfo, TodoItemInfo} from "./todo-item-info";
import {TodoService} from './todo-service';
import {Service} from '@angular/core';

@Service()
export class TodoLocalStorageService implements TodoService {
  private readonly todoItems: TodoItemInfo[];

  constructor() {
    const todosJson = localStorage.getItem("todos");

    if (!todosJson) {
      this.todoItems = [];
      this.saveTodos();
      return;
    }

    const todos = JSON.parse(todosJson) as APITodoItemInfo[];
    this.todoItems = todos.map(todo => ({
      id: todo.id,
      name: todo.name,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      description: todo.description
    }));
  }

  getAllTodos(): Promise<TodoItemInfo[]> {
    return Promise.resolve([...this.todoItems].sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    }));
  }

  getTodo(id: string): Promise<TodoItemInfo | undefined> {
    return Promise.resolve(this.todoItems.find(item => item.id === id));
  }

  submitTodo(todo: TodoItemInfo): Promise<void> {
    const lastId = this.todoItems.map(item => item.id).sort((a, b) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    })?.[0] ?? 0;
    this.todoItems.push({
      id: lastId,
      name: todo.name,
      dueDate: todo.dueDate,
      description: todo.description
    });
    this.saveTodos();
    return Promise.resolve();
  }

  deleteTodo(id: string): Promise<void> {
    const index = this.todoItems.findIndex(item => item.id === id);
    if (index === -1)
      return Promise.resolve();

    this.todoItems.splice(index, 1);
    this.saveTodos();
    return Promise.resolve();
  }

  editTodo(todo: TodoItemInfo): Promise<void> {
    const index = this.todoItems.findIndex(item => item.id === todo.id);
    if (index === -1)
      return Promise.resolve();

    this.todoItems[index] = todo;
    this.saveTodos();
    return Promise.resolve();
  }

  private saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todoItems));
  }
}
