import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';

import { ICarport } from 'model/carport';
import { AppSettings } from '../../settings/app-settings';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';

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
export class CarportPage {
  user: any;
  carport:ICarport;
  pathdescription: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public service: RestServiceProvider) {
      this.carport = {
        _id: '',
        id: '',
        __v: '',
        parkingNumber: '',
        isCurrent:false,
        type: '',
        route: '',
        owner_user_ID: ''
      };
  }

  ionViewDidLoad() {
    this.user = AppSettings.getCurrentUser();
    console.log('ionViewDidLoad CarportPage');
  }

  btnSaveCarport() {
    if (this.user && this.carport.parkingNumber) { 
      //add a carport
      const carport = {
        parkingNumber: this.carport.parkingNumber,
        route: this.carport.route,
        owner_user_ID: this.user._id
      }
      this.service.addCarport(carport).then((cp: any) => { 
        if(cp && cp._id){
           this.dismiss({ "refresh": "true" });
          //  this.viewCtrl.dismiss();
          //  this.navCtrl.getRootNav().push(SecondPage);
        }
      });
    }
  }

  btnCancel(){
    this.dismiss({});
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
