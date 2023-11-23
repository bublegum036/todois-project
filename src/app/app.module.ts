import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./views/user/user.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainModule } from "./views/main/main.module";
import { LayoutComponent } from './views/layout/layout.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { DialogModule } from "primeng/dialog";
import { LocalStorageService } from "./shared/services/local-storage.service";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IdService } from './shared/services/id.service';
import { AuthGuard } from './shared/services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    UserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [DialogModule],
  providers: [MessageService, LocalStorageService, IdService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
