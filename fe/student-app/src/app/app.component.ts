import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-app';
  isLoggedIn=false;
  constructor(private auth:AuthService, private router:Router){
    this.auth.isLoggedIn$.subscribe(()=>{
      console.log('------------')
      this.isLoggedIn=this.auth.isAuthenticated();
    })
  }
onLogout(){
 this.auth.destroyToken('isLoggedIn');
 this.isLoggedIn=false;
this.router.navigate(['/login']);
}
}