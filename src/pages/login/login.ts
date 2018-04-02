import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from "../register/register";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  templateForm: any;
  isLogin : string = "login";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

    // go to register page
    register() {
      this.navCtrl.setRoot(RegisterPage);
    }

      // login and go to home page
  login() {
    this.navCtrl.setRoot(TabsPage);
  }

  forgotPass()
  {

  }

}
