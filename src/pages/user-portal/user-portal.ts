import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { IXJMember } from '../../model/xjMember';
import { IUser } from '../../model/user';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { AppSettings } from '../../settings/app-settings';
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


  member: IXJMember;
  userArray: IXJMember[];
  usernameBlur: boolean;
  minDate: string;
  currentUser: IUser;

  constructor(public navCtrl: NavController, public apiService: RestServiceProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.member = {
      _id: '',
      name: '',
      birthday: null,
      cellPhone: '',
      address: '',
      status: ''
    }
    this.minDate = '2018-01-01';

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserPortalPage');
    this.currentUser = AppSettings.getCurrentUser();
    if (this.currentUser && this.currentUser.username === AppSettings.PHONE1) {
      this.apiService.getxjMembers().then((arr: any) => {
        console.dir(arr);
        if (arr) {
          this.userArray = arr;
        }
      });
    }
  }

  save() {
    this.apiService.savexjMember(
      {
        name: this.member.name,
        birthday: this.member.birthday,
        cellPhone: this.member.cellPhone,
        address: this.member.address
      }
    ).then((usr: any) => {
      if (usr && usr._id) {
        let alert = this.alertCtrl.create({
          title: '保存成功',
          subTitle: '您的信息已经保存成功。'
        });
        alert.present();
        //this.refresh();
      }
    }).catch(e => {
      console.log(e);
    });
  }

  on_usernameBlur(item) {
    //console.log('user name blur');
    this.usernameBlur = true;
    if (item.value) {
      this.apiService.getxjMember(item.value).then((mem: any) => {
        if (mem) {
          this.member.birthday = mem.birthday;
          this.member.cellPhone = mem.cellPhone;
          this.member.address = mem.address;
          this.userArray = [this.member];
        }
      });
    }
  }

  refresh() { 
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
