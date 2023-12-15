import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { UserType } from '../../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userKey: string = 'user';
  public activeUserKey: string = 'activeUser';
  private user: UserType | null = null;
  public user$: Subject<UserType | null> = new Subject<UserType | null>();
  public activeUser: string | null = null;
  public activeUser$: Subject<string | undefined> = new Subject<string | undefined>();
  private isAuth: boolean = false;
  public isAuth$: Subject<boolean> = new Subject<boolean>();
  public userName: string | null = null;
  public activeUserData: [] | null = null;

  constructor(private router: Router) { }

  setUser(user: UserType | null, userKey: string) {
    this.setActiveUser(userKey)
    localStorage.setItem(userKey, JSON.stringify([user]));
    this.user$.next(user);
  }

  getUser(activeUser: string): Observable<UserType | null> {
    const userArrayFromLS = localStorage.getItem(activeUser);
    if (userArrayFromLS && userArrayFromLS.length > 0) {
      const userArray = JSON.parse(userArrayFromLS)
      this.user = userArray.find((item: UserType) => {
        return item.hasOwnProperty("userInfo")
      })
    }
    return of(this.user);
  }

  updateUser(activeUser: string, updateArray: string) {
    localStorage.setItem(activeUser, updateArray)
  }

  setActiveUser(userLogin: string) {
    localStorage.setItem(this.activeUserKey, userLogin);
  }

  getActiveUser(): Observable<string | null> {
    const activeUser = localStorage.getItem(this.activeUserKey);
    if (activeUser && activeUser.length > 0) {
      this.activeUser = activeUser
    } else {
      localStorage.removeItem(this.activeUserKey)
    }
    return of(this.activeUser)
  }

  login() {
    this.isAuth = true;
    this.isAuth$.next(true);
  }

  logout() {
    this.isAuth = false;
    localStorage.removeItem(this.activeUserKey);
    this.isAuth$.next(false);
    this.router.navigate(['/']);
  }

  isAuthorized() {
    return this.isAuth;
  }

  removeUserProfile(activeUser: string) {
    localStorage.removeItem(activeUser);
    localStorage.removeItem(this.activeUserKey);

  }

  getUserName(): Observable<string | null> {
    const activeUser = localStorage.getItem(this.activeUserKey);
    if (activeUser) {
      this.getUser(activeUser).subscribe(user => {
        if (user && user.userInfo) {
          this.userName = user.userInfo.name
        }
      })
    } else {
      this.userName = null
    }
    return of(this.userName)
  }
}
