//Import CORE Modules--------------------------------------------------

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Import Router Module from node_modules
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import COMPONENTS----------------------------------------------------------------------------

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminCategoriesListComponent } from './pages/categories/categories-list/admin-categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import {
    AuthGuardService,
    JwtInterceptor,
    UsersAuthSharedLibModule
} from '@pinkbits/users-auth-shared-lib';

//IMPORT UI MODULES-----------------------------------------------------------

//Import Card PrimeNG Module
import { CardModule } from 'primeng/card';
//Import Toolbar PrimeNG
import { ToolbarModule } from 'primeng/toolbar';
//Import Button Module
import { ButtonModule } from 'primeng/button';
import { AdminHeaderComponent } from './shared/admin-header/admin-header.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CategoriesService } from '@pinkbits/products-shared-lib';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    DropdownModule,
    InputSwitchModule,
    EditorModule,
    FileUploadModule,
    TagModule,
    InputMaskModule,
    FieldsetModule,
    DividerModule
];

@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        AdminDashboardComponent,
        ShellComponent,
        SidebarComponent,
        AdminCategoriesListComponent,
        AdminHeaderComponent,
        CategoriesFormComponent,
        ProductListComponent,
        ProductFormComponent,
        UsersListComponent,
        UsersFormComponent,
        OrderListComponent,
        OrderDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        UsersAuthSharedLibModule,
        NgxStripeModule.forRoot('pk_test_51LkYoBSBgojFKKnREUUo00poWqqCpmuVWctwnYL6PyowhpaT7WTRDikRXBDQkpjpV6dXb8It1xkXio8YmHMWGIGJ004ddz3bi0'),
        ...UX_MODULE
    ],
    providers: [
        CategoriesService,
        MessageService,
        ConfirmationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
