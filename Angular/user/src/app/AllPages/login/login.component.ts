import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/
          ),
        ],
      ],
      password: ['', Validators.required],
    });
    this.checkLogin();
  }

  checkLogin() {
    if (
      this.authservice.getcurrentuser() &&
      this.authservice.getcurrentuser() != 'null'
    ) {
     
      this.router.navigate(['/Dashboard'], { replaceUrl: true });
    }
  }

  get f() {
    return this.signinForm.controls;
  }

  Submitform() {
    this.submitted = true;
    console.log(this.signinForm);
    if (this.signinForm.invalid) {
      return;
    } else {
      this.dologin(this.signinForm.value);
    }
  }

  dologin(logindata: any) {
    this.authservice
      .dologin(logindata)
      .then((result) => {
        var user = this.authservice.getcurrentuser();
        this.router.navigate(['/Dashboard'], { replaceUrl: true });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
