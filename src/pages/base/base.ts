import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
//Amin:Tocheck . TestPage can't be used here.
//import {TestPage} from '../test/test';

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
 
  constructor(public navCtrl: NavController,
     public alertCtrl: AlertController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasePage');
  }

  goBackHome() {
    this.navCtrl.setRoot(TabsPage);
  }

  goBackHomeWithParam(data) {
    this.navCtrl.setRoot(TabsPage, data);
  }

  goBackHomeRefresh() {
    this.navCtrl.setRoot(TabsPage, { "refresh": "true" });
  }

  refresh() {
    //location.reload();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


  presentAlert(){
    let alert = this.alertCtrl.create({
      title: '保存成功',
      subTitle: '您的信息已经保存成功。'
    });
    alert.present().then(x => {  
      this.refresh(); 
    });
  }

}
