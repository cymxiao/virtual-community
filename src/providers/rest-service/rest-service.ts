import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestServiceProvider {

  apiUrl = 'http://localhost:3000';
  constructor(public http: HttpClient) {
    //this.http.post('',null);
    console.log('Hello RestServiceProvider Provider');
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      // let header = new HttpHeaders();
      // let other_header :any  = header.append('Content-Type', 'application/x-www-form-urlencoded');//.append('Accept', 'application/json').append('Content-Type','application/json');

    //   var headers :any  = new HttpHeaders({
    //     "Content-Type": "application/x-www-form-urlencoded", 
    //     "Accept": "application/json"
    // });
    const headers:any = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    // const headers :any = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   })};

    // const headers :any  =  new HttpHeaders({
    //   'Content-Type':  'application/json'
    // });

    //const requestHeaders :any = new HttpHeaders().set('Content-Type' ,  'application/json');


      this.http.post(this.apiUrl+'/users', JSON.stringify(data) ,  headers  )
      //{headers: new HttpHeaders().set('Accept', 'application/json' )}
      // .set('Content-Type','application/json')
      // .set('haha','haha2') 
     
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }); 
  }
 
  
  getMap() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/maps').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}
