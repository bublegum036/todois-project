import {Component} from '@angular/core';
import {Validators} from "@angular/forms";
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
}
