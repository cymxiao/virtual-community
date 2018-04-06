import { Component ,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { NgForm , Validator, AsyncValidator } from '@angular/forms'

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from "../register/register";
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //@ViewChild('loginForm') lform: NgForm;
  //loginForm : any;
  isLogin : string = "login";
  public user : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public service : RestServiceProvider ) {
    this.user = { phone : '', pwd: '' };
  }

  ionViewDidLoad() {
    //this.user = { phone : '', pwd: '' };
    //console.log(this.lform.form.valid);
    console.log('ionViewDidLoad LoginPage');
  }

    // go to register page
    register() {
      this.navCtrl.setRoot(RegisterPage);
    }

      // login and go to home page
  login() {
    this.service.loginUser({
      username: this.user.phone,
      password: this.user.pwd
    }).then( usr => {
      if(usr){
      this.navCtrl.setRoot(TabsPage);
      }
      else{
        console.log('wrong username or password');
      }
    }).catch( x => {
      console.log(x);
    })

    
  }

  forgotPass()
  {

  }

}
