/* eslint-disable @typescript-eslint/no-unused-vars */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Animations Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiSharedLibModule } from '@pinkbits/ui-shared-lib';
//Import custom Components
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsSharedLibModule } from '@pinkbits/products-shared-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrdersSharedLibModule } from '@pinkbits/orders-shared-lib';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsersAuthSharedLibModule } from '@pinkbits/users-auth-shared-lib';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

// Create a variable for ROUTES

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    ProductsSharedLibModule,
    UiSharedLibModule,
    AccordionModule,
    FontAwesomeModule,
    OrdersSharedLibModule,
    ToastModule,
    UsersAuthSharedLibModule,
    NgxStripeModule.forRoot('pk_test_51LkYoBSBgojFKKnREUUo00poWqqCpmuVWctwnYL6PyowhpaT7WTRDikRXBDQkpjpV6dXb8It1xkXio8YmHMWGIGJ004ddz3bi0')
  ],
  providers: [MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
  exports: [MessagesComponent],
})
export class AppModule {}
