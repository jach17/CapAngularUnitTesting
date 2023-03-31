import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UtilService } from './services/util.service';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  template: '<span>Login</span>',
})
class MockLoginComponent {}

fdescribe('AppComponent', () => {
  let router: Router;
  let serviceSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
    'deleteToken',
    'isLogged',
  ]);

  serviceSpy.isLogged = new Subject<boolean>();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: MockLoginComponent,
          },
        ]),
        MatToolbarModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: UtilService,
          useValue: serviceSpy,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-2023');
  });

  it(`should create app with user logged in`, () => {
    serviceSpy.getToken.and.returnValue('token');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(true);
  });
  it(`should create app with user is not logged in`, () => {
    serviceSpy.getToken.and.returnValue(null);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(false);
  });
  it(`should recive isLogged from utilSvc true`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    serviceSpy.isLogged.next(true);
    expect(app.isLogged).toBeTrue();
  });
  it(`should recive isLogged from utilSvc false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    serviceSpy.isLogged.next(false);
    expect(app.isLogged).toBeFalse();
  });

  it(`should logout`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(serviceSpy.deleteToken).toHaveBeenCalled();
  });
});
