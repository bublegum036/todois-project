import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { UserType } from 'src/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userKey: string = 'user';
  private user: UserType | null = null;
  public user$: Subject<UserType | null> = new Subject<UserType | null>();
  private isAuth: boolean = false;
  public isAuth$: Subject<boolean> = new Subject<boolean>();
  public userName: string | null = null;

  constructor(private router: Router) {}

  setUser(user: UserType | null) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user$.next(user);
  }

  getUser(): Observable<UserType | null> {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.setUser(null);
      this.user = null;
    }
    return of(this.user);
  }

  login() {
    this.isAuth = true;
    this.isAuth$.next(true);
  }

  logout() {
    this.isAuth = false;
    this.isAuth$.next(false);
    this.router.navigate(['/']);
  }

  isAuthorized() {
    return this.isAuth;
  }

  removeUserProfile() {
    localStorage.clear();
  }

  getUserName(): Observable<string | null> {
    const user = localStorage.getItem(this.userKey);
    if(user) {
        this.userName = JSON.parse(user).name
    } else {
        this.userName = null
    }
    return of(this.userName)
}
}
