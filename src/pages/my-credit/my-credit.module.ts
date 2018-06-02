import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCreditPage } from './my-credit';

@NgModule({
  declarations: [
    MyCreditPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCreditPage),
  ],
})
export class MyCreditPageModule {}
