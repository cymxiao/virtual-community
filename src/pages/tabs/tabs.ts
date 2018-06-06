import { Component } from '@angular/core';

import { LeisureParkPage } from '../leisure-park/leisure-park';
import { ProfilePage } from '../profile/profile';
import { MapPage } from '../map/map';
//import {  SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

 
  tab1Root = LeisureParkPage;
  tab2Root = MapPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
