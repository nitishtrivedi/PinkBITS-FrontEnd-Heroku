import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@pinkbits/orders-shared-lib';
import { ProductsService } from '@pinkbits/products-shared-lib';
import { UsersService } from '@pinkbits/users-auth-shared-lib';
import { combineLatest, Subject, takeUntil } from 'rxjs';




@Component({
  selector: 'pinkbits-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})


export class AdminDashboardComponent implements OnInit, OnDestroy {
//Global Variables
  statistics = [];
  endsubs$ : Subject<any> = new Subject();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private orderService: OrdersService
  ) {}



  ngOnInit(): void {
    combineLatest(
      [
        this.orderService.getOrdersCount(),
        this.productService.getProductsCount(),
        this.userService.getUsersCount(),
        this.orderService.getTotalSales(),
      ]) 
      .pipe(takeUntil(this.endsubs$))
        .subscribe((values) => {
          this.statistics = values;
      })
  }

  ngOnDestroy(): void {
      this.endsubs$.next;
      this.endsubs$.complete();
  }

  //Functions



}