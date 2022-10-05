/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private locaStorageToken: LocalStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //GET token from localStorage
    const token = this.locaStorageToken.getToken();
    //HTTP Request
    const isAPIURL = request.url.startsWith(environment.apiURL);

    //Put token in HEADERs
    if(token && isAPIURL) {
      request = request.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    }

    return next.handle(request);
  }
}
