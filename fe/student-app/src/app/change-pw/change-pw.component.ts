import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent implements OnInit {
  errorMessage: String;
  changepwForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) { }
  ngOnInit() {
    this.changepwForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength[30]])],
      confirm: ['', Validators.required]
    }, { validator: this.checkPassword });
  }

  checkPassword(group: FormGroup) {
    const { password, confirm } = group.value;
    return password === confirm ? null : { misMatch: true }
  }

  changepwUser() {
    const { value, valid } = this.changepwForm;
    if (valid) {
      this.userService.resetpassword(value);
    }
  }
  resetForm() {
    this.changepwForm.reset()
  }
  registerUser() {
    this.errorMessage = '';
    this.userService.register(this.changepwForm.value).subscribe((data) => {
      if (data) {
        this.onClick();
      }
    }, (err) => {
      console.log('errr :: ', err.error.message)
      this.errorMessage = err ? err.error.message : 'something went wrong';
    });
  }
  onClick(): void {
       this.changepwForm.reset();

  }
}
