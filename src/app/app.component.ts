import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IUser } from '../model/user';

import { LoginPage } from '../pages/login/login';
import { SelectCommunityModalPage } from '../pages/select-community-modal/select-community-modal';
import { PmcCarportDashboardPage } from '../pages/pmc-carport-dashboard/pmc-carport-dashboard';
import { MyOrdersPage } from '../pages/myorders/myorders';
import { ProfilePage } from '../pages/profile/profile';
import { MyCreditPage } from '../pages/my-credit/my-credit';
import { TabsPage } from '../pages/tabs/tabs';

//import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage ;
  @ViewChild(Nav) nav: Nav;
  //@ViewChild(Refresher) refresher: Refresher;
  currentUser: IUser;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) { //,auth:Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide(); 
      //timer(1000).subscribe(() => this.showSplash = false);  
    });
  }

  

  mgrCarports() {
    this.nav.setRoot(PmcCarportDashboardPage);
  }

  myCarports() {
    this.nav.setRoot(SelectCommunityModalPage , { "comReadOnly": "true" });
  }

  myOrders() {
    this.nav.setRoot(MyOrdersPage);
  }

  myProfile() {
    this.nav.setRoot(ProfilePage);
  }

  myCredit() {
    this.nav.setRoot(MyCreditPage);
  } 

  goBackHome() {
    this.nav.setRoot(TabsPage);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }



  // doRefresh(refresher) {
  //   //console.log('Begin async operation', refresher);
  //   this.initApp();
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 200);
  // }
}
