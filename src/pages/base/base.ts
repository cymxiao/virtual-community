import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { IUser } from 'model/user';
import { AppSettings , UserRoleEnum } from '../../settings/app-settings';

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

  public isPMCUser:Boolean;
  public currentUser:IUser;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BasePage');
    this.initCurrentUser();
    this.checkPMCUser();
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

  initCurrentUser(){
    this.currentUser = AppSettings.getCurrentUser(); 
  }

  checkPMCUser(){ 
    if (this.currentUser && this.currentUser.role && this.currentUser.role[0] === UserRoleEnum.PMCUser) {
      this.isPMCUser = true;
    } 
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '保存成功',
      subTitle: '您的信息已经保存成功。'
    });
    alert.present().then(x => {
      this.refresh();
    });
  }

  menuActive(menuCtrl) {
    menuCtrl.enable(true, 'menu');
    menuCtrl.enable(false, 'menuPMC');
    return 'menu';
  }
  
  menuPMCActive(menuCtrl) { 
    menuCtrl.enable(false, 'menu');
    menuCtrl.enable(true, 'menuPMC');
    return 'menuPMC';
  }
 
}
