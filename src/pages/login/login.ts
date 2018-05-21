import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from "../register/register";
import { IUser } from '../../model/user';
import { PmcCarportDashboardPage } from '../pmc-carport-dashboard/pmc-carport-dashboard';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
//import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

import { AppSettings , UserRoleEnum  } from '../../settings/app-settings';

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

  verifyCode: any = {  
    verifyCodeTips: "获取验证码",  
    countdown: 60,  
    disable: false  
  }  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    //private smsService : SmsServiceProvider,
    public service: RestServiceProvider) {
    this.user = { phone: '', pwd: '' };
    //this.verifyCode.countdown = 1;
  }

  ionViewDidLoad() {  
    if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username ){
      const usr:IUser  = AppSettings.getCurrentUser();
      if(!usr.role || (usr.role && usr.role[0]!== UserRoleEnum.PMCUser)){
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
      password: AppSettings.Encrypt(this.user.pwd)
    }).then((usr:IUser) => { 
      if (usr) {
        localStorage.setItem('user', JSON.stringify(usr));
        if(!usr.role || (usr.role && usr.role[0]!== UserRoleEnum.PMCUser)){
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.navCtrl.setRoot(PmcCarportDashboardPage);
        }
      }
      else {
        this.wrongUsrorPwd = true;
        //console.log('wrong username or password');
      }
    }).catch(x => {
      console.log(x);
    })
  }

  forgotPass() {

  }

  on_usernameBlur(target){
    //console.log('username on blur');
    this.usernameBlur = true;
  }

  on_passwordBlur(target){
    this.passwordBlur = true;
  }

  settime() {  
    console.log(this.verifyCode.countdown);
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
  
  sendSMS(){
    console.log('start sending sms...');
   // const smsBody = {
      // appid: "23171",
      // signature: "92e80748c54a46ffd5c5954ffbbbe8e6",
     const cellPhone = "13816873730";
     const verifyCode ="123789";
      //content: "【享停车】 您的验证码是 123456，请在10分钟内输入。"
    //};

    this.smsService.sendSMS(cellPhone,verifyCode).then( x => {
      console.dir(x);
    });
  }
}
