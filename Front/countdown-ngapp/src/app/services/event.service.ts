import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Event } from '../models/event.model';

const apiUrl = "http://localhost:3000/events";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  userId: string;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService
  ) { }

  // CRUD EVENT

  // GET ALL EVENTS LIST
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(apiUrl)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.errorHandlerService.handleError('getAllEvents', []))
      );
  }

  // GET ALL EVENTS LIST BY USER SORT BY DATE
  getUserEvents(): Observable<Event[]> {
    this.userId = this.authService.user._id;
    console.log(this.userId);

    const url = `${apiUrl}/user/${this.userId}`;

    return this.http.get<Event[]>(url)
      .pipe(
        tap(data => {
          console.log(data);
        }),
        catchError(this.errorHandlerService.handleError('getUserEvents', []))
      );
  }

  // GET FULL DETAIL OF AN EVENT INCLUDING USER DETAIL
  getEventDetail(id: string): Observable<Event> {
    const url = `${apiUrl}/${id}`;

    return this.http.get<Event>(url)
      .pipe(
        tap((event: Event) => console.log(`fetched event id=${id}`)),
        catchError(this.errorHandlerService.handleError<Event>('getEventDetail'))
      )
  }

  // ADD AN EVENT
  saveEvent(event: Event): Observable<Event> {
    const url = `${apiUrl}/add`;

    return this.http.post<Event>(url, event)
      .pipe(
        tap((event: Event) => console.log('Event added successfully')),
        catchError(this.errorHandlerService.handleError<Event>('saveEvent'))
      );
  }

  // UPDATE AN EVENT
  editEvent(id: string, event: Event): Observable<Event> {
    const url = `${apiUrl}/edit/${id}`;

    return this.http.put<Event>(url, event)
      .pipe(
        tap(_ => console.log(`updated event id=${id}`)),
        catchError(this.errorHandlerService.handleError<Event>('editEvent'))
      );
  }

  // DELETE AN EVENT
  deleteEvent(id: string): Observable<Event> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<Event>(url)
      .pipe(
        tap(_ => console.log(`deleted event id=${id}`)),
        catchError(this.errorHandlerService.handleError<Event>('deleteEvent'))
      );
  }
}
