import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginService(req: LoginRequest) {
    return this.http.post<LoginResponse>('https://reqres.in/api/login', req);
  }
}
