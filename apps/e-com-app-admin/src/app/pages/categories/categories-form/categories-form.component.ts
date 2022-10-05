import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@pinkbits/products-shared-lib';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pinkbits-admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentCategoryId : string;
  endsubs$ : Subject<any> = new Subject();



  constructor(
      private formBuilder: FormBuilder, 
      private categoriesService: CategoriesService,
      private messageService: MessageService,
      private location: Location,
      private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
    this._checkEditMode();
  }

  ngOnDestroy(): void {
      this.endsubs$.next;
      this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }

    if (this.editmode) {
        this._updateCategory(category);
    } else {
        this._createCategory(category);
    }

  }

  onCancel() {
    this.messageService.add({severity:'error', summary:'Error', detail:'Category Creation Aborted'});
    this.location.back();
  }

  
  _createCategory(category: Category) {
    this.categoriesService
      .createCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((category: Category) => {
      this.messageService.add({severity:'success', summary:'Success', detail:`Category with name:  "${category.name}" is Created Successfully`});
      timer(1500).toPromise().then( done => {
        this.location.back();
      })
    },
    (error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category Could not be Created'});
    }));
  }

  _updateCategory (category: Category) {
    this.categoriesService
      .updateCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(response => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Category Updated Successfully'});
      timer(500).toPromise().then( done => {
        this.location.back();
      })
    },
    (error => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category Could not be Updated'});
    }));
  }



  private _checkEditMode() {
      this.activatedRoute.params
      .pipe(takeUntil(this.endsubs$))
        .subscribe(params => {
          if (params.id) {
            this.editmode = true;
            this.currentCategoryId = params.id;
            this.categoriesService
              .getCategoryById(params.id)
              .pipe(takeUntil(this.endsubs$))
              .subscribe ( category => {
              this.categoryForm.name.setValue(category.name);
              this.categoryForm.icon.setValue(category.icon);
              this.categoryForm.color.setValue(category.color);
            })
          }
      })
  }

    
  get categoryForm() {
    return this.form.controls;
  }

}
