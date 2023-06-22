import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //this class will directly add the auth-token key in the header section except for the External API

    if (request.url.includes('https://maps.googleapis.com/maps/api/geocode/json?address=')) {
      // Skip interception and pass the request directly
      return next.handle(request);
    }else{

    const token = localStorage.getItem('auth-token');

    request = request.clone({
      setHeaders: {
        'auth-token': `${token}`
      }
    });

    return next.handle(request);
  }
}
}
