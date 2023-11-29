import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { TaskFormComponent } from './components/task-form/task-form.component';
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from "primeng/cascadeselect";
import { TreeSelectModule } from "primeng/treeselect";
import { ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from "primeng/ripple";
import { ToastModule } from 'primeng/toast';
import { CategoryAddFormComponent } from './components/category-add-form/category-add-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { TrimTextPipe } from './pipes/trim-text.pipe';
import { TaskInfoComponent } from './components/task-info/task-info.component';



@NgModule({
  declarations: [
    TaskFormComponent,
    CategoryAddFormComponent,
    TrimTextPipe,
    TaskInfoComponent
  ],
  exports: [
    TaskFormComponent,
    CategoryAddFormComponent,
    TrimTextPipe,
    TaskInfoComponent
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
    SidebarModule,
  ],
  providers: []
})
export class SharedModule {
}
