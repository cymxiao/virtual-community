import { HttpClient , HttpParams } from '@angular/common/http';
import { AppSettings } from '../../settings/app-settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AutoCompleteService} from 'ionic2-auto-complete';

@Injectable()
export class AutoCompleteServiceProvider {// implements AutoCompleteService {

    apiUrl = AppSettings.API_SERVICES_URL;
    //labelAttribute = "name";
    constructor(public http: HttpClient) {
 
    }


    // getResults(keyword) {

    //     console.log('getResults called');
    //     return this.http.get(this.apiUrl + '/community')//.subscribe(x => {})
    //         .map(
    //             result => {
                
    //                 return result.json()
    //                     .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()))
    //             });
    // }

  getResults(keyword) {

    const params = new HttpParams().append("name", keyword);
    console.log(keyword);
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/findcommunity', { params: params }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('login error' + err.message);
      });
    });
  }

}