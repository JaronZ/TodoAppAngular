export interface TodoItemInfo {
  id: number;
  name: string;
  dueDate?: Date;
  description?: string;
}

export interface APITodoItemInfo {
  id: string;
  name: string;
  dueDate?: string;
  description?: string;
}
