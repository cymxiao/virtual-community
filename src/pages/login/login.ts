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
            this.showPrivacyError = false;
            this.addAccountandUpdateUser(usr);
          }
        } else {
          if(!this.showPrivacyError){
            this.addAccountandUpdateUser(usr);
          }
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
          this.redirctPage(uptUser);
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
    if (usr && usr._id && usr.agreedLicense) {
      if (usr.role && usr.role[0] === UserRoleEnum.PMCUser ) { 
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
      message: '快易停尊重并保护所有使用快易停平台享受各项互联网服务用户的隐私权，快易停会按照本声明的规定使用和披露用户的个人隐私及非个人隐私。快易停将以高度的勤勉、审慎义务对待这些信息，除本声明另有规定外，在未征得用户事先许可的情况下，在任何情况下均不会将这些信息对外披露或向第三方提供。<br/>'

      + '如用户不同意本声明，可以主动拒绝、取消快易停提供的服务；用户一旦使用快易停服务（包括但不限于用户对快易停所有服务内容、软件、客户端的下载、安装、使用、浏览、帐号获取和登录等行为），即视为用户已了解并完全同意本声明各项内容，包括对本声明随时所做的任何修改。<br/>'
      + '<h5>一、 适用范围</h5><br/>'
      + '<b>1、 个人隐私</b><br/>'
      + '即能够对用户进行个体辨别的信息。在用户注册或激活登录快易停平台的账户时提供的个人注册信息，包括用户姓名、手机号码、IP地址、GPS设备地址等；<br/>'
      + '用户可通过“个人中心”的【编辑基础信息】相关功能查询、更正、添加其授权快易停使用的用户信息。<br />'
      + '<b>2、 非个人隐私</b><br />'
      + '即根据操作状态及使用习惯，客观地反映在快易停服务器端的基本记录信息和其他一切个人隐私信息范围外的普通信息。在用户享有快易停平台服务或访问快易停页时，快易停可能会接收并记录的用户的浏览器和计算机上的信息，包括但不限于浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息；也包括用户下载快易停移动客户端软件，或访问移动网页使用快易停手机APP服务时，APP可能会读取与用户位置和移动设备相关的信息，包括但不限于设备型号、设备识别码、操作系统、分辨率等信息。<br />'
      + '<h5>二、 信息安全保障</h5><br />'
      + '快易停将会采取一切必要措施保护用户的个人隐私信息，除法律或有法律赋予权限的政府部门要求或用户同意等原因外，不向除合作单位以外的第三方公开、透露。同时为了运营和改善快易停的技术和服务，快易停将可能会自己收集使用或向第三方提供用户的非个人隐私信息，这将有助于向用户提供更好的用户体验和提高我们的服务质量。具体如下：<br />'
      + '<b>1、 一般除外情况：</b><br />'
      + '（1）隐私权信息已成为公知信息；<br />'
      + '（2）快易停从第三方合法获得的信息，且未附加保密的义务；<br />'
      + '（3）用户事先明确同意披露或使用的信息；<br />'
      + '（4）为了维护公共利益或快易停的利益；<br />'
      + '（5）相应的法律、法规要求以及按照有关法院、政府主管部门的要求，需要快易停提供用户的注册资料等信息。<br />'
      + '<b>2、 特殊除外情况：</b><br />'
      + '（1）在进行特殊促销或抽奖时，快易停可能会与赞助商、供应商共享用户的个人隐私信息，此情况使用以用户同意参加特殊促销或抽奖活动为前提；<br />'
      + '（2）快易停可能会与合作伙伴共同向用户提供所要求的服务或者共同向用户展示可能感兴趣的内容，在隐私权信息为使用该项产品/服务所必须的情况下，同意快易停可与其分享必要的隐私权信息；<br />'
      + '（3）在不透露单用户个人隐私资料的前提下，对非个人隐私数据库进行分析、整理和商业利用；<br />'
      + '（4）在不透露单用户个人隐私资料的前提下，为实现检测、防止或解决欺诈、安全或技术问题的目的而使用；<br />'
      + '（5）法律要求或允许为保护快易停合法的权利、财产或安全及使用户或公众免受即将发生的损害。<br />'
      + '<h5>三、 Cookie的使用</h5><br />'
      + '在用户未拒绝接受cookies的情况下，快易停会在用户的计算机上设定或取用cookies，数据信息都采用匿名的方式，以便用户能登录或使用依赖于cookies的快易停服务或功能，为用户提供更加周到的个性化服务和推广服务。<br />'
      + '用户可以通过修改浏览器设置的方式拒绝接受cookies；但如果用户选择拒绝接受cookies，则可能无法登录或使用依赖于cookies的快易停服务或功能。<br />'
      + '<h5>四、 特殊免责</h5><br />'
      + '为了提供更好的用户服务，快易停会在用户选择服务或提供信息的情况时存储注册信息。请用户在注册时及时、详尽及准确的提供个人信息，并在发生变化时不断更新、完善，如果因注册信息不真实、有误而引起的问题，由用户自行承担相应的后果。<br />'
      + '请用户不要将的帐号、密码转让或出借予他人使用，互联网上不排除因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用或隐私信息外泄，此类情况与快易停无关。<br />'
      + '<h5>五、 修订</h5><br />'
      + '快易停有权根据实际需要不经事先通知修改本声明，声明修改后将会在网站相关页面上及移动APP通知发布。如用户不接受修改后的隐私声明，则用户有权终止使用快易停提供的服务；如用户继续使用快易停提供的服务，则视为接受隐私权声明的变动。<br />',

      
      buttons: [
        {
          text: '拒绝',
          handler: () => {
            //console.log('Disagree clicked');
            this.user.agreedLicense = 'Rejected';
            this.showPrivacyError = true;
            //console.log(this.licenseRejected);
          }
        },
        {
          text: '同意',
          handler: () => {
            //console.log('Agree clicked');
            this.showPrivacyError = false;
            this.user.agreedLicense = 'Agreed';
          }
        }
      ]
    });

    alert.present();
  }
}
