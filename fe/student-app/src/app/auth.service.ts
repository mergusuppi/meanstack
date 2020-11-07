import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLoggedIn$=new BehaviorSubject<boolean>(false);
  constructor() { }
  isAuthenticated() {
    const token = this.getAccessToken('isLoggedIn');
    return token ? true : false;
  }

  loginSuccess(){
    this.isLoggedIn$.next(true);
  }

  setToken(key, value) {
    localStorage.setItem(key, value);
  }
  getAccessToken(key) {
    return localStorage.getItem(key);
  }
  
  destroyToken(key) {
    this.isLoggedIn$.next(false);
    localStorage.removeItem(key);
  }
}
