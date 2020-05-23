import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // name = new FormControl('supriya');
  loginForm: FormGroup;

  constructor(private userService: UserService,
    private _router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], // min && max
    });
  }

  loginUser() {
    console.log(this.loginForm.value);
    this.userService.authenticate(this.loginForm.value);
    this.loginForm.reset();
  }
   
  onButtonClick(): void {
    this._router.navigate(['/changepw']);
  }
  // updateName(){
  //   this.name.setValue('')
  // }
}
