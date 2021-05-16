import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { MaterialModule } from 'src/app/Shared/Modules/material/material.module';
import { AdminHomeComponent } from 'src/app/AllPages/admin-home/admin-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdmindashboardRoutingModule),
    MaterialModule,
  ],
})
export class AdmindashboardModule {}
