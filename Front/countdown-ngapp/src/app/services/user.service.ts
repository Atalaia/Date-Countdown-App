import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './auth.service';
import { tap, catchError } from 'rxjs/operators';

const apiUrl = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserId: string;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService
  ) { }

  save(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('/users/signup', user);
  }

  getUser(id: string): Observable<any> {

    this.UserId = this.authService.user._id;
    console.log(this.UserId);

    const url = `${apiUrl}/${this.UserId}`;

    return this.http.get(url)
      .pipe(
        tap((user: UserModel) => console.log(`fetched participant id = ${this.UserId}`)),

        catchError(this.errorHandlerService.handleError<UserModel>('getUser'))
      );
  }

}
