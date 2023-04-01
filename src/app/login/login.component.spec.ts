import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../services/util.service';
import { LoginService } from '../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { LoginResponse } from '../model/login.model';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let utilServiceSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'saveToken',
  ]);
  let loginServiceSpy = jasmine.createSpyObj<LoginService>('LoginService', [
    'loginService',
  ]);
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            redirectTo: '',
          },
        ]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formLogin).toBeTruthy;
  });
  it('should do login', () => {
    let mockResponse = {
      token: 'token-example',
    } as LoginResponse;

    loginServiceSpy.loginService.and.returnValue(of(mockResponse));
    component.formLogin?.patchValue({
      email: 'correo@ejemplo.com',
      password: '12345',
    });

    component.loginClick();
    expect(utilServiceSpy.saveToken).toHaveBeenCalledWith('token-example');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });
  it('should do login with error', () => {
    loginServiceSpy.loginService.and.returnValue(
      throwError(() => {
        'user not found';
      })
    );
    component.loginClick();
    expect(component.isLoading).toBeFalse;
  });
});
