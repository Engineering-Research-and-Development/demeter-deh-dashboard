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
  constructor(private _http: HttpClient) {}

  get currentUser(): UserInfo {
    const token = this.getToken();

    if (!token) {
      return null;
    }
    return JSON.parse(atob(token));
  }

  login(name: string, password: string) {
    const url = `${environment.DYMER_URL}/api/xauth/login`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    return this._http.post<Response>(url, { name, password }, { headers }).pipe(
      map((resp) => {
        if (!resp.success) {
        } else {
          localStorage.setItem('token', resp.data.token);
        }
        return resp;
      })
    );
  }

  getAttachmentCapToken() {
    console.log('attacment called')
    const url = `${environment.DYMER_URL}/api/attachment/getCapToken`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    let accessToken = `${this.currentUser.access_token}`;

    const body = `"accessToken":"${this.currentUser.access_token}"`;
    console.log('URL', url);

    console.log('BODY', body);

    return this._http.post<Response>(url, {accessToken}, { headers }).pipe(
      map((resp) => {
        console.log('responsic', resp)

        if (!resp) {
          console.log(resp.message);
        } else {
          localStorage.setItem('capToken', resp.data.token);
        }
        return resp;
      })
    );
  }


  logout() {
    let accessToken = this.currentUser.access_token;

    const url = `${environment.DYMER_URL}/api/xauth/logout`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Auth-Token': accessToken,
    };

    return this._http
      .delete<Response>(url, { headers })
      .pipe(
        map((resp) => {
          this.removeToken();
          return resp;
        })
      );
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
      this.removeCapToken();
    }
  }

  removeCapToken(): void {
    if (localStorage.getItem('capToken')) {
      localStorage.removeItem('capToken');
    }
  }

  checkTokenExpiration(): boolean {
    let currentUser = this.currentUser;
    let currentTime = new Date();
    let expirationDate = new Date(currentUser.expires);

    if (currentTime > expirationDate) {
      return true;
    }
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