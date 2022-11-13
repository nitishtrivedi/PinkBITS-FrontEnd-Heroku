/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { OrdersSharedLibModule } from '@pinkbits/orders-shared-lib';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { NoSanitizePipe } from './noSanitizerPipe';
import { UiSharedLibModule } from '@pinkbits/ui-shared-lib';
import { ContactComponent } from './components/contact/contact.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { SearchPipe } from './components/products-search/product-filter.pipe';
import { ProductSearchDirective } from './components/products-search/highlight.directive';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsListComponent
    },
    {
        path: 'category/:categoryId',
        component: ProductsListComponent
    },
    {
        path: 'products/:productId',
        component: ProductDetailComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        OrdersSharedLibModule,
        RouterModule.forChild(routes),
        ButtonModule,
        CheckboxModule,
        FormsModule,
        RatingModule,
        InputNumberModule,
        UiSharedLibModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputMaskModule,
        InputTextareaModule,
        DialogModule
    ],
    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        FeaturedProductsComponent,
        ProductItemComponent,
        ProductsListComponent,
        ProductDetailComponent,
        NoSanitizePipe,
        ContactComponent,
        ProductSearchDirective,
        SearchPipe
    ],
    exports: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        FeaturedProductsComponent,
        ProductItemComponent,
        ProductsListComponent,
        ProductDetailComponent,
        ContactComponent
    ]
})
export class ProductsSharedLibModule {}
