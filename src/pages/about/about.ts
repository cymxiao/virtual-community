import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';
import { ILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  leisurePark : ILeisurePark;
  currentUser : IUser;
  constructor(public navCtrl: NavController , private alertCtrl: AlertController) {
    this.leisurePark ={
      _id: '',
      id:'',
      __v:'',
      startTime: null,
      endTime: null,
      status: '',
      carport_ID: '',
      applied_UserID: ''
    }
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if(this.currentUser && !this.currentUser.community_ID){
      this.showPrompt(); 
    }
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '小区',
      message: "请输入你所在的小区名称及地址",
      inputs: [
        { 
          type: 'radio',
          name: 'title',
          placeholder: 'Title' ,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
