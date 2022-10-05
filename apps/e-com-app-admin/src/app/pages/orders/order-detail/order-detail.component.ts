import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@pinkbits/orders-shared-lib';
import { CategoriesService } from '@pinkbits/products-shared-lib';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';





@Component({
  selector: 'pinkbits-admin-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ]
})





export class OrderDetailComponent implements OnInit, OnDestroy {
//GLobal Variables
    order: Order;
    orderStatuses = [];
    selectedStatus: any;
    endsubs$ : Subject<any> = new Subject();



  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private location: Location
  ) { }






  ngOnInit(): void {
    //onLoad Functions Call Here
    this._mapOrderStatus();
    this._getOrder ();
  }

  ngOnDestroy(): void {
      this.endsubs$.next;
      this.endsubs$.complete();
  }

//Call your functions here


  private _mapOrderStatus () {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(
        (key) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label
            }
        }
    )
  }

  private _getOrder () {
    this.activatedRoute.params
      .subscribe(
        (params) => {
            if (params.id) {
                this.orderService
                  .getOrder(params.id)
                  .pipe(takeUntil(this.endsubs$))
                  .subscribe(
                    (order) => {
                        this.order = order;
                        const orderItemsArray = order.orderItems;
                        this.selectedStatus = order.status;
                    }
                )
            }
        }
    )
  }


  onStatusChange (event) {
    this.orderService
      .updateOrder({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order is updated!'
              });
        },
        () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not updated!'
            });
          }
    )
  }

  backToList() {
    this.location.back();
  }


}
