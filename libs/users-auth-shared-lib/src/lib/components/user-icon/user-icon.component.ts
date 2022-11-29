/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'pinkbits-user-icon',
    templateUrl: './user-icon.component.html',
    styles: []
})
export class UserIconComponent implements OnInit {
    //Global Variables
    showFlag = false;
    userName;

    constructor(
        private usersService: UsersService,
        private tokenService: LocalStorageService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        //Added Fix for NOT passing NULL Value of User ID when page initialises
        const id = this.tokenService.getUserID();
        if (id) {
            this.getUserInfo();
        }
    }

    //Functions
    onClickShowHide() {
        //If Menu is visible, click on icon again to hide the icon
        this.showFlag = this.showFlag ? false : true;
        //this.getUserInfo();
    }

    getUserInfo() {
        const userID = localStorage.getItem('USER ID');
        this.usersService.getUser(userID).subscribe((user) => {
            this.userName = user.name;
        });
    }

    onClickedOutside() {
        //Used Click Outside Component to hide the User Menu if CLicked Outside the Div
        this.showFlag = false;
    }

    logout() {
        this.messageService.add({
            severity: 'success',
            summary: 'User Logged Out',
            detail: 'You have successfully Logged Out'
        });
        this.tokenService.removeToken();
        localStorage.removeItem('USER ID');
        localStorage.clear();
        timer(400)
            .toPromise()
            .then(() => {
                window.location.reload();
            });
    }
}
