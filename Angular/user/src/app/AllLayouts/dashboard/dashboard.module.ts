import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from 'src/app/AllPages/home-page/home-page.component';
import { AllproductsComponent } from 'src/app/AllPages/allproducts/allproducts.component';
import { FilterpageComponent } from 'src/app/AllPages/allproducts/filterpage/filterpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleproductComponent } from 'src/app/AllPages/singleproduct/singleproduct.component';
import { CheckoutPageComponent } from 'src/app/AllPages/checkout-page/checkout-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    AllproductsComponent,
    FilterpageComponent,
    SingleproductComponent,
    CheckoutPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(DashboardRoutingModule),
    MaterialModule,
  ],
})
export class DashboardModule {}
