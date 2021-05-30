import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthDashComponent } from './AllLayouts/auth-dash/auth-dash.component';
import { DashboardComponent } from './AllLayouts/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'Auth', pathMatch: 'full' },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./AllLayouts/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'Auth',
    component: AuthDashComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./AllLayouts/auth-dash/auth-dash.module').then(
            (m) => m.AuthDashModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
