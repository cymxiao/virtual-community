import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IUser } from '../model/user';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SelectCommunityModalPage } from '../pages/select-community-modal/select-community-modal';
import { PmcCarportDashboardPage } from '../pages/pmc-carport-dashboard/pmc-carport-dashboard';
import { MyOrdersPage } from '../pages/myorders/myorders';
import { ProfilePage } from '../pages/profile/profile';
import { MyCreditPage } from '../pages/my-credit/my-credit';
import { TabsPage } from '../pages/tabs/tabs';

import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage ;
  @ViewChild(Nav) nav: Nav;
  //@ViewChild(Refresher) refresher: Refresher;
  currentUser: IUser;
  showSplash = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) { //,auth:Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.



      if (localStorage.getItem('firstIn') === 'true') {
        this.rootPage = LoginPage;
      } else {
        localStorage.setItem('firstIn', 'true');
        this.rootPage = WelcomePage;
      } 
    

      statusBar.styleDefault();
      splashScreen.hide(); 
      timer(1000).subscribe(() => this.showSplash = false);  
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
    const firstIn = localStorage.getItem('firstIn') ;
    localStorage.clear();
    localStorage.setItem('firstIn',firstIn);
    location.reload();
  }
 
}
