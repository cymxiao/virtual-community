import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ILeisurePark} from '../../model/leisurePark';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  leisurePark : ILeisurePark;
  constructor(public navCtrl: NavController) {
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
  }

}
