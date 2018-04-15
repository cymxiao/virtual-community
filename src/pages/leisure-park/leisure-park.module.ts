import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeisureParkPage } from './leisure-park';
//import { MultiPickerModule } from 'ion2-datetime-picker';

@NgModule({
  declarations: [
    LeisureParkPage
  ],
  imports: [
//    MultiPickerModule,
    IonicPageModule.forChild(LeisureParkPage),
  ],
})
export class LeisureParkPageModule {}
