import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppSettings, UserStatusEnum } from '../../settings/app-settings';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { BasePage } from '../base/base';
import { IAdminUser } from 'model/user';

/**
 * Generated class for the AdminDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage extends BasePage {

  pendingPMCUser: IAdminUser[];
  approvedPMCUser: IAdminUser[];

  constructor(public navCtrl: NavController,
    public apiService: RestServiceProvider,
    public navParams: NavParams) {
    super(navCtrl, navParams);
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
    this.initData();
  }

  initData() {
    this.apiService.getPMCUsers(UserStatusEnum.pendingOnVerify).then((pus: any) => {
      if (pus) {
        pus.forEach(x => {
          if (x.community_ID) {
            x.priceUnitDisplayText = AppSettings.getDisplayText(x.community_ID.priceUnit, AppSettings.priceUnitDict);
          }
        });
        this.pendingPMCUser = pus;
        //console.dir(this.pendingPMCUser);
      }
    });

    this.apiService.getPMCUsers(UserStatusEnum.active).then((pus: any) => {
      if (pus) {
        pus.forEach(x => {
          if (x.community_ID) {
            x.priceUnitDisplayText = AppSettings.getDisplayText(x.community_ID.priceUnit, AppSettings.priceUnitDict);
          }
        });
        this.approvedPMCUser = pus;
      }
    });
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  updatePMCStatus(userId) {
    if (userId)
      this.apiService.updateUser(userId, { status: 'active' }).then(usr => {
        if (usr) {
          super.refresh();
        }
      });
  }
}
