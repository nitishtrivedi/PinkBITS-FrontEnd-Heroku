/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productSearch'
})

export class SearchPipe implements PipeTransform {
    transform(products: any[], searchText: string): any {
        if (!products) {
            return [];
        }
        if (!searchText) {
            return products;
        }

        searchText = searchText.toLocaleLowerCase();

        return products.filter(product => {
            return product.toLocaleLowerCase().includes(searchText);
        })
    }
}