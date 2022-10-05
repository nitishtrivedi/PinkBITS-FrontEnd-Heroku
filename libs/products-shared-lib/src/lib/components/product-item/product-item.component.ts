/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, Input } from '@angular/core';
import { CartService, CartItem } from '@pinkbits/orders-shared-lib';
import { Product } from '../../models/products';

@Component({
  selector: 'pinkbits-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
//INPUT

  @Input() product: Product;


  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  //FUNCTIONS

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }

}
