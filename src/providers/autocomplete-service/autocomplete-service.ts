import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../../settings/app-settings';
import { Injectable } from '@angular/core';

@Injectable()
export class AutoCompleteServiceProvider {// implements AutoCompleteService {

  apiUrl: string;

  constructor(public http: HttpClient) {
    this.apiUrl = AppSettings.getAPIServiceURL();
  }

  getResults(keyword) {

    const params = new HttpParams().append("name", keyword);
    //console.log(keyword);
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/findcommunity', { params: params }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('findcommunity' + err.message);
      });
    });
  }

}