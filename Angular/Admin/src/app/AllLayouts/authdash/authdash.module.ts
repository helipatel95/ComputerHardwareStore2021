import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthdashRoutingModule } from './authdash-routing';
import { LoginComponent } from 'src/app/AllPages/login/login.component';
import { MaterialModule } from 'src/app/Shared/Modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from 'src/app/AllPages/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthdashRoutingModule),
    MaterialModule,
  ],
})
export class AuthdashModule {}
