import { Component, Input } from '@angular/core';
 
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { UserStatusEnum ,UserRoleEnum } from '../../settings/app-settings';

/**
 * Generated class for the SmsCodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 * Amin:Pending issue: 输入 '金丰'， 金丰蓝庭小区未显示。
 */
@Component({
  selector: 'sms-code',
  templateUrl: 'sms-code.html'
})
export class SmsCodeComponent {

  @Input() cellPhoneNumber: string;
  @Input() source: string = '';
  cellPhoneError: boolean;
  // userStatus:string;
  // userRole:string;
  
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  constructor(  public service: RestServiceProvider) {
    
  }

  disabled(){
    if (this.cellPhoneNumber && this.cellPhoneNumber.length === 11){
      this.cellPhoneError = false;
      this.verifyCode.disable = false;
    } else {
      this.verifyCode.disable = true;
    }
  }

  settime() {
    if (this.cellPhoneNumber && this.cellPhoneNumber.length === 11) {
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
    if (this.cellPhoneNumber && this.cellPhoneNumber.length === 11) {
      //const cellPhone = this.user.phone;
      //generate a random number , length six ,  sometime , Math.round(Math.random() * 1000000) length is 5, due to first number is 0.
      const randomNumber = Math.round(Math.random() * 1000000);
      //console.log(randomNumber);
      let verifyCode = randomNumber < 100000 ? randomNumber + 100000 : randomNumber ;
      console.log(verifyCode);

      let newUser = {};
      if(this.source === 'login') {
        newUser = {
          username: this.cellPhoneNumber,
          //password: AppSettings.Encrypt(verifyCode),
          password: verifyCode,
          status: UserStatusEnum.active
        } ;
      } else if(this.source === 'register'){
        newUser = {
          username: this.cellPhoneNumber, 
          password: verifyCode,
          role: UserRoleEnum.PMCUser,
          status: UserStatusEnum.pendingOnVerify
        } ;
      }

      //register this user
      this.service.addUser(newUser).then((usr: any) => {
        if (usr) {
          //console.dir(usr);
          if (usr.duplicateUsername === true) {
            //console.log('User Exist, Update password directly');
            const udpateContent = {
              password: verifyCode
            };
            this.service.updateUser(usr._id, udpateContent).then((uptUser: any) => {
              if (uptUser) {
                //console.dir(uptUser);
                console.log('update user password suc when user exist on login page.');
              } else {
                //console.log('update user failed suc when user exist on login page.');
                //this.logger.error('update user failed suc when user exist on login page.');
              }
            });
          }
        }
      }).catch(e => {
        console.log(e);
        //this.logger.error('Register user (add a new user to db) failed');
      });
      this.service.sendSMS(this.cellPhoneNumber, verifyCode).then(x => {
        //console.dir(x);
        //this.logger.info('User Registed:' + this.cellPhoneNumber + 'has registered, and would get verifycode by SMS.')
      });
    } else {
      this.cellPhoneError = true;
    }
  }
}
