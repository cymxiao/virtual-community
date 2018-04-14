import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the UserPortalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-portal',
  templateUrl: 'user-portal.html',
})
export class UserPortalPage {

  rootPage : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = ProfilePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPortalPage');
  }

}
