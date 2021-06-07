import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import User from 'src/app/shared/AllPojos/Userpojo';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean = false;
  userdata: User;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
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
  }

  get f() {
    return this.signupForm.controls;
  }

  Submitform() {
    this.submitted = true;
    console.log(this.signupForm);
    if (this.signupForm.invalid) {
      return;
    } else {
      this.userdata = this.signupForm.value;
      this.dosignupEmailPass();
    }
  }
  dosignupEmailPass() {
    this.authservice
      .SignUp(this.userdata)
      .then((result) => {
        this.userdata.userid = result.user.uid;
        this.addUserData();
      })
      .catch((error) => {});
  }
  addUserData() {
    this.authservice
      .insertUserdata(this.userdata)
      .then((result) => {
        let url = 'Auth';
        this.router.navigate([url], { replaceUrl: true });
      })
      .catch((error) => {});
  }
}
