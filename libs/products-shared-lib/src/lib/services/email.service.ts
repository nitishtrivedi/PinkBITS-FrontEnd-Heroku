/* eslint-disable no-empty-pattern */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({ 
    providedIn: 'root' 
})
export class EmailService {

    apiUrlEmail = environment.apiURL + 'sendemail'

    constructor(
        private http: HttpClient
    ) {}

    httpGet(apiUrlEmail) {
        return this.http.get(apiUrlEmail);
      }
    
      httpPost(apiUrlEmail, {}) {
        return this.http.post(apiUrlEmail, { name: "Nitish" });
      }
    
      sendEmail(apiUrlEmail, data) {
        return this.http.post(apiUrlEmail, data);
      }
}
