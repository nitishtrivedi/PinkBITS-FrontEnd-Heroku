/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { environment } from '@env/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  apiUrlProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {
   }

  getProducts (categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(this.apiUrlProducts, {params: params})
  }

  getProductById (productId : string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`)
  }

  createProduct (productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProducts, productData)
  }

  updateProduct (productId: string, productData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrlProducts}/${productId}`, productData)
  }

  deleteProduct (productId: string): Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrlProducts}/${productId}`)
  }

  getProductsCount() : Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrlProducts}/get/featured/${count}`)
  }
}
