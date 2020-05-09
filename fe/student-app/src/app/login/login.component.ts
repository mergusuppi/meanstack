import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // name = new FormControl('supriya');
  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }
  loginUser(){
    console.log(this.loginForm.value);
  }
// updateName(){
//   this.name.setValue('')
// }
}
