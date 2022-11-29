/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'pinkbits-profile-page',
    templateUrl: './profile-page.component.html',
    styles: []
})
export class ProfilePageComponent implements OnInit {
    //Global Variables
    userName;
    userAddress1;
    userAddress2;
    userCity;
    userState;
    userCountry;
    userPhone;
    userPin;
    userEmail;
    orderListArray;

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.getUserInfo();
        //this.getOrderInfo();
    }

    //Functions
    getUserInfo() {
        const userID = localStorage.getItem('USER ID');
        this.usersService.getUser(userID).subscribe((user) => {
            this.userName = user.name;
            this.userAddress1 = user.addressLine1;
            this.userAddress2 = user.addressLine2;
            this.userCity = user.city;
            this.userPin = user.pin;
            this.userState = user.state;
            this.userCountry = user.country;
            this.userPhone = user.phone;
            this.userEmail = user.email;
        });
    }
}
