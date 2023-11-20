import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { UserType } from 'src/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userKey: string = 'user';
  private user: UserType | '{}' = '{}';
  public user$: Subject<UserType | '{}'> = new Subject<UserType | '{}'>;
  constructor() { }


  setUser(user: UserType) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user$.next(user)
  }

  getUser(): Observable<UserType | '{}'> {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return of(this.user = user)
  }

  
}
