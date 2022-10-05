import { Component, OnInit } from '@angular/core';
import { AuthService } from '@pinkbits/users-auth-shared-lib';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'pinkbits-admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to LOGOUT from the Admin Panel?',
      accept: () => {
        this.authService.logout();
      }
    })
  }

}
