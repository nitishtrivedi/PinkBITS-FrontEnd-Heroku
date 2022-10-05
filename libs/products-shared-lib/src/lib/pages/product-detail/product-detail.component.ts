/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@pinkbits/orders-shared-lib';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'pinkbits-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: Product;
  endsubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['productId']) {
        this._getProduct(params['productId']);
      }
    })
  }

  ngOnDestroy(): void {
      this.endsubs$.next(true);
      this.endsubs$.complete();
  }

  //Functions
  private _getProduct(id: string) {
    this.productsService
    .getProductById(id)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(resProduct => {
      this.product = resProduct;
    })
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }
}
