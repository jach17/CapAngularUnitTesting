import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthService],
    component: HomeComponent,
  },
  {
    path: 'users',
    canActivate: [AuthService],
    component: UsersComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'computers',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./computers/computers.module').then((m) => m.ComputersModule),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
