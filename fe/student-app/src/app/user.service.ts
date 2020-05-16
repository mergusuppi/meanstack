import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseApi = 'http://localhost:3200';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  authenticate(body) {
    this.http.post(`${baseApi}/student/login`, body).subscribe((data) => {
      console.log('login details:', data);
    });
  }

  register(body){
    this.http.post(`${baseApi}/student`,body).subscribe((data)=>{
      console.log('register details:',data);
    });
  }
  resetpassword(body){
    this.http.put(`${baseApi}/student`,body).subscribe((data)=>{
      console.log('reset password details:',data);
    });
  }
}
