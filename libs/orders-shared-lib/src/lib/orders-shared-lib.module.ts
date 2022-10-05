import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from "primeng/divider";
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';
import { AuthGuardService } from '@pinkbits/users-auth-shared-lib';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    canActivate: [AuthGuardService],
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'thank-you',
    component: ThankYouPageComponent,
  }
];

export const ordersSharedLibRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    DividerModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouPageComponent,
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouPageComponent,
  ],
})
export class OrdersSharedLibModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
