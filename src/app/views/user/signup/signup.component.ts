import {Component} from '@angular/core';
import {Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private fb: FormBuilder) {
  }

  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z\\s]+$')]],
    email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')]],
    passwordRepeat: ['', [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$')]]
  })
}
