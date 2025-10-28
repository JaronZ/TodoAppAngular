import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Todo } from "./todo/todo";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Todo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TodoListAngular');
}
