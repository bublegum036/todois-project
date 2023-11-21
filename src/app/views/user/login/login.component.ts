import {Component, OnInit} from '@angular/core';
import {Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskAddType } from 'src/types/task-add.type';
import { UserType } from 'src/types/user.type';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserName: string = '';
  loginPassword: string = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) {
  }

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    password: ['', Validators.required]
  })

  ngOnInit() {
    
  }

  login() {
    if (localStorage.getItem('user')) {
      this.loginUserName = JSON.parse(localStorage.getItem('user') || '{}').userInfo.email;
      this.loginPassword = JSON.parse(localStorage.getItem('user') || '{}').userInfo.password;
      if (this.loginForm.value.userName === this.loginUserName && this.loginForm.value.password === this.loginPassword) {
        this.auth.login()
        this.router.navigate(['/tasks'])
      }
    }
  }
}

