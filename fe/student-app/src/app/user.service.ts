import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
const baseApi = 'http://localhost:3200';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

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
  fileUpload(body, options = {}) {
    return this.http.post(`${baseApi}/student/profile`, body, options);
  }
  getStudentList() {
    return this.http.get(`${baseApi}/student`);
  }
  handleError(error) {
    console.log(error);
    if (error.status === 401) {
      return error
    }
    return throwError(error);
  }
}
