import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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


  isLogin: string = "login";
  public user: any;
  usernameBlur: boolean;
  passwordBlur: boolean;
  wrongUsrorPwd: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: RestServiceProvider) {
    this.user = { phone: '', pwd: '' };
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
    if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username ){
      this.navCtrl.setRoot(TabsPage);
    }
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
    }).then(usr => { 
      if (usr) {
        localStorage.setItem('user', JSON.stringify(usr));
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        this.wrongUsrorPwd = true;
        console.log('wrong username or password');
      }
    }).catch(x => {
      console.log(x);
    })
  }

  forgotPass() {

  }

  on_usernameBlur(target){
    console.log('username on blur');
    this.usernameBlur = true;
  }

  on_passwordBlur(target){
    this.passwordBlur = true;
  }


}
