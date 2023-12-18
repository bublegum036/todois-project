import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginFormInterface } from '../../../shared/interfaces/login-form-interface';
import { AuthService } from '../../../shared/services/auth.service';
import { UserType } from '../../../../types/user.type';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  loginUserName: string | null = null;
  loginPassword: string | null = null;
  user: UserType | null = null;
  activeUser: string | null = null;

  constructor(
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) { }

  loginForm: FormGroup = new FormGroup<LoginFormInterface>({
    userName: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
    ]),
    password: new FormControl(null, Validators.required),
  });

  login() {
    this.auth.getUser(this.loginForm.value.userName).subscribe(user => {
      this.user = user
    })
    if (this.user && this.user.userInfo.email && this.user.userInfo.password) {
      this.loginUserName = this.user.userInfo.email;
      this.loginPassword = this.user.userInfo.password;
      if (this.loginForm.value.userName === this.loginUserName && this.loginForm.value.password !== this.loginPassword
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Неверный пароль!',
        });
      }
      if (this.loginForm.value.userName !== this.loginUserName) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Пользователь не существует!',
        });
      }
      if (
        this.loginForm.value.userName === this.loginUserName &&
        this.loginForm.value.password === this.loginPassword
      ) {
        this.auth.setActiveUser(this.loginForm.value.userName);
        this.loginForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Вы авторизованы!',
        });
        setTimeout(() => {
          this.auth.login();
          this.router.navigate(['/tasks']);
        }, 500);
      }
    }
  }
}
