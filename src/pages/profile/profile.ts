import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

import { IUser } from '../../model/user';
import { ICarport } from '../../model/carport';
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
  currentCarport: ICarport;
  constructor(public navCtrl: NavController,
    public menu: MenuController){  
 
    this.init();
  
  }

  ionViewDidLoad() {
    // this.activeMenu = 'menuPortal';
    // console.log(this.activeMenu);
    // this.menu.enable(true, 'menuPortal');
  }


  init()
  {
    this.user = AppSettings.getCurrentUser(); 
    this.currentCarport = AppSettings.getCurrentCarport();
  }
  

}
