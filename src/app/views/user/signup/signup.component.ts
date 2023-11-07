import {Component} from '@angular/core';
import {Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {UserType} from "../../../../types/user.type";
import {Router} from "@angular/router";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private fb: FormBuilder,
              private router: Router) {
  }

  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z\\s]+$')]],
    email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    passwordRepeat: ['', [Validators.required]]
  })


  signUp() {
    if (this.signupForm.valid && this.signupForm.value.firstName && this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.passwordRepeat) {
      const user: UserType = {
        userInfo: {
          name: this.signupForm.value.firstName,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
        }
      }
      localStorage.setItem('user', JSON.stringify(user))
    }

    if (localStorage.getItem('user')) {
      this.router.navigate(['/dashboard'])
    }
  }
}
