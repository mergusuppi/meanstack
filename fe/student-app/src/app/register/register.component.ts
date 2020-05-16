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
  errorMessage: String;
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
    this.errorMessage = '';
    this.userService.register(this.registerForm.value).subscribe((data) => {
      if (data) {
        this.onClick();
      }
    }, (err) => {
      console.log('errr :: ', err.error.message)
      this.errorMessage = err ? err.error.message : 'something went wrong';
    });
    // this.registerForm.reset();
  }
  onClick(): void {
    this.router.navigate(['/login']);
  }
}
