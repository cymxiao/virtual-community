import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from "../login/login";

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  //registerForm;
  user : any ;
  phone : string;
  pwd: string;
  verifycode: string;
  isLogin : string = "register";
  myForm:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,  public service : RestServiceProvider) {
    this.user = { phone : '', pwd: '' };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
     
  }

  register() {
    //console.log(this.pwd);
    this.service.addUser(
      {
        username: this.phone,
        password: this.pwd
      }
    ).then( usr => {
      localStorage.setItem('user', JSON.stringify(usr));
      this.navCtrl.setRoot(TabsPage);
    }).catch( e => {
      console.log(e);
    });
  }
  // go to login page
  login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
