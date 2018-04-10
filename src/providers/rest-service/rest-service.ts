import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app-settings';
/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestServiceProvider {

  //apiUrl = 'http://localhost:3000';
  //apiUrl = 'http://192.168.0.110:3000';
  apiUrl = AppSettings.API_SERVICES_URL;
  constructor(public http: HttpClient) {
    //this.http.post('',null);
    console.log('Hello RestServiceProvider Provider');
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {

      //const cheaders: any = new HttpHeaders().append('Content-Type', 'application/json');
      this.http.post(this.apiUrl + '/users',  JSON.stringify( data)  )
      .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  loginUser(data) {
    
    const params = new HttpParams().append("username",data.username).append("password",data.password);
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/userlogin', {params : params } ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('login error' + err.message);
      });
    });
  }

  updateUser(userId, data) { 
    //const params = new HttpParams().append("userId",userId);
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/users/' + userId, JSON.stringify( data) ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('update user error' + err.message);
      });
    });
  }


  getMap() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/maps').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}
