import { ICommunity } from './community';

export interface IPMC  {
    _id: string;
    id: string;
    __v: string;
    PMC: string;
    username: string;
    password: string;
    community_ID: ICommunity;
    role: string;
    name:string;
  }