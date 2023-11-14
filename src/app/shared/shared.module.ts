import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {TaskFormComponent} from './components/task-form/task-form.component';
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from 'primeng/calendar';
import {CascadeSelectModule} from "primeng/cascadeselect";
import {TreeSelectModule} from "primeng/treeselect";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from 'primeng/dialog';
import {RippleModule} from "primeng/ripple";
import {ToastModule} from 'primeng/toast';
import { CategoryAddFormComponent } from './components/category-add-form/category-add-form.component';
import { TaskTrComponent } from './components/task-tr/task-tr.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    TaskFormComponent,
    CategoryAddFormComponent,
  ],
  exports: [
    TaskFormComponent,
    CategoryAddFormComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    InputTextModule,
    CalendarModule,
    CascadeSelectModule,
    TreeSelectModule,
    ReactiveFormsModule,
    DialogModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
  ]
})
export class SharedModule {
}
