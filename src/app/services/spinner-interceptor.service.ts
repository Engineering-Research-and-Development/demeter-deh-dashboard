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
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { environment } from '../../environments/environment';

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {
  constructor(private _spinnerService: SpinnerService) { }
  attachmentCapTokenUrl = `${environment.DYMER_URL}/api/metrics/getCapToken`
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === this.attachmentCapTokenUrl) {
      return next.handle(req);
    }
    else {
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
}
