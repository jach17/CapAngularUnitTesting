import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../model/login.model';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private util: UtilService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginClick() {
    this.isLoading = true;
    const req: LoginRequest = this.formLogin?.value as LoginRequest;
    this.service.loginService(req).subscribe({
      next: (res) => {
        console.log('REESPONSE', res);
        this.util.saveToken(res.token);
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.isLoading = false;

        console.log('ERROR', err);
      },
      complete: () => {
        this.isLoading = false;

        console.log('COMPLETE');
      },
    });
    console.log('Request sent');
  }
}
