import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllproductsComponent } from 'src/app/AllPages/allproducts/allproducts.component';
import { AssemblySelectionComponent } from 'src/app/AllPages/assembly-selection/assembly-selection.component';
import { CartPageComponent } from 'src/app/AllPages/cart-page/cart-page.component';
import { CheckoutPageComponent } from 'src/app/AllPages/checkout-page/checkout-page.component';
import { HomePageComponent } from 'src/app/AllPages/home-page/home-page.component';
import { ListOfAssembleyComponent } from 'src/app/AllPages/list-of-assembley/list-of-assembley.component';
import { OrderhistoryComponent } from 'src/app/AllPages/orderhistory/orderhistory.component';
import { SingleproductComponent } from 'src/app/AllPages/singleproduct/singleproduct.component';
import { AboutusComponent } from 'src/app/AppPages/aboutus/aboutus.component';
import Assemble from 'src/app/shared/AllPojos/assemble';

export const DashboardRoutingModule: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomePageComponent },
  { path: 'allproducts/:name/:id', component: AllproductsComponent },
  { path: 'Product/:id', component: SingleproductComponent },
  { path: 'Cart', component: CartPageComponent },
  { path: 'Checkout', component: CheckoutPageComponent },
  { path: 'Listofassembly', component: ListOfAssembleyComponent },
  {
    path: 'AssemblySelection/:id',
    component: AssemblySelectionComponent,
  },
  { path: 'Orderhistory', component: OrderhistoryComponent },
  { path: 'Aboutus', component: AboutusComponent },
];
