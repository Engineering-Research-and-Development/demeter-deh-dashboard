import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {
  constructor(private _spinnerService: SpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._spinnerService.requestStarted();

    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this._spinnerService.requestEnded();
          }
        },
        (error: HttpErrorResponse) => {
          this._spinnerService.requestReset();
          throw error;
        }
      )
    );
  }
}
