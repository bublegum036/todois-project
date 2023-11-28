import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { PanelMenuModule } from "primeng/panelmenu";
import { AvatarModule } from "primeng/avatar";
import { TieredMenuModule } from "primeng/tieredmenu";
import { DialogModule } from "primeng/dialog";
import { SharedModule } from "../../shared/shared.module";
import { TaskCategoryComponent } from './task-category/task-category.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksComponent } from './tasks/tasks.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from "primeng/toast";
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './header/header.component';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { CompleteComponent } from './complete/complete.component';




@NgModule({
  declarations: [
    TaskCategoryComponent,
    SidebarComponent,
    TasksComponent,
    HeaderComponent,
    CompleteComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PanelMenuModule,
    SharedModule,
    AvatarModule,
    TieredMenuModule,
    DialogModule,
    TableModule,
    ToastModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    SidebarModule,
    MenuModule,
    TabMenuModule,
  ],
  exports: [
    SidebarComponent, 
    TasksComponent,
    HeaderComponent
  ],
  providers: []
})
export class MainModule {
}
