import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ILeisurePark } from '../../model/leisurePark';
import { IUser } from '../../model/user';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { AutoCompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';

import {ICommunity} from '../../model/community';
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
  searchText: string;
  coms : any ;


  searchQuery: string = '';
  items: string[];
  hideList : boolean  ;

  constructor(public navCtrl: NavController,  
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
 
      this.showCommunity = true;
      
    
       
      //this.initializeItems();
    }
  }

  searchTextChagne(ev: any)
  {
    this.hideList = false;
    this.autoService.getResults(ev.target.value).then( x => {
       this.coms = x;
       this.coms.forEach(element => {
         JSON.stringify(element);
       });
       
      // console.dir(x);
    });
    
  }
    
  // initializeItems() {
  //   this.items = [
  //     'Amsterdam',
  //     'Bogota',
  //     'Boot'
  //   ];
  // }

  
  // addItem(item:any){
  //   this.hideList = true;
  //   //console.dir(item);
  //   this.searchQuery =  item.toString();
  // }

  addItem(item:any){
    this.hideList = true;
    console.dir(item);
    this.searchQuery =  item.name;
  }

  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   this.initializeItems();

  //   // set val to the value of the searchbar
  //   let val = ev.target.value;
  //   this.hideList = false;
  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.items = this.items.filter((item) => {
  //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   } 
  // }

}
