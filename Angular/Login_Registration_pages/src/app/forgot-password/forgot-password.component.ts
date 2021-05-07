import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm:FormGroup;
  submitted:boolean=false;

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email : ['', [Validators.required,Validators.pattern(/^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/)]]
    })
  }


  get f() { return this.forgotForm.controls; }

  Submitform() {   
    this.submitted = true;
    console.log(this.forgotForm);
    if (this.forgotForm.invalid) {
        return;
    } else {   
      let obj ={
        email:this.forgotForm.get('email').value
      }
      console.log(obj);
    }
  }

}
