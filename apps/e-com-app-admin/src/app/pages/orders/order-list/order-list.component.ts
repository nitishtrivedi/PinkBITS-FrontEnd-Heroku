import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@pinkbits/orders-shared-lib';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'pinkbits-admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})



export class OrderListComponent implements OnInit, OnDestroy {
//Global Variables
    orders: Order[] = [];
    orderStatus = ORDER_STATUS
    endsubs$ : Subject<any> = new Subject();


  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }





  ngOnInit(): void {
//Initialise onLoad functions here
    
    this._getOrders();

  }

  ngOnDestroy(): void {
      this.endsubs$.next;
      this.endsubs$.complete();
  }

//Custom Functions


  private _getOrders() {
      this.ordersService
        .getOrders()
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
        (orders) => {
          this.orders = orders;
        }
      )
  }


  deleteOrder( orderId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to DELETE this Order ?',
      header: 'Delete Order Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).pipe(takeUntil(this.endsubs$)).subscribe(response => {
          this._getOrders();
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Order Deleted Successfully'
          });
        }, (error => {
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Order Could not be Deleted'});
        }))
      }
  });
  }
  

  showOrder (orderId) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

}
