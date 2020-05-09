import { Component, OnInit } from '@angular/core';
import{FormControl,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm=new FormGroup({
    firstname:new FormControl(''),
    lastname:new FormControl(''),
    contact:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }
  registerUser(){
    console.log(this.registerForm.value);
  }
}
