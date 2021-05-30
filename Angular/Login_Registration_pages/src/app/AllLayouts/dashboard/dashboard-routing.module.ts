import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from 'src/app/AllPages/home-page/home-page.component';
import { AIComponent } from 'src/app/AllPages/ai/ai.component';

export const DashboardRoutingModule: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomePageComponent },  { path: 'AI', component: AIComponent },

];

