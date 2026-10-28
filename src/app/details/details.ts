import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItemInfo } from '../todo-item-info';
import {TODO_SERVICE} from '../token';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
    route: ActivatedRoute = inject(ActivatedRoute);
    todoService = inject(TODO_SERVICE);
    todoItem: WritableSignal<TodoItemInfo | undefined> = signal(undefined);

    constructor() {
      const todoId = this.route.snapshot.params['id'];
      this.todoService.getTodo(todoId).then((task) => {
        this.todoItem.update(() => task);
      });
    }
}
