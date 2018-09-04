import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BugFeedbackPage } from './bug-feedback';

@NgModule({
  declarations: [
    BugFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(BugFeedbackPage),
  ],
})
export class BugFeedbackPageModule {}
