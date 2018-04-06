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

  }

}
