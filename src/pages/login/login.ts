import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from "../register/register";
import { IUser } from '../../model/user';
import { IAccount } from '../../model/account';
import { ICarport } from 'model/carport';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';
import { PmcCarportDashboardPage } from '../pmc-carport-dashboard/pmc-carport-dashboard';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { Logger } from "angular2-logger/core";

import { AppSettings, UserRoleEnum } from '../../settings/app-settings';
import { SmsCodeComponent } from '../../components/sms-code/sms-code';
import { BasePage } from '../base/base';


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
export class LoginPage extends BasePage {


  isLogin: string = "login";
  public user: any;
  usernameBlur: boolean;
  passwordBlur: boolean;
  wrongUsrorPwd: boolean = false;
  cellPhoneError: boolean = false;
  currentCarport: ICarport;
  @ViewChild(SmsCodeComponent) smsCom: SmsCodeComponent;

  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private logger: Logger,
    public service: RestServiceProvider) {
    super(navCtrl, navParams);
    this.user = { phone: '', pwd: '' };
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
    this.redirctPage(this.currentUser);
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
        //If lastLoginDate is null in mongo db, it means , there may be no verify code send to this user's cellphone.
        //create user account for pmc user and normal user.
        this.service.addAccount({ user_ID: usr._id, credit: 0 }).then((account: IAccount) => {
          if (account) {
            const udpateContent = {
              lastLoginDate: new Date(),
              account_ID: account._id
            };
            this.service.updateUser(usr._id, udpateContent).then((uptUser: any) => {
              //console.log(uptUser);
              localStorage.setItem('user', JSON.stringify(uptUser));
              this.service.getCarportListByOwnerId(usr._id).then((carp: any) => {
                if (carp && carp.length > 0) {
                  let filterResult: any = carp.filter((f: any) => { return f.isCurrent === true });
                  if (filterResult && filterResult.length > 0) {
                    this.currentCarport = filterResult[0];
                  }
                  localStorage.setItem('carport', JSON.stringify(this.currentCarport));
                }
              });
              //console.dir(usr);
              this.redirctPage(usr);
            });
          }
        });
      } else {
        this.wrongUsrorPwd = true;
        //console.log('wrong username or password');
        this.logger.error('wrong username or password.');
      }
    });
  }

  on_usernameBlur(target) {
    //console.log('username on blur');
    this.usernameBlur = true;
    this.smsCom.disabled();
  }

  on_passwordBlur(target) {
    this.passwordBlur = true;
  }
 

  redirctPage(usr: IUser) { 
    if (usr) { 
      if ( usr.role && usr.role[0] === UserRoleEnum.PMCUser ) {

        localStorage.setItem('user', JSON.stringify(usr));
        this.navCtrl.setRoot(PmcCarportDashboardPage, { "refresh": "true" });
      } else {
        if (usr.username === AppSettings.PHONE_ADMIN) {
          this.navCtrl.setRoot(AdminDashboardPage);
        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      }  
    }
  }
}
