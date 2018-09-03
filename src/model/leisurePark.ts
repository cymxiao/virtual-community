import { ICarport } from './carport';
import { IUser } from './user';

export interface ILeisurePark  {
    id: string; 
    startTime: string;
    endTime: string;
    status: string;
    carport_ID: string; 
    community_ID:string;
    applied_UserID: string;
    shared_UserID:string;
    price: string;
    priceUnit:string;
    serviceTime: string;
    timestamp : Date;
  }

 
  export interface IUILeisurePark  {
    _id: string;
    id: string; 
    startTime: Date;
    endTime: Date;
    status: string;
    statusDisplayText: string;
    carport_ID: ICarport; 
    community_ID:string;
    applied_UserID: IUser;
    shared_UserID:IUser;
    price: string;
    priceUnit:string; 
    avaibleHours: number;
    serviceTime: string;
    timestamp: Date;
    showPMCButton: boolean;
    showServiceTime: boolean;
    serviceTimeDisplayText: string;
    parkingNumberDisplayText: string;
    disableApplyButton: boolean;
    disableDeleteButton: boolean;
  }