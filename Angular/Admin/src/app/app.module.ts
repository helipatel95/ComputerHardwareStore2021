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
import { CategoryService } from './services/category/category.service';
import { ProductsService } from './services/products/products.service';
import { DealService } from './services/deal/deal.service';

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
  providers: [AuthService, CategoryService, ProductsService, DealService],
  bootstrap: [AppComponent],
})
export class AppModule {}
