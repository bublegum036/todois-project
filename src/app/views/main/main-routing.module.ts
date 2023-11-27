import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskCategoryComponent} from "./task-category/task-category.component";
import {TasksComponent} from "./tasks/tasks.component";
import { CompleteComponent } from './complete/complete.component';

const routes: Routes = [
  {path: 'task-category', component: TaskCategoryComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'complete', component: CompleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
