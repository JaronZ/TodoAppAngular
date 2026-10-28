import {TodoItemInfo} from './todo-item-info';

export interface TodoService {
  getAllTodos(): Promise<TodoItemInfo[]>;
  getTodo(id: string): Promise<TodoItemInfo | undefined>;
  submitTodo(todo: TodoItemInfo): Promise<void>;
  deleteTodo(id: string): Promise<void>;
  editTodo(todo: TodoItemInfo): Promise<void>;
}
