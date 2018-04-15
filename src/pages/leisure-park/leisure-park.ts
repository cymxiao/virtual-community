import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
//import  * as mz from 'moment-timezone';

import { ILeisurePark, IUILeisurePark } from '../../model/leisurePark';
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
  myLeisureParks: IUILeisurePark[];

  wrongStartTime: boolean = false;
  wrongEndTime:boolean = false;
  endTimeshouldGreaterThanStart :boolean = false;

  minDate: string;
  minDateforEndTime: string;
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
      priceUnit: 'day'
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
    //this.minDate =  new Date().toISOString();
    this.minDate = this.getGoodTime().add(8, 'hours').toISOString();
    this.minDateforEndTime =this.getGoodTime().add(12, 'hours').toISOString();
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

  addButtonClick() {
    //Amin: IMP.  +8 display as local timezone .
    this.leisurePark.startTime = this.getGoodTime().add(8, 'hours').toISOString();
    //Amin: IMP. I can't direct use add(8, 'hours'), otherwise when validate endTime, 
    //it would prompt the endTime can't be convet to ISO string, due moment issue.
    this.leisurePark.endTime = this.getGoodTime().add(1, 'days').add(-8,'hours').toISOString();
    //this.leisurePark.endTime = this.getGoodTime().add(8, 'hours').toISOString();
    this.showAddContent = true;
  }

  getGoodTime() {
    let time = moment();
    if (moment().minute() < 30) {
      time.minute(30).second(0);
    } else {
      time.add(1, 'hours').minute(0).second(0);
    }
    return time;
  }

  cancelButtonClick() {
    this.showAddContent = false;
  }

  saveLeisurePark() {
    this.leisurePark.shared_UserID = this.currentUser._id;
    this.leisurePark.carport_ID = this.currentCarport._id;
    this.leisurePark.community_ID = this.currentUser.community_ID._id;

    //Amin: IMP. -8, Save as ISO date
    this.leisurePark.startTime = moment(this.leisurePark.startTime).add(-8, 'hours').toISOString();
    this.leisurePark.endTime = moment(this.leisurePark.endTime).add(-8, 'hours').toISOString();

    if (!this.leisurePark.community_ID) {
      //console.log('saveLeisurePark' + 'delete empty community_ID');
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
          x.priceUnitDisplayText = AppSettings.getDisplayText(x.priceUnit, AppSettings.priceUnitDict);
          x.statusDisplayText = AppSettings.getDisplayText(x.status, AppSettings.leisureParkStatusDict);
        })
      }
    });
  }


  on_startTime_Blur(item) {
    //console.log(item);
    //console.log(item._text);
    if (item && item._text) {
      this.service.checkStartTime(this.currentUser.community_ID._id,this.currentUser._id
        //IMP:comment. add minute for boudary condition.
        ,this.currentCarport._id, moment(item._text).add(1, 'minutes').toISOString()).then( (wrongTime) => {
        //console.log(duplicateUser);
        if (wrongTime) {
          this.wrongStartTime = true;
        }
      });
    }
  }

  on_endTime_Blur(item) {  
    if (item && item._text) {
      const begin  = new Date(this.leisurePark.startTime);
      const end = new Date(this.leisurePark.endTime);
      if(end <= begin){
        this.endTimeshouldGreaterThanStart= true;
      }

      this.service.checkEndTime(this.currentUser.community_ID._id,this.currentUser._id
        //Todo:Amin, what's diff for endtime, due to checkStartTime didn't call this.savedISOTime method
        //It's may be dirty data in database. I should remove all dirty data in db.
        //Todo: do we boundary condition here?
        ,this.currentCarport._id, item._text).then( (wrongEndTime) => { 
        if (wrongEndTime) {
          this.wrongEndTime = true;
        }
      });
    }
  }

  changeText(isStartTime) {
    this.endTimeshouldGreaterThanStart=false;
    if (isStartTime) {
      if (this.wrongStartTime) {
        this.wrongStartTime = false;
      }
    } else {
      if (this.wrongEndTime) {
        this.wrongEndTime = false; 
      }
    }
  }

  refresh() {
    //location.reload();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  
}
