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
  isLogin : string = "register";
   signupform: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public service : RestServiceProvider) {
    this.user = { phone : '', pwd: '' };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
      this.signupform = new FormGroup({
        phone: new FormControl('', [Validators.required, Validators.pattern('\d{11}'), Validators.minLength(11), Validators.maxLength(11)]),
        pwd: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      code: new FormControl('', [Validators.required, Validators.pattern('\d{4}'), Validators.minLength(4), Validators.maxLength(6)]),

    });
  }

  register() {
    console.log(this.pwd);
    this.service.addUser(
      {
        username: this.phone,
        password: this.pwd
      }
    ).then( x => {
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
