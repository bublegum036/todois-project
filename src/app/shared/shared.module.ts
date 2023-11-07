import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {RouterOutlet} from "@angular/router";
import {TaskFormComponent} from './components/task-form/task-form.component';
import {InputTextModule} from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    LayoutComponent,
    TaskFormComponent
  ],
  exports: [
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    InputTextModule,
    CalendarModule
  ]
})
export class SharedModule {
}
