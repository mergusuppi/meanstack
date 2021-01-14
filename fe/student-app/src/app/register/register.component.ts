import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: String;
  registerForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      contact: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['male', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength[30]])],
      confirm: ['', Validators.required],
    }, { validator: this.checkPassword });
  }

  checkPassword(group: FormGroup) {
    const { password, confirm } = group.value;
    return password === confirm ? null : { misMatch: true }
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
    this.registerForm.reset();
  }
}
