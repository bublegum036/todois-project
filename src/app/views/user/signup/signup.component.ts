import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserType } from "../../../../types/user.type";
import { Router } from "@angular/router";
import { AuthService } from '../../../shared/services/auth.service';
import { SignupFormInterface } from '../../../shared/interfaces/signup-form-interface';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private router: Router,
    private auth: AuthService) {
  }


  signupForm: FormGroup = new FormGroup<SignupFormInterface>({
    firstName: new FormControl(null, [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z\\s]+$')]),
    email: new FormControl(null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
    passwordRepeat: new FormControl(null, [Validators.required]),
  });


  signUp() {
    if (this.signupForm.valid && this.signupForm.value.firstName && this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.passwordRepeat) {
      const user: UserType = {
        userInfo: {
          name: this.signupForm.value.firstName,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        }
      }
      this.auth.setUser(user, this.signupForm.value.email);
      this.auth.login();
      this.router.navigate(['/tasks'])
    }
  }
}
