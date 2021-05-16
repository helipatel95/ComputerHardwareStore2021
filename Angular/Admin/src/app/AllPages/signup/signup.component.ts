import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Signup } from 'src/app/Shared/AllPojos/Signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signup: FormGroup;
  submitted = false;

  sginupdata: Signup = new Signup();

  constructor(
    private formbulider: FormBuilder,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.signup = this.formbulider.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
    });
  }

  get f() {
    return this.signup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signup.invalid) {
      return;
    }
    this.sginupdata = this.signup.value;
    this.dosignupEmailPass();
  }

  dosignupEmailPass() {
    this.authservice
      .SignUp(this.sginupdata)
      .then((result) => {
        this.sginupdata.userid = result.user.uid;
        this.addUserData();
      })
      .catch((error) => {});
  }

  addUserData() {
    this.authservice
      .insertUserdata(this.sginupdata)
      .then((result) => {
        debugger;
      })
      .catch((error) => {});
  }
}
