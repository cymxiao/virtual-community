import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PmcCarportDashboardPage } from './pmc-carport-dashboard';

@NgModule({
  declarations: [
    PmcCarportDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(PmcCarportDashboardPage),
  ],
})
export class PmcCarportDashboardPageModule {}
