import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { IUILeisurePark } from '../../model/leisurePark';
//import { ICommunity } from '../../model/community';
import { AppSettings } from '../../settings/app-settings';
import { ProfilePage } from '../profile/profile';

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
       //in app constructor, when platform.ready(), the localstrage hasn't been saved yet. So I can't get any value
    //from localstorage 
    // if(this.navParams.get("refresh")=== 'true' ){
    //   this.refresh();
    //   //this.navParams.
    // } 
  }

 
  ionViewDidLoad() {
    this.currentComId = AppSettings.getCurrentCommunityID(); 
    if(!this.currentComId && AppSettings.getCurrentUser() && AppSettings.getCurrentUser().community_ID ){
      this.currentComId = AppSettings.getCurrentUser().community_ID._id;
    }
    //console.log('ionViewDidLoad MyOrdersPage');
    this.getLeisureParkbyApplier();
   
    
  }

  getLeisureParkbyApplier() {
    //console.log('pmc getLeisureParkbyCommunity' + this.currentComId); //"5adaef7a8afb9251ff14f7ae")
    this.apiService.getLeisureParkbyCommunity(this.currentComId,'000000000000000000000000').then((lpark: any) => {
      console.dir(lpark);
      if (lpark && lpark.length>0) {
        this.appliedLeisureParks = lpark;
        this.appliedLeisureParks.forEach(x => {
          x.priceUnitDisplayText = AppSettings.getDisplayText(x.priceUnit, AppSettings.priceUnitDict);
          x.statusDisplayText = AppSettings.getDisplayText( x.status , AppSettings.leisureParkStatusDict); 
        }) 
      }
    });
  }  

  refresh() {
    //location.reload();
    this.navCtrl.setRoot(this.navCtrl.getActive().component, {"refresh": "false"});
  }

}
