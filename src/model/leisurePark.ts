import { ICarport } from './carport';

export interface ILeisurePark  {
    id: string; 
    startTime: Date;
    endTime: Date;
    status: string;
    carport_ID: string; 
    applied_UserID: string;
    shared_UserID:string;
    price: string;
    priceUnit:string;

  }


  export interface IUILeisurePark  {
    id: string; 
    startTime: Date;
    endTime: Date;
    status: string;
    carport_ID: ICarport; 
    //carport: ICarport;
    applied_UserID: string;
    shared_UserID:string;
    price: string;
    priceUnit:string; 
  }