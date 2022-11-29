/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { UsersFacade } from '../state/users.facade';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users';

    constructor(private http: HttpClient, private usersFacade: UsersFacade) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}/register`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
    }

    getUsersCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLUsers}/get/count`)
            .pipe(map((objectValue: any) => objectValue.userCount));
    }

    //NGRX Functions

    initAppSession() {
        this.usersFacade.buildUserSession();
    }

    observeCurrentUser() {
        return this.usersFacade.currentUser$;
    }

    isCurrentUserAuthenticated() {
        return this.usersFacade.isAuthenticated$;
    }
}
