import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {TODO_SERVICE} from '../token';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  router = inject(Router);
  todoService = inject(TODO_SERVICE);
  addTodoForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl('')
  });

  async submitTodo() {
    await this.todoService.submitTodo({
      id: "",
      name: String(this.addTodoForm.value.name),
      dueDate: this.addTodoForm.value.date ? new Date(String(this.addTodoForm.value.date)) : undefined,
      description: String(this.addTodoForm.value.description),
    });
    await this.router.navigate(['/']);
  }
}
