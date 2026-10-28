import {InjectionToken} from "@angular/core";
import {TodoService} from './todo-service';

export const TODO_SERVICE = new InjectionToken<TodoService>("TodoService");
