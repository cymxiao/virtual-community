import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { GeographicalMapServiceProvider } from '../../providers/geographical-map-service/geographical-map-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  users: any;
  map: any;
  constructor(public navCtrl: NavController
    , public restServiceProvider: RestServiceProvider
    , private mapService: GeographicalMapServiceProvider) {
    this.getUsers();
    this.getMap();
  }

  getUsers() {
    this.restServiceProvider.getUsers()
      .then(data => {
        this.users = data;
      });
  }

  getMap() {
    this.restServiceProvider.getMap()
      .then(data => {
        this.map = JSON.stringify(data);
      });
  }
}
