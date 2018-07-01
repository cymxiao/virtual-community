import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';


import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from "../register/register";
import { IUser } from '../../model/user';
import { IAccount } from '../../model/account';
import { ICarport } from '../../model/carport';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';
import { PmcCarportDashboardPage } from '../pmc-carport-dashboard/pmc-carport-dashboard';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

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
  showPrivacyError: boolean;
  @ViewChild(SmsCodeComponent) smsCom: SmsCodeComponent;

  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public service: RestServiceProvider) {
    super(navCtrl, navParams);
    this.user = { phone: '', pwd: '', agreedLicense: '' };
    //this.licenseRejected = (this.user.agreedLicense === 'Rejected');
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
    this.redirctPage(this.currentUser);
  }

  // go to login page
  navToLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

  navToRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    if (!this.user.phone || !this.user.pwd) {
      return false;
    }
    this.service.loginUser({
      username: this.user.phone,
      //password: AppSettings.Encrypt(this.user.pwd)
      password: this.user.pwd
    }).then((usr: IUser) => {
      if (usr) {
        //If lastLoginDate is null in mongo db, it means , there may be no verify code send to this user's cellphone.
        //create user account for pmc user and normal user.
        if (!usr.agreedLicense) {
          if (!(this.user.agreedLicense === 'Agreed')) {
            this.showPrivacyError = true;
            return;
          } else {
            this.addAccountandUpdateUser(usr);
          }
        } else {
          this.addAccountandUpdateUser(usr);
        }
      } else {
        this.wrongUsrorPwd = true;
        //console.log('wrong username or password');
        //this.logger.error('wrong username or password.');
      }
    });
  }

  addAccountandUpdateUser(usr){
    this.service.addAccount({ user_ID: usr._id, credit: 0 }).then((account: IAccount) => {
      if (account) {
        const udpateContent = {
          lastLoginDate: new Date(),
          agreedLicense: true,
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
    if (usr && usr._id) {
      if (usr.role && usr.role[0] === UserRoleEnum.PMCUser) {

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

  agreeLicenseConfirmAlert() {
    let alert = this.alertCtrl.create({
      title: '是否同意隐私条款?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy ' +
        'Do you agree to use this lightsaber to do good across the intergalactic galaxy ' +
        'Do you agree to use this lightsaber to do good across the intergalactic galaxy ' +
        'Do you agree to use this lightsaber to do good across the intergalactic galaxy ' +
        'Do you agree to use this lightsaber to do good across the intergalactic galaxy ' +
        'Do you agree to use this lightsaber to do good across the intergalactic galaxy ' +

        'Do you agree to use this lightsaber to do good across the intergalactic galaxy ',
      buttons: [
        {
          text: '拒绝',
          handler: () => {
            console.log('Disagree clicked');
            this.user.agreedLicense = 'Rejected';
            //this.licenseRejected = true;
            //console.log(this.licenseRejected);
          }
        },
        {
          text: '同意',
          handler: () => {
            console.log('Agree clicked');
            //this.licenseRejected = false;
            this.user.agreedLicense = 'Agreed';
          }
        }
      ]
    });

    alert.present();
  }
}
