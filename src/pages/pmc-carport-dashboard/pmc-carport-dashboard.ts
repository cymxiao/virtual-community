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
  currentComId: string;
  inputComId: string;
  activeMenu: string;
  pendingOnVerify:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public apiService: RestServiceProvider) { 
      super(navCtrl, navParams);
      this.activeMenu = super.menuPMCActive(menuCtrl);
  }

 
  ionViewDidLoad() { 
    super.ionViewDidLoad();
    super.checkifPMCUserPendingOnVerify();
    this.pendingOnVerify = this.pendingStatus; 
    this.currentComId = AppSettings.getCurrentCommunityID(); 
    if(!this.currentComId && AppSettings.getCurrentUser() && AppSettings.getCurrentUser().community_ID ){
      this.currentComId = AppSettings.getCurrentUser().community_ID._id;
    } 
    this.getLeisureParkbyApplier(); 
  }


  updateStatus(leisurePark){
    const updateBody = {
      status: 'paid'  
    }; 
      this.apiService.updateleisurePark(leisurePark._id, updateBody).then(lp => {
        if (lp && leisurePark.applied_UserID && leisurePark.applied_UserID._id) { 
          //console.log(leisurePark.applied_UserID);
          this.apiService.updateAccountCredit(leisurePark.applied_UserID._id, { credit : 0.5 * leisurePark.price }).then( suc => {
            if (suc ){
               //Fresh page.
              this.getLeisureParkbyApplier();
            }
          }); 
        }
      }); 
  }

 
  getLeisureParkbyApplier() {
    //console.log('pmc getLeisureParkbyCommunity' + this.currentComId); //"5adaef7a8afb9251ff14f7ae")
    this.apiService.getLeisureParkbyCommunity(this.currentComId,'000000000000000000000000').then((lpark: any) => {
      if (lpark && lpark.length>0) {

        this.appliedLeisureParks = lpark;
        this.appliedLeisureParks.forEach(x => {
          x.priceUnitDisplayText = AppSettings.getDisplayText(x.priceUnit, AppSettings.priceUnitDict);
          x.statusDisplayText = AppSettings.getDisplayText( x.status , AppSettings.leisureParkStatusDict); 

          if(x.status && x.status[0] === 'applied' && x.applied_UserID && x.applied_UserID.carPlate){
            x.showPMCButton = true;
            x.statusDisplayText  = '车牌号为：' + x.applied_UserID.carPlate + ' 的车辆' +  x.statusDisplayText;
          }
        }) 
      }
    });
  } 


}
