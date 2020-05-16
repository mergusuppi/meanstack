import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const baseApi = 'http://localhost:3200';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authenticate(body): Observable<any> {
    return this.http.post(`${baseApi}/student/login`, body).pipe(
      catchError(this.handleError));
  }

  register(body): Observable<any> {
    return this.http.post(`${baseApi}/student`, body).pipe(catchError(this.handleError));
  }
  resetpassword(body) {
    this.http.put(`${baseApi}/student`, body).subscribe((data) => {
      return data;
    }, err => err);
  }

  handleError(error) {
    // let errorMessage = '';
    // if (error.error instanceof ErrorEvent) {
    //   // client-side error
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   // server-side error
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // window.alert(errorMessage);
    return throwError(error);
  }
}
