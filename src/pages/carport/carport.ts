import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { ICarport } from '../../model/carport';
import { AppSettings } from '../../settings/app-settings';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { BasePage } from '../base/base';

/**
 * Generated class for the CarportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carport',
  templateUrl: 'carport.html',
})
export class CarportPage extends BasePage {
  user: any;
  carport: ICarport;
  pathdescription: string;
  errorInfo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    //public alertCtrl: AlertController,
    public service: RestServiceProvider) {
      super(navCtrl,navParams);
    this.carport = {
      _id: '',
      id: '',
      __v: '',
      parkingNumber: '',
      isCurrent: false,
      type: '',
      route: '',
      owner_user_ID: ''
    };
  }

  ionViewDidLoad() {
    this.user = AppSettings.getCurrentUser();
  }

  btnSaveCarport() {
    if (this.user && this.carport.parkingNumber) {
      //add a carport
      const carport = {
        parkingNumber: this.carport.parkingNumber,
        route: this.carport.route,
        community_ID: this.user.community_ID ? this.user.community_ID._id : null,
        owner_user_ID: this.user._id
      }
      this.service.addCarport(carport).then((cp: any) => {
        //console.log(cp);
        if (cp) {
          if (cp.parkingNumber === '-1') {
            this.errorInfo = '此车位编号已被占用，请核实后重新输入';
          } else if (cp.parkingNumber === '-3') {
            this.errorInfo = '单个用户最多可以拥有3个车位';
          } else if (cp._id) {
            this.dismiss({ "data": cp });
          } 
        }
      });
    }
  }

  btnCancel() {
    this.dismiss({});
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
