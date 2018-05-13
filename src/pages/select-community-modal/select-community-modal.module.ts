import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCommunityModalPage } from './select-community-modal';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SelectCommunityModalPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SelectCommunityModalPage),
  ],
  entryComponents: [
    SelectCommunityModalPage
  ],
})
export class SelectCommunityModalPageModule {}
