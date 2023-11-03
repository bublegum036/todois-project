import {Component, OnInit} from '@angular/core';
import {Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {UserType} from "../../../../types/user.type";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserName: string = '';
  loginPassword: string = '';

  constructor(private fb: FormBuilder) {
  }

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    password: ['', [Validators.required]]
  })

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.loginUserName = JSON.parse(localStorage.getItem('user') || '{}').userInfo.email;
      this.loginPassword = JSON.parse(localStorage.getItem('user') || '{}').userInfo.password;
    }
  }


  login() {
    if (localStorage.getItem('user')) {
      if (this.loginForm.value.userName === this.loginUserName && this.loginForm.value.password === this.loginPassword){
        location.href = "https://ya.ru"
      }
    }
  }
}

