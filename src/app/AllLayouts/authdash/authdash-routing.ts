import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/AllPages/login/login.component';
import { SignupComponent } from 'src/app/AllPages/signup/signup.component';

export const AuthdashRoutingModule: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
  { path: 'Login', component: LoginComponent },
  { path: 'Signup', component: SignupComponent },
  
];
