import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {PanelMenuModule} from "primeng/panelmenu";
import {AvatarModule} from "primeng/avatar";
import {TieredMenuModule} from "primeng/tieredmenu";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "../../shared/shared.module";
import {TaskCategoryComponent} from './task-category/task-category.component';
import {MenuComponent} from './menu/menu.component';


@NgModule({
  declarations: [
    TaskCategoryComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PanelMenuModule,
    AvatarModule,
    TieredMenuModule,
    DialogModule,
    SharedModule,

  ],
  exports: [MenuComponent]
})
export class MainModule {
}
