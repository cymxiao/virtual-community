import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeisureParkPage } from './leisure-park';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    LeisureParkPage,
  ],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(LeisureParkPage),
  ],
})
export class LeisureParkPageModule {}
