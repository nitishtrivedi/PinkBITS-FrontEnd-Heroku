import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/products';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'pinkbits-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private productsService : ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this._getProducts([params['categoryId']]);
        this.isCategoryPage = true;
      } else {
        this._getProducts();
        this.isCategoryPage = false;
      }
    })
    this._getCategories();
  }

  //Functions

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter).subscribe(resProducts => {
      this.products = resProducts;
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(resCategory => {
      this.categories = resCategory;
    })
  }

  categoryFilter() {
    const selectedCategories = this.categories.filter(category => category.checked).map(category => category.id);
    this._getProducts(selectedCategories)
  }
}
