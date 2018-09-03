import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { IUser } from '../../model/user';
import { AppSettings , UserRoleEnum , UserStatusEnum } from '../../settings/app-settings';

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

  //all varaibles in base should be public ,otherwise it's can't be accessed by inherit sub class.
  public isPMCUser: boolean;
  public isAdminUser: boolean;
  public currentUser: IUser;
  public pendingStatus: boolean;

  constructor(public navCtrl: NavController,
    //public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  //Amin: IMP,  this ionViewDidLoad would be manually called in the same method of sub class
  ionViewDidLoad() { 
    this.initCurrentUser();
    this.checkPMCUser(); 
  }

  // goBackHome() {
  //   this.navCtrl.setRoot(TabsPage);
  // }

  // goBackHomeWithParam(data) {
  //   this.navCtrl.setRoot(TabsPage, data);
  // }

  // goBackHomeRefresh() {
  //   this.navCtrl.setRoot(TabsPage, { "refresh": "true" });
  // }

  refresh() { 
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  checkCity(alertCtrl){
    if(localStorage.getItem('currentCity') && localStorage.getItem('currentCity')!=='上海市'){
      this.presentCustomAlert(alertCtrl, '当前城市尚未开通', '很抱歉的通知您，目前仅开通上海市，贵城市尚未开通，给您带来不便，我们深表歉意！');
      return false;
    }
    return true;
  }

  initCurrentUser(){
    this.currentUser = AppSettings.getCurrentUser();  
  }

  checkPMCUser(){  
    if (this.currentUser && this.currentUser.role && this.currentUser.role[0] === UserRoleEnum.PMCUser) {
      this.isPMCUser = true;
    } 
  }

  checkAdminUser(){
    if (this.currentUser && this.currentUser.role && this.currentUser.role[0] === UserRoleEnum.AdminUser) {
      this.isAdminUser = true;
    } 
  }


  checkifPMCUserPendingOnVerify(){  
    if (this.currentUser && this.currentUser.status && this.currentUser.status[0] === UserStatusEnum.pendingOnVerify) {
      this.pendingStatus = true;
    }
  }

  presentAlert( alertCtrl: AlertController) {
    let alert = alertCtrl.create({
      title: '保存成功',
      subTitle: '您的信息已经保存成功。'
    });
    alert.present().then(x => {
      this.refresh();
    });
  }


  presentCustomAlert( alertCtrl: AlertController , title, subTitle) {
    const alert = alertCtrl.create({
      title: title,
      subTitle: subTitle  
    }); 
    alert.present();
  }

  presentCustomAlertandRefresh( alertCtrl: AlertController , title, subTitle) {
    const alert = alertCtrl.create({
      title: title,
      subTitle: subTitle  
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
