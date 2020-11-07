import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // name = new FormControl('supriya');
  loginForm: FormGroup;

  constructor(private userService: UserService,
    private _router: Router, private fb: FormBuilder ,private auth:AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['suppu@gmail.com', [Validators.required, Validators.email]],
      password: ['suppu@123', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]], // min && max
      myFile: ['']
    });
  }

  loginUser() {
    console.log(this.loginForm.value);
    this.userService.authenticate(this.loginForm.value).subscribe((res) => {
      if (res) {
        this.auth.setToken('isLoggedIn',res.token);
        this.auth.loginSuccess();
        this._router.navigate(['/profile']);
      }
    });
    // this.loginForm.reset();
  }

  onButtonClick(): void {

    this._router.navigate(['/changepw']);
    }
  // updateName(){
  //   this.name.setValue('')
  // }

  selectFile(e) {
    console.log('Fule ', e.target.files[0])
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('myFile', file);
    this.userService.authenticate(fd).subscribe(console.log);

  }
}
