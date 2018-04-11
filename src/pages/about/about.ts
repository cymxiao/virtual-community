import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { AutoCompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  //leisurePark: ILeisurePark;
  currentUser: IUser;
  showCommunity: boolean;
  test: string;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public service: RestServiceProvider,
    public autoService: AutoCompleteServiceProvider) {
 
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser && !this.currentUser.community_ID) {
      //this.showPrompt();
      this.showCommunity = true;
      this.test = "haha1";
      this.autoService.getResults('金');
      this.test = "haha2";
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
