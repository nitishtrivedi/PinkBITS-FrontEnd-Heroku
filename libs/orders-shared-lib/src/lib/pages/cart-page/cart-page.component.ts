/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart, CartItemDetails } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'pinkbits-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  //Global VARS

  endSubs$: Subject<any> = new Subject();
  cartItemDetails : CartItemDetails[] = [];
  cartCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }
  ngOnDestroy(): void {
      this.endSubs$.next(true);
      this.endSubs$.complete();
  }

  //Functions

  backToShop() {
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem: CartItemDetails) {
    this.cartService.deleteCartItem(cartItem.product.id)
  }


  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((resCart) => {
      this.cartItemDetails = [];
      this.cartCount = resCart?.items?.length ?? 0;
      resCart.items.forEach(cartItem => {
        this.ordersService.getProductById(cartItem.productId).subscribe(
          (resProducts) => {
            this.cartItemDetails.push({
              product: resProducts,
              quantity: cartItem.quantity 
            })
          })
      })
    })
  }

  updateCartItemQuantity(event, cartItem: CartItemDetails) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }


  
}
