import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent implements OnInit {
  constructor(public authservice: AuthService, public router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authservice.dologut().then(() => {
      debugger;
      this.router.navigate(['/Auth'], { replaceUrl: true });
    });
  }
}
