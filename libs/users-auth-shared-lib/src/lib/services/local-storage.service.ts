/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';
const USERID = 'USER ID';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {}

    setToken(data) {
        localStorage.setItem(TOKEN, data);
    }

    getToken(): string {
        return localStorage.getItem(TOKEN);
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }

    getUserID(): string {
        return localStorage.getItem(USERID);
    }

    isValidToken() {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            return !this._tokenExpired(tokenDecode.exp);
        } else {
            return false;
        }
    }

    getUserIdFromToken() {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (tokenDecode) {
                localStorage.setItem('USER ID', tokenDecode.userId);
                return tokenDecode.userId;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    private _tokenExpired(expiration): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
