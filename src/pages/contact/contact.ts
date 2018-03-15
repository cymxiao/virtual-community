import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  users: any;
  constructor(public navCtrl: NavController, public restServiceProvider: RestServiceProvider) {
    this.getUsers();
  }

  getUsers() {
    this.restServiceProvider.getUsers()
    .then(data => {
      console.dir(data);
      this.users = data;
      console.log(this.users);
    });
  }

}
