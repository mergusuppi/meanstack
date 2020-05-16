import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent implements OnInit {
  changepwForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) { }
  ngOnInit() {
    this.changepwForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], // min && max
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
}
