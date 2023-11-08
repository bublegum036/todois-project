import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskCategoryComponent} from "./task-category/task-category.component";
import {TasksComponent} from "./tasks/tasks.component";

const routes: Routes = [
  {path: 'task-category', component: TaskCategoryComponent},
  {path: 'tasks', component: TasksComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
