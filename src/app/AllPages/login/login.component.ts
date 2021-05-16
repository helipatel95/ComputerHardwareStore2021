import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  submitted = false;
  constructor(
    private formbulider: FormBuilder,
    public authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginform = this.formbulider.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: [null, Validators.required],
    });
  }

  get f() {
    return this.loginform.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    }
    this.dologin(this.loginform.value);
  }

  dologin(logindata: any) {
    this.authservice
      .dologin(logindata)
      .then((result) => {
        this.router.navigate(['/Admin'], { replaceUrl: true });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
