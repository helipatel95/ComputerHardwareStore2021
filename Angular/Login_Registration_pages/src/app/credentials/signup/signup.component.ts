import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  submitted:boolean=false;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required,Validators.pattern(/^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/)]],
      password : ['', Validators.required]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  Submitform() {   
    this.submitted = true;
    console.log(this.signupForm);
    if (this.signupForm.invalid) {
        return;
    } else {   
      let obj ={
        firstName:this.signupForm.get('firstName').value,
        lastName:this.signupForm.get('lastName').value,
        email:this.signupForm.get('email').value,
        password:this.signupForm.get('password').value
      }
      console.log(obj);
    }
  }
}
