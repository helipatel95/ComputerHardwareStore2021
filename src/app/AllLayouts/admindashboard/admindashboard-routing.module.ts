import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from 'src/app/AllPages/admin-home/admin-home.component';

export const AdmindashboardRoutingModule: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  { path: 'Home', component: AdminHomeComponent },
];
