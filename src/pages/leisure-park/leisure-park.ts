import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { ILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { AutoCompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';
/**
 * Generated class for the LeisureParkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leisure-park',
  templateUrl: 'leisure-park.html',
})
export class LeisureParkPage {

  
  leisurePark: ILeisurePark;
  currentUser: IUser;
  showCommunity: boolean;
  test: string;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public service: RestServiceProvider,
    public autoService: AutoCompleteServiceProvider) {
    this.leisurePark = {
      _id: '',
      id: '',
      __v: '',
      startTime: null,
      endTime: null,
      status: '',
      carport_ID: '',
      applied_UserID: ''
    }
    
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeisureParkPage');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser && !this.currentUser.community_ID) {
      //this.showPrompt();
      this.showCommunity = true;
      
      //this.autoService.getResults('金');
      
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
          placeholder: 'Title',
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
