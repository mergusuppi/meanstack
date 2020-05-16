import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent implements OnInit {
  changepwForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    confirm:new FormControl('')
  });

  constructor(private userService:UserService) { }

  ngOnInit() {
  }
  changepwUser(){
    console.log(this.changepwForm.value);
    this.userService.resetpassword(this.changepwForm.value);
  }
  resetForm(){
    this.changepwForm.reset()
  }
}
