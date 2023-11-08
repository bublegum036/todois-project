import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {TaskFormComponent} from './components/task-form/task-form.component';
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from 'primeng/calendar';
import {CascadeSelectModule} from "primeng/cascadeselect";
import {TreeSelectModule} from "primeng/treeselect";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TaskFormComponent,
  ],
  exports: [
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    InputTextModule,
    CalendarModule,
    CascadeSelectModule,
    TreeSelectModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
