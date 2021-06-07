import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllproductsComponent } from 'src/app/AllPages/allproducts/allproducts.component';
import { CartPageComponent } from 'src/app/AllPages/cart-page/cart-page.component';
import { CheckoutPageComponent } from 'src/app/AllPages/checkout-page/checkout-page.component';
import { HomePageComponent } from 'src/app/AllPages/home-page/home-page.component';

export const DashboardRoutingModule: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomePageComponent },
  { path: 'allproducts/:name/:id', component: AllproductsComponent },
  { path: 'Checkout', component: CheckoutPageComponent },
];
