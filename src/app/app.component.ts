import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, FabList } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IUser } from '../model/user';
import { AppSettings, UserRoleEnum } from '../settings/app-settings';

import { LoginPage } from '../pages/login/login';
import { SelectCommunityModalPage } from '../pages/select-community-modal/select-community-modal';
import { PmcCarportDashboardPage } from '../pages/pmc-carport-dashboard/pmc-carport-dashboard';
import { MyOrdersPage } from '../pages/myorders/myorders';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  isPMCUser: boolean;
  currentUser: IUser;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) { //,auth:Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.currentUser = AppSettings.getCurrentUser();
      //console.dir(this.currentUser);
      if (this.currentUser && this.currentUser.role && this.currentUser.role[0] === UserRoleEnum.PMCUser) {
        this.isPMCUser = true;
      }
    });
  }

  mgrCarports() {
    this.nav.setRoot(PmcCarportDashboardPage);
  }

  myCarports() {
    this.nav.setRoot(SelectCommunityModalPage);
  }

  myOrders() {
    this.nav.setRoot(MyOrdersPage);
  }

  myProfile() {
    this.nav.setRoot(ProfilePage);
  }

  goBackHome() {
    this.nav.setRoot(TabsPage);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
