import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../settings/app-settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AutoCompleteService} from 'ionic2-auto-complete';

@Injectable()
export class AutoCompleteServiceProvider implements AutoCompleteService {

    apiUrl = AppSettings.API_SERVICES_URL;
    labelAttribute = "name";
    constructor(public http: HttpClient) {

        console.log('cccc called.');
    }


    getResults(keyword) {

        console.log('getResults called');
        return this.http.get(this.apiUrl + '/community')
            .map(
                result => {
                    console.log(result.toString());
                    return JSON.parse(result.toString())
                        .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()))
                });
    }

}