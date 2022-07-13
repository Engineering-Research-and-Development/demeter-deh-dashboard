import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from '../models/userInfo.model';
import { map } from 'rxjs/operators';
import { JwtModel } from './../models/jwt.model';

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

  get currentUserJWT(): JwtModel {
    let token = this.getTokenJWT();

    if (!token) return null;

    return new JwtHelperService().decodeToken(token);
  }

  login(name: string, password: string) {
    const url = `${environment.DYMER_URL}/api/xauth/login`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this._http.post<Response>(url, { name, password }, { headers }).pipe(
      map((resp) => {
        if (!resp.success) {
        } else {
          localStorage.setItem('DYM', resp.data.token);
          localStorage.setItem(
            'd_uid',
            JSON.parse(atob(resp.data.token)).User.id
          );

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
      Accept: 'application/json',
    };

    let token = JSON.parse(atob(accessToken));
    let accessTokenParsed = token.access_token;
    this._http
      .post<Response>(url, { accessToken: accessTokenParsed }, { headers })
      .subscribe((resp) => {
        if (resp.success === true) {
          localStorage.setItem('capToken', resp.data.token);
        }
      });
  }

  getAttachmentCapTokenJWT(accessToken: string) {
    const url = `${environment.DYMER_URL}/api/metrics/getCapToken`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // let token = JSON.parse(atob(accessToken))
    // let accessTokenParsed = token.access_token;
    this._http
      .post<Response>(url, { accessToken: accessToken }, { headers })
      .subscribe((resp) => {
        if (resp.success === true) {
          localStorage.setItem('capToken', resp.data.token);
        }
      });
  }

  logout() {
    let accessToken = this.currentUser.access_token;

    const url = `${environment.DYMER_URL}/api/xauth/logout`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': accessToken,
    };

    return this._http.delete<Response>(url, { headers }).pipe(
      map((resp) => {
        this.removeToken();
        return resp;
      })
    );
  }

  setToken(token: string) {
    var currentUser: JwtModel = new JwtHelperService().decodeToken(token);
    localStorage.setItem('d_uid', currentUser.id);
    this.getAttachmentCapTokenJWT(token);

    var dym: UserInfo = {
      access_token: token,
      expires: new Date(currentUser.exp * 1000),
      valid: 'true',
      User: {
        scope: [],
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        date_password: '',
        enabled: true,
        admin: false,
        roles: [currentUser.roles[0].name],
      },
    };
    const string = JSON.stringify(dym); // convert Object to a String
    const encodedDYM = btoa(string);
    localStorage.setItem('token', token);
    localStorage.setItem('DYM', encodedDYM);
    this.cacheCapTokens(dym);
  }

  cacheCapTokens(userInfo: any) {
    const url = `${environment.DYMER_URL}/api/xauth/cacheCapTokens`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // let token = JSON.parse(atob(accessToken))
    // let accessTokenParsed = token.access_token;
    this._http
      .post<Response>(url, { userInfo: userInfo }, { headers })
      .subscribe((resp) => {});
  }
  getToken() {
    return localStorage.getItem('DYM');
  }

  getTokenJWT() {
    return localStorage.getItem('token');
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
    const token = this.getTokenJWT();
    if (!token) {
      return true;
    }

    return new JwtHelperService().isTokenExpired(token);
  }

  removeToken(): void {
    if (localStorage.getItem('DYM')) {
      localStorage.removeItem('DYM');
      this.removeCapToken();
      this.removeLoggedUser();
      this.removeJWTToken();
    }
  }

  removeCapToken(): void {
    if (localStorage.getItem('capToken')) {
      localStorage.removeItem('capToken');
    }
  }

  removeJWTToken(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
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

  //Adding new logic

  authorize() {
    window.location.href = `${environment.KEYROCK_URL}/oauth2/authorize?response_type=token&client_id=${environment.ID}&state=xyz&redirect_uri=${environment.DEH_DASHBOARD_URL}&scope=jwt`;
  }

  clearKayrockSession() {
    window.location.href = `${environment.KEYROCK_URL}/auth/external_logout?_method=DELETE&client_id=${environment.ID}`;
    this.removeToken();
  }

  cacheCapToke;
}

export interface Response {
  data: {
    token: string;
  };
  extraData: string[];
  message: string;
  success: boolean;
}
