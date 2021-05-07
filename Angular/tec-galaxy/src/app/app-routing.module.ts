import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials/credentials.component';
import { SignupComponent } from './credentials/signup/signup.component';
import { SigninComponent } from './credentials/signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: "", redirectTo: "Credential", pathMatch: "full" },
  { path: "Credential", component: CredentialsComponent,children:[
    {path: "", redirectTo: "signin", pathMatch: "full"},
    {path: "signin",component:SigninComponent},
    {path:"signup",component:SignupComponent},
  ] },
  {path:"forgotPassword",component:ForgotPasswordComponent},
  { path: '**', redirectTo: "Credential", pathMatch: "full"  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
