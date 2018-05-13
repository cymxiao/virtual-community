import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommunitySelectComponent } from './community-select/community-select';

@NgModule({
	declarations: [CommunitySelectComponent],
	//It's important to import these, otherwise it woudl throw error such as ngFrom , ion-item is not a known component etc.
	imports: [BrowserModule, FormsModule, IonicModule],
	exports: [CommunitySelectComponent]
})
export class ComponentsModule { }
