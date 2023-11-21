import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { UserType } from 'src/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userKey: string = 'user';
  private user: UserType | '{}' = '{}';
  public user$: Subject<UserType | '{}'> = new Subject<UserType | '{}'>;
  private isAuth: boolean = false;
  public isAuth$: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router) { }


  setUser(user: UserType) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user$.next(user)
  }

  getUser(): Observable<UserType | '{}'> {
    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}')
    return of(this.user = user)
  }

  login() {
    this.isAuth = true;
    this.isAuth$.next(true)
  }

  logout() {
    this.isAuth = false;
    this.isAuth$.next(false);
    this.router.navigate(['/'])
  }

  public isAuthorized() {
    return this.isAuth;
  }
}
