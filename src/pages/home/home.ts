import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {IUser} from '../../model/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user : IUser
  constructor(public navCtrl: NavController) {
    this.getCurrentUserName();
  }

  getCurrentUserName()
  {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.dir(this.user);
  }

}
