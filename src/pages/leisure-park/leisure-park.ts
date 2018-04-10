import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController } from 'ionic-angular';
import { ILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
 
import {ICommunity} from '../../model/community';

import { SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
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

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeisureParkPage');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser && !this.currentUser.community_ID) {
      this.presentModal();
    }
  }

  presentModal() {
    let modal = this.modalCtrl.create(SelectCommunityModalPage);
    modal.present();
  }

}
