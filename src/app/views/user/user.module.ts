import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {SignupComponent} from './signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RadioButtonModule} from "primeng/radiobutton";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    RadioButtonModule,
  ]
})
export class UserModule {
}
