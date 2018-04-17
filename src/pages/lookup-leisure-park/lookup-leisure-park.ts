import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IUILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { AppSettings } from '../../settings/app-settings';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

import * as moment from 'moment';
/**
 * Generated class for the LookupLeisureParkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lookup-leisure-park',
  templateUrl: 'lookup-leisure-park.html',
})
export class LookupLeisureParkPage {

  sharedLeisureParks : IUILeisurePark[];
  currentUser: IUser;
  inputComId: string;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public apiService: RestServiceProvider) {
      this.inputComId = navParams.get('comId');
  }

  ionViewDidLoad() {
    this.currentUser = AppSettings.getCurrentUser(); 
    console.log('ionViewDidLoad LookupLeisureParkPage');
    this.getLeisureParkbyCommunity();
  }

  apply(lpId){
    console.log('lpId: ' + lpId);
    const updateBody = {
      status : 'applied',
      applied_UserID: this.currentUser._id
    };
    this.apiService.updateleisurePark(lpId,updateBody).then(lp => {
      if(lp){
        console.log(lp);
      }
    });
  }

  getLeisureParkbyCommunity() {
    if(!this.inputComId){
      this.inputComId = this.navParams.get('comId');
    }
    this.apiService.getLeisureParkbyCommunity(this.inputComId, this.currentUser._id).then((lpark: any) => {
      if (lpark && lpark.length>0) {
        this.sharedLeisureParks = lpark;
        this.sharedLeisureParks.forEach(x => {
          x.priceUnitDisplayText = AppSettings.getDisplayText(x.priceUnit, AppSettings.priceUnitDict);
          x.statusDisplayText = AppSettings.getDisplayText( x.status , AppSettings.leisureParkStatusDict); 
          x.avaibleHours = this.getHoursNumber(x.startTime,x.endTime);
        }) 
      }
    });
  }  

  getHoursNumber(startTime,endTime )
  {
    var a = moment(endTime);
    var b = moment() > moment(startTime) ? moment() : moment(startTime); 
    //console.log(a.format() + '|||||||' + b.format());
    return a.diff(b, 'hours'); // 1
  }
  
}
