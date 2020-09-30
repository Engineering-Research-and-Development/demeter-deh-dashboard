import { throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JwtModel } from './../models/jwt.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForAuthentication } from './../models/user-for-authentication.model';
import { Account } from './../models/account.model';

import { mergeMap, tap } from 'rxjs/operators';
import { map, merge } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Account
  constructor(private _http: HttpClient) {
    this.user = new Account;

  }
  get currentUser(): JwtModel {
    const token = this.getToken();

    if (!token) { return null; }

    return new JwtHelperService().decodeToken(token);
  }

  login() {
    const url = `${environment.KEYROCK_URL}/v1/auth/tokens`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',

    };


    this._http.post<HttpResponse<any>>(url, {
      "name": "gianluca@test.com",
      "password": "gianluca"
    },
      { headers, observe: 'response' as 'body' }
    )
      .pipe(
        tap(
          response => {
            console.log('response', response);
            console.log('responseHeader', response.headers);
            this.user.token = response.headers.get('X-Subject-Token');
            this.user.tokenExpiration = response.body.token.tokenExpiration;
          })
          ,
          mergeMap( tokenInfo => this._http.get(url, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-Auth-Token': this.user.token,
              'X-Subject-Token': this.user.token,
            }
          }).pipe(
            tap(res => console.log(tokenInfo)
          )
          ))
          ).subscribe(
            data => console.log(data)
          )
  }


  // ).pipe(
  //   mergeMap(userInfo => this._http.get(url, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       'X-Auth-Token': user.token,
  //       'X-Subject-Token': user.token,
  //     }
  //   }).pipe(
  //     mergeMap(userRolesInfo => this._http.get(`${environment.KEYROCK_URL}/v1/applications/${environment.ID}/users/${userInfo.get('User.id')}/roles`)
  //     )

  //   ))).subscribe(
  //     data => console.log('datareceived', data));

  
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
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  isExpired() {
    const token = this.getToken();
    if (!token) { return true; }

    return new JwtHelperService().isTokenExpired(token);
  }

  removeToken(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  authorize() {
    window.location.href = `${environment.KEYROCK_URL}/oauth2/authorize?response_type=token&client_id=${environment.ID}&state=xyz&redirect_uri=${environment.DEH_DASHBOARD_URL}/&scope=jwt`;
  }

  clearKayrockSession() {
    window.location.href = `${environment.KEYROCK_URL}/auth/external_logout?_method=DELETE&client_id=${environment.ID}`;
    this.removeToken();
  }


  //   doLogin(userForAuthentication: UserForAuthentication): Observable<Authentication> {

  //     const url: string = `${environment.KEYROCK_URL}/v1/auth/tokens`;

  //     const headers = {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //     };

  //     return this._http.post<Authentication>(url, userForAuthentication, { headers })
  //         .pipe(
  //             shareReplay(),
  //             catchError((err: HttpErrorResponse) => {
  //                 if (err instanceof HttpErrorResponse) {
  //                     if (err.status === 401) {
  //                         this.router.navigate(['/']);
  //                     }
  //                 }
  //                 return throwError(err)
  //             }),
  //             catchError(this.handleError),
  //             //                 map(response => {
  //             //                    if(response && response.token) {
  //             //                        window.sessionStorage.setItem('token', response.token);
  //             //                     //    return true;
  //             //                     this.currentAccountSubject.next(currentAccount);

  //             //                    }

  //             //                 //    return false;

  //             //                 }),

  //             tap((response: Authentication) => {

  //                 const decoded = jwt_decode(response.token);
  //                 if (decoded) {
  //                     const userAccessType = (decoded['useraccesstype']) ? [decoded['useraccesstype']] : null;
  //                     const role = (decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) ? [decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']] : null;

  //                     const account: Account = {
  //                         id: decoded['sub'],
  //                         email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
  //                         token: response.token,
  //                         tokenInit: decoded['iat'],
  //                         tokenExpiration: decoded['exp'],
  //                         refreshToken: response.refreshToken,
  //                         useraccesstype: userAccessType,
  //                         roles: role
  //                     }

  //                     this.currentAccountSubject.next(account);
  //                     this.setSession(account);
  //                 }
  //             })
  //         );
  // }

  // private setSession(authResult: Account) {
  //   sessionStorage.setItem('token', authResult.token);
  //   sessionStorage.setItem("expires_at", JSON.stringify(authResult.tokenExpiration));
  //   sessionStorage.setItem('refresh_token', authResult.refreshToken);
  // }

}
