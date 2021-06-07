import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './AllLayouts/dashboard/dashboard.component';
import { AuthDashComponent } from './AllLayouts/auth-dash/auth-dash.component';
import { DashboardModule } from './AllLayouts/dashboard/dashboard.module';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { DealService } from './services/deal/deal.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
import { AddtocartService } from './services/addtocart/addtocart.service';

import { InvoiceserviceService } from './services/invoiceservice/invoiceservice.service';
import { TestpageComponent } from './AllPages/testpage/testpage.component';
import { AiPopupComponent } from './AllPages/ai-popup/ai-popup.component';
import { AssemblyserviceService } from './services/assemblyservice/assemblyservice.service';
import { AssembleyProductPopupComponent } from './AllPages/assembley-product-popup/assembley-product-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderserviceService } from './services/orderservice/orderservice.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthDashComponent,
    TestpageComponent,
    AiPopupComponent,
    AssembleyProductPopupComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    CategoryService,
    ProductService,
    DealService,
    AuthService,
    AddtocartService,
    InvoiceserviceService,
    AssemblyserviceService,
    OrderserviceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
