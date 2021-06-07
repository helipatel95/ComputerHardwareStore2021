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
import { DealsComponent } from 'src/app/AllPages/deals/deals.component';
import { ImagesPrductsComponent } from 'src/app/AllPages/productdetails/images-prducts/images-prducts.component';
import { DealInfoComponent } from 'src/app/AllPages/productdetails/deal-info/deal-info.component';
import { ManufactureInfoComponent } from 'src/app/AllPages/productdetails/manufacture-info/manufacture-info.component';
import { ProductTagsComponent } from 'src/app/AllPages/productdetails/product-tags/product-tags.component';
import { ReturnInfoComponent } from 'src/app/AllPages/productdetails/return-info/return-info.component';
import { AssemblypageComponent } from 'src/app/AllPages/assemblypage/assemblypage.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    CategoryComponent,
    ProductsComponent,
    ProductdetailsComponent,
    MoreInfoPageComponent,
    TechAndSpecComponent,
    DealsComponent,
    ImagesPrductsComponent,
    DealInfoComponent,
    ManufactureInfoComponent,
    ProductTagsComponent,
    ReturnInfoComponent,
    AssemblypageComponent,
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
