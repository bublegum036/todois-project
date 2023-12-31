import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './views/user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './views/main/main.module';
import { LayoutComponent } from './views/layout/layout.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TasksService } from './shared/services/tasks.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IdService } from './shared/services/id.service';
import { AuthGuard } from './shared/services/auth.guard';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    SharedModule,
    UserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    ToastModule,
    ConfirmDialogModule,
    SidebarModule,
    MenuModule,
    TabMenuModule,
    FormsModule,
  ],
  exports: [],
  providers: [MessageService, TasksService, IdService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
