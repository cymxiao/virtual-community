import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ErrorHandlerPage } from '../../pages/error-handler/error-handler'
/*
  Generated class for the GlobalErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalErrorHandler extends  ErrorHandler {
  constructor( public navCtrl: NavController) { 
     super();
  }

  handleError(error: any): void {
    super.handleError(error);
      // IMPORTANT: Rethrow the error otherwise it gets swallowed
     this.navCtrl.push(ErrorHandlerPage, {
      data: error
    }); 
  }
   
}