import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, MenuController } from 'ionic-angular';
import * as moment from 'moment';
//import  * as mz from 'moment-timezone';

import { ILeisurePark, IUILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { ICommunity } from '../../model/community';
import { ICarport } from '../../model/carport';
import { SelectCommunityModalPage } from '../select-community-modal/select-community-modal';
import { AppSettings, UserRoleEnum } from '../../settings/app-settings';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { BasePage } from '../base/base';

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
export class LeisureParkPage extends BasePage{


  leisurePark: ILeisurePark;
  currentUser: IUser;
  currentCommunity: ICommunity;
  currentCarport: ICarport;
  showAddContent: boolean;
  myLeisureParks: IUILeisurePark[];

  wrongStartTime: boolean = false;
  wrongEndTime: boolean = false;
  wrongPrice: boolean = false;

  failedForValidation: boolean;

  endTimeshouldGreaterThanStart: boolean = false;
  fourHoursError: boolean;
  minDate: string;
  minDateforEndTime: string;

  showServiceTime: boolean;
  disableShareFunction: boolean;
  //moment: Moment = new Mome;
  constructor(public navCtrl: NavController,
    public params: NavParams,
    public service: RestServiceProvider,
    public menuCtrl: MenuController,
    //public monent: Moment,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
      super(navCtrl,params);
    //this.failedForValidation = this.wrongStartTime || this.wrongEndTime || this.wrongPrice;
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
      serviceTime: '918',
      timestamp: null,
      priceUnit: '天'
    }

    this.currentCommunity = {
      _id: '',
      id: '',
      __v: '',
      name: '',
      position: '',
      mapid: '',
      city_ID: '',
      PMC:'',
      price:'',
      priceUnit:'天',
      address: ''
    }

    this.currentUser = {
      _id: '',
      username: '',
      password: '',
      community_ID: this.currentCommunity,
      account_ID:'',
      role: '',
      phoneNo: '',
      address: '',
      lastLoginDate: null,
      agreedLicense: null,
      carPlate:'',
      status:'',
      name: ''
    }

    this.currentCarport = {
      _id: '',
      id: '',
      __v: '',
      parkingNumber: '',
      isCurrent: false,
      type: '',
      route: '',
      owner_user_ID: ''
    }
   
  }

  ionViewWillEnter() {
    if (!this.checkCity(this.alertCtrl)) {
      this.disableShareFunction = true;
    }

    if (this.navParams.get('checkPMC') && this.navParams.get('checkPMC') === true) {
      //Amin: todo: add PMC user status check in future. 
      if (this.currentCarport && this.currentUser && !this.currentUser.community_ID.PMC) {
        this.presentCustomAlert(this.alertCtrl, '我们收到您共享车位的申请了。', '贵小区物业尚未注册，我们将尽快与其沟通协调（5个工作日内），待小区物业通过认证后，您即可发布有效共享车位。');
        // this.service.sendSMS(AppSettings, verifyCode).then(x => {
        //   //console.dir(x);
        //   //this.logger.info('User Registed:' + this.cellPhoneNumber + 'has registered, and would get verifycode by SMS.')
        // });
      }
    }
  }

  ionViewDidLoad() { 
    super.menuActive(this.menuCtrl);
    this.minDate = this.getGoodTime().add(8, 'hours').toISOString();
    this.minDateforEndTime = this.getGoodTime().add(12, 'hours').toISOString();
    this.currentUser = AppSettings.getCurrentUser();
    this.currentCarport = AppSettings.getCurrentCarport();
    if (!this.currentUser.community_ID || !this.currentUser.community_ID._id
      || !this.currentCarport || !this.currentCarport.parkingNumber) {
      if (!this.currentUser.role || (this.currentUser.role && this.currentUser.role[0] !== UserRoleEnum.PMCUser)) {
        this.navCtrl.push(SelectCommunityModalPage, { source: "leisurepark" });
      }
    } else {
      if (!AppSettings.getCurrentCarport()) {
        this.service.getCarportListByOwnerId(this.currentUser._id).then((carp: any) => {
          if (carp && carp.length > 0) {
            let filterResult: any = carp.filter((f: any) => { return f.isCurrent === true });
            if (filterResult && filterResult.length > 0) {
              this.currentCarport = filterResult[0];
            }
            localStorage.setItem('carport', JSON.stringify(this.currentCarport));
          }
        });
      } else {
        this.currentCarport = AppSettings.getCurrentCarport();
      }
    }
    this.getLeisureParkforOwner();  

    //console.log(this.currentCarport._id);
  }


  addButtonClick() {

    if (!this.currentUser.community_ID || !this.currentUser.community_ID._id
      || !this.currentCarport || !this.currentCarport.parkingNumber) {
      if (!this.currentUser.role || (this.currentUser.role && this.currentUser.role[0] !== UserRoleEnum.PMCUser)) {
        this.navCtrl.push(SelectCommunityModalPage, { source: "leisurepark" });
      }
    } 

    let time = moment();
    let previousRecordEndTime = time;
    //Amin: IMP, please if use this.currentUser.community_ID, this.currentUser should be init in contructor.
    if (this.currentCarport && this.currentUser && this.currentUser.community_ID) {
      this.service.getStartTimeforNext(this.currentUser.community_ID._id, this.currentUser._id, this.currentCarport._id)
        .then((lpRec: ILeisurePark) => {
          //if there's a previouse record. otherwise time is current time.
          if (lpRec) {
            previousRecordEndTime = moment(lpRec.endTime);
            if (time.isBefore(previousRecordEndTime)) {
              time = previousRecordEndTime;
            }
          }  
          if (time.minute() < 30) {
            time.minute(30).second(0);
          } else {
            time.add(1, 'hours').minute(0).second(0);
          }

          //console.log('1:' + time.format("YYYY-MM-DD hh:mm:ss"));
          this.leisurePark.startTime = time.add(8, 'hours').toISOString();
          //console.log('2:' + time.format("YYYY-MM-DD hh:mm:ss"));
          this.leisurePark.endTime = time.add(8, 'hours').toISOString();
          //console.log('3:' + time.format("YYYY-MM-DD hh:mm:ss"));
          this.showAddContent = true;

        });
        this.leisurePark.price = this.currentUser.community_ID.price ;
        this.leisurePark.priceUnit = this.currentUser.community_ID.priceUnit ; 
          
    } 
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
    //when save to momgo db, remove miniseconds 
    if(this.leisurePark.priceUnit !== '月') {
      const re = /.\d{3}Z/i;
      this.leisurePark.startTime = moment(this.leisurePark.startTime).add(-8, 'hours').toISOString().replace(re, '.000Z');;
      this.leisurePark.endTime = moment(this.leisurePark.endTime).add(-8, 'hours').toISOString().replace(re, '.000Z');
    } else {
      //delete this.leisurePark.startTime ;
      //delete this.leisurePark.endTime ;
    }
    if (!this.leisurePark.community_ID) {
      //console.log('saveLeisurePark' + 'delete empty community_ID');
      delete this.leisurePark.community_ID;
    }
    delete this.leisurePark.applied_UserID;
    //the timestamp should be delete, otherwise it would save null to db.
    delete this.leisurePark.timestamp;
    //delete this.leisurePark._id;
    delete this.leisurePark.status; 
   
    //console.dir(this.leisurePark);
    this.service.addLeisurePark(this.leisurePark).then((lp: any) => {
      if (lp) { 
        this.showAddContent = false;   
        this.refreshPage();
      }
    });
  }


  getLeisureParkforOwner() {
    this.service.getLeisureParkforOwner(this.currentUser._id).then((lpark: any) => {
      if (lpark) {
        this.myLeisureParks = lpark;
        this.myLeisureParks.forEach(x => {
          x.statusDisplayText = AppSettings.getDisplayText(x.status, AppSettings.leisureParkStatusDict);
          x.parkingNumberDisplayText = x.carport_ID? x.carport_ID.parkingNumber : '';
          if(x.priceUnit && x.priceUnit[0]  === '月'){
            x.showServiceTime = true ;
            if(x.serviceTime === '724'){
              x.serviceTimeDisplayText = '全天24小时';
            } else {
              x.serviceTimeDisplayText = '9:00 - 18:00';
            }
          } 
          //console.dir(x);
        })
      }
    });
  }


  on_startTime_Blur(item) {
    //console.log(item._text);
    if (item && item._text) {
      this.checkStartTime(item._text);
    }
  }

  checkStartTime(startTime) {
    this.service.checkStartTime(this.currentUser.community_ID._id, this.currentUser._id
      //IMP:comment. add minute for boudary condition.
      //,this.currentCarport._id, moment(item._text).add(-1, 'minutes').toISOString()).then( (wrongTime) => {
      , this.currentCarport._id, moment(startTime).toISOString()).then((wrongTime) => {
        console.log(wrongTime);
        if (wrongTime) {
          this.wrongStartTime = true;
          this.failedForValidation = this.wrongStartTime || this.wrongEndTime || this.wrongPrice;
        }
      });
  }

  on_price_Blur(item) {
    //console.log(item.value);
    if (item && item.value) {
      if (Number(item.value) < 0 || Number(item.value) > 500) {
        this.wrongPrice = true;

      } else {
        this.wrongPrice = false;
      }
    }
    this.checkStartTime(moment(this.leisurePark.startTime).add(-8, 'hours'));
    //this.checkEndTime(moment(this.leisurePark.endTime));
    this.failedForValidation = this.wrongStartTime || this.wrongEndTime || this.wrongPrice;
  }

  on_endTime_Blur(item) {
    if (item && item._text) {
      this.checkEndTime(item._text);
    }
  }

  checkEndTime(endTime) {
    const begin = new Date(this.leisurePark.startTime);
    const end = new Date(this.leisurePark.endTime);
    //console.log('hours :' + moment(end).diff(moment(begin), 'hours') );
    if (end <= begin) {
      this.endTimeshouldGreaterThanStart = true;
    } else if (moment(end).diff(moment(begin), 'minutes') < 4 * 60) {
      this.fourHoursError = true;
    } else {
      this.service.checkEndTime(this.currentUser.community_ID._id, this.currentUser._id
        //Todo:Amin, what's diff for endtime, due to checkStartTime didn't call this.savedISOTime method
        //It's may be dirty data in database. I should remove all dirty data in db.
        //Todo: do we boundary condition here?
        , this.currentCarport._id, endTime).then((wrongEndTime) => {
          if (wrongEndTime) {
            this.wrongEndTime = true;
            this.failedForValidation = this.wrongStartTime || this.wrongEndTime || this.wrongPrice;
          }
        });
    }
  }

  changeText(isStartTime) {
    this.endTimeshouldGreaterThanStart = false;
    this.fourHoursError = false;
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

  checkServiceTime(){  
    this.showServiceTime = (this.leisurePark.priceUnit === '月');
  }

  refreshPage() {
    //location.reload();
    this.navCtrl.setRoot(this.navCtrl.getActive().component, {
      checkPMC: true
    });
  }

}
