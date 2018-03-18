import { HttpClient ,HttpHeaders , HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
//import { Headers, Http , RequestOptions } from '@angular/http';
/*
  Generated class for the GeographicalMapServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
// const options = new RequestOptions({ headers: headers });

@Injectable()
export class GeographicalMapServiceProvider {// implements HttpInterceptor {


  apiUrl = 'http://api.map.baidu.com/location/ip?ak=BwpRyGZipdkOdgRx8Z27Ynlp';

  constructor(public http: HttpClient){ //, public _http: Http) {
    console.log('Hello GeographicalMapServiceProvider Provider');
  }

  // intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
  //   console.log('haha2');
  //   return this.getMap().mergeMap(user => {
  
  //     if (user) {
  //       // clone and modify the request
  //       request = request.clone({
  //         setHeaders: {
  //           'ccess-Control-Allow-Origin': '*'
  //         }
  //       });
  //     }

  //     return next.handle(request);
  //   });
  // }

  getMap() {
    //return this._http.get( this.apiUrl , options
    
    // const _headers = new HttpHeaders();
    // const headers : any = _headers.append('Access-Control-Allow-Origin', '*');
    const headers : any = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    // let headers :any = new HttpHeaders(
    //   {'abc':'22',
    //   'abc2':'111',
    //   'abc4':'444'}
    //   );

//     let headers :any  = new HttpHeaders();
// headers = headers.append('Authorization', 'TTTTTTTTTTTTTT');
// headers = headers.append('Accept', 'application/json');
// headers = headers.append('Content-Type', 'application/json');
    return this.http.get(
      this.apiUrl // {headers: new HttpHeaders().set('UserEmail', 'haha' ) } 
      // { 
      //   //headers: new HttpHeaders().append('Access-Control-Allow-Origin', '*') 
      //   headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*') 
      //   //headers: {'Access-Control-Allow-Origin' : '*'}
      // }
    );
  }

}
