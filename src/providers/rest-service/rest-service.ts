import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
      this.http.post(this.apiUrl + '/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  loginUser(data) {

    const params = new HttpParams().append("username", data.username).append("password", data.password);
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/userlogin', { params: params }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('login error' + err.message);
      });
    });
  }

  updateUser(userId, data) {
    //const params = new HttpParams().append("userId",userId);
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'  
    //   })
    // };

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/users/' + userId, JSON.stringify(data)).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('update user error' + err.message);
      });
    });
  }


  updateleisurePark(leisureParkId, data) {  
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/leisurePark/' + leisureParkId, JSON.stringify(data)).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('update leisurePark error' + err.message);
      });
    });
  };


  getUser(username) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users/' + username).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addCarport(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/carport', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addLeisurePark(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/leisurePark', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getLeisureParkforOwner(ownerId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getleisurePark/' + ownerId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getLeisureParkforOwner error' + err.message);
      });
    });
  }


  getLeisureParkbyCommunity(comId, ownerId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getleisureParkbyCom/' + comId + '/' + ownerId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getLeisureParkbyCommunity error' + err.message);
      });
    });
  }

  getLeisureParkforApplier(applierId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getleisureParkforApplier/' + applierId).subscribe(data => { 
        resolve(data);
      }, err => {
        console.log('getLeisureParkforOwner error' + err.message);
      });
    });
  }

  getCommunity(comId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/community/' + comId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getCommunity error' + err.message);
      });
    });
  }

  getCarport(carportId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/carport/' + carportId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getCarport error' + err.message);
      });
    });
  }


  getCarportListByOwnerId(ownerId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/searchcarport/' + ownerId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getCarportListByOwnerId error' + err.message);
      });
    });
  }

  getStatisticOfCarport() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/groupleisurePark').subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getStatisticOfCarport error' + err.message);
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

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    console.log(JSON.stringify(req.headers));
    return next.handle(req);
  }
}
