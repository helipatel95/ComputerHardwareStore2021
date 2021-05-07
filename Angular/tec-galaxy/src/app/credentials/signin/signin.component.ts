import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm:FormGroup;
  submitted:boolean=false;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email : ['', [Validators.required,Validators.pattern(/^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/)]],
      password : ['', Validators.required]
    })
  }
  get f() { return this.signinForm.controls; }

  Submitform() {   
    this.submitted = true;
    console.log(this.signinForm);
    if (this.signinForm.invalid) {
        return;
    } else {   
      let obj ={
        email:this.signinForm.get('email').value,
        password:this.signinForm.get('password').value
      }
      console.log(obj);
    }
  }
}
