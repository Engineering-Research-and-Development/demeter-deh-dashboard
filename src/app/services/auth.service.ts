import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JwtModel } from './../models/jwt.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from './../models/userInfo.model'
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

    console.log('AuthService', 'logincalled')
    const url = `${environment.DYMER_URL}/api/xauth/login`;
    console.log('URL', url)
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    return this._http.post<Response>(url, { name, password }, { headers }).pipe(

      map((resp) => {
        console.log('response', resp)
        if (!resp.success) {
          console.log('err', resp.message)
        } else {
          sessionStorage.setItem('token', resp.data.token);
          console.log(sessionStorage.getItem('token'))
        }
        return resp;


      }
      ))
  }

  logout() {

    console.log('Logout called');
    let accessToken = this.currentUser.access_token;
    console.log('accessToken', accessToken)

    const url = `${environment.DYMER_URL}/api/xauth/logout`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Auth-Token': accessToken,
    }

    return this._http.delete<Response>(url, { headers }).pipe(
      map((resp) => {
        console.log('RESPONSEDATA', resp);
        this.removeToken();
        return resp;
      }
    ))
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
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
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
    }
  }

  checkTokenExpiration(): boolean{
    let currentUser = this.currentUser;
    let currentTime = new Date();
    let expirationDate = new Date(currentUser.expires);
    
    if (currentTime > expirationDate){
      console.log('EXPIRATIONDATE', expirationDate)
      console.log('CURRENTTIME', currentTime)
      console.log('isteklo vreme');
      return true;
    }
    console.log('EXPIRATIONDATE', expirationDate)
    console.log('CURRENTTIME', currentTime)
    console.log('tokenValidan')
    return false;

  }
  authorize() {
    window.location.href = `${environment.KEYROCK_URL}/oauth2/authorize?response_type=token&client_id=${environment.ID}&state=xyz&redirect_uri=${environment.DEH_DASHBOARD_URL}/&scope=jwt`;
  }

  clearKayrockSession() {
    window.location.href = `${environment.KEYROCK_URL}/auth/external_logout?_method=DELETE&client_id=${environment.ID}`;
    this.removeToken();
  }

  //   doLogin(email: string, password: string): Observable<any> {

  //     const url = `${environment.DYMER_URL}/api/xauth/login`;

  //     const headers = {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //     };

  //     return this._http.post(url, {email, password}, { headers })
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

  //   private setSession(authResult: Account) {
  //     sessionStorage.setItem('token', authResult.token);
  //     sessionStorage.setItem("expires_at", JSON.stringify(authResult.tokenExpiration));
  //     sessionStorage.setItem('refresh_token', authResult.refreshToken);
  //   }
  // }


}

export interface Response {
  data: {
    token: string
  },
  extraData: string[]
  message: string,
  success: boolean
}