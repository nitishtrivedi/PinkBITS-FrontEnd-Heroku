import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@pinkbits/products-shared-lib';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';







@Component({
  selector: 'pinkbits-admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})






export class ProductFormComponent implements OnInit, OnDestroy {
//GLOBAL VARIABLES
    editmode = false;
    form: FormGroup
    isSubmitted = false;
    categories = [];
    imageDisplay: string | ArrayBuffer;
    currentProductId: string;
    endsubs$ : Subject<any> = new Subject();




  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }







  ngOnInit(): void {
    //Write On Initialize functions here

    this._initForm ();
    this._getCategories ();
    this._checkEditMode ();
  }

  ngOnDestroy(): void {
      this.endsubs$.next;
      this.endsubs$.complete();
  }


  //WRITE ALL YOUR FUNCTIONS HERE//////////////////////

  private _initForm () {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        brand: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        countInStock: ['', Validators.required],
        description: ['', Validators.required],
        richDescription: [''],
        image: ['', Validators.required],
        images: [''],
        isFeatured: [false]
      });
  }


  get productsForm () {
      return this.form.controls;
  }

  //Get Categories to link with Products from Categories Component
  private _getCategories () {
      this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe( categories => {
        this.categories = categories;
      })
  }
//On Click Button Functions in Products Form - Adding or Editing Products

  onSubmit () {

      this.isSubmitted = true;

      if (this.form.invalid) {
        return;
      }

      const productFromData = new FormData ();

      Object.keys(this.productsForm).map( (key) => {
        productFromData.append(key, this.productsForm[key].value);
      });
      
      if (this.editmode) {
        this._updateProduct(productFromData);
      } else {
        this._addProduct (productFromData);
      }

  }





  onCancel () {
      this.location.back();
  }

// IMage Upload Functions

  onImageUpload (event) {

      const file = event.target.files[0];

      if (file) {
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const fileReader = new FileReader ();
        fileReader.onload = () => {
          this.imageDisplay = fileReader.result;
        }
        fileReader.readAsDataURL(file);
      }

  }
//Upating userData when clicked Edit Button

  private _updateProduct(productFormData:FormData) {
      this.productsService.updateProduct(this.currentProductId, productFormData).pipe(takeUntil(this.endsubs$)).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!'
          });
        }
      );
  }
//Adding a new Product after accepting input from User

  private _addProduct (productData: FormData) {
      this.productsService.createProduct(productData).pipe(takeUntil(this.endsubs$)).subscribe((product: Product) => {
        this.messageService.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:`Product with name:  "${product.name}" is Created Successfully`
          });
          timer(1500).toPromise().then (done => {
            this.location.back();
          })
      },
      (error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product Could not be Created'
        })
      })
      );
  }

  private _checkEditMode () {
      this.activatedRoute.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
          if (params.id) {
            this.editmode = true;
            this.currentProductId = params.id;
            this.productsService.getProductById(params.id).pipe(takeUntil(this.endsubs$)).subscribe((product) => {
              this.productsForm.name.setValue(product.name);
              this.productsForm.category.setValue(product.category.id);
              this.productsForm.brand.setValue(product.brand);
              this.productsForm.price.setValue(product.price);
              this.productsForm.countInStock.setValue(product.countInStock);
              this.productsForm.isFeatured.setValue(product.isFeatured);
              this.productsForm.description.setValue(product.description);
              this.productsForm.richDescription.setValue(product.richDescription)
              this.imageDisplay = product.image;
              this.productsForm.image.setValidators([]);
              this.productsForm.image.updateValueAndValidity();
            })
          }
      })
  }

}
