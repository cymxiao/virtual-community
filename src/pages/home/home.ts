import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {IUser} from '../../model/user';
import { LookupLeisureParkPage } from '../lookup-leisure-park/lookup-leisure-park';

import { AutoCompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';

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
  constructor(public navCtrl: NavController,
    public autoService: AutoCompleteServiceProvider) {
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

  searchTextChagne(ev: any) {
    this.hideList = false;
    this.autoService.getResults(ev.target.value).then(x => {
      this.coms = x;
      this.coms.forEach(element => {
        JSON.stringify(element);
      });
    }); 
  }

  addItem(item: any) {
    this.hideList = true;
    //console.dir(item);
    this.searchQuery = item.name;
    this.selectedComId = item._id;
    //this.selectedComName = item.name;
  }

}
