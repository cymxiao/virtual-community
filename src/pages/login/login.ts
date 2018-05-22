import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from "../register/register";
import { IUser } from '../../model/user';
import { PmcCarportDashboardPage } from '../pmc-carport-dashboard/pmc-carport-dashboard';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
//import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

import { AppSettings, UserRoleEnum, UserStatusEnum } from '../../settings/app-settings';

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
  cellPhoneError: boolean = false;

  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    //private smsService : SmsServiceProvider,
    public service: RestServiceProvider) {
    this.user = { phone: '', pwd: '' };
    //this.verifyCode.countdown = 1;
  }

  ionViewDidLoad() {
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username) {
      const usr: IUser = AppSettings.getCurrentUser();
      if (!usr.role || (usr.role && usr.role[0] !== UserRoleEnum.PMCUser)) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.navCtrl.setRoot(PmcCarportDashboardPage);
      }
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
      //password: AppSettings.Encrypt(this.user.pwd)
      password: this.user.pwd
    }).then((usr: IUser) => {
      if (usr) {
        //update user status to valid
        const udpateContent = {
          status: UserStatusEnum.active
        };
        this.service.updateUser(usr._id, udpateContent).then((uptUser: any) => {
          //console.log(uptUser);
          localStorage.setItem('user', JSON.stringify(uptUser));
          if (!usr.role || (usr.role && usr.role[0] !== UserRoleEnum.PMCUser)) {
            this.navCtrl.setRoot(TabsPage);
          } else {
            this.navCtrl.setRoot(PmcCarportDashboardPage);
          }
        });
      } else {
        this.wrongUsrorPwd = true;
        //console.log('wrong username or password');
      }
    }).catch(x => {
      console.log(x);
    })
  }

  forgotPass() {

  }

  on_usernameBlur(target) {
    //console.log('username on blur');
    this.usernameBlur = true;
    if (this.user.phone && this.user.phone.length === 11) {
      this.cellPhoneError = false;
      this.verifyCode.disable = false;
    } else {
      //this.cellPhoneError = true;
      this.verifyCode.disable = true;
    }
  }

  on_passwordBlur(target) {
    this.passwordBlur = true;
  }

  settime() {
    if (this.user.phone && this.user.phone.length === 11) {
      //console.log(this.verifyCode.countdown);
      if (this.verifyCode.countdown == 1) {
        this.verifyCode.countdown = 60;
        this.verifyCode.verifyCodeTips = "获取验证码";
        this.verifyCode.disable = false;
        return;
      } else {
        this.verifyCode.countdown--;
        //this.verifyCode.disable = true;  
      }
      this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown;
      setTimeout(() => {
        this.verifyCode.disable = true;
        this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown;
        this.settime();
      }, 1000);
    }
  }

  sendSMS() {
    if (this.user.phone && this.user.phone.length === 11) {
      const cellPhone = this.user.phone;
      //generate a random number , length six
      const verifyCode = Math.round(Math.random() * 1000000);
      console.log(verifyCode);

      //register this user
      this.service.addUser(
        {
          username: cellPhone,
          //password: AppSettings.Encrypt(verifyCode),
          password: verifyCode,
          status: UserStatusEnum.pendingOnVerify
        }
      ).then((usr: any) => {
        if (usr) {
          //console.dir(usr);
          if (usr.duplicateUsername === true) {
            console.log('User Exist, Update password directly');
            const udpateContent = {
              password: verifyCode
            };
            this.service.updateUser(usr._id, udpateContent).then((uptUser: any) => {
              if (uptUser) {
                //console.dir(uptUser);
                console.log('update user password suc when user exist on login page.');
              } else {
                console.log('update user failed suc when user exist on login page.');
              }
            });
          }
        }
      }).catch(e => {
        console.log(e);
      });
      this.service.sendSMS(cellPhone, verifyCode).then(x => {
        console.dir(x);
      });
    } else {
      this.cellPhoneError = true;
    }
  }
}
