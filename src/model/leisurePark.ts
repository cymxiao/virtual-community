import { ICarport } from './carport';

export interface ILeisurePark  {
    id: string; 
    startTime: Date;
    endTime: Date;
    status: string;
    carport_ID: string; 
    community_ID:string;
    applied_UserID: string;
    shared_UserID:string;
    price: string;
    priceUnit:string;
    timestamp : Date;
  }


  export interface IUILeisurePark  {
    id: string; 
    startTime: Date;
    endTime: Date;
    status: string;
    statusDisplayText: string;
    carport_ID: ICarport; 
    community_ID:string;
    applied_UserID: string;
    shared_UserID:string;
    price: string;
    priceUnit:string; 
    timestamp: Date;
  }