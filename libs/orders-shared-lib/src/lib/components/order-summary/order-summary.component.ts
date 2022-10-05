/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartItemDetails } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'pinkbits-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  //GLobal Variables
  endSubs$: Subject<any> = new Subject();
  totalPrice: number;
  productDetails: CartItemDetails[] = [];
  isCheckout = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) 
  {
    if (this.router.url.includes('checkout')) {
      this.isCheckout = true;
    }
  }

  ngOnInit(): void {
    this._getProductDetails ();
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
      this.endSubs$.next(true);
      this.endSubs$.complete();
  }

  //FUNCTIONS

  private _getProductDetails () {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((resCart) => {
      this.productDetails = [];
      resCart.items.forEach(cartItem => {
        this.ordersService.getProductById(cartItem.productId).subscribe((resProducts) => {
          this.productDetails.push({
            product: resProducts,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.ordersService
            .getProductById(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity
            });
        });
      }
    });
  }

  navigateToCheckOut() {
    this.router.navigate(['/checkout'])
  }









}
