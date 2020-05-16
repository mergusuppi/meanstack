import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }
  registerUser() {
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value);
    this.registerForm.reset();
  }
  onClick():void{
    this.router.navigate(['/login']);
  }
}
