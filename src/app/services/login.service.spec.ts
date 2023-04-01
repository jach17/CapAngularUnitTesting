import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { Observable } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http post ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const req = {
        email: 'example@email.com',
        password: '12345',
      } as LoginRequest;
      const obs = service.loginService(req);
      expect(obs instanceof Observable).toBeTrue();
      obs.subscribe({
        next: (res) => {
          expect(res).toBeDefined();
          expect(res.token).toBe('token-example');
        },
      });

      const requestMocked = httpMock.expectOne('https://reqres.in/api/login');
      expect(requestMocked.request.body).toEqual(req);
      expect(requestMocked.request.method).toEqual('POST');
      const resToken = {
        token: 'token-example',
      } as LoginResponse;
      requestMocked.flush(resToken);
    }
  ));
  it('should http post error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const req = {
        email: 'example_not_valid@email.com',
        password: '12345',
      } as LoginRequest;
      const obs = service.loginService(req);
      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('user not found');
        },
      });

      const requestMocked = httpMock.expectOne('https://reqres.in/api/login');
      expect(requestMocked.request.body).toEqual(req);
      expect(requestMocked.request.method).toEqual('POST');

      requestMocked.error(new ErrorEvent('user not found'));
    }
  ));
});
