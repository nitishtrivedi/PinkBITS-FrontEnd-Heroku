/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private localStorageToken: LocalStorageService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //Get Token FIRST
        const token = this.localStorageToken.getToken();
        //Decode the token

        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            //""tokenDecode.isAdmin && "" was removed from the below line to allow logins from all users. 23/11/22
            if (!this._tokenExpired(tokenDecode.exp)) {
                return true;
            }

            // if(tokenDecode.isAdmin === false) {
            //   alert('You are NOT authorized to access the Admin Panel');
            //   window.location.reload()
            // }
        }

        // BELOW FUNCTIONALITY ADDED ON 23/11/22 FOR NAVIGATION OF CART LOGIN PAGE VS ADMIN LOGIN PAGE

        //console.log('THE URL IS', this.router.url);
        if (this.router.url === '/cart') {
            this.router.navigate(['/login2']);
        } else {
            this.router.navigate(['/login']);
        }
        return false;
    }

    //Check Token Expiration
    private _tokenExpired(expiration): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
