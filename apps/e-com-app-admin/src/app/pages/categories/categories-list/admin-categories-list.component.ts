import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@pinkbits/products-shared-lib'
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'pinkbits-admin-categories-list',
  templateUrl: './admin-categories-list.component.html',
  styles: [
  ]
})
export class AdminCategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = []
  endsubs$ : Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
      this.endsubs$.next(true);
      this.endsubs$.complete();
  }

  deleteCategory( categoryId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to DELETE this Category ?',
      header: 'Delete Category Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(response => {
          this._getCategories();
          this.messageService.add({
            severity:'success', 
            summary:'Success', 
            detail:'Category Deleted Successfully'
          });
        }, (error => {
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'Category Could not be Deleted'});
        }))
      }
  });
  }

  updateCategory(categoryId: string) {
      this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(cats => {
      this.categories = cats;
    })
  }
}
