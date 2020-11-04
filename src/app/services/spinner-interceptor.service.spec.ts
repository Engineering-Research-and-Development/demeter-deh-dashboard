import { TestBed } from '@angular/core/testing';

import { SpinnerInterceptorService } from './spinner-interceptor.service';

describe('LoadingInterceptorService', () => {
  let service: SpinnerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
