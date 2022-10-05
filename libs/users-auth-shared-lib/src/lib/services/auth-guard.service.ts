/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})


export class AuthGuardService implements CanActivate{



  constructor(
    private router: Router,
    private localStorageToken: LocalStorageService
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    //Get Token FIRST
      const token = this.localStorageToken.getToken();
    //Decode the token

      if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
          return true;
        }
  
        if(tokenDecode.isAdmin === false) {
          alert('You are NOT authorized to access the Admin Panel');
          window.location.reload()
        }
      }
    
      this.router.navigate(['/login'])
      return false;
  }


  //Check Token Expiration
  private _tokenExpired(expiration) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

}
