import { Injectable, InjectionToken, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_URL = new InjectionToken<string>('apiURL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(
    @Inject(API_URL) private baseURL: string
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone({
      url: this.generateURL(request.url)
    });
    return next.handle(req);
  }

  public isAbsoluteURL(url: string): boolean {
    return (/^https?:\/\//i).test(url);
  }

  public generateURL(url: string): string {
    if (!this.isAbsoluteURL(url)) {
      // `${http://localhost:3000}${/users/login}`
      url = `${this.baseURL}${url}`;
    }
    return url;
  }
}
