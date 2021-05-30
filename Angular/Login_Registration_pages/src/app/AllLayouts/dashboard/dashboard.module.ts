import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from 'src/app/AllPages/home-page/home-page.component';
import { AIComponent } from 'src/app/AllPages/ai/ai.component';

@NgModule({
  declarations: [HomePageComponent,AIComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutingModule),
    MaterialModule,
  ],
})
export class DashboardModule {}
