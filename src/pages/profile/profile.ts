import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController } from 'ionic-angular';
import { MyOrdersPage } from '../myorders/myorders';

 
import { IUser } from '../../model/user';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //map: any;
  user : IUser;
  activeMenu: string;
  constructor(public navCtrl: NavController,
    public menu: MenuController){//, public restServiceProvider: RestServiceProvider) {
    //this.getMap();
    this.activeMenu = 'menuPortal';
    this.menu.enable(true, 'menuPortal');
    this.getCurrentUserName();
  
  }

  

  getCurrentUserName()
  {
    this.user = JSON.parse(localStorage.getItem('user')); 
    if(this.user){
    console.log('username on profile page is:'  + this.user.username);
    } else {
      console.log('user is empty' );
    }
  }

  myOrders()
  {
    this.navCtrl.push(MyOrdersPage);
  }

  logout()
  {
    localStorage.clear();
    location.reload();
  }


}
