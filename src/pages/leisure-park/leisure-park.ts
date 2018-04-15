import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
//import  * as mz from 'moment-timezone';

import { ILeisurePark , IUILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user'; 
import { ICommunity } from '../../model/community';
import { ICarport } from '../../model/carport';
import { SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
import { AppSettings, LeisureParkStatus } from '../../settings/app-settings';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';

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
  //moment: Moment = new Mome;
  constructor(public navCtrl: NavController,
    public params: NavParams,
    public service: RestServiceProvider,
    //public monent: Moment,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    this.leisurePark = { 
      id: '', 
      startTime: '',
      endTime: '',
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
    //console.log(moment().format());
    //console.log(mz.timezone.name);
    //console.log( new Date().toISOString());
    //console.log(this.moment.toLocaleString());
    
    this.currentUser = AppSettings.getCurrentUser(); 
    if (this.currentUser && !this.currentUser.community_ID) {  
      this.presentModal();
    } else {  
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
    //   //console.log('get param : ' + this.params.get('reload'));
    //   //this.navCtrl. refresh();
    // }

  presentModal() {
    const selectcommodal = this.modalCtrl.create(SelectCommunityModalPage);
    selectcommodal.onDidDismiss(data => {
      console.log(data);
      this.refresh();
    });
    selectcommodal.present();
  }

  addButtonClick()
  { 
    this.leisurePark.startTime = moment().add(8,'hours').toISOString();
    this.leisurePark.endTime = moment().add(16,'hours').toISOString(); 
    this.showAddContent = true; 
  }

  cancelButtonClick()
  { 
    this.showAddContent = false; 
  }

  saveLeisurePark() {
    this.leisurePark.shared_UserID = this.currentUser._id;
    this.leisurePark.carport_ID = this.currentCarport._id;
    this.leisurePark.community_ID = this.currentUser.community_ID._id; 
   
    this.leisurePark.startTime = moment(this.leisurePark.startTime).add(-8,'hours').toISOString();
    this.leisurePark.endTime = moment(this.leisurePark.endTime).add(-8,'hours').toISOString();

    if(!this.leisurePark.community_ID){
      console.log('saveLeisurePark' + 'delete empty community_ID');
      delete this.leisurePark.community_ID;
    }
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
        //this.navCtrl.push(LeisureParkPage);
        this.refresh();
      }
    });
  }


  getLeisureParkforOwner() {
    this.service.getLeisureParkforOwner(this.currentUser._id).then((lpark: any) => {
      if (lpark) {
        this.myLeisureParks = lpark;
        this.myLeisureParks.forEach(x => {
          //x.startTime = moment(x.startTime).format('YYYY-MM-DD HH:mm');

          //x.startTime = new Date(x.startTime.toLocaleString("MM-DD-YYYY HH:mm"));
          //status is an array
          if (x.status && x.status.length === 1) {
            if (x.status[0] === 'active') {
              x.statusDisplayText = '可申请';
            } else if (x.status[0] === 'pending') {
              x.statusDisplayText = '待审核';
            } else if (x.status[0] === 'applied') {
              x.statusDisplayText = '已申请';
            } else if (x.status[0] === 'paid') {
              x.statusDisplayText = '已支付';
            } else {
              x.statusDisplayText = '已失效';
            }
          }
        }) 
      }
    });
  }

  

  refresh(){
    //location.reload();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
