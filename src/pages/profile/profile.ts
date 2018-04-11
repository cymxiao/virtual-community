import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { RestServiceProvider } from '../../providers/rest-service/rest-service';
 
import { IUser } from '../../model/user';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //map: any;
  user : IUser;
  constructor(public navCtrl: NavController){//, public restServiceProvider: RestServiceProvider) {
    //this.getMap();

    this.getCurrentUserName();
   //localStorage.clear();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProfilePage');
  // }


  getCurrentUserName()
  {
    this.user = JSON.parse(localStorage.getItem('user')); 
    if(this.user){
    console.log('username on profile page is:'  + this.user.username);
    } else {
      console.log('user is empty' );
    }
  }

  // getMap() {
  //   this.restServiceProvider.getMap()
  //     .then(data => {
  //       this.map = JSON.stringify(data);
  //       //this.map = data;
  //       console.log(this.map);
  //       //console.log(this.map.address);
  //     });
  // }

}
