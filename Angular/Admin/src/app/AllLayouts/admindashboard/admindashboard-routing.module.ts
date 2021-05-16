import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from 'src/app/AllPages/admin-home/admin-home.component';
import { CategoryComponent } from 'src/app/AllPages/category/category.component';
import { DealsComponent } from 'src/app/AllPages/deals/deals.component';
import { ProductdetailsComponent } from 'src/app/AllPages/productdetails/productdetails.component';
import { ProductsComponent } from 'src/app/AllPages/products/products.component';

export const AdmindashboardRoutingModule: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  { path: 'Home', component: AdminHomeComponent },
  { path: 'Admin-Category', component: CategoryComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'Productsdata/:productid', component: ProductdetailsComponent },
  { path: 'Deals', component: DealsComponent },
];
