import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAccessToken('isLoggedIn');
    req = req.clone({
      setHeaders: {
        'x-request-id': 'supriya',
        Authorization: `Bearer ${token}`
      }
    });
    /**
    const headers = req.headers.set('Authorization', `Bearer ${token}`)
      .set('x-request-id', 'identification');
    req = req.clone({ headers });
     */
    return next.handle(req);
  }

}
