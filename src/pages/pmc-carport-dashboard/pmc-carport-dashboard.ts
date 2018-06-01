import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController,  NavParams } from 'ionic-angular';


import { IUILeisurePark } from '../../model/leisurePark';
import { AppSettings } from '../../settings/app-settings';
 

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { BasePage } from '../base/base';
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
export class PmcCarportDashboardPage extends BasePage {
  appliedLeisureParks : IUILeisurePark[];
  //currentCommunity: ICommunity;
  currentComId: string;
  inputComId: string;
  activeMenu: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public apiService: RestServiceProvider) { 
      super(navCtrl,alertCtrl,navParams);
      this.activeMenu = super.menuPMCActive(menuCtrl);
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
 
      if (lpark && lpark.length>0) {
        this.appliedLeisureParks = lpark;
        this.appliedLeisureParks.forEach(x => {
          x.priceUnitDisplayText = AppSettings.getDisplayText(x.priceUnit, AppSettings.priceUnitDict);
          x.statusDisplayText = AppSettings.getDisplayText( x.status , AppSettings.leisureParkStatusDict); 
        }) 
      }
    });
  }  


}
