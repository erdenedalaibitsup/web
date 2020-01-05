import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: any = {};
  private isAuth: boolean = false;

  constructor(private _router: Router) { 
    if(localStorage.getItem('token')) {
      this.isAuth = true;
    }
  }

  login(username, password) {
    if(username == 'admin' && password == 'admin') {
      this.isAuth = true;
      this.loggedUser = {
        username: 'admin',
        loggedTime: new Date().getTime()
      }
      return null;
    }
    return "Нэвтрэх нэр, нууц үг буруу байна";
  }

  logout() {
    localStorage.removeItem("token");
    this.loggedUser = {};
    this.isAuth = false;
    this._router.navigate(['login']);
  }

  isAuthenticated() {
    return this.isAuth;
  }

  getLoggedUser() {
    return this.loggedUser;
  }
}
