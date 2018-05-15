import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { IUILeisurePark } from '../../model/leisurePark';
//import { ICommunity } from '../../model/community';
import { AppSettings } from '../../settings/app-settings';
import { TabsPage } from '../tabs/tabs';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
/**
 * Generated class for the PmcCarportDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pmc-carport-dashboard',
  templateUrl: 'pmc-carport-dashboard.html',
})
export class PmcCarportDashboardPage {
  appliedLeisureParks : IUILeisurePark[];
  //currentCommunity: ICommunity;
  currentComId: string;
  inputComId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public apiService: RestServiceProvider) {
  }

 
  ionViewDidLoad() {
    this.currentComId = AppSettings.getCurrentCommunityID(); 
    //console.log('ionViewDidLoad MyOrdersPage');
    this.getLeisureParkbyApplier();
  }

  getLeisureParkbyApplier() {
    //console.log('pmc getLeisureParkbyCommunity' + this.currentComId);
    this.apiService.getLeisureParkbyCommunity(this.currentComId, -10 ).then((lpark: any) => {
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
