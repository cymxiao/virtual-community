import { ICommunity } from './community';

export interface IUser  {
    _id: string;
    id: string;
    __v: string;
    username: Date;
    password: Date;
    community_ID: ICommunity;
    role_ID: string;
    phoneNo: string;
    address: string; 
    
  }


  // export interface IPopulateUser  {
  //   _id: string;
  //   id: string;
  //   __v: string;
  //   username: Date;
  //   password: Date;
  //   community_ID: ICommunity;
  //   role_ID: string;
  //   phoneNo: string;
  //   address: string; 
    
  // }