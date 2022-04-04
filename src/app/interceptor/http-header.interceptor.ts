import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token : string = '';    
    if (localStorage.getItem("token")) token = localStorage.getItem("token") as string;
    const clonedRequest = request.clone({
      headers: request.headers
        .set('Authorization', token ? `Bearer ${token}` : '')
        .set('x-api-key', `petrolpumpgsbitlabs`),
    });
    return next.handle(clonedRequest);
  }
}
