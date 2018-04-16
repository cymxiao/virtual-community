import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

import { IUser } from '../../model/user';
import { AppSettings } from '../../settings/app-settings';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //map: any;
  user : IUser;
 
  constructor(public navCtrl: NavController,
    public menu: MenuController){  
 
    this.getCurrentUserName();
  
  }

  ionViewDidLoad() {
    // this.activeMenu = 'menuPortal';
    // console.log(this.activeMenu);
    // this.menu.enable(true, 'menuPortal');
  }


  getCurrentUserName()
  {
    this.user = AppSettings.getCurrentUser(); 
  }
  

}
