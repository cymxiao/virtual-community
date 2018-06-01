import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, MenuController, ModalController } from 'ionic-angular';

import { IUser } from '../../model/user';
import { ICarport } from '../../model/carport';
import { AppSettings } from '../../settings/app-settings';
import { BasePage } from '../base/base';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
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
  activeMenu: string;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    private service: RestServiceProvider,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public menu: MenuController) {
    super(navCtrl, alertCtrl, navParams);
  }

  ionViewDidLoad() {
    super.ionViewDidLoad(); 
    this.user = this.currentUser;
    this.currentCarport = AppSettings.getCurrentCarport();
    this.initVariables();
    if(this.isPMCUser){
      super.menuPMCActive(this.menuCtrl);
    } else {
      super.menuActive(this.menuCtrl);
    }
  }


  save() {
    const udpateContent = {
      carPlate: this.user.carPlate
    };
    this.service.updateUser(this.user._id, udpateContent).then((uptUser: any) => {
      localStorage.setItem('user', JSON.stringify(uptUser));
      //this.redirctPage(usr);
      this.presentAlert();
    });
  }



  initVariables() { 
    if (!this.user || !this.user.community_ID) {
      if (!this.user) {
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
          role: '',
          phoneNo: '',
          address: '',
          lastLoginDate: null,
          carPlate: '',
          name: ''
        };
      }

      if (!this.user.community_ID) {
        this.user.community_ID = {
          _id: '',
          id: '',
          __v: '',
          name: '',
          position: '',
          mapid: '',
          city_ID: '',
          address: ''
        }
      }
    }

    if (!this.currentCarport || !this.currentCarport.parkingNumber) {
      this.currentCarport = {
        _id: '',
        id: '',
        __v: '',
        parkingNumber: '',
        isCurrent: false,
        type: '',
        route: '',
        owner_user_ID: ''
      };
    }
  }

}
