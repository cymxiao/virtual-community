import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CommunitySelectComponent } from './community-select/community-select';
import { SmsCodeComponent } from './sms-code/sms-code';

@NgModule({
	declarations: [CommunitySelectComponent,
    SmsCodeComponent],
	//It's important to import these, otherwise it woudl throw error such as ngFrom , ion-item is not a known component etc.
	imports: [BrowserModule, FormsModule, IonicModule],
	exports: [CommunitySelectComponent,
    SmsCodeComponent]
})
export class ComponentsModule { }
