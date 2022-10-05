/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'pinkbits-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styles: [
  ]
})
export class ThankYouPageComponent implements OnInit {

  constructor(
    private ordersService: OrdersService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    const orderData = this.ordersService.getCachedOrderData();
    this.ordersService.createOrder(orderData).subscribe(() => {
      this.cartService.emptyCart();
      this.ordersService.removeCachedOrderData();
    })

  }

}


