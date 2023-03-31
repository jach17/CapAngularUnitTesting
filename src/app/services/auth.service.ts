import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private util: UtilService, private router: Router) {}

  canActivate() {
    const isLogged = Boolean(this.util.getToken());
    if (!isLogged) {
      this.router.navigate(['login']);
    }
    return isLogged;
  }
}
