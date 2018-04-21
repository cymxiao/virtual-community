import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {TabsPage} from '../tabs/tabs'

/**
 * Generated class for the BasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-base',
  templateUrl: 'base.html',
})
export class BasePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasePage');
  }

  goBackHome()
  {
    this.navCtrl.setRoot(TabsPage);
     
  }


  refresh() {
    //location.reload();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


}
