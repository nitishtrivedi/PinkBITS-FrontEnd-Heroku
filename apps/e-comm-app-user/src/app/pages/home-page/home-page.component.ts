/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@pinkbits/users-auth-shared-lib';
import { LocalStorageService } from 'libs/users-auth-shared-lib/src/lib/services/local-storage.service';

@Component({
    selector: 'pinkbits-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
    //Global Vars
    userName;
    constructor(
        private usersService: UsersService,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit(): void {
        //Added Fix for NOT passing NULL Value of User ID when page initialises
        const id = this.localStorageService.getUserID();
        if (id) {
            this.getUserInfo();
        }
    }
    //Functions
    getUserInfo() {
        const userID = localStorage.getItem('USER ID');
        this.usersService.getUser(userID).subscribe((user) => {
            this.userName = user.name;
        });
    }
}
