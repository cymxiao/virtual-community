import { HttpClient, HttpParams, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
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
  apiUrl;
  constructor(public http: HttpClient) {
    this.apiUrl = AppSettings.getAPIServiceURL();
  }

  getPMCUsers(status) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/pmcusers/' + status).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
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
          throw err;
        });
    });
  }

  loginUser(data) {

    const params = new HttpParams().append("username", data.username).append("password", data.password);
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/userlogin', { params: params }).subscribe(data => {
        resolve(data);
      }, err => {
        //Amin: important for error handling. throw err is necessary, if not, global error would not be triggered. 
        //Another solution is:  romove the whole err{...} block, it means No error handler here.
        console.log('login error :' + err.message);
        throw err;
      });
    });
  }

  updateUser(userId, data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/users/' + userId, JSON.stringify(data)).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('update user error' + err.message);
        throw err;
      });
    });
  }


  updateleisurePark(leisureParkId, data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/leisurePark/' + leisureParkId, JSON.stringify(data)).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('update leisurePark error' + err.message);
        throw err;
      });
    });
  };


  updateCarport(carportId, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/carport/' + carportId, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }

  updateManyCarports(comId, ownerId, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/updatecarports/' + comId + '/' + ownerId, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }

  updateCommunity(comId, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/community/' + comId, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }



  getUser(username) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users/' + username).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }

  addCarport(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/carport', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }

  addLeisurePark(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/leisurePark', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }

  getLeisureParkforOwner(ownerId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getleisurePark/' + ownerId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getLeisureParkforOwner error' + err.message);
        throw err;
      });
    });
  }


  getLeisureParkbyCommunity(comId, ownerId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getleisureParkbyCom/' + comId + '/' + ownerId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getLeisureParkbyCommunity error' + err.message);
        throw err;
      });
    });
  }

  getLeisureParkforApplier(applierId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getleisureParkforApplier/' + applierId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getLeisureParkforOwner error' + err.message);
        throw err;
      });
    });
  }

  getCommunity(comId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/community/' + comId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getCommunity error' + err.message);
        throw err;
      });
    });
  }

  getCarport(carportId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/carport/' + carportId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getCarport error' + err.message);
        throw err;
      });
    });
  }


  getCarportListByOwnerId(ownerId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/searchcarport/' + ownerId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getCarportListByOwnerId error' + err.message);
        throw err;
      });
    });
  }

  getStatisticOfCarport() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/groupleisurePark').subscribe(data => {
        resolve(data);
      }, err => {
        console.log('getStatisticOfCarport error' + err.message);
        throw err;
      });
    });
  }

  checkStartTime(comId, ownerId, cpId, startTime) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/checkStartTime/' + comId + '/' + ownerId + '/' + cpId + '/' + startTime).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }

  getStartTimeforNext(comId, ownerId, cpId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/getStartTimeforNext/' + comId + '/' + ownerId + '/' + cpId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }

  checkEndTime(comId, ownerId, cpId, endTime) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/checkEndTime/' + comId + '/' + ownerId + '/' + cpId + '/' + endTime).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }



  /* start account api */
  addAccount(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/accounts', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }

  getAccount(userId) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/account/' + userId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }

  updateAccountCredit(userId, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/account/' + userId, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }

  updateAccount(userId, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/updateaccount/' + userId, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          throw err;
        });
    });
  }
  /* end account api */
  




  getMap() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/maps').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }

  sendSMS(cellPhone, verifyCode) {
    return new Promise(resolve => {
      //Amin: IMP, please use JSON.stringify({}). otherwise 404 error.
      this.http.post(this.apiUrl + '/sms/' + cellPhone + '/' + verifyCode, JSON.stringify({})).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('sendSMS error' + err.message);
        throw err;
      });
    });
  }





  getxjMembers(sortByBth) {
    // let urlString = '';
    // if (sortByBth && sortByBth === '1') {
    //   urlString = this.apiUrl + '/members/1';
    // } else {
    //   urlString = this.apiUrl + '/members';
    // }

    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/members/' + sortByBth).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }


  //it include add and update
  savexjMember(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/member', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          //throw err;
          throw err;
        });
    });
  }

  getxjMember(name) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/member/' + name).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        throw err;
      });
    });
  }

  updatexjMember(xjMemberId, data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/member/' + xjMemberId, JSON.stringify(data)).subscribe(data => {
        resolve(data);
      }, err => {
        console.log('update member error' + err.message);
        throw err;
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
