/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'pinkbits-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];
  endsubs$: Subject<any> = new Subject();


  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {

    this._getFeaturedProducts();

  }

  ngOnDestroy(): void {
      this.endsubs$.next(true);
      this.endsubs$.complete();
  }

  //FUNCTIONS

  private _getFeaturedProducts() {
    this.productsService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(products => {
      this.featuredProducts = products
    })
  }

}
