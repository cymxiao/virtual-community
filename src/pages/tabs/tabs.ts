import { Component } from '@angular/core';

import { LeisureParkPage } from '../leisure-park/leisure-park';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { TestPage } from '../test/test';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TestPage;
  tab3Root = LeisureParkPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
