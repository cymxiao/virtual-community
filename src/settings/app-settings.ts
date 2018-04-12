export class AppSettings{
    public static API_SERVICES_URL = "http://192.168.1.4:3000";

    public static getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    public static getCurrentCommunity(){
        return JSON.parse(localStorage.getItem('community'));
    }

    public static getCurrentCarport(){
        return JSON.parse(localStorage.getItem('carport'));
    }
}



export enum LeisureParkStatus {
    // pending = '待审核',
    // active ='可申请',
    // invalid = '无效', 
    pending = 'pending' ,
    active  = 'active',
    invalid  = 'invalid', 
  }