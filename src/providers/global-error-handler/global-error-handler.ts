import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable, Inject } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { ErrorHandlerPage } from '../../pages/error-handler/error-handler'
/*
  Generated class for the GlobalErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  //Amin: IMP. I cann't use NavController in constructor, it throw no provider for NavController. 
  //I think it may be the following reason: navCtl should identify the current nav, but in GlobalErrorHandler, it hard to identify the current nav
  constructor(public alertCtrl: AlertController) {
    //constructor (private app:App) {
    super();

    console.log('  global error constructor ');
  }

  handleError(error: any): void {
    //console.log('log global error : ' + error);
    //console.dir(error);
    super.handleError(error);
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    if (error) {
      if (error.status === 0 && error.name === 'HttpErrorResponse' && error.statusText === 'Unknown Error') {
        this.showAlert('你好，我们的后台服务遇到了问题，目前正在积极修复中，请稍后片刻后再访问，给您带来不便，我们深表歉意。');
      }
    }
  }


  showAlert(subTitleText) {
    let alert = this.alertCtrl.create({
      title: '发生错误啦！',
      subTitle: subTitleText,
      buttons: ['确定']
    });
    alert.present();
  }

}