import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdmindashboardComponent } from './AllLayouts/admindashboard/admindashboard.component';
import { AuthdashComponent } from './AllLayouts/authdash/authdash.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Shared/Modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
import { CategoreyService } from './services/categorey.service';

@NgModule({
  declarations: [AppComponent, AdmindashboardComponent, AuthdashComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [AuthService, CategoreyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
