import { ICommunity } from './community';

export interface IUser  {
    _id: string;
   
    username: string;
    password: string;
    community_ID: ICommunity;
    account_ID: string;
    role: string;
    phoneNo: string;
    address: string; 
    name:string;
    //Amin: limitation . One user can only has one carPlate
    carPlate: string; 
    lastLoginDate:Date;
    status:string;
  }


  //Amin: todo: can use Interface inherit?
 


 