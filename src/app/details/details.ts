import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo-service';
import { TodoItemInfo } from '../todo-item-info';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
    route: ActivatedRoute = inject(ActivatedRoute);
    todoService: TodoService = inject(TodoService);
    todoItem?: TodoItemInfo;

    constructor() {
      const todoId = parseInt(this.route.snapshot.params['id'], 10);
      this.todoService.getTodoById(todoId).then((task) => {
        this.todoItem = task;
      });
    }
}
