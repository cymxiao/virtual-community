import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, MenuController, ModalController } from 'ionic-angular';

import { IUser } from '../../model/user';
import { ICarport } from '../../model/carport'; 
import { AppSettings } from '../../settings/app-settings';
import { BasePage } from '../base/base';
import { SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
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
  wrongPrice: boolean;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    private service: RestServiceProvider,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public menu: MenuController) {
    super(navCtrl, navParams);
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
    this.user = this.currentUser;
    //console.dir(this.user);
    this.currentCarport = AppSettings.getCurrentCarport();
    this.initVariables();
    if (this.isPMCUser) {
      //PMC user would have empty community_ID when go to profile page first time. 
      //console.log(this.user.community_ID instanceof ObjectId);
      if (this.user.community_ID && !this.user.community_ID._id && AppSettings.getCurrentCommunityID()) {
        this.service.getCommunity(AppSettings.getCurrentCommunityID()).then((com: any) => {
          if (com) {
            this.user.community_ID = com;
          }
        });
      }
      super.menuPMCActive(this.menuCtrl);
    } else {
      super.menuActive(this.menuCtrl);
    }
  }
  on_price_Blur(item) {
    if (item && item.value) {
      if (Number(item.value) < 0 || Number(item.value) > 1000) {
        this.wrongPrice = true;

      } else {
        this.wrongPrice = false;
      }
    }
  }

  save() {
    //console.dir(this.user);
    const udpateContent = {
      carPlate: this.user.carPlate
    };
    this.service.updateUser(this.user._id, udpateContent).then((uptUser: any) => {
      if (this.isPMCUser) {
        this.service.updateCommunity(this.user.community_ID._id, { price: this.user.community_ID.price, priceUnit: this.user.community_ID.priceUnit }).then(c => {
          if (c) {
            //console.dir(c);
            uptUser.community_ID = c; 
            localStorage.setItem('user', JSON.stringify(uptUser));
            this.presentAlert(this.alertCtrl);
            
          }
        });
      } else if(uptUser) {
        localStorage.setItem('user', JSON.stringify(uptUser));
        this.presentAlert(this.alertCtrl);
      } 
    });
  }

  updateSharedCarport(){
    this.navCtrl.push(SelectCommunityModalPage);
  }



  initVariables() {
    const emptyCommunity = {
      _id: '',
      id: '',
      __v: '',
      name: '',
      position: '',
      mapid: '',
      city_ID: '',
      PMC: '',
      price: '',
      priceUnit: '',
      address: ''
    };
    if (!this.user || !this.user.community_ID) {
      if (!this.user) {
        this.user = {
          _id: '',
          username: '',
          password: '',
          community_ID: emptyCommunity,
          account_ID: '',
          role: '',
          phoneNo: '',
          address: '',
          lastLoginDate: null,
          status: '',
          carPlate: '',
          name: ''
        };
      }

      if (!this.user.community_ID) {
        this.user.community_ID = emptyCommunity;
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
