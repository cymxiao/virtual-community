import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { IAccount } from '../../model/account';
import { BasePage } from '../base/base';

/**
 * Generated class for the MyCreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-credit',
  templateUrl: 'my-credit.html',
})
export class MyCreditPage extends BasePage {

  myCredit: number;
  enableCleanCredit: boolean;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public apiService: RestServiceProvider, public navParams: NavParams) {
    super(navCtrl, navParams);

  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
    this.loadCredit();
  }

  loadCredit() {
    //Amin: another solution is: populate the account_ID and define account_ID as IAccount in FE model class IUser.ts.
    if (this.currentUser && this.currentUser._id) {
      this.apiService.getAccount(this.currentUser._id).then((account: IAccount) => {
        if (account) { 
          this.myCredit = !account.credit ? 0 : account.credit;
          //Amin: check the reason  of this.myCredit.length is always undefined.
          this.enableCleanCredit = (this.myCredit > 99);
        }
      });
    }
  }




  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: '确定清零吗',
      message: '您确定要抵扣停车费吗？此操作将会清零当前余额，请注意此操作不可自行恢复。',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');
            this.clearCredit();
          }
        }
      ]
    });
    confirm.present();
  }


  clearCredit() {
    if (this.currentUser && this.currentUser._id) {
      this.apiService.updateAccount(this.currentUser._id, { status: 'deleted', obsoleteTime: new Date()}).then(acc => {
        if (acc) {
          //create a new account
          this.apiService.addAccount({ user_ID: this.currentUser._id, credit: 0 }).then((account: IAccount) => {
            if (account) {
              super.refresh();
            }
          });
        }
      });
    }
  }

}
