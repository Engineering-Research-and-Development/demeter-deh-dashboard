import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  getSpinnerObservable(): Observable<boolean> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    this.spinner$.next(true);
  }

  requestEnded() {
    this.spinner$.next(false);
  }

  requestReset() {
    this.spinner$.next(false);
  }
}
