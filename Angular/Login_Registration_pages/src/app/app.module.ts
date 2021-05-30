import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './AllLayouts/dashboard/dashboard.component';
import { AuthDashComponent } from './AllLayouts/auth-dash/auth-dash.component';
import { DashboardModule } from './AllLayouts/dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent, AuthDashComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
