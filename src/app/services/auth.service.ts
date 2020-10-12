import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JwtModel } from './../models/jwt.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from './../models/userInfo.model';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {
  }

  get currentUser(): UserInfo {
    const token = this.getToken();
    console.log('prviConsole u get', token);

    if (!token) {
      return null;
    }
    console.log(JSON.parse(atob(token)));
    return JSON.parse(atob(token));

  }

  login(name: string, password: string) {

    console.log('AuthService', 'logincalled');
    const url = `${environment.DYMER_URL}/api/xauth/login`;
    console.log('URL', url);
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    return this._http.post<Response>(url, { name, password }, { headers }).pipe(

      map((resp) => {
        console.log('response', resp);
        if (!resp.success) {
          console.log('err', resp.message);
        } else {
          localStorage.setItem('token', resp.data.token);
          console.log(localStorage.getItem('token'));
        }
        return resp;


      }
      ));
  }

  logout() {

    console.log('Logout called');
    let accessToken = this.currentUser.access_token;
    console.log('accessToken', accessToken);

    const url = `${environment.DYMER_URL}/api/xauth/logout`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Auth-Token': accessToken,
    };

    return this._http.delete<Response>(url, { headers }).pipe(
      map((resp) => {
        console.log('RESPONSEDATA', resp);
        this.removeToken();
        return resp;
      }
      ));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }


  isLoggedIn() {
    const helper = new JwtHelperService();

    const token = this.getToken();
    if (!token) {
      return false;
    }
    return true;
    // const isExpired = helper.isTokenExpired(token);
    // return !isExpired;
  }

  isExpired() {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    return this.checkTokenExpiration();
  }

  removeToken(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  checkTokenExpiration(): boolean {
    let currentUser = this.currentUser;
    let currentTime = new Date();
    let expirationDate = new Date(currentUser.expires);

    if (currentTime > expirationDate) {
      console.log('EXPIRATIONDATE', expirationDate);
      console.log('CURRENTTIME', currentTime);
      console.log('isteklo vreme');
      return true;
    }
    console.log('EXPIRATIONDATE', expirationDate);
    console.log('CURRENTTIME', currentTime);
    console.log('tokenValidan');
    return false;

  }

}

export interface Response {
  data: {
    token: string
  };
  extraData: string[];
  message: string;
  success: boolean;
}