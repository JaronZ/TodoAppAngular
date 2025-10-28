import { Routes } from '@angular/router';
import {Todo} from './todo/todo';
import {Details} from './details/details';

export const routes: Routes = [
  {
    path: "",
    component: Todo,
    title: "Todo List"
  },
  {
    path: "details/:id",
    component: Details,
    title: "Todo Details"
  }
];
