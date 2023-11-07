import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskCategoryComponent} from "./task-category/task-category.component";

const routes: Routes = [
  {path: 'task-category', component: TaskCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
