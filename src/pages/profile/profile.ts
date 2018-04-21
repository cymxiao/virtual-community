import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';

import { IUser } from '../../model/user';
import { ICarport } from '../../model/carport';
import { AppSettings } from '../../settings/app-settings';
import { BasePage } from '../base/base';
import { SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
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
export class ProfilePage extends BasePage {

  //map: any;
  user: IUser;
  currentCarport: ICarport;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public navParams: NavParams,
    public menu: MenuController) {
      super(navCtrl,navParams);
  }

  ionViewDidLoad() {
    this.user = AppSettings.getCurrentUser();
    this.currentCarport = AppSettings.getCurrentCarport(); 
    this.initVariables();
    this.init(); 
  }
 

  init() {

    if (!this.user.community_ID || !this.user.community_ID._id
      || !this.currentCarport || !this.currentCarport.parkingNumber ) {
        this.navCtrl.push(SelectCommunityModalPage);
    } else {
      this.user = AppSettings.getCurrentUser();
      this.currentCarport = AppSettings.getCurrentCarport();
    }
  }
 
  initVariables() {
    if (!this.user || !this.user.community_ID || !this.user.community_ID._id) {
      this.user = {
        _id: '',
        username: '',
        password: '',
        community_ID: {
          _id: '',
          id: '',
          __v: '',
          name: '',
          position: '',
          mapid: '',
          city_ID: '',
          address: ''
        },
        role_ID: '',
        phoneNo: '',
        address: ''
      };
    }
  
    if (!this.currentCarport || !this.currentCarport.parkingNumber) {
      this.currentCarport = {
        _id: '',
        id: '',
        __v: '',
        parkingNumber: '',
        isCurrent:false,
        type: '',
        route: '',
        owner_user_ID: ''
      };
    }
  }

}
