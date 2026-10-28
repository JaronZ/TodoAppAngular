import {Service} from '@angular/core';
import {TodoService} from './todo-service';
import {TodoItemInfo} from "./todo-item-info";

@Service()
export class TodoHardcodedService implements TodoService {
  private todoItems: TodoItemInfo[] = [
    {id: "1", name: "Clean room", description: "I need to clean my room before my friends arrive"},
    {id: "2", name: "Do the dishes"},
    {id: "3", name: "Cook food"}
  ];

  getAllTodos(): Promise<TodoItemInfo[]> {
    return Promise.resolve([...this.todoItems].sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
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
    this.todoItems.push({id: lastId + 1, name: todo.name, dueDate: todo.dueDate, description: todo.description});
    return Promise.resolve();
  }

  deleteTodo(id: string): Promise<void> {
    const index = this.todoItems.findIndex(item => item.id === id);
    if (index === -1)
      return Promise.resolve();

    this.todoItems.splice(index, 1);
    return Promise.resolve();
  }

  editTodo(todo: TodoItemInfo): Promise<void> {
    const index = this.todoItems.findIndex(item => item.id === todo.id);
    if (index === -1)
      return Promise.resolve();

    this.todoItems[index] = todo;
    return Promise.resolve();
  }

}
