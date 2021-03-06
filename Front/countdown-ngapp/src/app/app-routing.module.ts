import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { UpdateComponent } from './components/update/update.component';

import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { API_URL } from './interceptors/base-url.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'my-events', component: ListComponent, canActivate: [AuthGuardGuard] },
  { path: 'create-event', component: CreateComponent, canActivate: [AuthGuardGuard] },
  { path: 'event-details/:id', component: DetailComponent, canActivate: [AuthGuardGuard] },
  { path: 'update-event/:id', component: UpdateComponent, canActivate: [AuthGuardGuard] },
  {
    path: 'users',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardGuard,
    {
      provide: API_URL,
      useValue: environment.apiURL
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
      deps: [API_URL]
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
