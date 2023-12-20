import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginFormInterface } from '../../../shared/interfaces/login-form-interface';
import { AuthService } from '../../../shared/services/auth.service';
import { UserType } from '../../../../types/user.type';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnDestroy{
  loginUserName: string | null = null;
  loginPassword: string | null = null;
  user: UserType | null = null;
  activeUser: string | null = null;
  private unsubscribe$ = new Subject<void>();


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
    const formValue = this.loginForm.getRawValue()
    this.auth.getUser(formValue.userName).pipe(
      tap(user => this.user = user),
      takeUntil(this.unsubscribe$)
    ).subscribe()

    if (this.user && this.user.userInfo.email && this.user.userInfo.password) {
      this.loginUserName = this.user.userInfo.email;
      this.loginPassword = this.user.userInfo.password;
      if (formValue.userName === this.loginUserName && formValue.password !== this.loginPassword
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Неверный пароль!',
        });
      } else if (formValue.userName !== this.loginUserName) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Пользователь не существует!',
        });
      } else if (
        formValue.userName === this.loginUserName &&
        formValue.password === this.loginPassword
      ) {
        this.loginForm.reset();
        this.auth.login(formValue.userName);
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Вы авторизованы!',
        });
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 500);
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete(); 
  }
}
