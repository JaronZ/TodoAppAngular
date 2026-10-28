import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {TODO_SERVICE} from '../token';

@Component({
  selector: 'app-edit-todo',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.css',
})
export class EditTodo {
    route = inject(ActivatedRoute);
    router = inject(Router);
    todoService = inject(TODO_SERVICE);
    todoId: string;
    editTodoForm = new FormGroup({
      name: new FormControl(''),
      date: new FormControl(''),
      description: new FormControl('')
    });

    constructor() {
      this.todoId = this.route.snapshot.params['id'];
      this.todoService.getTodo(this.todoId)?.then((task) => {
        if (!task) {
          return;
        }

        this.editTodoForm.setValue({
          name: task.name,
          date: task.dueDate ? task.dueDate.toISOString().substring(0, 10) : '',
          description: task.description ?? null
        });
      });
    }

    async submitEdit() {
        await this.todoService.editTodo({
          id: this.todoId,
          name: this.editTodoForm.value.name ?? "",
          dueDate: this.editTodoForm.value.date ? new Date(this.editTodoForm.value.date) : undefined,
          description: this.editTodoForm.value.description ?? undefined
        });
        await this.router.navigate(["/"]);
    }
}
