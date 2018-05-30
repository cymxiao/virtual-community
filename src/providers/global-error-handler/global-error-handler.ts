import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable , Inject} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ErrorHandlerPage } from '../../pages/error-handler/error-handler'
/*
  Generated class for the GlobalErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalErrorHandler extends  ErrorHandler {
 //constructor( @Inject(NavController) private navCtrl: NavController) { 
  constructor () {
     super();
     console.log('  global error constructor ');
  }
 
  handleError(error: any): void {
    console.log('log global error');
    // super.handleError(error);
    //   // IMPORTANT: Rethrow the error otherwise it gets swallowed
    //  this.navCtrl.push(ErrorHandlerPage, {
    //   data: error
    // }); 
  }
   
}