/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@pinkbits/users-auth-shared-lib';
import { OrderItem } from '../../models/order-item';
import * as countriesLib from 'i18n-iso-countries';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/order.service';
import { ORDER_STATUS } from '../../order.constants';
import { Subject, take, takeUntil } from 'rxjs';
import { StripeService } from 'ngx-stripe';

declare const require;

@Component({
    selector: 'pinkbits-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
    //Global variables
    checkoutFormGroup: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId: string;
    countries = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService,
        private stripeService: StripeService
    ) {}

    ngOnInit(): void {
        this._initCheckOutForm();
        this._autoFillUserData();
        this._getCartItems();
        this._getCountries();
    }

    ngOnDestroy(): void {
        this.endSubs$.next(true);
        this.endSubs$.complete();
    }

    //FUNCTIONS

    private _initCheckOutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: ['', Validators.required],
            pin: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required]
        });
    }

    private _autoFillUserData() {
        this.usersService
            .observeCurrentUser()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((user) => {
                if (user) {
                    this.userId = user.id;
                    this.checkoutForm['name'].setValue(user.name);
                    this.checkoutForm['email'].setValue(user.email);
                    this.checkoutForm['addressLine1'].setValue(user.addressLine1);
                    this.checkoutForm['addressLine2'].setValue(user.addressLine2);
                    this.checkoutForm['city'].setValue(user.city);
                    this.checkoutForm['pin'].setValue(user.pin);
                    this.checkoutForm['state'].setValue(user.state);
                    this.checkoutForm['country'].setValue(user.country);
                    this.checkoutForm['phone'].setValue(user.phone);
                }
            });
    }

    private _getCartItems() {
        const cart: Cart = this.cartService.getCart();
        this.orderItems = cart.items.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });
        console.log(this.orderItems);
    }

    private _getCountries() {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
        this.countries = Object.entries(countriesLib.getNames('en', { select: 'official' })).map(
            (entry) => {
                return {
                    id: entry[0],
                    name: entry[1]
                };
            }
        );
    }

    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm['addressLine1'].value,
            shippingAddress2: this.checkoutForm['addressLine2'].value,
            city: this.checkoutForm['city'].value,
            pin: this.checkoutForm['pin'].value,
            state: this.checkoutForm['state'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status: 'Pending',
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };

        this.ordersService.cacheOrderData(order);

        this.ordersService.createCheckoutSession(this.orderItems).subscribe ((error) => {
            if (error) {
                console.log('Error in Redirect to Payment');
            }
        })

    }

    backToCart() {
        this.router.navigate(['/cart']);
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
