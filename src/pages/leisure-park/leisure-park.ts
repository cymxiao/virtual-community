import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

import { ICommunity } from '../../model/community';
import { ICarport } from '../../model/carport';
import { SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
import { AppSettings } from '../../settings/app-settings';
/**
 * Generated class for the LeisureParkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leisure-park',
  templateUrl: 'leisure-park.html',
})
export class LeisureParkPage {


  leisurePark: ILeisurePark;
  currentUser: IUser;
  currentCommunity: ICommunity;
  currentCarport: ICarport;
  showCommunity: boolean;

  constructor(public navCtrl: NavController,
    public service: RestServiceProvider,
    public modalCtrl: ModalController) {
    this.leisurePark = {
      _id: '',
      id: '',
      __v: '',
      startTime: null,
      endTime: null,
      status: '',
      carport_ID: '',
      applied_UserID: ''
    }

    this.currentCommunity = {
      _id: '',
      id: '',
      __v: '',
      name: '',
      position: '',
      mapid: '',
      city_ID: '',
      address: ''
    }
    this.currentCarport = {
      _id: '',
      id: '',
      __v: '',
      parkingNumber: '',
      type: '',
      route:  '',
      owner_user_ID:  ''
    }


  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LeisureParkPage');
    this.currentUser = AppSettings.getCurrentUser();
    if (this.currentUser && !this.currentUser.community_ID) {
      this.presentModal();
    } else {
      if (!AppSettings.getCurrentCommunity()) {
        this.service.getCommunity(this.currentUser.community_ID).then((com: any) => {
          //console.log(com);
          this.currentCommunity = com;
          localStorage.setItem('community', JSON.stringify(com));
        });
      } else {
        this.currentCommunity = AppSettings.getCurrentCommunity();
      }

      if (!AppSettings.getCurrentCarport()) {
        this.service.getCarportListByOwnerId(this.currentUser._id).then((carp: any) => {
          console.dir(carp);
          //Amin: Todo: temp solution 
          if (carp) {
            let carport = null;
            carp.forEach(element => {
              carport = element;
            });
            this.currentCarport = carport;
            localStorage.setItem('carport', JSON.stringify(carport));
          }
        });
      }else {
        this.currentCarport = AppSettings.getCurrentCarport();
      }
    }
  }

  presentModal() {
    let modal = this.modalCtrl.create(SelectCommunityModalPage);
    modal.present();
  }

}
