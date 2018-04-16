import { Component ,ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MyOrdersPage } from '../pages/myorders/myorders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ){ //,auth:Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      // if(this.auth.isAuthenticated()) {
      //   this.rootPage = TabsPage;
      // } else {
      //   this.rootPage = LoginPage;
      // }
    });
  }


  myOrders()
  {
    //this.navCtrl.push(MyOrdersPage);
    this.nav.setRoot(MyOrdersPage);
  }

  logout()
  {
    localStorage.clear();
    location.reload();
  }
}
