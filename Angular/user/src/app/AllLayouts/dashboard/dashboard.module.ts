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
import { CartPageComponent } from 'src/app/AllPages/cart-page/cart-page.component';
import { CheckoutPageComponent } from 'src/app/AllPages/checkout-page/checkout-page.component';
import { ListOfAssembleyComponent } from 'src/app/AllPages/list-of-assembley/list-of-assembley.component';
import { AssemblySelectionComponent } from 'src/app/AllPages/assembly-selection/assembly-selection.component';
import { OrderhistoryComponent } from 'src/app/AllPages/orderhistory/orderhistory.component';
import { AboutusComponent } from 'src/app/AppPages/aboutus/aboutus.component';

@NgModule({
  declarations: [
    HomePageComponent,
    AllproductsComponent,
    FilterpageComponent,
    SingleproductComponent,
    CartPageComponent,
    CheckoutPageComponent,
    ListOfAssembleyComponent,
    AssemblySelectionComponent,
    OrderhistoryComponent,
    AboutusComponent,
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
