import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { IXJMember } from '../../model/xjMember';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
/**
 * Generated class for the UserPortalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-portal',
  templateUrl: 'user-portal.html',
})
export class UserPortalPage {

  user: IXJMember;
  usernameBlur: boolean;
  minDate: string;
  constructor(public navCtrl: NavController, public apiService: RestServiceProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.user = {
      _id: '',
      name: '',
      birthday: '',
      cellPhone: '',
      address: '',
      status: ''
    }
    this.minDate = '2018-01-01';
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserPortalPage');
  }

  save(){
    this.apiService.addxjMember(
      {
        name: this.user.name,
        birthday: this.user.birthday,
        cellPhone: this.user.cellPhone,
        address: this.user.address 
      }
    ).then((usr: any) => {
      if (usr && usr._id) {
        let alert = this.alertCtrl.create({
          title: '保存成功',
          subTitle: '您的信息已经保存成功。'
        });
        alert.present();
      }
    }).catch(e => {
      console.log(e);
    });
  }

  on_usernameBlur(target) { 
    this.usernameBlur = true;   
  }

}
