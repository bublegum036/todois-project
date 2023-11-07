import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TaskCategoryComponent} from "./task-category/task-category.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'task-category', component: TaskCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
