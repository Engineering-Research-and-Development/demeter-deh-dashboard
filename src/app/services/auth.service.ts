import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtModel } from './../models/jwt.model';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

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

  removeToken(): void {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }

  authorize() {
    window.location.href = `http://localhost:3000/oauth2/authorize?response_type=token&client_id=${environment.ID}&state=xyz&redirect_uri=http://localhost:4200/&scope=jwt`;
  }

  clearKayrockSession() {
    window.location.href = `http://localhost:3000/auth/external_logout?_method=DELETE&client_id=${environment.ID}`;
    this.removeToken();
  }

  // clearKayrockSession(): Observable<any> {
  //   const base = `${environment.ID}:${environment.SECRET}`;
  //   return this._http.options(`http://localhost:3000/auth/external_logout?_method=DELETE`, {

  //     params: {
  //       "client_id": environment.ID
  //     },
  //     headers: {
  //       // "Authorization": `Basic ${base}`
  //       "Authorization": `Bearer ${this.getToken()}`
  //     }
  //   }).pipe(
  //     catchError(this.handleError)
  //   )
  // }

  private handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.log(error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
