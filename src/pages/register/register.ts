import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

import { IPMC } from '../../model/pmc';
//import { TabsPage } from '../tabs/tabs';
import { PmcCarportDashboardPage } from '../pmc-carport-dashboard/pmc-carport-dashboard';
import { LoginPage } from "../login/login";
import { CommunitySelectComponent } from '../../components/community-select/community-select';
import { SmsCodeComponent } from '../../components/sms-code/sms-code';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { AppSettings, UserRoleEnum ,UserStatusEnum } from '../../settings/app-settings';



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
  @ViewChild(CommunitySelectComponent) csCom: CommunitySelectComponent;
  @ViewChild(SmsCodeComponent) smsCom: SmsCodeComponent;
  user: any;
  phone: string;
  pwd: string;
  verifycode: string;
  isLogin: string = "register";
  myForm: any;
  showDuplicateUserNameError: boolean = false;
  showPMCExistError: boolean = false;
  blured: boolean = false;

  usernameBlur: boolean;
  passwordBlur: boolean;
  verifyCodeBlur: boolean;

  selectedComId: string;
  pmc: IPMC;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public apiService: RestServiceProvider,
    private sms: SMS) {
    //this.user = { phone: '', pwd: '' };
    this.pmc = {
      _id: '',
      id: '',
      __v: '',
      PMC: '',
      username: '',
      password: '',
      community_ID: '',
      role: '',
      name: ''
    }
  }

  ionViewDidLoad() {
    //console.log(UserRoleEnum.PMCUser);
    //console.log('send message');
    //this.sms.send('13816873730', 'Hello world!');
  }

  register() {
    //console.log(this.pwd);
    // const encryptPwd = AppSettings.Encrypt(this.pwd);
    // console.log(AppSettings.Decrypt(encryptPwd));
    //step 1 :update community with property management compamy


    //console.log(this.csCom.selectedComunityID);
    if (this.csCom.pmc) {
      this.showPMCExistError = true;
      console.log('this community already has pmc ' + this.showPMCExistError);
    } else {
      this.apiService.updateCommunity(this.csCom.selectedComunityID, { PMC: this.pmc.PMC }).then(c => {
        if (c) {
          localStorage.setItem('comId', this.csCom.selectedComunityID); //or c._id
          this.apiService.addUser(
            {
              username: this.pmc.username,
              password: AppSettings.Encrypt(this.pmc.password),
              name: this.pmc.name,
              community_ID: this.csCom.selectedComunityID,
              role: UserRoleEnum.PMCUser,
              status: UserStatusEnum.pendingOnVerify
            }
          ).then((usr: any) => {
            if (usr) {
              //console.dir(usr);
              if (usr.duplicateUsername === true) {
                this.showDuplicateUserNameError = true;
                //console.log(this.showDuplicateUserNameError);
              } else {
                localStorage.setItem('user', JSON.stringify(usr));
                this.navCtrl.setRoot(PmcCarportDashboardPage);
              }
            }
          }).catch(e => {
            console.log(e);
          });
        } else {
          console.log('updateCommunity failed!');
        }
      });
    }
  }

  changeText() {
    if (this.showDuplicateUserNameError) {
      this.showDuplicateUserNameError = false;
    }
  }

  on_username_Blur(item) {
    this.usernameBlur = true;
    //console.log(item);
    //console.log(item.target.value);
    if (item.value) {
      this.apiService.getUser(item.value).then(duplicateUser => {
        console.log(duplicateUser);
        if (duplicateUser) {
          this.showDuplicateUserNameError = true;
        } else {
          this.showDuplicateUserNameError = false;
        }
      });
    }
    this.smsCom.disabled();    
  }
  // go to login page
  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  on_passwordBlur(target) {
    this.passwordBlur = true;
  }

  on_verifyCodeBlur(target) {
    this.verifyCodeBlur = true;
  } 
}
