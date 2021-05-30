import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDashRoutingModule } from './auth-dash-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/AllPages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from 'src/app/AllPages/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AuthDashRoutingModule),
    MaterialModule,
  ],
})
export class AuthDashModule {}
