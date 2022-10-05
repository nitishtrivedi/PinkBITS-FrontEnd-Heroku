import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@pinkbits/products-shared-lib';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';






@Component({
  selector: 'pinkbits-admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})





export class ProductListComponent implements OnInit, OnDestroy {
  //Global Variables
  products: Product[] = []
  endsubs$ : Subject<any> = new Subject();





  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }






  ngOnInit(): void {
    //Functions to be run while initialising (On Initialize)
    this._getProducts();
  }

  ngOnDestroy(): void {
      this.endsubs$.next;
      this.endsubs$.complete();
  }

  //Write ALL Functions HERE//////////////////////////////////////////////////////////

  private _getProducts() {
      this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products => {
        this.products = products;
        console.log(products)
      })
  }

  updateProduct (productId: string) {
      this.router.navigateByUrl(`products/form/${productId}`)
  }

//Delete a product from the List

deleteProduct(productId: string) {
  this.confirmationService.confirm(
    {
      message: 'Do you want to DELETE this Product ?',
      header: 'Delete Product Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe(response => {
          this._getProducts();
          this.messageService.add(
            {
              severity:'success', 
              summary:'Success', 
              detail:'Product Deleted Successfully'
            });
        }, (error => {
          this.messageService.add(
            {
              severity:'error', 
              summary:'Error', 
              detail:'Category Could not be Deleted'
            });
        }))
      }
    }
  )
}



//END////////////////
}
