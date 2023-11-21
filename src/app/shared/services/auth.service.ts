import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { UserType } from 'src/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userKey: string = 'user';
  public tokenKey: string = 'token';
  private user: UserType | '{}' = '{}';
  public user$: Subject<UserType | '{}'> = new Subject<UserType | '{}'>;
  private authToken: string | null = null;
  public authToken$: Subject<string | null> = new Subject <string | null>();
  private isAuth: boolean = false;
  public isAuth$: Subject<boolean> = new Subject<boolean>();
  constructor() { }


  setUser(user: UserType) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user$.next(user)
  }

  getUser(): Observable<UserType | '{}'> {
    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}')
    return of(this.user = user)
  }

  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.authToken$.next(token);
    this.isAuth = true;
    this.isAuth$.next(true)
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.authToken$.next('');
    this.isAuth = false;
    this.isAuth$.next(false)
  }
}
