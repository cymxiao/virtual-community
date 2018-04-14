import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPortalPage } from './user-portal';

@NgModule({
  declarations: [
    UserPortalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPortalPage),
  ],
})
export class UserPortalPageModule {}
