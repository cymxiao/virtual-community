import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IUILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { AppSettings } from '../../settings/app-settings';
import { TabsPage } from '../tabs/tabs';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';

/**
 * Generated class for the MyOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'myorders.html',
})
export class MyOrdersPage {
  appliedLeisureParks : IUILeisurePark[];
  currentUser: IUser;
  inputComId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public apiService: RestServiceProvider) {
  }

  ionViewDidLoad() {
    this.currentUser = AppSettings.getCurrentUser(); 
    //console.log('ionViewDidLoad MyOrdersPage');
    this.getLeisureParkbyApplier();
  }

  getLeisureParkbyApplier() {
    if(!this.inputComId){
      this.inputComId = this.navParams.get('comId');
    }
    this.apiService.getLeisureParkforApplier( this.currentUser._id).then((lpark: any) => {
      if (lpark && lpark.length>0) {
        this.appliedLeisureParks = lpark;
        this.appliedLeisureParks.forEach(x => {
          x.priceUnitDisplayText = AppSettings.getDisplayText(x.priceUnit, AppSettings.priceUnitDict);
          x.statusDisplayText = AppSettings.getDisplayText( x.status , AppSettings.leisureParkStatusDict); 
        }) 
      }
    });
  }  

  goBackHome()
  {
    this.navCtrl.setRoot(TabsPage);
  }
}
