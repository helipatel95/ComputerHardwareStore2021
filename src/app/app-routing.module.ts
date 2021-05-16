import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './AllLayouts/admindashboard/admindashboard.component';
import { AuthdashComponent } from './AllLayouts/authdash/authdash.component';

const routes: Routes = [
  { path: '', redirectTo: 'Auth', pathMatch: 'full' },
  {
    path: 'Admin',
    component: AdmindashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./AllLayouts/admindashboard/admindashboard.module').then(
            (m) => m.AdmindashboardModule
          ),
      },
    ],
  },
  {
    path: 'Auth',
    component: AuthdashComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./AllLayouts/authdash/authdash.module').then(
            (m) => m.AuthdashModule
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
