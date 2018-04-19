import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from "../login/login";

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
//import { AppSettings } from '../../settings/app-settings';



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
  user: any;
  phone: string;
  pwd: string;
  verifycode: string;
  isLogin: string = "register";
  myForm: any;
  showDuplicateUserNameError: boolean = false;
  blured: boolean = false;

  usernameBlur: boolean;
  passwordBlur: boolean;
  verifyCodeBlur: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public apiService: RestServiceProvider,
     private sms: SMS) {
    this.user = { phone: '', pwd: '' };
  }

  ionViewDidLoad() {
    console.log('send message');
    //this.sms.send('13816873730', 'Hello world!');
  }

  register() {
    //console.log(this.pwd);
    // const encryptPwd = AppSettings.Encrypt(this.pwd);
    // console.log(AppSettings.Decrypt(encryptPwd));
    this.apiService.addUser(
      {
        username: this.phone,
        password: this.pwd
      }
    ).then((usr: any) => {
      if (usr) {
        //console.dir(usr);
        if (usr.duplicateUsername === true) {
          this.showDuplicateUserNameError = true;
          //console.log(this.showDuplicateUserNameError);
        } else {
          localStorage.setItem('user', JSON.stringify(usr));
          this.navCtrl.setRoot(TabsPage);
        }
      }
    }).catch(e => {
      console.log(e);
    });
  }

  changeText()
  { 
    if(this.showDuplicateUserNameError)
    {
      this.showDuplicateUserNameError = false;
    }
  }

  on_username_Blur(item) {
    this.usernameBlur = true;
    //console.log(item);
    //console.log(item.target.value);
    if (item.value) {
      this.apiService.getUser(item.value).then(duplicateUser => {
        //console.log(duplicateUser);
        if (duplicateUser) {
          this.showDuplicateUserNameError = true;
        }
      });
    }
  }
  // go to login page
  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  on_passwordBlur(target){
    this.passwordBlur = true;
  }

  on_verifyCodeBlur(target){
    this.verifyCodeBlur = true;
  }


}
