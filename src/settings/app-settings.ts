
import CryptoJS from 'crypto-js';
//import CryptoBrowserify from 'crypto-browserify';


export class AppSettings{
    public static ENCRYPTION_KEY = "ApP2018!-123211";
    
    //Amin: todo: temp code
    
    public static PHONE_ADMIN='99999099999';

    public static getAPIServiceURL() {
       //console.log('ENV in appsettings is : ' + ENV.mode );
       //return "http://106.14.132.131:3000";
       //Amin:Todo: why the mode doesn't works well. it's always dev mode. 
       //Amin:Important. Please make sure if deploy to server, the url should be an IP or internet url, 'localhost' is wrong, when user 
       //access this , if use localhost, it would try to connect localhost on user's device.
       return "http://106.14.132.131:3000";
    //    if (ENV.mode === 'Production') {
    //         return "http://106.14.132.131:3000";
    //     } else if (ENV.mode === 'Development') {
    //         return "http://localhost:3000";
    //     } else if (ENV.mode === 'Home') {
    //         return "http://192.168.1.4:3000";
    //     } else if (ENV.mode === 'aliyun') {
    //         return "http://106.14.132.131:3000";
    //     }else {
    //         return "http://106.14.132.131:3000";
    //     }
    }

    public static getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    // public static getCurrentCommunity(){
    //     return JSON.parse(localStorage.getItem('community'));
    // }

    public static getCurrentCommunityID(){
        return localStorage.getItem('comId');
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
       let ekey = CryptoJS.enc.Utf8.parse(AppSettings.ENCRYPTION_KEY); //16位
       //let eiv = CryptoJS.enc.Utf8.parse(AppSettings.ENCRYPTION_KEY);
        // return CryptoJS.AES.encrypt(source, ekey,
        // {
        //     iv: eiv,
        //     mode: CryptoJS.mode.CBC,
        //     padding: CryptoJS.pad.Pkcs7
        // }).toString();
        var encryptedData = CryptoJS.AES.encrypt(source, ekey, {  
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        //　由于CryptoJS生成的密文是一个对象，如果直接将其转为字符串是一个Base64编码过的，在encryptedData.ciphertext上的属性转为字符串才是后端需要的格式。
        //var encryptedBase64Str = encryptedData.toString();
        var encryptedStr = encryptedData.ciphertext.toString(); 
        //console.log(encryptedStr);
        return encryptedStr;
      }

      public static Decrypt(source){
        var dkey = CryptoJS.enc.Utf8.parse(AppSettings.ENCRYPTION_KEY);
        //var div = CryptoJS.enc.Utf8.parse(AppSettings.ENCRYPTION_KEY);
        // var encryptedHexStr = CryptoJS.enc.Hex.parse(source);
        // var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        // return CryptoJS.AES.decrypt(srcs, dkey,
        //     {
        //         iv: div,
        //         mode: CryptoJS.mode.CBC,
        //         padding: CryptoJS.pad.Pkcs7
        //     }).toString(CryptoJS.enc.Utf8);

        // 拿到字符串类型的密文需要先将其用Hex方法parse一下
        var encryptedHexStr = CryptoJS.enc.Hex.parse(source);
        // 将密文转为Base64的字符串
        // 只有Base64类型的字符串密文才能对其进行解密
        var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);  
        　　//使用转为Base64编码后的字符串即可传入CryptoJS.AES.decrypt方法中进行解密操作。
        　　// 解密
        var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, dkey, {  
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        　　//经过CryptoJS解密后，依然是一个对象，将其变成明文就需要按照Utf8格式转为字符串。
        　　// 解密后，需要按照Utf8的方式将明文转位字符串
        var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);  
        return decryptedStr;
      } 

   /*   //aes加密
      public static Encrypt(word) {
    var key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位
    var iv = CryptoJS.enc.Utf8.parse("1234567890000000");
    var encrypted = '';
    if (typeof(word) == 'string') {
        var srcs = CryptoJS.enc.Utf8.parse(word);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    } else if (typeof(word) == 'object') {//对象格式的转成json字符串
        let data = JSON.stringify(word);
        var srcs2 = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs2, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
    }
    return encrypted.toString();
}
// aes解密
public static Decrypt(word) {
    var key = CryptoJS.enc.Utf8.parse("1234567890000000");
    var iv = CryptoJS.enc.Utf8.parse("1234567890000000");
    var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}*/
      
    public static priceUnitDict = [
        { text: '小时', value: 'hour' },
        { text: '天', value: 'day' },
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

  export enum UserRoleEnum { 
    PMCUser = 'PMCUser' ,
    AdminUser  = 'superAdministator',
    ExternalUser  = 'externalUser' 
  }

  export enum UserStatusEnum {
    //'pendingOnVerify','active', 'blocked', 'deleted'
    pendingOnVerify = 'pendingOnVerify' ,
    active  = 'active',
    blocked  = 'blocked' ,
    deleted = 'deleted'
  }


