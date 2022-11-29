/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../services/users.service';
import * as countriesLib from 'i18n-iso-countries';
import { Subject, takeUntil, timer } from 'rxjs';
import { User } from '../../models/user';

declare const require;

@Component({
    selector: 'pinkbits-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
    //Global Variables
    form: FormGroup;
    countries = [];
    endsubs$: Subject<any> = new Subject();
    isSubmitted = false;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initUserForm();
        this._getCountries();
    }
    ngOnDestroy(): void {
        this.endsubs$.next;
        this.endsubs$.complete();
    }
    //FUNCTIONS
    private _initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            addressLine1: [''],
            addressLine2: [''],
            pin: [''],
            city: [''],
            state: [''],
            country: ['']
        });
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

    private _registerUser(user: User) {
        this.usersService
            .registerUser(user)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                (user: User) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `User ${user.name} is created!`
                    });
                    timer(500)
                        .toPromise()
                        .then(() => {
                            // this.location.back();
                        });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'User is not created!'
                    });
                }
            );
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        const user: User = {
            name: this.userForm.name.value,
            email: this.userForm.email.value,
            phone: this.userForm.phone.value,
            password: this.userForm.password.value,
            isAdmin: this.userForm.isAdmin.value,
            addressLine1: this.userForm.addressLine1.value,
            addressLine2: this.userForm.addressLine2.value,
            pin: this.userForm.pin.value,
            city: this.userForm.city.value,
            state: this.userForm.state.value,
            country: this.userForm.country.value
        };

        this._registerUser(user);
    }

    get userForm() {
        return this.form.controls;
    }
}
