import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {FormControl, Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private fb: FormBuilder) {
  }

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    password: ['', [Validators.required]]
  })

  resetClasses(control: FormControl): void {
    if (control.invalid && (control.dirty || control.touched)) {
      control.reset();
    }
  }

  isInvalid(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched) ;
  }

}
