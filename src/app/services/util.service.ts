import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  isLogged = new Subject<boolean>();

  saveToken(token: string) {
    localStorage.setItem('TOKEN', token);
    this.isLogged.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('TOKEN');
  }

  deleteToken() {
    localStorage.removeItem('TOKEN');
    this.isLogged.next(false);
  }
}
