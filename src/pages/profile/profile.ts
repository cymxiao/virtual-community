import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ModalController } from 'ionic-angular';

import { IUser } from '../../model/user';
import { ICarport } from '../../model/carport';
import { AppSettings } from '../../settings/app-settings';
import { TabsPage } from '../tabs/tabs';
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
export class ProfilePage {

  //map: any;
  user: IUser;
  currentCarport: ICarport;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public menu: MenuController) {

  }

  ionViewDidLoad() {
    this.user = AppSettings.getCurrentUser();
    this.currentCarport = AppSettings.getCurrentCarport(); 
    this.initVariables();
    this.init(); 
  }



  presentModal() {
    //console.log('presentModal');
    const selectcommodal = this.modalCtrl.create(SelectCommunityModalPage);
    selectcommodal.onDidDismiss(data => {
      console.log(data);
      this.refresh();
    });
    selectcommodal.present();
  }


  init() {

    if (!this.user.community_ID || !this.user.community_ID._id
      || !this.currentCarport || !this.currentCarport.parkingNumber ) {
      //console.log(!this.user.community_ID._id);
      this.presentModal();
    } else {
      this.user = AppSettings.getCurrentUser();
      this.currentCarport = AppSettings.getCurrentCarport();
    }
  }


  goBackHome() {
    this.navCtrl.setRoot(TabsPage);
  }

  refresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
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
    // console.log('1' + this.currentCarport);
    // console.log(!this.currentCarport );
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
    //console.dir( this.currentCarport);
  }

}
