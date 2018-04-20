import { Component } from '@angular/core';

import { LeisureParkPage } from '../leisure-park/leisure-park';
import { ProfilePage } from '../profile/profile';
import { TestPage } from '../test/test';
import {  SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

 
  tab1Root = TestPage;
  tab2Root = LeisureParkPage;
  tab3Root = SelectCommunityModalPage;

  constructor() {

  }
}
