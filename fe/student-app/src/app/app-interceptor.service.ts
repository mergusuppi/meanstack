import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: { 'x-request-id': 'supriya' }
    });
    /**
    const headers = req.headers.set('Authorization', `Bearer ${token}`)
      .set('x-request-id', 'identification');
    req = req.clone({ headers });
     */
    return next.handle(req);
  }

}
