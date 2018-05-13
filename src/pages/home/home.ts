import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {IUser} from '../../model/user';
import { LookupLeisureParkPage } from '../lookup-leisure-park/lookup-leisure-park';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user : IUser;
  selectedComId: string;
  //selectedComName: string;
  searchQuery: string = '';
  coms: any;
  hideList: boolean;
  constructor(public navCtrl: NavController) {
    this.getCurrentUserName();
  }

  getCurrentUserName()
  {
    this.user = JSON.parse(localStorage.getItem('user'));
 
  }


  searchClicked(){
    // push another page onto the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(LookupLeisureParkPage, {
      comId: this.selectedComId,
      comName: this.searchQuery
    });
  }

}
