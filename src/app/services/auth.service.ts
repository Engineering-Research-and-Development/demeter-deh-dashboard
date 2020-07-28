import { JwtModel } from './../models/jwt.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get currentUser(): JwtModel {
    let token = this.getToken();

    if (!token) return null;

    return new JwtHelperService().decodeToken(token);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    const helper = new JwtHelperService();

    let token = this.getToken();
    if (!token) {
      return false;
    }
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  logout(): void {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }

}
