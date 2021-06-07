import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dash',
  templateUrl: './auth-dash.component.html',
  styleUrls: ['./auth-dash.component.scss'],
})
export class AuthDashComponent implements OnInit {
  credentialStatus = false;
  constructor(public router: Router) {}

  ngOnInit(): void {}

  signInPage() {
    this.credentialStatus = !this.credentialStatus;
    if (this.credentialStatus == true) {
      this.router.navigate(['/Auth/signup'], { replaceUrl: true });
    } else {
      this.router.navigate(['/Auth/login'], { replaceUrl: true });
    }
  }
}
