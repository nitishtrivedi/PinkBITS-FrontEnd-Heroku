/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@pinkbits/users-auth-shared-lib';

@Component({
  selector: 'pinkbits-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
      this.userService.initAppSession();
  }

  title = 'e-comm-app-user';
}
