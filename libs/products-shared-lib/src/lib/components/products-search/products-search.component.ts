/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'pinkbits-products-search',
    templateUrl: './products-search.component.html',
    styles: []
})
export class ProductsSearchComponent implements OnInit {
    //Global vars
    searchText = '';
    searchResult;
    searchResultID;
    finalArray: any = [];
    finalItem;

    constructor(private productService: ProductsService) {}

    ngOnInit(): void {
        this._getProducts();
    }

    //Functions
    private _getProducts() {
        this.productService.getProducts().subscribe((productList) => {
            productList.forEach((product) => {
                this.searchResult = product.name.concat(',', this.searchResult);
                this.searchResultID = product.id.concat(',', this.searchResultID);
            });
            const searchResultArray = this.searchResult;
            this.finalArray = searchResultArray.split(',');
        });
    }

    testMethod() {
        location.reload();
    }
}
