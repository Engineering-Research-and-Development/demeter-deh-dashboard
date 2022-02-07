import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from '../models/userInfo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) { }

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
          localStorage.setItem('DYM', resp.data.token);
          localStorage.setItem("d_uid", JSON.parse(atob(resp.data.token)).User.id);

          this.getAttachmentCapToken(resp.data.token);
        }
        return resp;
      })
    );
  }


  getAttachmentCapToken(accessToken: string) {
    const url = `${environment.DYMER_URL}/api/metrics/getCapToken`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    let token = JSON.parse(atob(accessToken))
    let accessTokenParsed = token.access_token;
    this._http.post<Response>(url, { accessToken: accessTokenParsed }, { headers }).subscribe(resp => {

      if (resp.success === true) {
        localStorage.setItem('capToken', resp.data.token);
      }
    })
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
    return localStorage.getItem('DYM');
  }

  isLoggedIn() {
    const helper = new JwtHelperService();

    const token = this.getToken();
    if (!token) {
      return false;
    }
    return true;
  }

  isExpired() {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    return this.checkTokenExpiration();
  }

  removeToken(): void {
    if (localStorage.getItem('DYM')) {
      localStorage.removeItem('DYM');
      this.removeCapToken();
      this.removeLoggedUser();
    }
  }

  removeCapToken(): void {
    if (localStorage.getItem('capToken')) {
      localStorage.removeItem('capToken');
    }
  }

  removeLoggedUser(): void {
    if (localStorage.getItem('logged')) {
      localStorage.removeItem('logged');
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