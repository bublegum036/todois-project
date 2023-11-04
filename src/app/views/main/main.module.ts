import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PanelMenuModule} from "primeng/panelmenu";
import {AvatarModule} from "primeng/avatar";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PanelMenuModule,
    AvatarModule
  ],
  exports: [DashboardComponent]
})
export class MainModule {
}
