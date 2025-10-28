import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../todo-service';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  todoService = inject(TodoService);
  addTodoForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl('')
  });

  submitTodo() {
    this.todoService.submitTodo({
      id: -1,
      name: String(this.addTodoForm.value.name),
      dueDate: new Date(String(this.addTodoForm.value.date)),
      description: String(this.addTodoForm.value.description),
    });
  }
}
