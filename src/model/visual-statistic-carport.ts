import { ICommunity } from './community';

export interface IStatisticCarport  {
    _id: string;
    count: number;
    community_info: ICommunity; 
  }