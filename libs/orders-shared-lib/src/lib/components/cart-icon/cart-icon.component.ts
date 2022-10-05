/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'pinkbits-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  // GLobal VARS

  cartCount: any = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart?.items?.length ?? 0; //This method means IF cart.items.length != 0, then update cartCount OR ELSE '??' return 0 to cartCount
    })
  }

}
