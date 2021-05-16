import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { MaterialModule } from 'src/app/Shared/Modules/material/material.module';
import { AdminHomeComponent } from 'src/app/AllPages/admin-home/admin-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from 'src/app/AllPages/category/category.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from 'src/app/AllPages/products/products.component';
import { ProductdetailsComponent } from 'src/app/AllPages/productdetails/productdetails.component';
import { MoreInfoPageComponent } from 'src/app/AllPages/productdetails/more-info-page/more-info-page.component';
import { TechAndSpecComponent } from 'src/app/AllPages/productdetails/tech-and-spec/tech-and-spec.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    CategoryComponent,
    ProductsComponent,
    ProductdetailsComponent,
    MoreInfoPageComponent,
    TechAndSpecComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AdmindashboardRoutingModule),
    MaterialModule,
  ],
})
export class AdmindashboardModule {}
