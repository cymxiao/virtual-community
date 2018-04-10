import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCommunityModalPage } from './select-community-modal';

@NgModule({
  declarations: [
    SelectCommunityModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCommunityModalPage),
  ],
  entryComponents: [
    SelectCommunityModalPage
  ],
})
export class SelectCommunityModalPageModule {}
