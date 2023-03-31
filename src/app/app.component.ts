import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-2023';
  isLogged = false;
  constructor(private router: Router, private util: UtilService) {
    this.isLogged = Boolean(util.getToken());

    console.log('Logged', this.isLogged);
    util.isLogged.subscribe({
      next: (isLog) => {
        this.isLogged = isLog;
      },
    });
  }

  logout() {
    this.util.deleteToken();
    this.router.navigate(['login']);
  }
}
