import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ILeisurePark , IUILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

import { ICommunity } from '../../model/community';
import { ICarport } from '../../model/carport';
import { SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
import { AppSettings, LeisureParkStatus } from '../../settings/app-settings';
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
  showAddContent: boolean;
  myLeisureParks : IUILeisurePark[];

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public service: RestServiceProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    this.leisurePark = { 
      id: '', 
      startTime: null,
      endTime: null,
      status: '',
      carport_ID: '',
      community_ID: '',
      applied_UserID: '',
      shared_UserID: '',
      price: '',
      timestamp: null,
      priceUnit: ''
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
      route: '',
      owner_user_ID: ''
    }

    //console.log('get param : ' + this.params.get('reload'));
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LeisureParkPage');
    this.currentUser = AppSettings.getCurrentUser();
    //console.dir(this.currentUser);
    //this.presentModal();
    if (this.currentUser && !this.currentUser.community_ID) {
      this.presentModal();
    } else {
      // if (!AppSettings.getCurrentCommunity()) {
      //   this.service.getCommunity(this.currentUser.community_ID).then((com: any) => {
      //     //console.log(com);
      //     this.currentCommunity = com;
      //     localStorage.setItem('community', JSON.stringify(com));
      //   });
      // } else {
      //   this.currentCommunity = AppSettings.getCurrentCommunity();
      // }

      if (!AppSettings.getCurrentCarport()) {
        this.service.getCarportListByOwnerId(this.currentUser._id).then((carp: any) => {
          //console.dir(carp);
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
      } else {
        this.currentCarport = AppSettings.getCurrentCarport();
      } 
    }
    this.getLeisureParkforOwner();
  }

  // ionViewWillEnter()
  // {
  //   console.log('get param : ' + this.params.get('reload'));
  // }

  presentModal() {
    let modal = this.modalCtrl.create(SelectCommunityModalPage);
    modal.present();
  }

  addButtonClick()
  {
    this.showAddContent = true;
  }

  saveLeisurePark() {
    this.leisurePark.shared_UserID = this.currentUser._id;
    this.leisurePark.carport_ID = this.currentCarport._id;
    this.leisurePark.community_ID = this.currentCommunity._id;
    delete this.leisurePark.applied_UserID;
    //the timestamp should be delete, otherwise it would save null to db.
    delete this.leisurePark.timestamp;
    //delete this.leisurePark._id;
    delete this.leisurePark.status;
    this.service.addLeisurePark(this.leisurePark).then((lp: any) => {
      if (lp) {
        //this.showAlert();
        this.showAddContent = false;
        //Todo: how to refresh current page.
        this.navCtrl.push(LeisureParkPage);
      }
    });
  }


  getLeisureParkforOwner() {
    this.service.getLeisureParkforOwner(this.currentUser._id).then((lpark: any) => {
      if (lpark) {
        this.myLeisureParks = lpark;
        this.myLeisureParks.forEach(x => {
          //status is an array
          if (x.status && x.status.length === 1) {
            if (x.status[0] === 'active') {
              x.statusDisplayText = '可申请';
            } else if (x.status[0] === 'pending') {
              x.statusDisplayText = '待审核';
            } else {
              x.statusDisplayText = '已失效';
            }
          }
        })
        //  .map( x => 
        //   {
        //     x.stauts = this.getStatusDisplayText(x.status);
        //     return x;
        //   });
        //this.myLeisureParks.map( x = ) 
      }
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '发布成功!',
      subTitle: '你已经成功发布共享车位',
      buttons: ['确定']
    });
    alert.present();
  }

  // getStatusDisplayText( value ){
  //   //console.log(value );
  //   if( value[0]=== LeisureParkStatus.pending){
  //     return ['待审核'];
  //   }else if( value[0]===  LeisureParkStatus.active){
  //     return ['可申请'];
  //   }else{
  //     return ['无效'];
  //   }
  // }

}
