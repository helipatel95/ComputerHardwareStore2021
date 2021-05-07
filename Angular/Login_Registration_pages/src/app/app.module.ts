import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';



import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CredentialsComponent } from './credentials/credentials.component';
import { SignupComponent } from './credentials/signup/signup.component';
import { SigninComponent } from './credentials/signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [AppComponent, NavbarComponent, CredentialsComponent,SignupComponent, SigninComponent, ForgotPasswordComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
