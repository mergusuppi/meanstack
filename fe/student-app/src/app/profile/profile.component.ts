import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profilePic: String;
  constructor(private user: UserService,
    private auth: AuthService, private router: Router) { }
  getStudents() {
    this.user.getStudentList().subscribe((res) => {
      console.log(res)
    }, (err) => {
      if (err && err.status === 401) {
        this.auth.destroyToken('isLoggedIn');
        this.router.navigate(['/login']);
      }
    })
  }
  ngOnInit() {
  }
  selectFile(e) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('id', '1001');
    fd.append('avatar', file);
    this.user.fileUpload(fd).subscribe((res: any) => {
      console.log(res);
      this.profilePic = res.filePath;
    });

  }
}
