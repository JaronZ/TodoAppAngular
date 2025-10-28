import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../todo-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  router = inject(Router);
  todoService = inject(TodoService);
  addTodoForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl('')
  });

  async submitTodo() {
    await this.todoService.submitTodo({
      id: -1,
      name: String(this.addTodoForm.value.name),
      dueDate: this.addTodoForm.value.date ? new Date(String(this.addTodoForm.value.date)) : undefined,
      description: String(this.addTodoForm.value.description),
    });
    await this.router.navigate(['/']);
  }
}
