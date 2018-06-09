import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { IPMC } from '../../model/pmc';
import { PmcCarportDashboardPage } from '../pmc-carport-dashboard/pmc-carport-dashboard';
import { LoginPage } from "../login/login";
import { CommunitySelectComponent } from '../../components/community-select/community-select';
import { SmsCodeComponent } from '../../components/sms-code/sms-code';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { UserRoleEnum ,UserStatusEnum } from '../../settings/app-settings';
import { ICommunity } from '../../model/community';

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
  community: ICommunity;
  wrongPrice: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public apiService: RestServiceProvider) {
    this.community={
      _id: '',
      id: '',
      __v: '',
      name: '',
      position: '',
      mapid: '',
      city_ID: '',
      PMC:'',
      price:'',
      priceUnit: '天',
      address: ''
    }
    this.pmc = {
      _id: '',
      id: '',
      __v: '',
      PMC: '',
      username: '',
      password: '',
      community_ID: this.community,
      role: '',
      name: ''
    }
  }

  ionViewDidLoad() { 
  }

  register() {
    //console.log(this.pwd);
    // const encryptPwd = AppSettings.Encrypt(this.pwd);
    // console.log(AppSettings.Decrypt(encryptPwd));
    //step 1 :update community with property management compamy

    if (this.csCom.pmc) {
      this.showPMCExistError = true;
      console.log('this community already has pmc ' + this.showPMCExistError);
    } else {
      this.apiService.updateCommunity(this.csCom.selectedComunityID, { PMC: this.pmc.PMC , price: this.pmc.community_ID.price, priceUnit: this.pmc.community_ID.priceUnit }).then(c => {
        if (c) {
          localStorage.setItem('comId', this.csCom.selectedComunityID); 
          this.apiService.addUser(
            {
              username: this.pmc.username,
              password: this.pmc.password,
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

  on_price_Blur(item) {
    if (item && item.value) {
      if (Number(item.value) < 0 || Number(item.value) > 1000) {
        this.wrongPrice = true;

      } else {
        this.wrongPrice = false;
      }
    }  
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
