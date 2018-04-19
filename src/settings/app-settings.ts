import { ENV } from '@app/env';
import CryptoJS from 'crypto-js';
import CryptoBrowserify from 'crypto-browserify';


export class AppSettings{
    public static ENCRYPTION_KEY = "ApP2018!";


    public static getAPIServiceURL() {
        //static svcURL = '';
        if (ENV.mode === 'Production') {
            return "http://localhost:3000";
        } else if (ENV.mode === 'Development') {
            return "http://192.168.1.4:3000";
        } else if (ENV.mode === 'Home') {
            return "http://192.168.1.4:3000";
        } else {
            return "http://localhost:3000";
        }
    }

    public static getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    public static getCurrentCommunity(){
        return JSON.parse(localStorage.getItem('community'));
    }

    public static getCurrentCarport(){
        return JSON.parse(localStorage.getItem('carport'));
    }

    public static getDisplayText(input: any, dict: any) {
        if (input && input.length > 0 && dict.filter(pu => { return pu.value === input[0] })
          && dict.filter(pu => { return pu.value === input[0] }).length > 0) {
          return dict.filter(pu => { return pu.value === input[0] })[0].text;
        }
      }

      public static Encrypt(source){
        return CryptoJS.AES.encrypt(source, AppSettings.ENCRYPTION_KEY).toString();
      }

      public static Decrypt(source){
        return CryptoJS.AES.decrypt(source, AppSettings.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      }

      
    public static priceUnitDict = [
        { text: '小时', value: 'hour' },
        { text: '次', value: 'day' },
        { text: '月', value: 'month' }, 
      ];


    public static leisureParkStatusDict = [
        { text: '可申请', value: 'active' },
        { text: '已申请', value: 'applied' },
        { text: '已支付', value: 'paid' }, 
        { text: '等待支付', value: 'pendingOnPay' }, 
        { text: '已过期', value: 'timeout' }, 
        { text: '无效', value: 'invalid' },
      ];
}



export enum LeisureParkStatus {
    // pending = '待审核',
    // active ='可申请',
    // invalid = '无效', 
    pending = 'pending' ,
    active  = 'active',
    invalid  = 'invalid', 
  }


