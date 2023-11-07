import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PanelMenuModule} from "primeng/panelmenu";
import {AvatarModule} from "primeng/avatar";
import {TieredMenuModule} from "primeng/tieredmenu";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../shared/shared.module";
import { TaskCategoryComponent } from './task-category/task-category.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TaskCategoryComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PanelMenuModule,
    AvatarModule,
    TieredMenuModule,
    DialogModule,
    SharedModule
  ],
  exports: [DashboardComponent]
})
export class MainModule {
}
