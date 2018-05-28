import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from "../register/register";
import { UserPortalPage } from "../user-portal/user-portal";
import { IUser } from '../../model/user';
import { PmcCarportDashboardPage } from '../pmc-carport-dashboard/pmc-carport-dashboard';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { Logger } from "angular2-logger/core";

import { AppSettings, UserRoleEnum, UserStatusEnum } from '../../settings/app-settings';
import { SmsCodeComponent } from '../../components/sms-code/sms-code';

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
  @ViewChild(SmsCodeComponent) smsCom: SmsCodeComponent;

  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private logger: Logger,
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
     
            if (usr.username !== AppSettings.PHONE1) {
              this.navCtrl.setRoot(TabsPage);
            } else {
              this.navToMemberPage();
            }
          } else {
            this.navCtrl.setRoot(PmcCarportDashboardPage);
          }
        });
      } else {
        this.wrongUsrorPwd = true;
        //console.log('wrong username or password');
        this.logger.error('wrong username or password.');
      }
    }).catch(x => {
      console.log(x);
    })
  }

  on_usernameBlur(target) {
    //console.log('username on blur');
    this.usernameBlur = true;
    this.smsCom.disabled();
  }

  on_passwordBlur(target) {
    this.passwordBlur = true;
  }

  navToMemberPage() {
    //console.log('haha this');
    this.navCtrl.push(UserPortalPage);
  }
}
